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

const PLACEHOLDER_PREFIX =
  "Editorial content coming. ";

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
      PLACEHOLDER_PREFIX +
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
      PLACEHOLDER_PREFIX +
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
      PLACEHOLDER_PREFIX +
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
      PLACEHOLDER_PREFIX +
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
      PLACEHOLDER_PREFIX +
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
      PLACEHOLDER_PREFIX +
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
      PLACEHOLDER_PREFIX +
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
      PLACEHOLDER_PREFIX +
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
      PLACEHOLDER_PREFIX +
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
      PLACEHOLDER_PREFIX +
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
      PLACEHOLDER_PREFIX +
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
      PLACEHOLDER_PREFIX +
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
      PLACEHOLDER_PREFIX +
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
      PLACEHOLDER_PREFIX +
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
      PLACEHOLDER_PREFIX +
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
      PLACEHOLDER_PREFIX +
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
      PLACEHOLDER_PREFIX +
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
      PLACEHOLDER_PREFIX +
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
    editorialTake: PLACEHOLDER_PREFIX + d.editorial,
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
    editorial: "All-inclusive 4★ best known for the Lohi's surf break right offshore. 215 villas across beach and overwater.",
  }),
  "reethi-beach-resort": resort({
    type: "resort", priceLow: 240, priceHigh: 480, rooms: 130,
    features: { alcohol: true, childFriendly: true, diveCenter: true, allInclusive: false },
    transfer: { type: "domestic-flight+speedboat", cost: 250, time: "30 min flight + 20 min boat" },
    bookingName: "Reethi Beach Resort Maldives",
    inclusion: "HB", guestType: "families",
    editorial: "Long-running 4★ in the Baa biosphere. Reasonable rates and manta access in season (May–Nov at Hanifaru).",
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
    editorial: "House-reef-famous 4★ in South Ari. Whale shark and manta excursions a short hop away.",
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
    editorial: "Twin-island 5★ home of the Ithaa underwater restaurant. Long-haul-couple favourite.",
  }),
  "niyama-private-islands": resort({
    type: "resort", priceLow: 1100, priceHigh: 3000, rooms: 134,
    features: { waterVillas: true, alcohol: true, childFriendly: true, diveCenter: true },
    transfer: { type: "seaplane", cost: 800, time: "40 min" },
    bookingName: "Niyama Private Islands Maldives",
    inclusion: "BB", guestType: "couples",
    editorial: "Two-island 5★ with the Subsix underwater nightclub and a fast-paced food/drink scene.",
  }),
  "constance-halaveli": resort({
    type: "resort", priceLow: 950, priceHigh: 2800, rooms: 86,
    features: { waterVillas: true, alcohol: true, diveCenter: true },
    transfer: { type: "seaplane", cost: 700, time: "25 min" },
    bookingName: "Constance Halaveli Maldives",
    inclusion: "BB", guestType: "honeymooners",
    editorial: "Crescent-shaped island 5★ with overwater villas, dhoni-style architecture, and Constance signature service.",
  }),
  "anantara-veli": resort({
    type: "resort", priceLow: 850, priceHigh: 2200, rooms: 67,
    features: { waterVillas: true, alcohol: true, diveCenter: true },
    transfer: { type: "speedboat", cost: 200, time: "30 min" },
    bookingName: "Anantara Veli Maldives Resort",
    inclusion: "BB", guestType: "couples",
    editorial: "Adults-only 5★ a 30-minute speedboat from MLE — the closest reach to a luxury Maldives.",
  }),
  "six-senses-laamu": resort({
    type: "resort", priceLow: 1400, priceHigh: 3500, rooms: 97,
    features: { waterVillas: true, alcohol: true, diveCenter: true, surfAccess: true },
    transfer: { type: "domestic-flight+speedboat", cost: 600, time: "1 hr flight + 15 min boat" },
    bookingName: "Six Senses Laamu",
    inclusion: "BB", guestType: "surfers",
    editorial: "Far-south 5★ with the most consistent right-hander surf in the country (Yin Yang).",
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
    editorial: "Long-running 5★, 25-min speedboat from MLE. Adults-leaning, intimate, classic Maldives.",
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
    transfer: { type: "speedboat", cost: 280, time: "40 min" },
    bookingName: "Coco Bodu Hithi",
    inclusion: "BB", guestType: "couples",
    editorial: "Adults-leaning 5★ with the country's longest infinity-edge pool and a 40-min transfer.",
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
    type: "resort", priceLow: 3200, priceHigh: 12000, rooms: 65,
    features: { waterVillas: true, houseReef: true, alcohol: true, childFriendly: true, diveCenter: true },
    transfer: { type: "seaplane", cost: 1100, time: "30 min" },
    bookingName: "Soneva Fushi",
    inclusion: "BB", guestType: "honeymooners",
    editorial: "Original barefoot-luxury 6★ in the Baa biosphere. Observatory, water slides, manta access.",
  }),
  "soneva-jani": resort({
    type: "resort", priceLow: 3800, priceHigh: 14000, rooms: 52,
    features: { waterVillas: true, alcohol: true, childFriendly: true, diveCenter: true },
    transfer: { type: "seaplane", cost: 1300, time: "40 min" },
    bookingName: "Soneva Jani",
    inclusion: "BB", guestType: "honeymooners",
    editorial: "Sister to Soneva Fushi — overwater villas with private water slides, far-north Noonu setting.",
  }),
  "cheval-blanc-randheli": resort({
    type: "resort", priceLow: 4200, priceHigh: 18000, rooms: 45,
    features: { waterVillas: true, alcohol: true, diveCenter: true },
    transfer: { type: "seaplane", cost: 1500, time: "45 min" },
    bookingName: "Cheval Blanc Randheli",
    inclusion: "BB", guestType: "honeymooners",
    editorial: "LVMH-owned 6★ with a private-jet-friendly seaplane terminal and Guerlain spa.",
  }),
  "waldorf-astoria-maldives-ithaafushi": resort({
    type: "resort", priceLow: 3600, priceHigh: 30000, rooms: 122,
    features: { waterVillas: true, alcohol: true, childFriendly: true, diveCenter: true },
    transfer: { type: "speedboat", cost: 600, time: "45 min" },
    bookingName: "Waldorf Astoria Maldives Ithaafushi",
    inclusion: "BB", guestType: "honeymooners",
    editorial: "Three-island 6★ with the country's largest private-island residence and 45-min transfer.",
  }),
  "one-and-only-reethi-rah": resort({
    type: "resort", priceLow: 4500, priceHigh: 18000, rooms: 130,
    features: { waterVillas: true, alcohol: true, childFriendly: true, diveCenter: true },
    transfer: { type: "speedboat", cost: 700, time: "45 min" },
    bookingName: "One and Only Reethi Rah",
    inclusion: "BB", guestType: "honeymooners",
    editorial: "Big-island 6★ with 12 distinct beaches and one of the largest spas in the country.",
  }),
  "joali-maldives": resort({
    type: "resort", priceLow: 3400, priceHigh: 14000, rooms: 73,
    features: { waterVillas: true, alcohol: true, diveCenter: true },
    transfer: { type: "seaplane", cost: 1300, time: "40 min" },
    bookingName: "Joali Maldives",
    inclusion: "BB", guestType: "honeymooners",
    editorial: "Art-forward 6★ with site-specific installations and a strong design-magazine reputation.",
  }),
  "joali-being": resort({
    type: "resort", priceLow: 3600, priceHigh: 12000, rooms: 68,
    features: { waterVillas: true, alcohol: false },
    transfer: { type: "seaplane", cost: 1300, time: "40 min" },
    bookingName: "Joali Being Maldives",
    inclusion: "FB", guestType: "couples",
    editorial: "Sister wellness-only 6★. Programmed retreats, in-house naturopathy, no children.",
  }),
  "four-seasons-resort-landaa-giraavaru": resort({
    type: "resort", priceLow: 2800, priceHigh: 12000, rooms: 103,
    features: { waterVillas: true, alcohol: true, childFriendly: true, diveCenter: true },
    transfer: { type: "seaplane", cost: 950, time: "30 min" },
    bookingName: "Four Seasons Resort Maldives Landaa Giraavaru",
    inclusion: "BB", guestType: "families",
    editorial: "Big-island 6★ with the Manta Trust HQ on site and turtle hospital on the property.",
  }),
  "four-seasons-resort-kuda-huraa": resort({
    type: "resort", priceLow: 2500, priceHigh: 10000, rooms: 96,
    features: { waterVillas: true, alcohol: true, childFriendly: true, diveCenter: true, surfAccess: true },
    transfer: { type: "speedboat", cost: 350, time: "30 min" },
    bookingName: "Four Seasons Resort Maldives Kuda Huraa",
    inclusion: "BB", guestType: "families",
    editorial: "Closer-to-MLE 6★ sister to Landaa Giraavaru. 30-min speedboat or short seaplane.",
  }),
  "the-st-regis-maldives-vommuli": resort({
    type: "resort", priceLow: 2800, priceHigh: 12000, rooms: 77,
    features: { waterVillas: true, alcohol: true, childFriendly: true, diveCenter: true },
    transfer: { type: "domestic-flight+speedboat", cost: 800, time: "55 min flight + 10 min boat" },
    bookingName: "The St Regis Maldives Vommuli Resort",
    inclusion: "BB", guestType: "honeymooners",
    editorial: "St. Regis-flagship-level 6★ with butler service, signature whale-shape overwater villa, far south.",
  }),
};

Object.assign(stayDetails, midLuxUltra);

export function getStayDetail(slug: string): StayDetail | undefined {
  return stayDetails[slug];
}
