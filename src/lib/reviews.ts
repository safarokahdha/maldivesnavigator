import "server-only";
import type { ReviewItem } from "@/data/stayDetails";

export type ReviewSummary = {
  rating: number | null; // 1–5 average
  count: number;
  reviews: ReviewItem[];
  source: "google" | "manual";
};

const PLACES_KEY = process.env.GOOGLE_PLACES_API_KEY;

/**
 * Fetch place details + reviews from Google Places API (New).
 * Returns null if no key configured or fetch fails.
 *
 * Caches per-request via fetch cache + Next 24h revalidate, so each Place
 * ID is only hit once per day across the whole site.
 */
export async function fetchGoogleReviews(
  placeId: string,
): Promise<ReviewSummary | null> {
  if (!PLACES_KEY) return null;
  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}` +
        `?fields=rating,userRatingCount,reviews`,
      {
        headers: {
          "X-Goog-Api-Key": PLACES_KEY,
          "X-Goog-FieldMask":
            "rating,userRatingCount,reviews.rating,reviews.text,reviews.authorAttribution,reviews.publishTime",
        },
        next: { revalidate: 60 * 60 * 24 },
      },
    );
    if (!res.ok) {
      console.warn("[reviews] Places API error:", res.status, await res.text());
      return null;
    }
    const data = await res.json();
    const reviews: ReviewItem[] = (data.reviews ?? []).map((r: {
      rating?: number;
      text?: { text?: string };
      authorAttribution?: { displayName?: string };
      publishTime?: string;
    }) => ({
      rating: r.rating ?? 0,
      text: r.text?.text ?? "",
      author: r.authorAttribution?.displayName,
      source: "google" as const,
      date: r.publishTime?.slice(0, 10),
    }));
    return {
      rating: data.rating ?? null,
      count: data.userRatingCount ?? 0,
      reviews,
      source: "google",
    };
  } catch (e) {
    console.warn("[reviews] Places fetch failed:", e);
    return null;
  }
}

/**
 * Resolve reviews for a stay — Google Places if configured + place ID set,
 * else manual reviews from stayDetails, else null (section hidden).
 */
export async function resolveReviews(detail: {
  googlePlaceId?: string;
  reviews?: ReviewItem[];
}): Promise<ReviewSummary | null> {
  if (detail.googlePlaceId) {
    const live = await fetchGoogleReviews(detail.googlePlaceId);
    if (live && live.reviews.length > 0) return live;
  }
  if (detail.reviews && detail.reviews.length > 0) {
    const sum = detail.reviews.reduce((s, r) => s + r.rating, 0);
    return {
      rating: sum / detail.reviews.length,
      count: detail.reviews.length,
      reviews: detail.reviews,
      source: "manual",
    };
  }
  return null;
}
