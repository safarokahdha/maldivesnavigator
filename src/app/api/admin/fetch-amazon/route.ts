import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// GET /api/admin/fetch-amazon?url=<amazon-url>
// Uses microlink.io (free tier, 50 req/day) to scrape the product page.
// Amazon blocks direct requests from datacenter IPs, so we delegate.
// Cookie-gated by the admin preview cookie.

export const runtime = "nodejs";
export const maxDuration = 30;

function extractAsin(url: string): string | undefined {
  const m = url.match(/\/(?:dp|gp\/product|product)\/([A-Z0-9]{10})/i);
  return m?.[1];
}

type MicrolinkData = {
  status?: string;
  data?: {
    title?: string;
    description?: string;
    image?: { url?: string } | string;
    url?: string;
    publisher?: string;
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
    const microlinkUrl = `https://api.microlink.io/?url=${encodeURIComponent(cleanUrl)}`;
    const res = await fetch(microlinkUrl, {
      headers: { "User-Agent": "MaldivesNavigator/1.0 (admin-autofill)" },
      cache: "no-store",
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json(
        {
          error: `Scraper returned ${res.status}. Fill the fields manually.`,
          debug: errText.slice(0, 200),
          asin,
          amazonUrl: cleanUrl,
        },
        { status: 200 },
      );
    }

    const body = (await res.json()) as MicrolinkData;
    if (body.status !== "success" || !body.data) {
      return NextResponse.json(
        {
          error: "Scraper couldn't read the page. Fill the fields manually.",
          asin,
          amazonUrl: cleanUrl,
        },
        { status: 200 },
      );
    }

    let title = (body.data.title ?? "").trim();
    title = title.replace(/^Amazon\.com\s*:\s*/i, "").replace(/\s*:\s*Amazon\.com$/i, "");

    const description = (body.data.description ?? "").trim();
    const image = extractImage(body.data.image);

    return NextResponse.json({
      ok: true,
      asin,
      amazonUrl: cleanUrl,
      title,
      image,
      description,
      priceDisplay: undefined, // microlink doesn't reliably return price; enter manually
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
