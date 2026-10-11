import { NextResponse, type NextRequest } from "next/server";

/**
 * Security headers — a strict, nonce-based Content-Security-Policy plus
 * the classic hardening headers the scanner asked for.
 */

const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  "X-Frame-Options": "DENY",
  "Cross-Origin-Opener-Policy": "same-origin",
};

export function middleware(request: NextRequest) {
  // --- 1. nonce + CSP -------------------------------------------------------
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  const nonce = btoa(String.fromCharCode(...bytes));

  const isDev = process.env.NODE_ENV === "development";
  const csp = [
    "default-src 'self'",
    // Production: nonce + strict-dynamic. 'unsafe-inline' stays only as a
    // fallback for ancient browsers (modern ones ignore it when a nonce exists).
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-inline'${
      isDev ? " 'unsafe-eval'" : " https: http:"
    }`,
    "style-src 'self' 'unsafe-inline'",
    // images: self (logos), https (Supabase Storage covers / any hosted URL)
    "img-src 'self' https: data: blob:",
    "font-src 'self' data:",
    // supabase-js may open REST + realtime connections
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(isDev ? [] : ["upgrade-insecure-requests"]),
  ].join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  // Next.js reads the CSP from the *request* headers to nonce its own scripts
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  for (const [k, v] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(k, v);
  }

  return response;
}

export const config = {
  // everything except build assets and public files
  matcher: ["/((?!_next/static|_next/image|brand/|icon.svg|favicon.ico).*)"],
};
