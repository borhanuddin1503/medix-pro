"use server";

import { cookies } from "next/headers";


interface IApiError {
    message: string;
}

export interface IFetchWithAuthResponse<T> {
    status: number;
    data?: T;
    error?: IApiError;
}

interface IDefaultApiResponse {
    success?: boolean;
    message?: string;
    data?: unknown;
}

export async function fetchWithAuth<T = IDefaultApiResponse>(
    url: string,
    options?: {
        method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
        body?: unknown;
        tags?: string[],
        revalidate?: number
    },
): Promise<IFetchWithAuthResponse<T>> {
    console.log('fetch with api called', url)
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("access_token")?.value;

    console.log("access token:", accessToken);

    if (!accessToken) {
        return {
            status: 401,
            error: {
                message: "Unauthorized",
            }
        };
    }

    try {
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
    } catch (error) {
        return {
            status: 500,
            error: {
                message: "Internal Server Error",
            }
        };
    }
}