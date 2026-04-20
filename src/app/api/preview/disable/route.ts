import { NextResponse } from "next/server";

// GET /api/preview/disable — clears the preview cookie and bounces to /coming-soon.

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const dest = new URL("/coming-soon", url.origin);
  const res = NextResponse.redirect(dest);
  res.cookies.set("mnav_preview", "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
