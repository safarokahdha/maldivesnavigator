import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// GET /api/admin/fetch-amazon?url=<amazon-url>
// Scrapes Amazon product page for title, image, description, price, ASIN.
// Cookie-gated by the admin preview cookie.

export const runtime = "nodejs";
export const maxDuration = 30;

function extractAsin(url: string): string | undefined {
  const m = url.match(/\/(?:dp|gp\/product|product)\/([A-Z0-9]{10})/i);
  return m?.[1];
}

function pick(html: string, re: RegExp): string | undefined {
  const m = html.match(re);
  return m?.[1];
}

function decode(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .trim();
}

export async function GET(request: Request) {
  const secret = process.env.PREVIEW_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "admin disabled" }, { status: 404 });
  }
  const jar = await cookies();
  if (jar.get("mnav_preview")?.value !== secret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const urlParam = new URL(request.url).searchParams.get("url") ?? "";
  if (!urlParam.includes("amazon.")) {
    return NextResponse.json({ error: "Provide an Amazon URL" }, { status: 400 });
  }

  const asin = extractAsin(urlParam);
  const cleanUrl = asin ? `https://www.amazon.com/dp/${asin}` : urlParam;

  try {
    const res = await fetch(cleanUrl, {
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept":
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        {
          error: `Amazon returned ${res.status}. Fill the fields manually.`,
          asin,
          amazonUrl: cleanUrl,
        },
        { status: 200 },
      );
    }

    const html = await res.text();

    // OG tags
    let title =
      pick(html, /<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i) ??
      pick(html, /<meta\s+name=["']title["']\s+content=["']([^"']+)["']/i) ??
      pick(html, /<title[^>]*>([^<]+)<\/title>/i) ??
      "";

    // Amazon titles often include " - <brand> : <long>" — trim trailing "Amazon.com:" prefix
    title = decode(title).replace(/^Amazon\.com\s*:\s*/i, "").trim();

    const image =
      pick(html, /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i) ??
      pick(html, /"hiRes":"([^"]+)"/) ??
      pick(html, /"large":"([^"]+)"/) ??
      "";

    const description =
      pick(html, /<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i) ??
      pick(html, /<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i) ??
      "";

    // Price — try several patterns Amazon uses
    const priceWhole =
      pick(html, /class=["']a-price-whole["']>([0-9,]+)/) ??
      pick(html, /class=["']a-offscreen["']>\$([0-9,.]+)</);
    const priceFraction = pick(html, /class=["']a-price-fraction["']>(\d+)</);
    const priceCurrency =
      pick(html, /class=["']a-price-symbol["']>([^<]+)</) ?? "$";

    let priceDisplay: string | undefined;
    if (priceWhole) {
      priceDisplay = priceFraction
        ? `${priceCurrency}${priceWhole.replace(/,/g, "")}.${priceFraction}`
        : `${priceCurrency}${priceWhole.replace(/,/g, "")}`;
    }

    return NextResponse.json({
      ok: true,
      asin,
      amazonUrl: cleanUrl,
      title,
      image: image ? decode(image) : "",
      description: decode(description),
      priceDisplay,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "fetch failed",
        asin,
        amazonUrl: cleanUrl,
      },
      { status: 200 },
    );
  }
}
