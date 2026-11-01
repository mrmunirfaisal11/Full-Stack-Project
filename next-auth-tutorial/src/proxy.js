// src/proxy.js  (Next.js 16+; purane versions mein middleware.js + function middleware)
import { NextResponse } from "next/server";
import { verifyToken, SESSION_COOKIE } from "@/lib/session";

// Login chahiye wale pages (sub-paths bhi)
const protectedRoutes = ["/dashboard", "/admin"];
// Logged-in user ko yeh pages dobara nahi dikhane
const authRoutes = ["/login", "/signup"];

function matches(pathname, routes) {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
}

export async function proxy(request) {
  const { pathname, search } = request.nextUrl;

  // Cookie verify karo. Database call nahi: yeh fast rehna chahiye.
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = await verifyToken(token);

  // 1. Logged out + protected page -> login par bhejo, callbackUrl yaad rakho
  if (matches(pathname, protectedRoutes) && !session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname + search);
    const response = NextResponse.redirect(loginUrl);
    if (token) response.cookies.delete(SESSION_COOKIE); // kharab/expired cookie saaf
    return response;
  }

  // 2. RBAC (fast check): non-admin /admin par nahi ja sakta
  if (matches(pathname, ["/admin"]) && session?.role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 3. Logged in + login/signup page -> dashboard
  if (matches(pathname, authRoutes) && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 4. Baaki sab normal
  return NextResponse.next();
}

// API routes, Next.js internals aur static files par proxy nahi chalega
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico)$).*)",
  ],
};
