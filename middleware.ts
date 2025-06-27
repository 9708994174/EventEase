import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"

export function middleware(request: NextRequest) {
  // Define protected routes
  const protectedRoutes = ["/dashboard", "/bookings", "/profile", "/admin"]
  const partnerRoutes = ["/partner"]
  const adminRoutes = ["/admin"]

  const { pathname } = request.nextUrl

  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))
  const isPartnerRoute = partnerRoutes.some((route) => pathname.startsWith(route))
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route))

  if (isProtectedRoute || isPartnerRoute || isAdminRoute) {
    // Get token from cookies or authorization header
    const token =
      request.cookies.get("auth-token")?.value || request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      // Redirect to login if no token
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any

      // Check user type for specific routes
      if (isPartnerRoute && decoded.userType !== "partner") {
        return NextResponse.redirect(new URL("/auth/login?error=unauthorized", request.url))
      }

      if (isAdminRoute && decoded.userType !== "admin") {
        return NextResponse.redirect(new URL("/auth/login?error=unauthorized", request.url))
      }

      // Add user info to headers for API routes
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set("x-user-id", decoded.userId)
      requestHeaders.set("x-user-type", decoded.userType)

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
    } catch (error) {
      // Invalid token, redirect to login
      return NextResponse.redirect(new URL("/auth/login?error=invalid-token", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/bookings/:path*",
    "/profile/:path*",
    "/partner/:path*",
    "/admin/:path*",
    "/api/bookings/:path*",
    "/api/users/:path*",
    "/api/partners/:path*",
    "/api/admin/:path*",
  ],
}
