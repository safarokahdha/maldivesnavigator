import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// GET /api/admin/fetch-amazon?url=<amazon-url>
//
// Amazon blocks direct requests from datacenter IPs (including Vercel's),
// which is why client-side scraping is unreliable. This route tries in
// order:
//   1. ScraperAPI   (if SCRAPERAPI_KEY is set — 5,000 free req/month,
//                    residential rotation, reliable)
//   2. microlink.io (free public OG scraper — often blocked by Amazon)
//
// Cookie-gated by the admin preview cookie.

export const runtime = "nodejs";
export const maxDuration = 30;

function extractAsin(url: string): string | undefined {
  const m = url.match(/\/(?:dp|gp\/product|product)\/([A-Z0-9]{10})/i);
  return m?.[1];
}

function pick(html: string, re: RegExp): string | undefined {
  return html.match(re)?.[1];
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

type ScrapeResult = {
  title?: string;
  image?: string;
  description?: string;
  priceDisplay?: string;
};

function parseAmazonHtml(html: string): ScrapeResult {
  if (/page not found/i.test(html.slice(0, 4000)) && !/productTitle/.test(html)) {
    return {};
  }

  let title =
    pick(html, /<span[^>]+id=["']productTitle["'][^>]*>([^<]+)/i) ??
    pick(html, /<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i) ??
    pick(html, /<meta\s+name=["']title["']\s+content=["']([^"']+)["']/i) ??
    "";
  title = decode(title).replace(/^Amazon\.com\s*:\s*/i, "").trim();

  const image =
    pick(html, /"hiRes":"([^"]+)"/) ??
    pick(html, /"large":"([^"]+)"/) ??
    pick(html, /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i) ??
    "";

  const description =
    pick(html, /<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i) ??
    pick(html, /<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i) ??
    "";

  const priceWhole =
    pick(html, /class=["']a-price-whole["']>([0-9,]+)/) ??
    pick(html, /class=["']a-offscreen["']>\$([0-9,.]+)</);
  const priceFraction = pick(html, /class=["']a-price-fraction["']>(\d+)</);
  const priceCurrency = pick(html, /class=["']a-price-symbol["']>([^<]+)</) ?? "$";
  let priceDisplay: string | undefined;
  if (priceWhole) {
    priceDisplay = priceFraction
      ? `${priceCurrency}${priceWhole.replace(/,/g, "")}.${priceFraction}`
      : `${priceCurrency}${priceWhole.replace(/,/g, "")}`;
  }

  return {
    title,
    image: image ? decode(image) : "",
    description: decode(description),
    priceDisplay,
  };
}

async function scraperApiFetch(url: string, key: string): Promise<ScrapeResult | null> {
  const endpoint = `https://api.scraperapi.com/?api_key=${encodeURIComponent(key)}&url=${encodeURIComponent(url)}&country_code=us`;
  const res = await fetch(endpoint, { cache: "no-store" });
  if (!res.ok) return null;
  const html = await res.text();
  const parsed = parseAmazonHtml(html);
  return parsed.title || parsed.image ? parsed : null;
}

type MicrolinkData = {
  status?: string;
  data?: {
    title?: string;
    description?: string;
    image?: unknown;
  };
};

function extractImage(img: unknown): string {
  if (!img) return "";
  if (typeof img === "string") return img;
  if (typeof img === "object" && img !== null && "url" in img) {
    const u = (img as { url?: unknown }).url;
    return typeof u === "string" ? u : "";
  }
  return "";
}

async function microlinkFetch(url: string): Promise<ScrapeResult | null> {
  const res = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  const body = (await res.json()) as MicrolinkData;
  if (body.status !== "success" || !body.data) return null;

  const title = (body.data.title ?? "").trim();
  if (/page not found/i.test(title)) return null;

  return {
    title: title.replace(/^Amazon\.com\s*:\s*/i, "").replace(/\s*:\s*Amazon\.com$/i, ""),
    image: extractImage(body.data.image),
    description: (body.data.description ?? "").trim(),
  };
}

export async function GET(request: Request) {
  const secret = process.env.PREVIEW_SECRET;
  if (!secret) return NextResponse.json({ error: "admin disabled" }, { status: 404 });
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
  const scraperKey = process.env.SCRAPERAPI_KEY;

  let data: ScrapeResult | null = null;
  let source = "";

  if (scraperKey) {
    try {
      data = await scraperApiFetch(cleanUrl, scraperKey);
      if (data) source = "scraperapi";
    } catch {
      /* try next */
    }
  }

  if (!data) {
    try {
      data = await microlinkFetch(cleanUrl);
      if (data) source = "microlink";
    } catch {
      /* fall through */
    }
  }

  if (!data) {
    return NextResponse.json(
      {
        error: scraperKey
          ? "Both scrapers returned empty. Amazon may be blocking — fill fields manually."
          : "Amazon blocks datacenter scraping. Set SCRAPERAPI_KEY in env for reliable auto-fill (free 5,000/mo at scraperapi.com).",
        asin,
        amazonUrl: cleanUrl,
      },
      { status: 200 },
    );
  }

  return NextResponse.json({
    ok: true,
    source,
    asin,
    amazonUrl: cleanUrl,
    title: data.title ?? "",
    image: data.image ?? "",
    description: data.description ?? "",
    priceDisplay: data.priceDisplay,
  });
}
