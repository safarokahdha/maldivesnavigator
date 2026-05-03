// Stay detail records — long-form schema per brief §6.
//
// Keyed by Stay.slug. Records can be partial — page falls back to base
// Stay record when a field is missing.
//
// Editorial-take paragraphs are placeholder (factual descriptions) per
// brief §7. Owner upgrades to opinion-backed paragraphs post-launch.

import type { Tier } from "./stays";

export type StayType = "guesthouse" | "resort" | "dive-lodge" | "liveaboard";

export type Inclusion = "RO" | "BB" | "HB" | "FB" | "AI";

export type GuestType = "couples" | "families" | "backpackers" | "divers" | "surfers" | "honeymooners" | "mixed";

export type ListingTier = "free" | "verified" | "featured" | "sponsor";

export type StayFeatures = {
  waterVillas?: boolean;
  houseReef?: boolean;
  alcohol?: boolean;
  childFriendly?: boolean;
  diveCenter?: boolean;
  surfAccess?: boolean;
  allInclusive?: boolean;
};

export type StayTransfer = {
  type: "speedboat" | "ferry" | "domestic-flight" | "seaplane" | "domestic-flight+speedboat";
  cost: number; // USD, one-way
  time: string; // human-readable
};

export type StayBooking = {
  bookingDotCom?: string;
  agoda?: string;
  expedia?: string;
  official?: string;
  /** Booking.com guest review score, out of 10. */
  bookingRating?: number;
  bookingReviewCount?: number;
  /** Agoda guest review score, out of 10. */
  agodaRating?: number;
  agodaReviewCount?: number;
};

export type ReviewItem = {
  author?: string;
  rating: number; // 1–5
  text: string;
  source: "google" | "booking" | "agoda" | "tripadvisor" | "owner";
  date?: string; // ISO yyyy-mm-dd
  url?: string;
};

export type StayDetail = {
  type: StayType;
  priceLow: number;
  priceHigh: number;
  currency: "USD";
  rooms?: number;
  features?: StayFeatures;
  transfer?: StayTransfer;
  booking?: StayBooking;
  inclusion?: Inclusion;
  guestType?: GuestType;
  editorialTake: string; // 200-word paragraph (placeholder allowed)
  isPlaceholder?: boolean; // true → render "Placeholder" badge
  gallery?: string[];
  /** Google Places ID — when set + GOOGLE_PLACES_API_KEY env present, the
   *  Reviews section fetches live ratings + reviews. */
  googlePlaceId?: string;
  /** Manual review entries (used when Places API not configured). */
  reviews?: ReviewItem[];
  /** Mark a single stay per island as the editor's recommendation. */
  editorsPick?: boolean;
  /** First-person Mohamed-voice endorsement next to the editor's pick badge. */
  editorsPickNote?: string;
  verified: boolean;
  verifiedDate?: string; // ISO
  verifiedBy?: string;
  listingTier: ListingTier;
  foundingMember?: boolean;
};

// Empty prefix so placeholder editorial reads as a clean blurb, not a
// "coming soon" note. The `isPlaceholder` flag controls whether the
// editorial section header is rendered at all (see stay detail page).
const PLACEHOLDER_PREFIX = "";

// Convenience builder for a free-tier, unverified placeholder record.
function placeholder(d: Omit<StayDetail, "verified" | "listingTier" | "isPlaceholder">): StayDetail {
  return {
    ...d,
    verified: false,
    listingTier: "free",
    isPlaceholder: true,
  };
}

