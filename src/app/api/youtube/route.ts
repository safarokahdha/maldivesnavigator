import { NextResponse } from "next/server";

// Live YouTube search for Maldives travel videos.
// Requires env var YOUTUBE_API_KEY (YouTube Data API v3).
// Usage: /api/youtube?q=maldives+maafushi&max=6
//
// This endpoint returns real, fresh content when configured. Without a key
// it falls back to a clear error so the homepage's curated seed stays the source
// of truth.

export const runtime = "nodejs";
export const revalidate = 3600;

type YouTubeItem = {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: { high?: { url: string }; medium?: { url: string } };
  };
};

export async function GET(request: Request) {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) {
    return NextResponse.json(
      {
        error: "YOUTUBE_API_KEY not set. Add it to .env.local to enable live creator pulls.",
      },
      { status: 501 },
    );
  }

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "maldives travel";
  const max = Math.min(Number(searchParams.get("max") ?? "8"), 25);

  const url = new URL("https://www.googleapis.com/youtube/v3/search");
  url.searchParams.set("part", "snippet");
  url.searchParams.set("q", q);
  url.searchParams.set("type", "video");
  url.searchParams.set("maxResults", String(max));
  url.searchParams.set("relevanceLanguage", "en");
  url.searchParams.set("safeSearch", "moderate");
  url.searchParams.set("key", key);

  const res = await fetch(url, { next: { revalidate } });
  if (!res.ok) {
    return NextResponse.json({ error: "YouTube API error" }, { status: res.status });
  }
  const data = (await res.json()) as { items: YouTubeItem[] };

  const videos = (data.items ?? []).map((item) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    channelTitle: item.snippet.channelTitle,
    publishedAt: item.snippet.publishedAt,
    thumbnail:
      item.snippet.thumbnails.high?.url ?? item.snippet.thumbnails.medium?.url ?? null,
    url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
  }));

  return NextResponse.json({ videos });
}
