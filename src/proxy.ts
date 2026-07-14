
import { NextRequest, NextResponse } from "next/server";

const roleRoutes = {
    "/dashboard/admin": "ADMIN",
    "/dashboard/doctor": "DOCTOR",
    "/dashboard/patient": "PATIENT",
    "/dashboard/receptionist": "RECEPTIONIST",
    "/dashboard/technologist": "TECHNOLOGIST",
};

export async function proxy(req: NextRequest) {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/who-me`,
            {
                headers: {
                    cookie: req.headers.get("cookie") ?? "",
                },
            }
        );

        if (!response.ok) {
            return NextResponse.redirect(new URL("/sign-in", req.url));
        }

        const { user } = await response.json();
        console.log(user)

        // Example: protect admin routes
        const currentPath = req.nextUrl.pathname;

        for (const [route, role] of Object.entries(roleRoutes)) {
            if (currentPath.startsWith(route) && user.role !== role) {
                return NextResponse.redirect(new URL("/forbidden", req.url));
            }
        }

        return NextResponse.next();
    } catch {
        return NextResponse.redirect(new URL("/sign-in", req.url));
    }
}

export const config = {
    matcher: ["/dashboard/admin/:path*", "/dashboard/doctor/:path*", "/dashboard/patient/:path*", "/dashboard/receptionist/:path*", "/dashboard/technologist/:path*"],
};