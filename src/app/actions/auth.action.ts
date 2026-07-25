// app/actions/auth.action.ts

"use server";

import { cookies } from "next/headers";

interface SignInData {
    email: string;
    password: string;
}

export async function signInAction({
    email,
    password,
}: SignInData) {
    try {
        const res = await fetch(
            `${process.env.SERVER_URL}/auth/sign-in`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            }
        );

        const data = await res.json();
        console.log('data', data)

        if (!res.ok) {
            return {
                success: false,
                message: data.message,
            };
        }

        const cookieStore = await cookies();
        console.log(cookieStore)

        cookieStore.set(
            "access_token",
            data.accessToken,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                maxAge: 15 * 60,
            }
        );

        cookieStore.set(
            "refresh_token",
            data.refreshToken,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                maxAge: 30 * 24 * 60 * 60,
            }
        );

        return {
            success: true,
            message: data.message,
            user: data.user,
        };

    } catch (error: unknown) {
        return {
            success: false,
            message: error instanceof Error
                ? error.message
                : "Something went wrong",
        };
    }
}