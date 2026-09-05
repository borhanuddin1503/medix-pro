import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

// middleware.ts
const roleRoutes: Record<string, string[]> = {
  "/dashboard/admin": ["ADMIN"],
  "/dashboard/doctor": ["DOCTOR"],
  "/dashboard/receptionist": ["RECEPTIONIST"],
  "/dashboard/technologist": ["TECHNOLOGIST"],
  "/apply/doctors": ["USER", 'ADMIN'],
};

export async function proxy(req: NextRequest) {
  let accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;
  let response = NextResponse.next();

  // Token refresh if ther  have refresh token
  if (!accessToken && refreshToken) {
    console.log('token is refreshing')
    const refreshRes = await fetch(`${process.env.SERVER_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (refreshRes.ok) {
      const refreshResult = await refreshRes.json();
      accessToken = refreshResult.accessToken;

      response.cookies.set("access_token", refreshResult.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
        maxAge: 60 * 15,
      });

      response.cookies.set("refresh_token", refreshResult.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
    }
  }

  const currentPath = req.nextUrl.pathname;

  // এই check টা শুধু role-protected route গুলোর জন্যই প্রযোজ্য
  const isProtectedRoute = Object.keys(roleRoutes).some((route) =>
    currentPath.startsWith(route)
  );

  if (isProtectedRoute) {
    if (!accessToken) {
      const redirectUrl = new URL("/sign-in", req.url);
      redirectUrl.searchParams.set("redirect", currentPath + req.nextUrl.search);
      return NextResponse.redirect(redirectUrl);
    }

    try {
      const whoMeRes = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as any;

      console.log('decoded data' , whoMeRes)

      for (const [route, roles] of Object.entries(roleRoutes)) {
        if (currentPath.startsWith(route) && !roles.includes(whoMeRes.role)) {
          return NextResponse.redirect(new URL("/forbidden", req.url));
        }
      }
    } catch {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  // '/' বা অন্য non-protected route হলে — শুধু response (refresh cookie সহ) রিটার্ন করো, redirect করবে না
  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/:path*",
  ],
};