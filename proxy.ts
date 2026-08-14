import { auth } from "@/lib/auth";
import arcjet, { detectBot, fixedWindow } from "@arcjet/next";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:MONITOR", "CATEGORY:PREVIEW", "STRIPE_WEBHOOK"],
    }),

    fixedWindow({
      mode: "LIVE",
      window: "1m",
      max: 300,
    }),
  ],
});

export async function proxy(request: NextRequest) {
  // 1. Check Arcjet first
  const decision = await aj.protect(request);

  if (decision.isDenied()) {
    console.log("❌ Arcjet denied request:", {
      reason: decision.reason,
      results: decision.results,
      url: request.url,
      method: request.method,
      userAgent: request.headers.get("user-agent"),
    });

    if (decision.reason.isRateLimit()) {
      return NextResponse.json(
        {
          error: "Too many requests",
        },
        { status: 429 },
      );
    }

    if (decision.reason.isBot()) {
      return NextResponse.json(
        {
          error: "Bot detected",
        },
        {
          status: 403,
        },
      );
    }

    return NextResponse.json(
      {
        error: "Access denied",
      },
      {
        status: 403,
      },
    );
  }

  // 2. Check authentication
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 3. User is authenticated and Arcjet allowed the request
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
