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
      max: 5,
    }),
  ],
});

export async function proxy(request: NextRequest) {
  const decision = await aj.protect(request);

  if (decision.isDenied()) {
    return NextResponse.json(
      {
        error: "Access denied",
      },
      {
        status: 403,
      },
    );
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
