import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password, image } = body;

        // Basic presence check (backend এও validate হবে, কিন্তু early return ভালো UX দেয়)
        if (!name || !email || !password || !image) {
            return NextResponse.json(
                { success: false, message: "Name, email , image and password are required" },
                { status: 400 }
            );
        }

        const backendRes = await fetch(`${process.env.SERVER_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, image }),
        });

        const data = await backendRes.json();

        if (!backendRes.ok) {
            // Backend থেকে আসা error message/status যেমন আছে, তেমনই forward করো
            return NextResponse.json(data, { status: backendRes.status });
        }

        // যদি email sending fail হয়ে থাকে (তোমার backend logic অনুযায়ী),
        // accessToken/refreshToken নাও আসতে পারে — সেক্ষেত্রে cookie set না করেই সফল response পাঠাও
        if (!data.accessToken || !data.refreshToken) {
            return NextResponse.json({
                success: true,
                message: data.message,
                user: data.user,
            });
        }

        const response = NextResponse.json({
            success: true,
            message: data.message,
            user: data.user,
        }, {
            status: backendRes.status
        });

        response.cookies.set("access_token", data.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            path: "/",
            maxAge: 60 * 15, // ১৫ মিনিট
        });

        response.cookies.set("refresh_token", data.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // ৭ দিন
        });

        return response;
    } catch (error) {
        console.error("Register route error:", error);
        return NextResponse.json(
            { success: false, message: "Something went wrong" },
            { status: 500 }
        );
    }
} 