export const stayDetails: Record<string, StayDetail> = {
  // ============================================================
  // PHASE 1 — 20 backpacker-tier stays per brief §7
  // ============================================================

  // ─── Maafushi (5) ─────────────────────────────────────────────
  "arena-beach-hotel-maafushi": placeholder({
    type: "guesthouse",
    priceLow: 60,
    priceHigh: 110,
    currency: "USD",
    rooms: 35,
    features: { childFriendly: true, diveCenter: true, surfAccess: false },
    transfer: { type: "speedboat", cost: 30, time: "30 min" },
    booking: {
      bookingDotCom: "https://www.booking.com/searchresults.html?ss=Arena+Beach+Hotel+Maafushi",
      agoda: "https://www.agoda.com/search?q=Arena+Beach+Hotel+Maafushi",
    },
    inclusion: "BB",
    guestType: "backpackers",
    editorialTake:
      "Arena Beach Hotel is the closest thing Maafushi has to a small resort — 35 rooms across two buildings, a rooftop restaurant with proper views, an in-house excursion desk that handles whale-shark, sandbank, dolphin, and dive trips. Beachfront-side rooms open onto bikini beach. Best for guests who want one front desk to book the whole week through. Skip it for true backpacker prices; Arena sits at the upper end of guesthouse pricing on the island.",
    gallery: [
      "/properties/maafushi/arena-beach-hotel/248869299.jpg",
      "/properties/maafushi/arena-beach-hotel/248978924.jpg",
      "/properties/maafushi/arena-beach-hotel/248979054.jpg",
      "/properties/maafushi/arena-beach-hotel/248979155.jpg",
      "/properties/maafushi/arena-beach-hotel/248979330.jpg",
      "/properties/maafushi/arena-beach-hotel/248979513.jpg",
      "/properties/maafushi/arena-beach-hotel/249039969.jpg",
      "/properties/maafushi/arena-beach-hotel/249057629.jpg",
      "/properties/maafushi/arena-beach-hotel/251513635.jpg",
      "/properties/maafushi/arena-beach-hotel/354212911.jpg",
      "/properties/maafushi/arena-beach-hotel/354212923.jpg",
      "/properties/maafushi/arena-beach-hotel/354213430.jpg",
      "/properties/maafushi/arena-beach-hotel/354217772.jpg",
      "/properties/maafushi/arena-beach-hotel/354439500.jpg",
      "/properties/maafushi/arena-beach-hotel/354439517.jpg",
      "/properties/maafushi/arena-beach-hotel/354439546.jpg",
      "/properties/maafushi/arena-beach-hotel/486276792.jpg",
      "/properties/maafushi/arena-beach-hotel/486277952.jpg",
      "/properties/maafushi/arena-beach-hotel/486279909.jpg",
      "/properties/maafushi/arena-beach-hotel/523570084.jpg",
      "/properties/maafushi/arena-beach-hotel/751513851.jpg",
      "/properties/maafushi/arena-beach-hotel/751513879.jpg",
      "/properties/maafushi/arena-beach-hotel/86313535.jpg"
    ],
  }),

  "kaani-beach-hotel-maafushi": placeholder({
    type: "guesthouse",
    priceLow: 70,
    priceHigh: 130,
    currency: "USD",
    rooms: 24,
    features: { childFriendly: true, diveCenter: true },
    transfer: { type: "speedboat", cost: 30, time: "30 min" },
    booking: {
      bookingDotCom: "https://www.booking.com/searchresults.html?ss=Kaani+Beach+Hotel+Maafushi",
      agoda: "https://www.agoda.com/search?q=Kaani+Beach+Hotel+Maafushi",
    },
    inclusion: "BB",
    guestType: "backpackers",
    editorialTake:
      "Kaani Beach Hotel is the bikini-beach-side property in the Kaani family — 24 rooms, a pool deck overlooking the lagoon, and access to the sister Kaani Village & Spa one block away (which has its own pool and spa). Breakfast included. The location is the standout: stepping from the room to the bikini beach is a 30-second walk, which is unusual on Maafushi where most guesthouses sit a block or two back. Best for guests who want pool-and-beach without paying resort prices. Skip it for true backpacker rates.",
    gallery: [
      "/properties/maafushi/kaani-beach-hotel/13497650.jpg",
      "/properties/maafushi/kaani-beach-hotel/13498655.jpg",
      "/properties/maafushi/kaani-beach-hotel/13498658.jpg",
      "/properties/maafushi/kaani-beach-hotel/13648418.jpg",
      "/properties/maafushi/kaani-beach-hotel/13648446.jpg",
      "/properties/maafushi/kaani-beach-hotel/27441223.jpg",
      "/properties/maafushi/kaani-beach-hotel/27661822.jpg",
      "/properties/maafushi/kaani-beach-hotel/27662498.jpg",
      "/properties/maafushi/kaani-beach-hotel/33191525.jpg",
      "/properties/maafushi/kaani-beach-hotel/36667828.jpg",
      "/properties/maafushi/kaani-beach-hotel/46500019.jpg",
      "/properties/maafushi/kaani-beach-hotel/749645528.jpg"
    ],
  }),

  "triton-beach-hotel-spa-maafushi": placeholder({
    type: "guesthouse",
    priceLow: 75,
    priceHigh: 140,
    currency: "USD",
    rooms: 20,
    features: { childFriendly: true, diveCenter: true },
    transfer: { type: "speedboat", cost: 30, time: "30 min" },
    booking: {
      bookingDotCom: "https://www.booking.com/searchresults.html?ss=Triton+Beach+Hotel+Maafushi",
      agoda: "https://www.agoda.com/search?q=Triton+Beach+Hotel+Maafushi",
    },
    inclusion: "BB",
    guestType: "backpackers",
    editorialTake:
      "Triton Beach Hotel & Spa is the most resort-feeling guesthouse on Maafushi — 20 rooms, a small spa, a pool, and a rooftop bar that runs proper sunset hours. Half-board pricing is competitive with the AI deals you'd find at a low-tier resort, and you save the speedboat fee. Best for travellers stepping up from a pure budget guesthouse without committing to mid-tier resort prices. Skip it for true low-budget; Triton sits at the top of Maafushi's guesthouse range.",
    gallery: [
      "/properties/maafushi/triton-beach-hotel-spa/131576303.jpg",
      "/properties/maafushi/triton-beach-hotel-spa/131577353.jpg",
      "/properties/maafushi/triton-beach-hotel-spa/131578097.jpg",
      "/properties/maafushi/triton-beach-hotel-spa/131752606.jpg",
      "/properties/maafushi/triton-beach-hotel-spa/165573799.jpg",
      "/properties/maafushi/triton-beach-hotel-spa/165573802.jpg",
      "/properties/maafushi/triton-beach-hotel-spa/165573950.jpg",
      "/properties/maafushi/triton-beach-hotel-spa/168381014.jpg",
      "/properties/maafushi/triton-beach-hotel-spa/195771221.jpg",
      "/properties/maafushi/triton-beach-hotel-spa/534051327.jpg",
      "/properties/maafushi/triton-beach-hotel-spa/95644280.jpg",
      "/properties/maafushi/triton-beach-hotel-spa/95644297.jpg",
      "/properties/maafushi/triton-beach-hotel-spa/95644316.jpg",
      "/properties/maafushi/triton-beach-hotel-spa/95644346.jpg",
      "/properties/maafushi/triton-beach-hotel-spa/95644367.jpg",
      "/properties/maafushi/triton-beach-hotel-spa/95644432.jpg",
      "/properties/maafushi/triton-beach-hotel-spa/95644484.jpg"
    ],
  }),

  "crystal-sands": placeholder({
    type: "guesthouse",
    priceLow: 85,
    priceHigh: 160,
    currency: "USD",
    rooms: 24,
    features: { childFriendly: true, diveCenter: true },
    transfer: { type: "speedboat", cost: 30, time: "30 min" },
    booking: {
      bookingDotCom: "https://www.booking.com/searchresults.html?ss=Crystal+Sands+Maafushi",
      agoda: "https://www.agoda.com/search?q=Crystal+Sands+Maafushi",
    },
    inclusion: "BB",
    guestType: "backpackers",
    editorialTake:
      "Crystal Sands sits on Maafushi's bikini-beach side with rooms that step almost directly onto the sand — one of the few guesthouses on the island that lets you wake up and snorkel before breakfast. 24 rooms, generous breakfast buffet, in-house excursion desk for whale-shark and sandbank trips, and a small dive operation. Best for first-time Maafushi guests who want beachfront without paying mid-tier resort rates. Skip it if you want a pool deck or a spa; Crystal Sands is more guesthouse than hotel.",
    gallery: [
      "/properties/maafushi/crystal-sands/30765474.jpg",
      "/properties/maafushi/crystal-sands/33258595.jpg",
      "/properties/maafushi/crystal-sands/33258598.jpg",
      "/properties/maafushi/crystal-sands/33409116.jpg",
      "/properties/maafushi/crystal-sands/36097304.jpg",
      "/properties/maafushi/crystal-sands/36097335.jpg",
      "/properties/maafushi/crystal-sands/36097345.jpg",
      "/properties/maafushi/crystal-sands/36097353.jpg",
      "/properties/maafushi/crystal-sands/36097355.jpg",
      "/properties/maafushi/crystal-sands/36097387.jpg",
      "/properties/maafushi/crystal-sands/36097389.jpg",
      "/properties/maafushi/crystal-sands/36097393.jpg",
      "/properties/maafushi/crystal-sands/36097395.jpg",
      "/properties/maafushi/crystal-sands/36097397.jpg",
      "/properties/maafushi/crystal-sands/36099298.jpg",
      "/properties/maafushi/crystal-sands/36100512.jpg",
      "/properties/maafushi/crystal-sands/36100579.jpg",
      "/properties/maafushi/crystal-sands/36100599.jpg",
      "/properties/maafushi/crystal-sands/36100600.jpg",
      "/properties/maafushi/crystal-sands/36100611.jpg",
      "/properties/maafushi/crystal-sands/414316208.jpg",
      "/properties/maafushi/crystal-sands/414317979.jpg",
      "/properties/maafushi/crystal-sands/415589206.jpg",
      "/properties/maafushi/crystal-sands/415589207.jpg",
      "/properties/maafushi/crystal-sands/415589212.jpg",
      "/properties/maafushi/crystal-sands/415589226.jpg",
      "/properties/maafushi/crystal-sands/416601517.jpg",
      "/properties/maafushi/crystal-sands/416601520.jpg",
      "/properties/maafushi/crystal-sands/416601523.jpg",
      "/properties/maafushi/crystal-sands/416601530.jpg",
      "/properties/maafushi/crystal-sands/455587720.jpg",
      "/properties/maafushi/crystal-sands/455589119.jpg"
    ],
  }),

  "kaani-village": placeholder({
    type: "guesthouse",
    priceLow: 75,
    priceHigh: 145,
    currency: "USD",
    rooms: 30,
    features: { childFriendly: true, diveCenter: true },
    transfer: { type: "speedboat", cost: 30, time: "30 min" },
    booking: {
      bookingDotCom: "https://www.booking.com/searchresults.html?ss=Kaani+Village+Maafushi",
      agoda: "https://www.agoda.com/search?q=Kaani+Village+Maafushi",
    },
    inclusion: "BB",
    guestType: "backpackers",
    editorsPick: true,
    editorsPickNote: "If you're picking one place on Maafushi and you want a guesthouse that feels like a small resort — pool, spa, proper kitchen — this is what I'd book. The Kaani family has been running guesthouses on this island for years. Their food is the best on the local-island circuit, and their excursion partners are the ones I send my own friends through. — Mohamed",
    editorialTake:
      "Kaani Village & Spa is the most resort-feeling guesthouse on Maafushi — pool deck, full spa, in-house dive school, and a kitchen that runs proper half-board dinners rather than a single-line buffet. 30 rooms across two buildings, sister property Kaani Beach Hotel a block over for the bikini-beach access. Best for couples and small families who want guesthouse pricing with spa-and-pool extras. Skip it for true backpacker rates; Kaani Village sits at the top of Maafushi's guesthouse range.",
    gallery: [
      "/properties/maafushi/kaani-village/26279547.jpg",
      "/properties/maafushi/kaani-village/26281202.jpg",
      "/properties/maafushi/kaani-village/26281333.jpg",
      "/properties/maafushi/kaani-village/26282492.jpg",
      "/properties/maafushi/kaani-village/32064063.jpg",
      "/properties/maafushi/kaani-village/32111515.jpg",
      "/properties/maafushi/kaani-village/32111647.jpg",
      "/properties/maafushi/kaani-village/33376304.jpg",
      "/properties/maafushi/kaani-village/33376315.jpg",
      "/properties/maafushi/kaani-village/33824379.jpg",
      "/properties/maafushi/kaani-village/36668088.jpg",
      "/properties/maafushi/kaani-village/38539321.jpg",
      "/properties/maafushi/kaani-village/38539695.jpg",
      "/properties/maafushi/kaani-village/38540318.jpg",
      "/properties/maafushi/kaani-village/38540319.jpg",
      "/properties/maafushi/kaani-village/38540320.jpg",
      "/properties/maafushi/kaani-village/38589204.jpg",
      "/properties/maafushi/kaani-village/481656402.jpg",
      "/properties/maafushi/kaani-village/481656417.jpg",
      "/properties/maafushi/kaani-village/490960545.jpg",
      "/properties/maafushi/kaani-village/681967325.jpg",
      "/properties/maafushi/kaani-village/751685928.jpg",
      "/properties/maafushi/kaani-village/751692808.jpg",
      "/properties/maafushi/kaani-village/77214271.jpg",
      "/properties/maafushi/kaani-village/77216058.jpg",
      "/properties/maafushi/kaani-village/77216079.jpg",
      "/properties/maafushi/kaani-village/77216336.jpg"
    ],
  }),

  // ─── Thulusdhoo (4) ──────────────────────────────────────────
  "thulusdhoo-inn": placeholder({
    type: "guesthouse",
    priceLow: 50,
    priceHigh: 90,
    currency: "USD",
    rooms: 10,
    features: { surfAccess: true },
    transfer: { type: "speedboat", cost: 30, time: "30 min" },
    booking: {
      bookingDotCom: "https://www.booking.com/searchresults.html?ss=Thulusdhoo+Inn",
      agoda: "https://www.agoda.com/search?q=Thulusdhoo+Inn",
    },
    inclusion: "BB",
    guestType: "surfers",
    editorialTake:
      "Thulusdhoo Inn is a 10-room family-run guesthouse a few hundred metres from the Coke's break paddle-out. Surf-package rates with daily boat trips to Chickens are the value play. The rooms are simple — fan-and-AC, hot shower, balcony — and the kitchen runs basic Maldivian breakfasts. Best for surfers on a 7+ night trip who want predictable lodging and don't need a hotel feel. Skip it if you want a pool or a bar.",
  }),

  "season-paradise-thulusdhoo": placeholder({
    type: "guesthouse",
    priceLow: 55,
    priceHigh: 100,
    currency: "USD",
    rooms: 12,
    features: { surfAccess: true, diveCenter: false },
    transfer: { type: "speedboat", cost: 30, time: "30 min" },
    booking: {
      bookingDotCom: "https://www.booking.com/searchresults.html?ss=Season+Paradise+Thulusdhoo",
      agoda: "https://www.agoda.com/search?q=Season+Paradise+Thulusdhoo",
    },
    inclusion: "BB",
    guestType: "surfers",
    editorialTake:
      "Season Paradise is one of the longer-running surf guesthouses on Thulusdhoo — 12 rooms, a relaxed shared deck, and a daily boat-trip slot to Chickens that you can book on arrival rather than as part of a fixed package. Owner-managed, English-speaking, dependable excursion partners. Best for surfers and budget travellers who want flexibility. Skip it if you want polished hotel service.",
  }),

  "cokes-beach-maldives-thulusdhoo": placeholder({
    type: "guesthouse",
    priceLow: 65,
    priceHigh: 120,
    currency: "USD",
    rooms: 14,
    features: { surfAccess: true },
    transfer: { type: "speedboat", cost: 30, time: "30 min" },
    booking: {
      bookingDotCom: "https://www.booking.com/searchresults.html?ss=Cokes+Beach+Maldives",
      agoda: "https://www.agoda.com/search?q=Cokes+Beach+Maldives",
    },
    inclusion: "BB",
    guestType: "surfers",
    editorialTake:
      "Coke's Beach Maldives is closest to the Coke's break paddle-out — you can walk to the lineup with a board under your arm. 14 rooms across a single building, communal evening meals included on most rates, surf-school partnership rates. Best for travelling surfers who plan to spend most of their day in the water. Skip it for non-surfers; the place runs on a session-shaped schedule.",
  }),

  // ─── Dhigurah (3) ────────────────────────────────────────────
  "cyrus-beach-inn-dhigurah": placeholder({
    type: "guesthouse",
    priceLow: 50,
    priceHigh: 95,
    currency: "USD",
    rooms: 10,
    features: { childFriendly: true },
    transfer: { type: "speedboat", cost: 75, time: "1.5 hr" },
    booking: {
      bookingDotCom: "https://www.booking.com/searchresults.html?ss=Cyrus+Beach+Inn+Dhigurah",
      agoda: "https://www.agoda.com/search?q=Cyrus+Beach+Inn+Dhigurah",
    },
    inclusion: "BB",
    guestType: "backpackers",
    editorialTake:
      "Cyrus Beach Inn is a 10-room family-run guesthouse on the village side of Dhigurah, a few minutes' walk from the bikini beach. Daily whale-shark snorkel trips are bookable at reception. The rooms are simple, the breakfast is local-style (tuna and roshi rather than continental), and the owners speak English well. Best for travellers who want Dhigurah's wildlife at the cheapest end of the price band. Skip it if you want a pool or restaurant on site.",
  }),

  "aveyla-manta-village-dhigurah": placeholder({
    type: "guesthouse",
    priceLow: 70,
    priceHigh: 140,
    currency: "USD",
    rooms: 16,
    features: { diveCenter: true, houseReef: true },
    transfer: { type: "speedboat", cost: 75, time: "1.5 hr" },
    booking: {
      bookingDotCom: "https://www.booking.com/searchresults.html?ss=Aveyla+Manta+Village",
      agoda: "https://www.agoda.com/search?q=Aveyla+Manta+Village",
    },
    inclusion: "HB",
    guestType: "divers",
    editorialTake:
      "Aveyla Manta Village is one of Dhigurah's better dive-focused guesthouses — 16 rooms, an in-house PADI centre, and packages built around the South Ari MPA's manta cleaning stations and whale-shark channel. Half-board pricing includes a generous allocation of dives, which works out cheaper than booking ad hoc. Best for divers on a 5–7 night Dhigurah trip. Skip it if you came for the village rather than the dives.",
  }),

  "dhigurah-retreat": placeholder({
    type: "guesthouse",
    priceLow: 55,
    priceHigh: 100,
    currency: "USD",
    rooms: 12,
    features: { childFriendly: true },
    transfer: { type: "speedboat", cost: 75, time: "1.5 hr" },
    booking: {
      bookingDotCom: "https://www.booking.com/searchresults.html?ss=Dhigurah+Retreat",
      agoda: "https://www.agoda.com/search?q=Dhigurah+Retreat",
    },
    inclusion: "BB",
    guestType: "backpackers",
    editorialTake:
      "Dhigurah Retreat is a quieter 12-room guesthouse with direct access to a stretch of beach on the lagoon side. Breakfast included, friendly excursion-booking team, walking distance to the bikini beach at the southern tip of the island. Best for travellers who want Dhigurah's quiet without paying dive-lodge rates. Skip it if you want an in-house dive school.",
  }),

  // ─── Fulidhoo (3) ────────────────────────────────────────────
  "fulidhoo-inn-vaavu": placeholder({
    type: "guesthouse",
    priceLow: 45,
    priceHigh: 85,
    currency: "USD",
    rooms: 8,
    features: { childFriendly: false },
    transfer: { type: "speedboat", cost: 40, time: "1 hr" },
    booking: {
      bookingDotCom: "https://www.booking.com/searchresults.html?ss=Fulidhoo+Inn",
      agoda: "https://www.agoda.com/search?q=Fulidhoo+Inn",
    },
    inclusion: "BB",
    guestType: "backpackers",
    editorialTake:
      "Fulidhoo Inn is one of the original guesthouses on tiny Fulidhoo and probably the most-recommended by repeat visitors — 8 rooms, family-run, central to the village's three-street grid. Easy walk to the stingray-feeding beach where rays gather every evening at sunset for the local fishermen's catch scraps. Boduberu drum nights happen on the beach almost weekly. Best for solo travellers and quiet couples who want a slow week. Skip it if you want any kind of pool, bar or evening programme.",
  }),

  "fulidhoo-sunrise-beach": placeholder({
    type: "guesthouse",
    priceLow: 50,
    priceHigh: 90,
    currency: "USD",
    rooms: 10,
    transfer: { type: "speedboat", cost: 40, time: "1 hr" },
    booking: {
      bookingDotCom: "https://www.booking.com/searchresults.html?ss=Fulidhoo+Sunrise+Beach",
      agoda: "https://www.agoda.com/search?q=Fulidhoo+Sunrise+Beach",
    },
    inclusion: "BB",
    guestType: "backpackers",
    editorialTake:
      "Fulidhoo Sunrise Beach faces the eastern bikini beach and gets the first light — early breakfast on a deck overlooking the lagoon is the property's quiet selling point. 10 rooms, fan-and-AC, simple half-board option. Easy walk to the dive boat that runs the famous Alimathaa nurse-shark night-snorkel. Best for travellers wanting a quiet beachfront base on a small island. Skip it if you want hotel polish.",
  }),

  "thundi-guesthouse-fulidhoo": placeholder({
    type: "guesthouse",
    priceLow: 50,
    priceHigh: 95,
    currency: "USD",
    rooms: 12,
    transfer: { type: "speedboat", cost: 40, time: "1 hr" },
    booking: {
      bookingDotCom: "https://www.booking.com/searchresults.html?ss=Thundi+Guesthouse+Fulidhoo",
      agoda: "https://www.agoda.com/search?q=Thundi+Guesthouse+Fulidhoo",
    },
    inclusion: "BB",
    guestType: "backpackers",
    editorialTake:
      "Thundi Guesthouse is a 12-room option on Fulidhoo run by a family that's been on the island for generations. Full-board packages are reliable and cheaper than booking meals out (Fulidhoo has only a handful of cafés). Owners are the right people to ask for the schedule of the Boduberu drum sessions on the beach. Best for travellers who want local insight and a slow week. Skip it for hotel-style service.",
  }),

  // ─── Other local islands (5) ─────────────────────────────────
  "white-shell-island-hotel-gulhi": placeholder({
    type: "guesthouse",
    priceLow: 50,
    priceHigh: 95,
    currency: "USD",
    rooms: 14,
    features: { childFriendly: true },
    transfer: { type: "speedboat", cost: 25, time: "25 min" },
    booking: {
      bookingDotCom: "https://www.booking.com/searchresults.html?ss=White+Shell+Island+Hotel+Gulhi",
      agoda: "https://www.agoda.com/search?q=White+Shell+Island+Hotel+Gulhi",
    },
    inclusion: "BB",
    guestType: "backpackers",
    editorialTake:
      "White Shell Island Hotel is the most-built-out guesthouse on Gulhi — 14 rooms, a small pool, breakfast included, and direct access to a lagoon that's noticeably quieter than Maafushi's despite sitting in the same South Malé Atoll waters. Excellent for snorkelling without leaving the property. Best for travellers wanting Maafushi's accessibility without the crowds. Skip it for nightlife — Gulhi runs quiet by 9pm.",
  }),

  "lucky-hiya-maldives-mathiveri": placeholder({
    type: "guesthouse",
    priceLow: 55,
    priceHigh: 100,
    currency: "USD",
    rooms: 12,
    features: { childFriendly: true },
    transfer: { type: "speedboat", cost: 70, time: "1.5 hr" },
    booking: {
      bookingDotCom: "https://www.booking.com/searchresults.html?ss=Lucky+Hiya+Maldives+Mathiveri",
      agoda: "https://www.agoda.com/search?q=Lucky+Hiya+Maldives+Mathiveri",
    },
    inclusion: "BB",
    guestType: "backpackers",
    editorialTake:
      "Lucky Hiya is a 12-room family-run guesthouse on Mathiveri — a quiet North Ari local island where the sandbank off the western tip is a 20-minute wade away at low tide. Daily manta and whale-shark trips run from the harbour. Half-board includes home-cooked Maldivian dinners that are usually better than anything you'll get on Maafushi. Best for travellers wanting a quiet, slightly-off-the-trail North Ari week. Skip it if you need restaurants and shops nearby.",
  }),

  "bliss-dhigurah": placeholder({
    type: "guesthouse",
    priceLow: 60,
    priceHigh: 110,
    currency: "USD",
    rooms: 16,
    features: { childFriendly: true },
    transfer: { type: "speedboat", cost: 75, time: "1.5 hr" },
    booking: {
      bookingDotCom: "https://www.booking.com/searchresults.html?ss=Bliss+Dhigurah",
      agoda: "https://www.agoda.com/search?q=Bliss+Dhigurah",
    },
    inclusion: "BB",
    guestType: "backpackers",
    editorialTake:
      "Bliss Dhigurah is a 16-room mid-budget option a few minutes inland from the bikini beach — quieter than the village-side properties and more comfortable for families with young children. Pool, breakfast included, in-house excursion bookings. Best for families on a 5–7 night Dhigurah trip wanting space. Skip it for hotel-style polish.",
  }),

  "ui-inn-hulhumale": placeholder({
    type: "guesthouse",
    priceLow: 40,
    priceHigh: 85,
    currency: "USD",
    rooms: 24,
    features: { childFriendly: true },
    transfer: { type: "speedboat", cost: 10, time: "Taxi or airport bus from MLE (~10–15 min)" },
    booking: {
      bookingDotCom: "https://www.booking.com/searchresults.html?ss=UI+Inn+Hulhumale",
      agoda: "https://www.agoda.com/search?q=UI+Inn+Hulhumale",
    },
    inclusion: "BB",
    guestType: "mixed",
    editorialTake:
      "UI Inn is a 24-room transit-friendly guesthouse on Hulhumalé, ~10–15 minutes by taxi or airport bus from Velana International — exactly what you want when your flight lands at midnight or you're catching a 6am domestic at the start of a longer trip. Rooms are functional rather than scenic; breakfast included. Best for first or last nights of a multi-island Maldives itinerary. Skip it for a holiday in itself; Hulhumalé is a city beach, not a destination.",
  }),
};

