import { NextRequest, NextResponse } from "next/server";

// Coming-soon gate.
//
// Anyone without the `mnav_preview` cookie matching PREVIEW_SECRET sees
// the /coming-soon page instead of the real site.
//
// To unlock your own browser, visit:
//   /api/preview/enable?key=<PREVIEW_SECRET>
//
// To lock it back up:
//   /api/preview/disable
//
// If PREVIEW_SECRET isn't set the gate is OFF (site is fully public).

const PREVIEW_COOKIE = "mnav_preview";

export function proxy(request: NextRequest) {
  const secret = process.env.PREVIEW_SECRET;
  if (!secret) return NextResponse.next();

  const { pathname, search } = request.nextUrl;

  // Always allow: the coming-soon page itself, preview routes, next
  // internals, static assets, sitemap/robots, cron endpoint, admin APIs.
  // /api/admin/* routes enforce their own auth via the cookie check,
  // so they can bypass the gate.
  const allow =
    pathname === "/coming-soon" ||
    pathname.startsWith("/api/preview") ||
    pathname.startsWith("/api/journal/generate") ||
    pathname.startsWith("/api/admin") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    /\.[a-zA-Z0-9]{2,5}$/.test(pathname); // static file (png, jpg, ico, svg, etc.)

  if (allow) return NextResponse.next();

  const cookie = request.cookies.get(PREVIEW_COOKIE)?.value;
  if (cookie && cookie === secret) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/coming-soon";
  url.search = "";
  // Remember where the user wanted to go so we can bounce back after unlock
  if (pathname !== "/") url.searchParams.set("from", pathname + search);
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    /*
     * Match everything except:
     * - /_next (static files + image optimisation)
     * - /api/preview and /api/journal/generate (gate exempt)
     * - /favicon, /robots.txt, /sitemap.xml
     * Still matches the rest so we can rewrite HTML requests.
     */
    "/((?!_next/static|_next/image|_next/data|favicon|robots.txt|sitemap.xml).*)",
  ],
};
