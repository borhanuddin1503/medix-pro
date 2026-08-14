"use server";

import { cookies } from "next/headers";

export async function fetchWithAuth(
    url: string,
    options?: {
        method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
        body?: unknown;
        tags?: string[],
        revalidate?: number
    },
) {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("access_token")?.value;

    console.log("access token:", accessToken);

    if (!accessToken) {
        return {
            status: 401,
            data: {
                message: "Unauthorized",
            }
        };
    }

    const response = await fetch(
        `${process.env.SERVER_URL}${url}`,
        {
            method: options?.method || "GET",
            headers: {
                "Content-Type": "application/json",
                ...(accessToken && {
                    Authorization: `Bearer ${accessToken}`,
                }),
            },
            body: options?.body
                ? JSON.stringify(options.body)
                : undefined,

            next: {
                ...(options?.tags
                    ? { tags: options.tags }
                    : {}),

                ...(options?.revalidate !== undefined
                    ? {
                        revalidate:
                            options.revalidate,
                    }
                    : {}),
            },
        }
    );

    const data = await response.json();

    return {
        status: response.status,
        data,
    };
}