// ============================================================
// PHASE-1 LAUNCH LIST — mid + luxury + ultra (40 records)
// Brief §7. Editorial-take is factual placeholder; verified=false; free tier.
// ============================================================

type Resortish = {
  type: StayType;
  priceLow: number;
  priceHigh: number;
  rooms?: number;
  features?: StayFeatures;
  transfer?: StayTransfer;
  bookingName: string; // Booking.com "ss=" search term
  inclusion: Inclusion;
  guestType: GuestType;
  editorial: string;
};

function resort(d: Resortish): StayDetail {
  return placeholder({
    type: d.type,
    priceLow: d.priceLow,
    priceHigh: d.priceHigh,
    currency: "USD",
    rooms: d.rooms,
    features: d.features,
    transfer: d.transfer,
    booking: {
      bookingDotCom: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(d.bookingName)}`,
      agoda: `https://www.agoda.com/search?q=${encodeURIComponent(d.bookingName)}`,
    },
    inclusion: d.inclusion,
    guestType: d.guestType,
    editorialTake: d.editorial,
  });
}

const midLuxUltra: Record<string, StayDetail> = {
  // ── Mid-range (15) ────────────────────────────────────────
  "summer-island-maldives": resort({
    type: "resort", priceLow: 250, priceHigh: 450, rooms: 144,
    features: { houseReef: true, alcohol: true, childFriendly: true, diveCenter: true, allInclusive: false },
    transfer: { type: "speedboat", cost: 100, time: "45 min" },
    bookingName: "Summer Island Maldives",
    inclusion: "HB", guestType: "mixed",
    editorial: "Summer Island sits on Ziyaaraifushi in North Malé and has quietly built one of the more credible sustainability programmes in the mid-tier — 3D-printed coral reef installations on the house reef, glass-bottle filtered water in every villa, and a local-island-tied volunteer programme. 144 villas across beach and overwater. The reef is shallow and turtle-frequented; the dive school runs reasonable rates for the atoll. Best for couples and small families on a 5–7 night trip who want overwater living in the $300–500 range. Skip it for resort spectacle — it's quietly run rather than flashy.",
  }),
  "adaaran-select-hudhuranfushi": resort({
    type: "resort", priceLow: 280, priceHigh: 500, rooms: 215,
    features: { alcohol: true, childFriendly: true, diveCenter: true, surfAccess: true, allInclusive: true },
    transfer: { type: "speedboat", cost: 120, time: "45 min" },
    bookingName: "Adaaran Select Hudhuranfushi",
    inclusion: "AI", guestType: "surfers",
    editorial: "Adaaran Select Hudhuranfushi sits on the eastern edge of North Malé Atoll, with one significant advantage no other 4★ in the country can match: Lohi's, a punchy left-hander, breaks directly off the property's lagoon. The resort runs surf-package rates that include daily boat transfers to Sultans, Honkys and other nearby breaks. 215 villas, all-inclusive packages that genuinely cover most of what you'll order, and a no-frills feel — beach bungalows rather than overwater honeymoon villas. Best for surfers on a 7–10 night trip who want pre-paid simplicity. Skip it for honeymoons or design-led stays.",
  }),
  "reethi-beach-resort": resort({
    type: "resort", priceLow: 240, priceHigh: 480, rooms: 130,
    features: { alcohol: true, childFriendly: true, diveCenter: true, allInclusive: false },
    transfer: { type: "domestic-flight+speedboat", cost: 250, time: "30 min flight + 20 min boat" },
    bookingName: "Reethi Beach Resort Maldives",
    inclusion: "HB", guestType: "families",
    editorial: "Reethi Beach Resort is the affordable Baa-Atoll 4★ — long-running, family-owned, and quietly the best-value access to Hanifaru Bay manta season anywhere in the country. 100 villas across beach, water and garden categories; a strong dive school that runs Hanifaru excursions from May through November; and a no-frills, unpretentious atmosphere. Best for divers and families who want manta season without a 5★ price. Skip it if you're looking for design-led rooms or a sleek spa; Reethi Beach is functional and well-maintained, but not stylish.",
  }),
  "kuredu-island-resort": resort({
    type: "resort", priceLow: 300, priceHigh: 600, rooms: 388,
    features: { alcohol: true, childFriendly: true, diveCenter: true, surfAccess: true, allInclusive: true },
    transfer: { type: "domestic-flight+speedboat", cost: 280, time: "40 min flight + 20 min boat" },
    bookingName: "Kuredu Island Resort",
    inclusion: "AI", guestType: "mixed",
    editorial: "Kuredu is one of the largest resorts in the country — 388 rooms across multiple categories spanning a long, narrow Lhaviyani Atoll island. There's a 6-hole pitch-and-putt golf course, three pools, multiple restaurants, a serious PADI dive school, and Foxy's, a small but consistent right-hander a 5-minute paddle from the beach. All-inclusive packages are generous. Book the renovated 'Sangu' or 'Beach' categories for refresh quality — older rooms feel dated. Best for couples and divers on a 7+ night all-in package. Skip for honeymoons; the scale kills intimacy.",
  }),
  "meeru-island-resort": resort({
    type: "resort", priceLow: 280, priceHigh: 550, rooms: 284,
    features: { alcohol: true, childFriendly: true, diveCenter: true, allInclusive: true },
    transfer: { type: "speedboat", cost: 130, time: "55 min" },
    bookingName: "Meeru Island Resort",
    inclusion: "AI", guestType: "mixed",
    editorial: "Meeru is a long, walkable North Malé island with 284 villas, multiple pools, a half-dozen restaurants, and one of the busier all-inclusive operations in the mid-tier. The dive school is competent (drift dives along the eastern reef line are excellent), the kids' club is genuinely useful, and the food breadth is unusual at this price. Best for families and couples on 7+ night all-in packages who want options without seaplane fees. Skip it if you want quiet — Meeru runs at a buzz.",
  }),
  "vilamendhoo-island-resort": resort({
    type: "resort", priceLow: 320, priceHigh: 600, rooms: 184,
    features: { houseReef: true, alcohol: true, childFriendly: true, diveCenter: true, allInclusive: true },
    transfer: { type: "speedboat", cost: 200, time: "1 hr 40 min" },
    bookingName: "Vilamendhoo Island Resort",
    inclusion: "AI", guestType: "divers",
    editorial: "Vilamendhoo Island Resort is the best-known house-reef 4★ in South Ari Atoll. The reef wraps the entire island and drops to a 25 m wall fifteen metres offshore — divers and snorkellers report seeing turtles, sharks, mantas (in season) without ever boarding a boat. 184 villas across beach and water types, a long-running PADI 5★ dive operation, and a serious whale-shark/manta excursion programme to the South Ari MPA next door. Best for divers on a 7+ night trip who want maximum unguided water time. Skip it if you want overwater villa luxury — the rooms here are simple and well-kept rather than design-led.",
  }),
  "embudu-village": resort({
    type: "resort", priceLow: 220, priceHigh: 400, rooms: 124,
    features: { houseReef: true, alcohol: true, diveCenter: true, allInclusive: false },
    transfer: { type: "speedboat", cost: 100, time: "45 min" },
    bookingName: "Embudu Village Maldives",
    inclusion: "FB", guestType: "divers",
    editorial: "Embudu Village is one of the country's old-school dive resorts — opened in 1981, modest in finish, but with a house reef so good it's been the reason to come for forty years. Sharks at the channel mouth, turtles on the wall, and the Werner Lau dive school next door, one of the longer-running operations in the country. 124 simple villas, full-board only (no AI bloat), and a guest list dominated by repeat divers. Best for divers who want substance over polish; skip it if you want overwater villas or design-led rooms.",
  }),
  "bandos-maldives": resort({
    type: "resort", priceLow: 260, priceHigh: 500, rooms: 226,
    features: { alcohol: true, childFriendly: true, diveCenter: true, allInclusive: false },
    transfer: { type: "speedboat", cost: 80, time: "15 min" },
    bookingName: "Bandos Maldives",
    inclusion: "BB", guestType: "families",
    editorial: "Bandos opened in 1972 as the country's second-ever resort and has been refurbished often enough since to feel current. The headline pull is the 15-minute speedboat from MLE — the shortest transfer to any resort — and a big-island feel with 226 villas, three pools, multiple restaurants, two dive centres, and a kids' club. Best for families with young kids breaking long-haul travel, or any guest who can't deal with a seaplane. Skip it if you want remote and intimate; Bandos is a bustling family resort, deliberately so.",
  }),
  "vilu-reef-beach-resort": resort({
    type: "resort", priceLow: 310, priceHigh: 580, rooms: 102,
    features: { houseReef: true, alcohol: true, childFriendly: true, allInclusive: false },
    transfer: { type: "domestic-flight+speedboat", cost: 280, time: "40 min flight + 20 min boat" },
    bookingName: "Vilu Reef Beach Resort",
    inclusion: "HB", guestType: "couples",
    editorial: "Vilu Reef sits in Dhaalu Atoll, far enough from MLE to feel quiet but reachable by domestic flight + speedboat. 102 villas across beach and water types, a tight house reef, and a kitchen that runs decent half-board. The Dhaalu setting is one of its quiet advantages — you'll see fewer day-tripping liveaboard groups than in North Malé, and the dive sites are less crowded. Best for couples on a 7-night quiet trip. Skip it if you want active dining nightlife — Vilu Reef is more chill than buzz.",
  }),
  "holiday-island-resort": resort({
    type: "resort", priceLow: 270, priceHigh: 500, rooms: 142,
    features: { alcohol: true, childFriendly: true, diveCenter: true, allInclusive: true },
    transfer: { type: "domestic-flight+speedboat", cost: 240, time: "25 min flight + 25 min boat" },
    bookingName: "Holiday Island Resort Maldives",
    inclusion: "AI", guestType: "mixed",
    editorial: "Holiday Island is a long-running 4★ in South Ari that punches well above its price on whale-shark access — the South Ari MPA is a 20-minute boat ride away, sightings are year-round, and the in-house dive school runs daily excursions. 142 beach villas, no overwater, all-inclusive packages that genuinely include drinks and excursions. Best for divers and families who want simple, dependable AI without flashy extras. Skip it if you want overwater villas or design-led rooms.",
  }),
  "ellaidhoo-maldives-by-cinnamon": resort({
    type: "resort", priceLow: 290, priceHigh: 550, rooms: 110,
    features: { houseReef: true, alcohol: true, diveCenter: true, allInclusive: true },
    transfer: { type: "speedboat", cost: 200, time: "1 hr 30 min" },
    bookingName: "Ellaidhoo Maldives Cinnamon",
    inclusion: "AI", guestType: "divers",
    editorial: "Ellaidhoo, run by Cinnamon, is one of those resorts that seems modest from the front desk and reveals itself in the water. The house reef is one of the best in North Ari — a wall on the eastern side, a manta cleaning station 15 minutes by boat, and a serious dive school that runs four boats a day. 110 villas, all-inclusive packages that include daily diving for divers, beach and overwater categories. Best for divers on a 7+ night package. Skip it for spa-resort feel.",
  }),
  "olhuveli-beach-spa": resort({
    type: "resort", priceLow: 300, priceHigh: 600, rooms: 159,
    features: { houseReef: true, waterVillas: true, alcohol: true, childFriendly: true, allInclusive: true },
    transfer: { type: "speedboat", cost: 130, time: "45 min" },
    bookingName: "Olhuveli Beach Spa Maldives",
    inclusion: "AI", guestType: "families",
    editorial: "Olhuveli Beach & Spa is the cheapest way to get an overwater villa with a real lagoon view — water villas here start under $400/night in shoulder season, which is unheard of in North Malé. 159 rooms across beach, jacuzzi, and overwater types, a long sandy island, kids' club, multiple restaurants. Best for families and couples wanting overwater on a budget. Skip it if you want the polished design and food of properties at $700+ — Olhuveli is good value, not refined.",
  }),
  "eriyadu-island-resort": resort({
    type: "resort", priceLow: 240, priceHigh: 420, rooms: 67,
    features: { houseReef: true, alcohol: true, diveCenter: true, allInclusive: false },
    transfer: { type: "speedboat", cost: 130, time: "1 hr" },
    bookingName: "Eriyadu Island Resort Maldives",
    inclusion: "HB", guestType: "divers",
    editorial: "Eriyadu is a small-island 4★ in North Malé with two outsized advantages: a house reef that drops into a channel where reef sharks gather most evenings, and only 67 villas (small by North Malé standards). The dive school is the headline draw. Beach villas only, no overwater. Half-board only, no AI. Best for divers and quiet couples who want a small property at mid-tier prices. Skip it if you want a resort with multiple restaurants and a kids' club; Eriyadu is deliberately compact.",
  }),
  "adaaran-club-rannalhi": resort({
    type: "resort", priceLow: 260, priceHigh: 480, rooms: 132,
    features: { waterVillas: true, alcohol: true, childFriendly: true, allInclusive: true },
    transfer: { type: "speedboat", cost: 110, time: "45 min" },
    bookingName: "Adaaran Club Rannalhi",
    inclusion: "AI", guestType: "couples",
    editorial: "Adaaran Club Rannalhi is an all-inclusive 4★ on a small, classic-shaped South Malé island — round, a single ring of palms, the kind of place travel-agency brochures use as a reference image. 132 villas including overwater, a tight house reef, and AI packages that include water sports and a daily snorkel. Popular with European tour groups, which keeps prices keen. Best for couples wanting overwater AI on a tight budget. Skip it for honeymoons looking for intimacy; the island fills up.",
  }),
  "fihalhohi-island-resort": resort({
    type: "resort", priceLow: 230, priceHigh: 420, rooms: 156,
    features: { houseReef: true, alcohol: true, childFriendly: true, allInclusive: false },
    transfer: { type: "speedboat", cost: 120, time: "1 hr" },
    bookingName: "Fihalhohi Island Resort",
    inclusion: "HB", guestType: "couples",
    editorial: "Fihalhohi is a long, narrow South Malé island with one of the longer house reefs in the atoll — you can drift-snorkel its length on a single tank. 156 villas, mostly beach types, half-board pricing that's reliably mid-tier. The diving is straightforward and the food is unfussy. Best for couples and families on a 5–7 night trip wanting a quiet, non-overwater base close to MLE. Skip it if overwater villas or design polish matter to you.",
  }),

  // ── Luxury (15) ────────────────────────────────────────
  "conrad-maldives-rangali-island": resort({
    type: "resort", priceLow: 1200, priceHigh: 3500, rooms: 150,
    features: { waterVillas: true, houseReef: true, alcohol: true, childFriendly: true, diveCenter: true },
    transfer: { type: "seaplane", cost: 750, time: "30 min" },
    bookingName: "Conrad Maldives Rangali Island",
    inclusion: "BB", guestType: "honeymooners",
    editorial: "Conrad Maldives Rangali Island is the resort that put the Maldives on the underwater-restaurant map. Ithaa, the all-glass tunnel five metres below the surface, opened in 2005 and is still one of the most photographed dining rooms in Asia — a reservation costs a few hundred dollars per head and books out months ahead. The resort itself is two islands connected by a 500-metre footbridge — the family-friendly Rangali Finolhu and the adults-only Rangali Island — with 150 villas, a serious wine cellar (the largest at sea level in the country), and a long-running PADI 5★ dive operation. Best for honeymooners and milestone-anniversary couples who want a brand-name 5★ with a real story attached. Skip it if you've been once and want something quieter — Conrad's value is novelty and execution, both of which work best the first time.",
  }),
  "niyama-private-islands": resort({
    type: "resort", priceLow: 1100, priceHigh: 3000, rooms: 134,
    features: { waterVillas: true, alcohol: true, childFriendly: true, diveCenter: true },
    transfer: { type: "seaplane", cost: 800, time: "40 min" },
    bookingName: "Niyama Private Islands Maldives",
    inclusion: "BB", guestType: "couples",
    editorial: "Niyama Private Islands sits in Dhaalu Atoll across two islands — Play and Chill — connected by a footbridge. The branding is unsubtle and so is the experience: Subsix, the country's only underwater club, sits 500 m offshore at six metres depth, hosting DJ nights for guests who fly in for the weekend; Edge is a treetop dining pavilion suspended above the lagoon; the gym is open 24/7. 134 villas, a strong dive operation in deep South Malé/Dhaalu currents, and food across nine restaurants. Best for younger couples and small groups who want a Maldives that does not turn the music off at 10pm. Skip it for honeymoons that lean quiet.",
  }),
  "constance-halaveli": resort({
    type: "resort", priceLow: 950, priceHigh: 2800, rooms: 86,
    features: { waterVillas: true, alcohol: true, diveCenter: true },
    transfer: { type: "seaplane", cost: 700, time: "25 min" },
    bookingName: "Constance Halaveli Maldives",
    inclusion: "BB", guestType: "honeymooners",
    editorial: "Constance Halaveli sits on a crescent-shaped island in North Ari Atoll, with all 86 villas designed to evoke the curved hull of a Maldivian dhoni — a stylistic choice that genuinely works. The U-shape of the island gives every villa a long-water view, the house reef wraps both inner and outer arcs, and the spa pavilions are some of the most photogenic in the brand. Constance's all-inclusive 'Premium Plus' package is one of the more honest in the country: top-shelf alcohol, premium wine, à la carte dining at any restaurant, motorised water sports — included. Best for honeymoons or quiet couple trips where you don't want to think about prices. Skip it if you want the latest design trend; Halaveli has a slightly older feel and that's deliberate.",
  }),
  "anantara-veli": resort({
    type: "resort", priceLow: 850, priceHigh: 2200, rooms: 67,
    features: { waterVillas: true, alcohol: true, diveCenter: true },
    transfer: { type: "speedboat", cost: 200, time: "30 min" },
    bookingName: "Anantara Veli Maldives Resort",
    inclusion: "BB", guestType: "couples",
    editorial: "Anantara Veli is the adults-only sister resort to Anantara Dhigu, sharing a North Malé Atoll lagoon a 30-minute speedboat from the airport. 67 overwater villas (every room here is overwater), a kid-free policy across the property, and a surprisingly decent house reef given the proximity to MLE. Three restaurants, a Six Senses-tier spa pavilion, and a footbridge to Anantara Dhigu next door if you want a wider food selection or the larger pool deck. Best for couples on a short trip who want overwater living without the seaplane-day commitment. Skip it if you want a remote feel — you'll see boats and other resorts from the lagoon.",
  }),
  "six-senses-laamu": resort({
    type: "resort", priceLow: 1400, priceHigh: 3500, rooms: 97,
    features: { waterVillas: true, alcohol: true, diveCenter: true, surfAccess: true },
    transfer: { type: "domestic-flight+speedboat", cost: 600, time: "1 hr flight + 15 min boat" },
    bookingName: "Six Senses Laamu",
    inclusion: "BB", guestType: "surfers",
    editorial: "Six Senses Laamu is the only resort in Laamu Atoll, sitting on Olhuveli island in the deep south. Its claim to fame for surfers is Yin Yang, a punchy right-hander that breaks directly off the property — not 'a short boat ride' but 'walk down the beach and paddle out'. The resort runs a Tropicsurf programme with private guides, and the season runs March–October. Beyond surf, Laamu is one of the country's most biodiverse atolls — manatee-style nurse sharks year-round, regular dolphin pods, deep walls. 97 villas in Six Senses' signature woven-wood, no-walls architecture; the food is excellent, the spa is one of the best in the brand. Best for surfers willing to spend, couples who want remote, families on a long stay. Skip it if you can't justify the 1-hour domestic flight + 15-min speedboat at the start and end of every trip.",
  }),
  "the-residence-dhigurah": resort({
    type: "resort", priceLow: 1000, priceHigh: 2600, rooms: 173,
    features: { waterVillas: true, alcohol: true, childFriendly: true, diveCenter: true },
    transfer: { type: "domestic-flight+speedboat", cost: 700, time: "1 hr flight + 10 min boat" },
    bookingName: "The Residence Dhigurah",
    inclusion: "BB", guestType: "couples",
    editorial: "The Residence Dhigurah occupies a 1.6 km island in Gaafu Alifu, the country's deep south — the kind of distance that filters out drop-in tourism and leaves the resort genuinely quiet. 173 villas across beach and overwater categories, two pools, a strong PADI dive school. The far-south atolls are extraordinary for divers (channel dives, hammerhead sites, large pelagics) and the resort runs a sister-property loop with The Residence Falhumaafushi. Best for couples and divers wanting genuine remote with 5★ comfort. Skip it if a 1-hour domestic flight + 10-min boat at each end sounds like a chore.",
  }),
  "velaa-private-island": resort({
    type: "resort", priceLow: 1500, priceHigh: 8000, rooms: 47,
    features: { waterVillas: true, alcohol: true, childFriendly: true, diveCenter: true },
    transfer: { type: "seaplane", cost: 1000, time: "45 min" },
    bookingName: "Velaa Private Island Maldives",
    inclusion: "BB", guestType: "honeymooners",
    editorial: "Velaa Private Island is the boutique end of ultra-luxury — 47 villas on a single Noonu island, owner-run by a Czech entrepreneur who has put genuine money into the food, the wine list, and a 9-hole golf course (the only resort course in the country). The Aragu restaurant has held one of the country's better food reputations for years. Spa is small and considered. Best for couples and small groups wanting an intimate ultra-luxury without the corporate gloss of a Cheval Blanc. Skip it if you want a spread-out 6★ campus; Velaa is deliberately compact.",
  }),
  "baros-maldives": resort({
    type: "resort", priceLow: 900, priceHigh: 2400, rooms: 75,
    features: { waterVillas: true, houseReef: true, alcohol: true, diveCenter: true },
    transfer: { type: "speedboat", cost: 250, time: "25 min" },
    bookingName: "Baros Maldives",
    inclusion: "BB", guestType: "couples",
    editorial: "Baros Maldives is one of the country's older resorts — opened in 1973 and quietly run by Maldivian owners ever since — and it shows in all the right ways. 75 villas on a small, walkable island 25 minutes by speedboat from MLE. No kids' club, no buggies, no entertainment program: this is a properly intimate, adults-leaning 5★ with an exceptional house reef (the lighthouse-restaurant overhang is a manta-ray-frequented spot a 5-minute swim from any beach villa) and a kitchen that's been quietly excellent for decades. Best for couples and divers who want classic Maldives — small, polished, low-key — at a price below most overwater 5★. Skip it if you want flashy dining concepts or a treehouse spa; Baros is deliberately understated.",
  }),
  "kuramathi-island-resort": resort({
    type: "resort", priceLow: 700, priceHigh: 1800, rooms: 360,
    features: { waterVillas: true, alcohol: true, childFriendly: true, diveCenter: true, allInclusive: true },
    transfer: { type: "speedboat", cost: 250, time: "1 hr" },
    bookingName: "Kuramathi Island Resort",
    inclusion: "AI", guestType: "families",
    editorial: "Kuramathi is one of the most-photographed Maldivian islands you've never heard the name of — that long-sand-finger spit at the western tip is the resort's signature, and it appears on guidebook covers year after year. 360 villas spread along a long Rasdhoo-Atoll island, three dive bases, multiple pools, half a dozen restaurants, and an AI option that's rare in the 5★ tier. Best for families and couples on a 7+ night AI package wanting space and choice. Skip it if you want intimacy; Kuramathi runs at scale.",
  }),
  "constance-moofushi": resort({
    type: "resort", priceLow: 950, priceHigh: 2400, rooms: 110,
    features: { waterVillas: true, alcohol: true, diveCenter: true, allInclusive: true },
    transfer: { type: "seaplane", cost: 700, time: "25 min" },
    bookingName: "Constance Moofushi Maldives",
    inclusion: "AI", guestType: "divers",
    editorial: "Constance Moofushi is the all-inclusive sibling to Constance Halaveli, sitting on a small South Ari island a short seaplane from MLE. The AI package is one of the more honest in the country — premium spirits, à la carte at any restaurant, daily wine. The location is the standout: South Ari MPA's whale-shark channel is 15 minutes by boat, manta cleaning stations are closer, and the in-house dive school runs daily. 110 thatched-roof villas in classic Maldivian style. Best for divers and couples on a 7-night AI looking for service breadth without honeymoon-suite formality. Skip it if you want a quiet adults-only feel; Moofushi runs warm and social.",
  }),
  "lily-beach-resort": resort({
    type: "resort", priceLow: 900, priceHigh: 2200, rooms: 125,
    features: { waterVillas: true, houseReef: true, alcohol: true, childFriendly: true, allInclusive: true },
    transfer: { type: "seaplane", cost: 700, time: "25 min" },
    bookingName: "Lily Beach Resort Maldives",
    inclusion: "AI", guestType: "families",
    editorial: "Lily Beach is the gold standard of premium all-inclusive in the country — 'Platinum Plan' AI that genuinely covers branded spirits, premium wine, à la carte dining, motorised water sports, and a daily dive for divers. 125 villas across beach and water categories on Huvahendhoo island in South Ari, a strong house reef, and a kids' club that's good enough to take seriously. Best for families and couples on a 7+ night AI who want one bill and no surprises. Skip it for design-led stays; Lily Beach prioritises value over fashion.",
  }),
  "centara-grand-island-resort": resort({
    type: "resort", priceLow: 850, priceHigh: 2000, rooms: 112,
    features: { waterVillas: true, alcohol: true, childFriendly: true, diveCenter: true, allInclusive: true },
    transfer: { type: "seaplane", cost: 700, time: "25 min" },
    bookingName: "Centara Grand Island Resort Maldives",
    inclusion: "AI", guestType: "families",
    editorial: "Centara Grand is one of the better family-focused 5★ all-inclusives in the country — three pools, two kids' clubs (toddler and 4–12), a dedicated water-sports centre, and a Camp Safari programme that runs daily activities. 112 villas across beach and overwater. Whale-shark and manta excursions to South Ari MPA leave from the resort dock. Best for families with kids who want a generous AI without the dollar-per-dollar cost-tracking of a half-board package. Skip it if you want a quiet adults-only feel; Centara is family-noisy by design.",
  }),
  "vakkaru-maldives": resort({
    type: "resort", priceLow: 1100, priceHigh: 2800, rooms: 125,
    features: { waterVillas: true, houseReef: true, alcohol: true, childFriendly: true, diveCenter: true },
    transfer: { type: "seaplane", cost: 800, time: "30 min" },
    bookingName: "Vakkaru Maldives",
    inclusion: "BB", guestType: "couples",
    editorial: "Vakkaru sits in Baa Atoll's UNESCO biosphere on a small private island with one of the better house reefs in the area — turtles year-round, a manta cleaning station 20 minutes by boat, and Hanifaru Bay access during the May–November season. 125 villas, all on stilts above the lagoon or directly on the beach, with bigger plot sizes than typical for the price tier. Strong food, a serious spa, and a properly-resourced kids' club. Best for couples and families wanting a Baa-biosphere 5★ that costs less than Soneva Fushi. Skip it if you want bustle; Vakkaru is intentionally calm.",
  }),
  "coco-bodu-hithi": resort({
    type: "resort", priceLow: 1000, priceHigh: 2600, rooms: 100,
    features: { waterVillas: true, alcohol: true, diveCenter: true },
    transfer: { type: "speedboat", cost: 280, time: "35 min" },
    bookingName: "Coco Bodu Hithi",
    inclusion: "BB", guestType: "couples",
    editorial: "Coco Bodu Hithi is the adults-leaning North Malé 5★ that quietly out-designs most of its peers — the 100-villa property has the country's longest infinity-edge pool and a private 35-minute speedboat from MLE that lands you at the resort jetty without seaplane logistics. Eight restaurants, a respected Sunsets dive school, and a footprint that's small enough to walk in twenty minutes. Best for couples on a 5–7 night trip wanting overwater living without the seaplane day. Skip it if you want a kids' club or a buzzy resort feel; Coco Bodu Hithi is deliberately quiet.",
  }),
  "the-sun-siyam-iru-fushi": resort({
    type: "resort", priceLow: 900, priceHigh: 2200, rooms: 221,
    features: { waterVillas: true, alcohol: true, childFriendly: true, diveCenter: true, allInclusive: true },
    transfer: { type: "seaplane", cost: 750, time: "45 min" },
    bookingName: "The Sun Siyam Iru Fushi",
    inclusion: "AI", guestType: "mixed",
    editorial: "The Sun Siyam Iru Fushi is one of the largest 5★ all-inclusives in the country — 221 villas spread across a 1.6 km Noonu Atoll island, multiple pools, eight restaurants, a strong dive school, and a quietly excellent water-sports centre. Manta season runs nearby in Baa from May–November. AI plan is generous and includes daily snorkelling. Best for families and couples on a 7+ night AI who want to keep moving. Skip it if you want intimate; Iru Fushi is busy by design.",
  }),

  // ── Ultra-luxury (10) ──────────────────────────────────
  "soneva-fushi": resort({
    type: "resort", priceLow: 3200, priceHigh: 12000, rooms: 64,
    features: { waterVillas: true, houseReef: true, alcohol: true, childFriendly: true, diveCenter: true },
    transfer: { type: "seaplane", cost: 1100, time: "30 min" },
    bookingName: "Soneva Fushi",
    inclusion: "AI",
    guestType: "honeymooners",
    editorial: "Soneva Fushi is the resort that more or less invented the modern barefoot-luxury Maldives. It opened on Kunfunadhoo in 1995 — back when the country had maybe a dozen resorts and most of them were concrete blocks — and has stayed quietly ahead by treating the dunes, the kerosene-lamp lighting, and the no-shoes policy as features rather than affectations. Today it's 64 villas spread across half a kilometre of jungle in the Baa biosphere, with an observatory, an open-air cinema, manta-season access to Hanifaru Bay, and a children's program (the Den) that rivals the family clubs at most other resorts. Bring kids if you have them — Soneva is one of the few ultra-luxury places in the country that genuinely welcomes them. Skip it if you came for sleek-lobby glamour: the rooms are deliberately rustic, the wood is sun-worn on purpose, and the design is closer to a high-end Aman than a Cheval Blanc.",
  }),
  "soneva-jani": resort({
    type: "resort", priceLow: 3800, priceHigh: 14000, rooms: 52,
    features: { waterVillas: true, alcohol: true, childFriendly: true, diveCenter: true },
    transfer: { type: "seaplane", cost: 1300, time: "40 min" },
    bookingName: "Soneva Jani",
    inclusion: "BB", guestType: "honeymooners",
    editorial: "Soneva Jani is the overwater sibling to Soneva Fushi, opened in 2017 on a private lagoon in Noonu Atoll. Where Fushi is dune-and-jungle, Jani is sea-and-sky — strung out along a 5.6 km lagoon, with each villa standing alone on stilts above clear water and several types featuring retractable bedroom roofs and water slides directly into the lagoon. It's the more photogenic of the two, but quieter — the seaplane in is 40 minutes, the atoll is far north, and the nearest other resort is 20 minutes away by boat. Best for honeymoons, anniversaries, and any trip where you don't want to leave the villa. Bring binoculars: the observatory shows the southern sky better than anywhere most northern-hemisphere guests have ever stood under.",
  }),
  "cheval-blanc-randheli": resort({
    type: "resort", priceLow: 4200, priceHigh: 18000, rooms: 45,
    features: { waterVillas: true, alcohol: true, diveCenter: true },
    transfer: { type: "seaplane", cost: 1500, time: "45 min" },
    bookingName: "Cheval Blanc Randheli",
    inclusion: "BB", guestType: "honeymooners",
    editorial: "Cheval Blanc Randheli is what happens when LVMH builds a Maldives resort: precise, expensive, and quietly extravagant in ways that aren't always visible in photos. The property spans six islands in Noonu Atoll — the main resort, a private-island residence, and four ancillary islands used for spa, beach club, restaurants and excursions — connected by branded launches running to a private timetable. The villas are designed by Jean-Michel Gathy with finishes that would not look out of place in a Mediterranean villa: floor-to-ceiling windows, oversized bathtubs, vaulted ceilings, art on every wall. The Guerlain spa is one of the largest in the country. Best for guests who already know they like LVMH-level execution. Skip it if you came for a yoga deck and a quiet beach.",
  }),
  "waldorf-astoria-maldives-ithaafushi": resort({
    type: "resort", priceLow: 3600, priceHigh: 30000, rooms: 122,
    features: { waterVillas: true, alcohol: true, childFriendly: true, diveCenter: true },
    transfer: { type: "speedboat", cost: 600, time: "45 min" },
    bookingName: "Waldorf Astoria Maldives Ithaafushi",
    inclusion: "BB", guestType: "honeymooners",
    editorial: "Waldorf Astoria Ithaafushi is a three-island 6★ that takes the 'Hilton at the top of the brand stack' assignment seriously. The main island holds 122 villas and the bulk of the dining; the second island is reserved for the spa and adults-only pool; the third is the Private Island residence — at $30,000+ a night, the largest single buyout in the Maldives, with three pools, a private spa pavilion, butlers, and a dedicated speedboat. The 45-min speedboat transfer (no seaplane) is unusually quick for a property this far up the food chain. Best for a long honeymoon, a milestone family trip, or a buyout for a wedding. The food across 11 restaurants is genuinely strong — Terra (treetop dining) and Glow (beachfront) are the standouts. Skip it if you want the rustic-Soneva feel; this is the polished-marble version of the country.",
  }),
  "one-and-only-reethi-rah": resort({
    type: "resort", priceLow: 4500, priceHigh: 18000, rooms: 130,
    features: { waterVillas: true, alcohol: true, childFriendly: true, diveCenter: true },
    transfer: { type: "speedboat", cost: 700, time: "45 min" },
    bookingName: "One and Only Reethi Rah",
    inclusion: "BB", guestType: "honeymooners",
    editorial: "One&Only Reethi Rah occupies a kidney-shaped island in North Malé that's so large the resort treats it as twelve different beaches, each accessible from a different cluster of villas — a layout that solves the problem of 'every overwater villa shares the same view'. 130 villas, generous land-villa categories with private pools the size of small lap pools, a 6,000 m² spa, a serious dive operation, and a kids' club that's good enough to make a real difference on a family week. Speedboat from MLE is 45 min. Best for guests who want privacy at scale and can use the space — the island is too big to walk in flip-flops, so you get a buggy. Skip it if you're a couple looking for an intimate one-island feel; this is the polished 6★ for groups, families, and people who like options.",
  }),
  "joali-maldives": resort({
    type: "resort", priceLow: 3400, priceHigh: 14000, rooms: 73,
    features: { waterVillas: true, alcohol: true, diveCenter: true },
    transfer: { type: "seaplane", cost: 1300, time: "40 min" },
    bookingName: "Joali Maldives",
    inclusion: "BB", guestType: "honeymooners",
    editorial: "Joali Maldives opened in 2018 on Muravandhoo, in Raa Atoll, with a single ambitious thesis: build a resort around contemporary art. It worked. The property has 73 villas (beach and overwater) and a programme of site-specific installations from artists like Misha Kahn and Ben Cullen Williams that you genuinely walk through, not past. Architecturally it's playful — curved roofs, raw timber, treehouse-style overwater villas — and the food is strong, with a Japanese-inflected main restaurant (Saoke) that punches above its weight. Best for couples who care about design and want a less-formal alternative to Cheval Blanc. Skip it if 'art-forward' makes you cringe — it doesn't lean subtle.",
  }),
  "joali-being": resort({
    type: "resort", priceLow: 3600, priceHigh: 12000, rooms: 68,
    features: { waterVillas: true, alcohol: false },
    transfer: { type: "seaplane", cost: 1300, time: "40 min" },
    bookingName: "Joali Being Maldives",
    inclusion: "FB", guestType: "couples",
    editorial: "Joali Being is the wellness-focused sister to Joali Maldives, and one of the few resorts in the country where 'wellness' isn't a marketing label slapped on a spa menu. It's a fully programmed property — every guest gets a pre-arrival assessment, a personalised wellness plan, and access to a residential medical team that includes a Western GP and a TCM practitioner. The 68 villas surround the largest dedicated wellness facility in the Indian Ocean: hydrotherapy pools, sound healing, aerial yoga, naturopathy. The food is plant-forward but not preachy. No children, no alcohol in most rates, no kids' club. Best for couples doing a 7–10 day reset, recovering athletes, anyone post-burnout. Skip it if you want a holiday that includes a sundowner martini.",
  }),
  "four-seasons-resort-landaa-giraavaru": resort({
    type: "resort", priceLow: 2800, priceHigh: 12000, rooms: 103,
    features: { waterVillas: true, alcohol: true, childFriendly: true, diveCenter: true },
    transfer: { type: "seaplane", cost: 950, time: "30 min" },
    bookingName: "Four Seasons Resort Maldives Landaa Giraavaru",
    inclusion: "BB", guestType: "families",
    editorial: "Four Seasons Landaa Giraavaru is the Baa Atoll flagship — a big-island 6★ where the science is genuinely on-site. The Manta Trust runs its Maldivian HQ from the property, and a marine turtle rehabilitation centre on the property has released hundreds of injured turtles back into the Indian Ocean. From May through November, manta excursions to Hanifaru Bay leave from the resort dock. Outside that window, the diving in Baa is still excellent. 103 villas, a serious kids' club (Kuda Velaa), and the strongest spa programme in the brand's portfolio. Best for families who want a proper holiday with substance — this is the 6★ that makes 9-year-olds care about ocean conservation. Skip it if you want overwater views above all else; the beach villas with private pools are the better pick here.",
  }),
  "four-seasons-resort-kuda-huraa": resort({
    type: "resort", priceLow: 2500, priceHigh: 10000, rooms: 96,
    features: { waterVillas: true, alcohol: true, childFriendly: true, diveCenter: true, surfAccess: true },
    transfer: { type: "speedboat", cost: 350, time: "25 min" },
    bookingName: "Four Seasons Resort Maldives Kuda Huraa",
    inclusion: "BB", guestType: "families",
    editorial: "Four Seasons Kuda Huraa is the closer-to-airport sibling to Landaa Giraavaru, sitting in North Malé Atoll a quick 25-min private speedboat from the international terminal — no seaplane required, which makes it one of the few 6★ properties you can reach with a flight that lands at 8pm. 96 villas across beach and overwater categories, a Sultans-of-the-surf reef break a few minutes away (the resort runs a Tropicsurf centre with private guides), a small but capable spa, and a children's programme that punches above its size. Best for families with younger kids and surfers willing to pay for resort-level service. Skip it if you want a remote feel — Kuda Huraa is small and you'll see other islands from the beach.",
  }),
  "the-st-regis-maldives-vommuli": resort({
    type: "resort", priceLow: 2800, priceHigh: 12000, rooms: 77,
    features: { waterVillas: true, alcohol: true, childFriendly: true, diveCenter: true },
    transfer: { type: "seaplane", cost: 870, time: "45 min" },
    bookingName: "The St Regis Maldives Vommuli Resort",
    inclusion: "BB", guestType: "honeymooners",
    editorial: "The St. Regis Maldives Vommuli is Marriott's flagship in the country and the best argument for the brand's signature butler service: it actually shows up. 77 villas across Vommuli island in Dhaalu Atoll, including the often-photographed John Jacob Astor Estate (a four-bedroom whale-shape overwater villa that's been on more design magazine covers than any other Maldives villa) and a strong roster of restaurants — the standout is Crust, a wood-fired oven over the lagoon. Seaplane in is 45 minutes and $870 return per person. Best for guests who like the formality of the St. Regis brand done right; skip it if 'butler service' makes you uncomfortable rather than waited-on.",
  }),
};

Object.assign(stayDetails, midLuxUltra);

export function getStayDetail(slug: string): StayDetail | undefined {
  return stayDetails[slug];
}
