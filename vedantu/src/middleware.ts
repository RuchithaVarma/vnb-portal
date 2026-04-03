import { NextRequest, NextResponse } from "next/server";
import { securityHeaders } from "./lib/paymentSecurity";

/**
 * Security Middleware for Payment Routes
 * Applies security headers and basic protection
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Apply security headers to all routes
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Additional security for payment routes
  if (
    request.nextUrl.pathname.startsWith("/api/payments") ||
    request.nextUrl.pathname.startsWith("/api/razorpay")
  ) {
    // Log payment API access
    console.log(
      `Payment API Access: ${request.method} ${request.nextUrl.pathname}`,
      {
        ip: request.ip,
        userAgent: request.headers.get("user-agent"),
        timestamp: new Date().toISOString(),
      },
    );

    // Check for suspicious patterns
    const userAgent = request.headers.get("user-agent") || "";
    const suspiciousPatterns = [
      /bot/i,
      /crawler/i,
      /scraper/i,
      /curl/i,
      /wget/i,
      /python/i,
      /java/i,
    ];

    if (suspiciousPatterns.some((pattern) => pattern.test(userAgent))) {
      console.warn(`Suspicious user agent detected: ${userAgent}`, {
        ip: request.ip,
        path: request.nextUrl.pathname,
      });
    }
  }

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Additional admin protection can be added here
    // - IP whitelisting
    // - Enhanced authentication checks
    // - Session validation
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
  runtime: "nodejs",
};
