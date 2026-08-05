// app/api/auth/google/callback/route.ts
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const code = req.nextUrl.searchParams.get("code");

    if (!code) {
        return NextResponse.redirect(new URL("/login?error=no_code", req.url));
    }

    console.log('google code ', code)
    console.log(process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,)

    // ১. Google থেকে access_token নাও (code দিয়ে exchange করে)
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            code,
            client_id: process.env.GOOGLE_CLIENT_ID!,
            client_secret: process.env.GOOGLE_CLIENT_SECRET!,
            redirect_uri: `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/auth/google/callback`,
            grant_type: "authorization_code",
        }),
    });

    const tokenData = await tokenRes.json();

    // 🔍 এইটা যোগ করো - আসল error দেখতে পাবে
    if (!tokenRes.ok || !tokenData.access_token) {
        console.error("Token exchange failed:", tokenData);
        return NextResponse.redirect(
            new URL(`/login?error=token_exchange_failed`, req.url)
        );
    }

    console.log("token data", tokenData); // এখন এটা safe, কারণ উপরে already check হয়ে গেছে


    // ২. Google থেকে user info নাও
    const userRes = await fetch(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
            headers: { Authorization: `Bearer ${tokenData.access_token}` },
        }
    );

    const googleUser = await userRes.json();
    // googleUser = { id, email, name, picture, verified_email }


    console.log('google user', googleUser)
    // ৩. নিজের backend এ পাঠাও — user create/login করাও
    const backendRes = await fetch(
        `${process.env.SERVER_URL}/auth/google`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                googleId: googleUser.id,
                email: googleUser.email,
                name: googleUser.name,
                image: googleUser.picture,
                isVerified: googleUser. verified_email,
            }),
        }
    );

    if (!backendRes.ok) {
        return NextResponse.redirect(new URL("/login?error=auth_failed", req.url));
    }

    const { accessToken, refreshToken } = await backendRes.json();

    // ৪. নিজের cookie set করো (আগের মতোই)
    const cookieStore = await cookies();

    cookieStore.set("access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 15,
    });

    cookieStore.set("refresh_token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.redirect(new URL("/", req.url));
}