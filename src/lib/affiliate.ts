// Stay22 dynamic-link helper.
//
// AID: `safarey` per brief §10.
//
// As of build time, Stay22's public docs do NOT publish the exact deep-link
// URL pattern (the "Allez" docs require a hub.stay22.com login). Stay22's
// supported suppliers are Booking.com, Vrbo, Expedia, Hotels.com, and
// Tripadvisor — Agoda is NOT in their public list.
//
// What this file does for v1:
// 1. `stay22BookingLink(url)` — wraps a Booking.com URL through Stay22's
//    Allez endpoint using the documented public pattern (`/allez/booking`
//    with `aid` + `link` params). If the actual format differs once the
//    owner verifies via the Stay22 hub, swap `STAY22_BASE` here only.
// 2. `agodaLink(url)` — passthrough. Agoda is not Stay22-routable; the
//    link is rendered as-is (no commission). Owner can add a native Agoda
//    affiliate ID later by editing this function.
//
// TODO before public launch:
//   - Verify Booking.com URL format from hub.stay22.com (Allez docs).
//   - Decide on a path for Agoda — either direct link, or set up Agoda's
//     own partner program.

export const STAY22_AID = "safarey";

const STAY22_BASE = "https://www.stay22.com/allez/booking";

/**
 * Wrap a Booking.com URL with the Stay22 affiliate redirect.
 * Returns the original URL if input is empty.
 */
export function stay22BookingLink(propertyUrl: string): string {
  if (!propertyUrl) return propertyUrl;
  const encoded = encodeURIComponent(propertyUrl);
  const url = `${STAY22_BASE}?aid=${STAY22_AID}&link=${encoded}`;
  // Dev-mode runtime warning if AID is somehow missing — caught early in CI.
  if (process.env.NODE_ENV !== "production" && !url.includes(`aid=${STAY22_AID}`)) {
    console.warn(
      `[affiliate] Stay22 link missing AID for: ${propertyUrl}`,
    );
  }
  return url;
}

/**
 * Pass-through for Agoda — not Stay22-routable. Owner can swap to a native
 * Agoda affiliate format here once enrolled in their partner program.
 */
export function agodaLink(propertyUrl: string): string {
  return propertyUrl;
}

/**
 * Backward-compat shim used by existing `/stays/[slug]/page.tsx`. Routes
 * Booking.com through Stay22; everything else passes through.
 */
export function stay22Link(
  propertyUrl: string,
  provider: "booking" | "agoda" = "booking"
): string {
  if (!propertyUrl) return propertyUrl;
  if (provider === "booking") return stay22BookingLink(propertyUrl);
  return agodaLink(propertyUrl);
}

export function maybeStay22Link(
  propertyUrl: string | null | undefined,
  provider: "booking" | "agoda" = "booking"
): string | null {
  if (!propertyUrl) return null;
  return stay22Link(propertyUrl, provider);
}
