import { NextResponse } from "next/server";

// GET /api/preview/enable?key=<PREVIEW_SECRET>&from=/plan
// Sets the preview cookie for the caller so they bypass the coming-soon
// gate. Redirects to ?from or /.

export const runtime = "nodejs";

export async function GET(request: Request) {
  const secret = process.env.PREVIEW_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "PREVIEW_SECRET not set — gate is off already." },
      { status: 501 },
    );
  }

  const url = new URL(request.url);
  const key = url.searchParams.get("key") ?? "";
  const from = url.searchParams.get("from") ?? "/";

  if (key !== secret) {
    return NextResponse.json({ error: "invalid key" }, { status: 401 });
  }

  const dest = new URL(from.startsWith("/") ? from : "/", url.origin);
  const res = NextResponse.redirect(dest);
  res.cookies.set("mnav_preview", secret, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return res;
}
