import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET || "fresh-cart-secret-key-123" })
  const { pathname } = req.nextUrl

  // 1. If logged in and trying to access login/register, redirect to home
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register")
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  // 2. Protect routes: if NOT logged in and trying to access profile/orders/checkout, redirect to login
  const isProtectedRoute = pathname.startsWith("/profile") || 
                           pathname.startsWith("/orders") || 
                           pathname.startsWith("/contact") || 
                           pathname.startsWith("/checkout")
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", req.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/orders/:path*",
    "/checkout/:path*",
    "/login",
    "/register",
  ],
}
