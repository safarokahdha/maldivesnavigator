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
  "crown-beach-hotel-maafushi": placeholder({
    type: "guesthouse",
    priceLow: 65,
    priceHigh: 120,
    currency: "USD",
    rooms: 18,
    features: { childFriendly: true, diveCenter: true },
    transfer: { type: "speedboat", cost: 30, time: "30 min" },
    booking: {
      bookingDotCom: "https://www.booking.com/searchresults.html?ss=Crown+Beach+Hotel+Maafushi",
      agoda: "https://www.agoda.com/search?q=Crown+Beach+Hotel+Maafushi",
    },
    inclusion: "BB",
    guestType: "backpackers",
    editorialTake:
      "Crown Beach Hotel is a long-running 18-room guesthouse on Maafushi's main beach, popular with European backpackers for its location and dive package.",
  }),

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
      "Arena Beach Hotel is one of Maafushi's most-booked guesthouses — 35 rooms, rooftop restaurant, in-house excursion desk, walkable to bikini beach.",
  }),

  "stingray-beach-inn-maafushi": placeholder({
    type: "guesthouse",
    priceLow: 55,
    priceHigh: 95,
    currency: "USD",
    rooms: 14,
    features: { childFriendly: true },
    transfer: { type: "speedboat", cost: 30, time: "30 min" },
    booking: {
      bookingDotCom: "https://www.booking.com/searchresults.html?ss=Stingray+Beach+Inn+Maafushi",
      agoda: "https://www.agoda.com/search?q=Stingray+Beach+Inn+Maafushi",
    },
    inclusion: "BB",
    guestType: "backpackers",
    editorialTake:
      "Stingray Beach Inn is a 14-room guesthouse a short walk from Maafushi's bikini beach. Family-run, simple breakfasts, dependable excursion partners.",
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
      "Kaani Beach Hotel sits on Maafushi's southern bikini-beach side. 24 rooms, pool, breakfast included, and a sister property (Kaani Village & Spa) one block over.",
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
      "Triton Beach Hotel & Spa is a slightly upscale option on Maafushi — pool, spa, and rooftop bar. Pulls a mid-range crowd at backpacker prices.",
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
      "Thulusdhoo Inn is a small 10-room guesthouse in the surf hub of North Malé Atoll. Walking distance to Coke's break.",
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
      "Season Paradise is a long-running 12-room guesthouse on Thulusdhoo. Reliable surf-package partner with daily boat trips to Chickens.",
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
      "Coke's Beach Maldives sits closest to the Coke's break on Thulusdhoo. 14 rooms, surf-school discounts, communal evenings.",
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
      "Cyrus Beach Inn is a small 10-room guesthouse on Dhigurah's village side. Whale-shark excursions arranged daily.",
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
      "Aveyla Manta Village leans into Dhigurah's wildlife reputation — 16 rooms, in-house dive centre, focus on manta and whale-shark trips.",
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
      "Dhigurah Retreat is a quieter 12-room option on the village side. Beachfront access, breakfast included, walkable to bikini beach.",
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
      "Fulidhoo Inn is one of the original guesthouses on tiny Fulidhoo — 8 rooms, central, family-run, easy reach of the stingray feeding beach.",
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
      "Fulidhoo Sunrise Beach faces the eastern bikini beach — 10 rooms, sunrise breakfast, and easy access to the night-snorkel trip.",
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
      "Thundi Guesthouse is a 12-room family-run option on Fulidhoo. Reliable Boduberu drum-night recommendations and full-board packages.",
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
      "White Shell Island Hotel is a 14-room mid-budget option on Gulhi — quieter than Maafushi, same atoll, excellent lagoon snorkelling.",
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
      "Lucky Hiya Maldives is a 12-room guesthouse on quiet Mathiveri — North Ari Atoll, sandbank-walking distance, manta and whale-shark trips.",
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
      "Bliss Dhigurah is a 16-room mid-budget option set back from the bikini beach. Family-friendly, quieter than the village-side options.",
  }),

  "ui-inn-hulhumale": placeholder({
    type: "guesthouse",
    priceLow: 40,
    priceHigh: 85,
    currency: "USD",
    rooms: 24,
    features: { childFriendly: true },
    transfer: { type: "speedboat", cost: 0, time: "Walk from MLE airport (Hulhumalé bridge)" },
    booking: {
      bookingDotCom: "https://www.booking.com/searchresults.html?ss=UI+Inn+Hulhumale",
      agoda: "https://www.agoda.com/search?q=UI+Inn+Hulhumale",
    },
    inclusion: "BB",
    guestType: "mixed",
    editorialTake:
      "UI Inn is a 24-room transit-friendly guesthouse on Hulhumalé. Short taxi or airport bus from Velana International — useful for first or last nights of a Maldives trip.",
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
    editorial: "Eco-leaning 4★ on the North Malé reef line. 144 rooms across beach and overwater categories, 3D-printed reef project on site.",
  }),
  "adaaran-select-hudhuranfushi": resort({
    type: "resort", priceLow: 280, priceHigh: 500, rooms: 215,
    features: { alcohol: true, childFriendly: true, diveCenter: true, surfAccess: true, allInclusive: true },
    transfer: { type: "speedboat", cost: 120, time: "45 min" },
    bookingName: "Adaaran Select Hudhuranfushi",
    inclusion: "AI", guestType: "surfers",
    editorial: "Kuredu Island Resort is one of the largest resorts in the country (215 villas) and the cheapest way onto Lhaviyani Atoll's serious dive sites and the Lohi's surf break, which sits directly off the resort jetty. All-inclusive packages include a daily two-tank dive option, which is unusual at this price tier. The island is long, walkable end-to-end, with multiple restaurants, a 9-hole golf course, and an oceanside spa. Best for couples and divers on an all-in budget who want generous time on the water. Skip it for honeymoons — the resort is too big to feel intimate.",
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
    editorial: "Big-island 4★ with golf, diving, and Foxy's surf break. 388 rooms — book the new categories for refresh quality.",
  }),
  "meeru-island-resort": resort({
    type: "resort", priceLow: 280, priceHigh: 550, rooms: 284,
    features: { alcohol: true, childFriendly: true, diveCenter: true, allInclusive: true },
    transfer: { type: "speedboat", cost: 130, time: "55 min" },
    bookingName: "Meeru Island Resort",
    inclusion: "AI", guestType: "mixed",
    editorial: "Big-island 4★ with multiple beach categories, dive base, and reliable all-inclusive packages.",
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
    editorial: "Long-running budget-leaning 4★ with a famous house reef and reliable dive school.",
  }),
  "bandos-maldives": resort({
    type: "resort", priceLow: 260, priceHigh: 500, rooms: 226,
    features: { alcohol: true, childFriendly: true, diveCenter: true, allInclusive: false },
    transfer: { type: "speedboat", cost: 80, time: "15 min" },
    bookingName: "Bandos Maldives",
    inclusion: "BB", guestType: "families",
    editorial: "One of the country's oldest resorts. 15 minutes from MLE, big island, family-friendly.",
  }),
  "vilu-reef-beach-resort": resort({
    type: "resort", priceLow: 310, priceHigh: 580, rooms: 102,
    features: { houseReef: true, alcohol: true, childFriendly: true, allInclusive: false },
    transfer: { type: "domestic-flight+speedboat", cost: 280, time: "40 min flight + 20 min boat" },
    bookingName: "Vilu Reef Beach Resort",
    inclusion: "HB", guestType: "couples",
    editorial: "4★ with a tight house reef and quiet South Atoll setting. Domestic-flight transfer.",
  }),
  "holiday-island-resort": resort({
    type: "resort", priceLow: 270, priceHigh: 500, rooms: 142,
    features: { alcohol: true, childFriendly: true, diveCenter: true, allInclusive: true },
    transfer: { type: "domestic-flight+speedboat", cost: 240, time: "25 min flight + 25 min boat" },
    bookingName: "Holiday Island Resort Maldives",
    inclusion: "AI", guestType: "mixed",
    editorial: "Long-running 4★ in South Ari, regular all-inclusive deals and short whale-shark trips.",
  }),
  "ellaidhoo-maldives-by-cinnamon": resort({
    type: "resort", priceLow: 290, priceHigh: 550, rooms: 110,
    features: { houseReef: true, alcohol: true, diveCenter: true, allInclusive: true },
    transfer: { type: "speedboat", cost: 200, time: "1 hr 30 min" },
    bookingName: "Ellaidhoo Maldives Cinnamon",
    inclusion: "AI", guestType: "divers",
    editorial: "House-reef destination 4★ in North Ari with a dependable dive operation.",
  }),
  "olhuveli-beach-spa": resort({
    type: "resort", priceLow: 300, priceHigh: 600, rooms: 159,
    features: { houseReef: true, waterVillas: true, alcohol: true, childFriendly: true, allInclusive: true },
    transfer: { type: "speedboat", cost: 130, time: "45 min" },
    bookingName: "Olhuveli Beach Spa Maldives",
    inclusion: "AI", guestType: "families",
    editorial: "4★ with a long house reef, water villas at the lower end of mid-tier pricing, kid-friendly.",
  }),
  "eriyadu-island-resort": resort({
    type: "resort", priceLow: 240, priceHigh: 420, rooms: 67,
    features: { houseReef: true, alcohol: true, diveCenter: true, allInclusive: false },
    transfer: { type: "speedboat", cost: 130, time: "1 hr" },
    bookingName: "Eriyadu Island Resort Maldives",
    inclusion: "HB", guestType: "divers",
    editorial: "Mid-budget 4★ with a famous house reef and shark-watching channel just off the beach.",
  }),
  "adaaran-club-rannalhi": resort({
    type: "resort", priceLow: 260, priceHigh: 480, rooms: 132,
    features: { waterVillas: true, alcohol: true, childFriendly: true, allInclusive: true },
    transfer: { type: "speedboat", cost: 110, time: "45 min" },
    bookingName: "Adaaran Club Rannalhi",
    inclusion: "AI", guestType: "couples",
    editorial: "All-inclusive 4★ on a small island. Classic Maldives shape, water villas, popular with European groups.",
  }),
  "fihalhohi-island-resort": resort({
    type: "resort", priceLow: 230, priceHigh: 420, rooms: 156,
    features: { houseReef: true, alcohol: true, childFriendly: true, allInclusive: false },
    transfer: { type: "speedboat", cost: 120, time: "1 hr" },
    bookingName: "Fihalhohi Island Resort",
    inclusion: "HB", guestType: "couples",
    editorial: "Mid-tier 4★ with a long house reef and reliable half-board pricing close to MLE.",
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
    editorial: "Far-south 5★ on a 1.6km-long island. Quietest atolls in the country, reliable diving.",
  }),
  "velaa-private-island": resort({
    type: "resort", priceLow: 1500, priceHigh: 8000, rooms: 47,
    features: { waterVillas: true, alcohol: true, childFriendly: true, diveCenter: true },
    transfer: { type: "seaplane", cost: 1000, time: "45 min" },
    bookingName: "Velaa Private Island Maldives",
    inclusion: "BB", guestType: "honeymooners",
    editorial: "Boutique private-island 5★ at the lower end of ultra-luxury — small, signature.",
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
    editorial: "Big-island 5★ with a 100m sandbank stretching off the tip and reliable dive operations.",
  }),
  "constance-moofushi": resort({
    type: "resort", priceLow: 950, priceHigh: 2400, rooms: 110,
    features: { waterVillas: true, alcohol: true, diveCenter: true, allInclusive: true },
    transfer: { type: "seaplane", cost: 700, time: "25 min" },
    bookingName: "Constance Moofushi Maldives",
    inclusion: "AI", guestType: "divers",
    editorial: "All-inclusive 5★ in South Ari. Whale shark MPA on the doorstep, manta encounters frequent.",
  }),
  "lily-beach-resort": resort({
    type: "resort", priceLow: 900, priceHigh: 2200, rooms: 125,
    features: { waterVillas: true, houseReef: true, alcohol: true, childFriendly: true, allInclusive: true },
    transfer: { type: "seaplane", cost: 700, time: "25 min" },
    bookingName: "Lily Beach Resort Maldives",
    inclusion: "AI", guestType: "families",
    editorial: "Premium all-inclusive 5★ with a strong reputation for service and food breadth.",
  }),
  "centara-grand-island-resort": resort({
    type: "resort", priceLow: 850, priceHigh: 2000, rooms: 112,
    features: { waterVillas: true, alcohol: true, childFriendly: true, diveCenter: true, allInclusive: true },
    transfer: { type: "seaplane", cost: 700, time: "25 min" },
    bookingName: "Centara Grand Island Resort Maldives",
    inclusion: "AI", guestType: "families",
    editorial: "All-inclusive 5★ with a strong family lean, kids' clubs, and South Ari MPA access.",
  }),
  "vakkaru-maldives": resort({
    type: "resort", priceLow: 1100, priceHigh: 2800, rooms: 125,
    features: { waterVillas: true, houseReef: true, alcohol: true, childFriendly: true, diveCenter: true },
    transfer: { type: "seaplane", cost: 800, time: "30 min" },
    bookingName: "Vakkaru Maldives",
    inclusion: "BB", guestType: "couples",
    editorial: "Baa-biosphere 5★ near Hanifaru Bay with overwater villas and serious manta-season access.",
  }),
  "coco-bodu-hithi": resort({
    type: "resort", priceLow: 1000, priceHigh: 2600, rooms: 100,
    features: { waterVillas: true, alcohol: true, diveCenter: true },
    transfer: { type: "speedboat", cost: 280, time: "35 min" },
    bookingName: "Coco Bodu Hithi",
    inclusion: "BB", guestType: "couples",
    editorial: "Adults-leaning 5★ with the country's longest infinity-edge pool and a 35-min private speedboat from MLE.",
  }),
  "the-sun-siyam-iru-fushi": resort({
    type: "resort", priceLow: 900, priceHigh: 2200, rooms: 221,
    features: { waterVillas: true, alcohol: true, childFriendly: true, diveCenter: true, allInclusive: true },
    transfer: { type: "seaplane", cost: 750, time: "45 min" },
    bookingName: "The Sun Siyam Iru Fushi",
    inclusion: "AI", guestType: "mixed",
    editorial: "All-inclusive 5★ on a long Noonu island with a strong dive program and Manta season nearby.",
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
