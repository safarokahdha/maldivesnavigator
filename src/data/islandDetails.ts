// Detail records for the Phase-1 launch islands.
//
// Per brief §8 — owner will write the editorial sections (whyGoHere,
// foodAndLife, cultureAndEtiquette, howToGetHere). Everything below is
// stubbed with placeholder copy clearly marked as such; the template
// renders an "[Editorial content coming]" tag wherever copy hasn't landed.
//
// Phase-2 islands (gulhi, hangnaameedhoo, hulhumale, huraa, dharavandhoo,
// ukulhas) get added in Day 10. Until then the destination page falls
// back gracefully on the base Island record.

import type { Tier } from "./stays";

export type IslandStyle =
  | "surf"
  | "dive"
  | "budget"
  | "luxury"
  | "local-island"
  | "wildlife"
  | "culture"
  | "family";

export type Essentials = {
  population: number;
  transferFromMale: string; // human-readable, e.g. "30 minutes"
  transferType: "speedboat" | "ferry" | "domestic-flight" | "seaplane" | "mixed";
  transferCost: number; // USD, one-way
  ferryDays: string[]; // e.g. ["Sun", "Tue", "Thu", "Sat"]
  nearestDiveSite: string;
  peakSeason: string; // e.g. "Nov–Apr"
  bikiniBeach: boolean;
};

export type MonthlyWeather = {
  month: string;
  avgC: number;
  rainDays: number;
  vibe: string; // 1-line note
};

export type IslandDetail = {
  tagline: string;
  tiers: Tier[];
  styles: IslandStyle[];
  essentials: Essentials;
  whyGoHere: string;
  thingsToDo: { title: string; journalSlug?: string }[];
  foodAndLife: string;
  cultureAndEtiquette: string;
  howToGetHere: { step: number; text: string }[];
  relatedJournalSlugs: string[];
};

// Generic Maldives monthly weather — applies to all islands at this v1.
// Owner can override per-island later if needed.
export const MALDIVES_WEATHER: MonthlyWeather[] = [
  { month: "Jan", avgC: 28, rainDays: 4, vibe: "Dry season — flat seas, peak visibility." },
  { month: "Feb", avgC: 28, rainDays: 3, vibe: "Driest month. High season." },
  { month: "Mar", avgC: 29, rainDays: 5, vibe: "Hot, calm, busy." },
  { month: "Apr", avgC: 29, rainDays: 7, vibe: "Last reliably dry month before monsoon." },
  { month: "May", avgC: 28, rainDays: 14, vibe: "Southwest monsoon arrives. Surf season starts." },
  { month: "Jun", avgC: 27, rainDays: 16, vibe: "Wet, windy, cheap. Surf at peak." },
  { month: "Jul", avgC: 27, rainDays: 14, vibe: "Showery, but mantas at Hanifaru." },
  { month: "Aug", avgC: 27, rainDays: 13, vibe: "Manta season peaks in Baa." },
  { month: "Sep", avgC: 27, rainDays: 14, vibe: "Wettest month. Lowest prices." },
  { month: "Oct", avgC: 28, rainDays: 13, vibe: "Monsoon easing. Shoulder rates." },
  { month: "Nov", avgC: 28, rainDays: 11, vibe: "Northeast monsoon takes over. Seas calm." },
  { month: "Dec", avgC: 28, rainDays: 7, vibe: "High season returns. Christmas peak." },
];

const PLACEHOLDER_NOTICE =
  "[Editorial content coming — owner-written copy lands before public launch.]";

export const islandDetails: Record<string, IslandDetail> = {
  // ============================================================
  // PHASE 1 — Maafushi (South Malé / Kaafu)
  // ============================================================
  maafushi: {
    tagline: "The most established budget island in the Maldives.",
    tiers: ["backpacker"],
    styles: ["budget", "local-island", "dive", "family"],
    essentials: {
      population: 3000,
      transferFromMale: "30 minutes",
      transferType: "speedboat",
      transferCost: 30,
      ferryDays: ["Sun", "Tue", "Thu", "Sat"],
      nearestDiveSite: "Maafushi Reef",
      peakSeason: "Nov–Apr",
      bikiniBeach: true,
    },
    whyGoHere: `Maafushi is a backpacker island in Kaafu Atoll. Editorial content coming. ${PLACEHOLDER_NOTICE}`,
    thingsToDo: [
      { title: "Snorkel the house reef" },
      { title: "Day-trip to a sandbank picnic" },
      { title: "Whale shark excursion to South Ari" },
      { title: "Sunset dolphin cruise" },
      { title: "Try a local meal at Symphony or Stingray" },
    ],
    foodAndLife: `Maafushi has guesthouse cafés, beach grills, and a few local-style places that serve mas-huni for breakfast and tuna curry by the bowl. Try Symphony Restaurant, Stingray Beach Café, and Arena Lounge. ${PLACEHOLDER_NOTICE}`,
    cultureAndEtiquette: `Maafushi is a local Maldivian island so dress modestly outside the bikini beach (shoulders + knees covered in the village). The bikini beach is at the south end of the island. Alcohol is not sold on the island; some tourist-licensed boats and floating bars sit just offshore. ${PLACEHOLDER_NOTICE}`,
    howToGetHere: [
      { step: 1, text: "Land at Velana International (MLE)." },
      { step: 2, text: "Take the airport speedboat or a tourist speedboat to Maafushi (~30 min, ~$30)." },
      { step: 3, text: "Or board the public ferry from Malé (Villingili Ferry Terminal) on Sun/Tue/Thu/Sat (~$2, 90 min)." },
      { step: 4, text: "Your guesthouse usually meets you at the jetty." },
    ],
    relatedJournalSlugs: [],
  },

  // ============================================================
  // PHASE 1 — Thulusdhoo (North Malé / Kaafu)
  // ============================================================
  thulusdhoo: {
    tagline: "The Maldivian surf island. Coke's and Chickens off the same beach.",
    tiers: ["backpacker"],
    styles: ["surf", "local-island"],
    essentials: {
      population: 1900,
      transferFromMale: "1 hour by ferry, 30 min by speedboat",
      transferType: "mixed",
      transferCost: 30,
      ferryDays: ["Sun", "Tue", "Thu"],
      nearestDiveSite: "Coke's Reef",
      peakSeason: "Mar–Oct (surf), Nov–Apr (general)",
      bikiniBeach: true,
    },
    whyGoHere: `Thulusdhoo is a surf island in North Malé Atoll. Editorial content coming. ${PLACEHOLDER_NOTICE}`,
    thingsToDo: [
      { title: "Surf Coke's reef break" },
      { title: "Surf Chickens (left-hander across the channel)" },
      { title: "Snorkel the house reef" },
      { title: "Visit the Coca-Cola factory (the island is named after it locally)" },
      { title: "Sunset dolphin cruise" },
    ],
    foodAndLife: `Thulusdhoo runs slow and surf-shaped. Cafés open and close around session times. Try Sunrise Café for breakfast bowls, Boduberu for tuna curry, and the bakery near the harbour for fresh roshi. ${PLACEHOLDER_NOTICE}`,
    cultureAndEtiquette: `Local island — dress modestly in the village. Bikini beach is at the southern tip. No alcohol on the island. ${PLACEHOLDER_NOTICE}`,
    howToGetHere: [
      { step: 1, text: "Land at Velana International (MLE)." },
      { step: 2, text: "Speedboat from Malé (~$30, 30 min) — most surf camps include transfer in the package." },
      { step: 3, text: "Public ferry from Malé runs Sun/Tue/Thu (~$2, 1 hour)." },
    ],
    relatedJournalSlugs: [],
  },

  // ============================================================
  // PHASE 1 — Dhigurah (South Ari)
  // ============================================================
  dhigurah: {
    tagline: "Whale sharks year-round. A long sandy island in South Ari.",
    tiers: ["backpacker", "mid"],
    styles: ["dive", "wildlife", "budget", "local-island"],
    essentials: {
      population: 700,
      transferFromMale: "1.5 hours by speedboat, 4 hours by ferry",
      transferType: "speedboat",
      transferCost: 75,
      ferryDays: ["Sun", "Tue", "Thu"],
      nearestDiveSite: "South Ari MPA (whale shark zone)",
      peakSeason: "Year-round (whale sharks); Nov–Apr (general)",
      bikiniBeach: true,
    },
    whyGoHere: `Dhigurah is a dive-and-snorkel island in South Ari Atoll. Editorial content coming. ${PLACEHOLDER_NOTICE}`,
    thingsToDo: [
      { title: "Snorkel with whale sharks" },
      { title: "Manta cleaning station dives" },
      { title: "Walk the long sandbank at the island's south tip" },
      { title: "Bioluminescent plankton at night (seasonal)" },
      { title: "Sunset cruise" },
    ],
    foodAndLife: `Dhigurah is small. A handful of guesthouse restaurants serve breakfast pancakes and curry-rice dinners. Coconut Café, Aveyla, and Boutique Beach are reliable. ${PLACEHOLDER_NOTICE}`,
    cultureAndEtiquette: `Local island. Bikini beach at the southern end (a 10-minute walk from the village). Dress modestly in the village. ${PLACEHOLDER_NOTICE}`,
    howToGetHere: [
      { step: 1, text: "Land at Velana International (MLE)." },
      { step: 2, text: "Speedboat from Malé (~$75, 1.5 hours) — most guesthouses arrange this." },
      { step: 3, text: "Or domestic flight to Maamigili (~$120, 25 min) + 10-min boat ride." },
      { step: 4, text: "Or public ferry from Malé via Mahibadhoo (~$5, 4 hours, Sun/Tue/Thu)." },
    ],
    relatedJournalSlugs: [],
  },

  // ============================================================
  // PHASE 1 — Rasdhoo (Rasdhoo Atoll / North Ari)
  // ============================================================
  rasdhoo: {
    tagline: "Hammerhead dives at dawn. Tiny island, huge reputation.",
    tiers: ["backpacker", "mid"],
    styles: ["dive", "wildlife", "local-island"],
    essentials: {
      population: 1400,
      transferFromMale: "1 hour by speedboat",
      transferType: "speedboat",
      transferCost: 65,
      ferryDays: ["Sun", "Tue", "Thu"],
      nearestDiveSite: "Hammerhead Point (Madivaru)",
      peakSeason: "Nov–Apr",
      bikiniBeach: true,
    },
    whyGoHere: `Rasdhoo is a dive island in Rasdhoo Atoll. Editorial content coming. ${PLACEHOLDER_NOTICE}`,
    thingsToDo: [
      { title: "Hammerhead dive at sunrise (Madivaru)" },
      { title: "Manta and whale-shark trips to South Ari" },
      { title: "Sandbank picnic at Madivaru Finolhu" },
      { title: "Snorkel the eastern house reef" },
      { title: "Boduberu drum night (ask at your guesthouse)" },
    ],
    foodAndLife: `Rasdhoo is genuinely tiny — under a kilometre across. Most guesthouses serve full board. Reef Edge and Banana Beach café handle drop-ins. ${PLACEHOLDER_NOTICE}`,
    cultureAndEtiquette: `Local island. Cover up in the village; dedicated bikini beach on the eastern side. Friday is the quiet day; many shops close around prayer time. ${PLACEHOLDER_NOTICE}`,
    howToGetHere: [
      { step: 1, text: "Land at Velana International (MLE)." },
      { step: 2, text: "Speedboat from Malé (~$65, 1 hour) — typically arranged by your guesthouse." },
      { step: 3, text: "Public ferry from Malé via Mahibadhoo (~$5, 3.5 hours, Sun/Tue/Thu)." },
    ],
    relatedJournalSlugs: [],
  },

  // ============================================================
  // PHASE 1 — Fulidhoo (Vaavu)
  // ============================================================
  fulidhoo: {
    tagline: "Stingrays at sunset, nurse sharks at night, Boduberu drums after dark.",
    tiers: ["backpacker"],
    styles: ["wildlife", "culture", "local-island", "budget"],
    essentials: {
      population: 400,
      transferFromMale: "1.5 hours by ferry, 1 hour by speedboat",
      transferType: "mixed",
      transferCost: 40,
      ferryDays: ["Sun", "Tue", "Thu"],
      nearestDiveSite: "Alimatha Wreck (nurse sharks)",
      peakSeason: "Nov–Apr",
      bikiniBeach: true,
    },
    whyGoHere: `Fulidhoo is a quiet local island in Vaavu Atoll. Editorial content coming. ${PLACEHOLDER_NOTICE}`,
    thingsToDo: [
      { title: "Stingray feeding on the beach at sunset" },
      { title: "Night snorkel with nurse sharks at Alimatha" },
      { title: "Manta encounters during peak season" },
      { title: "Boduberu drumming on the beach (Tue / Thu / Sat)" },
      { title: "Sandbank trip" },
    ],
    foodAndLife: `Fulidhoo is small enough to walk in fifteen minutes. Café Yellow, Thundi, and Fulidhoo Sunset serve guests. Catch of the day is usually whatever came in that morning. ${PLACEHOLDER_NOTICE}`,
    cultureAndEtiquette: `Local island. Bikini beach at the eastern tip. Boduberu drum sessions are open to visitors but stay respectful. Dress modestly in the village. ${PLACEHOLDER_NOTICE}`,
    howToGetHere: [
      { step: 1, text: "Land at Velana International (MLE)." },
      { step: 2, text: "Speedboat from Malé (~$40, 1 hour) — arranged by your guesthouse." },
      { step: 3, text: "Public ferry from Malé (~$3, 1.5 hours, Sun/Tue/Thu)." },
    ],
    relatedJournalSlugs: [],
  },

  // ============================================================
  // PHASE 2 — Gulhi (South Malé / Kaafu)
  // ============================================================
  gulhi: {
    tagline: "The quieter neighbour to Maafushi.",
    tiers: ["backpacker"],
    styles: ["budget", "local-island", "family"],
    essentials: {
      population: 800,
      transferFromMale: "25 minutes",
      transferType: "speedboat",
      transferCost: 25,
      ferryDays: ["Sun", "Tue", "Thu", "Sat"],
      nearestDiveSite: "Gulhi Corner",
      peakSeason: "Nov–Apr",
      bikiniBeach: true,
    },
    whyGoHere: `Gulhi is a backpacker island in Kaafu Atoll. Editorial content coming. ${PLACEHOLDER_NOTICE}`,
    thingsToDo: [
      { title: "Lagoon snorkel from the bikini beach" },
      { title: "Sandbank picnic between Gulhi and Maafushi" },
      { title: "Half-day dive at Gulhi Corner" },
      { title: "Sunset dolphin cruise" },
    ],
    foodAndLife: `Gulhi is small and quiet. A handful of guesthouse cafés serve breakfast and Maldivian dinners. White Shell, Ocean Pearl, and Velana feature regularly in guest reviews. ${PLACEHOLDER_NOTICE}`,
    cultureAndEtiquette: `Local island — dress modestly in the village. Bikini beach at the southern end. Friday is the quiet day. ${PLACEHOLDER_NOTICE}`,
    howToGetHere: [
      { step: 1, text: "Land at Velana International (MLE)." },
      { step: 2, text: "Speedboat from Malé (~$25, 25 min) — most guesthouses arrange." },
      { step: 3, text: "Or public ferry from Malé (~$2, 70 min) on Sun/Tue/Thu/Sat." },
    ],
    relatedJournalSlugs: [],
  },

  // ============================================================
  // PHASE 2 — Hangnaameedhoo (South Ari)
  // ============================================================
  hangnaameedhoo: {
    tagline: "Whale sharks, mantas, and a fraction of Dhigurah's crowd.",
    tiers: ["backpacker", "mid"],
    styles: ["dive", "wildlife", "local-island"],
    essentials: {
      population: 700,
      transferFromMale: "1.5 hours by speedboat",
      transferType: "speedboat",
      transferCost: 80,
      ferryDays: ["Sun", "Tue", "Thu"],
      nearestDiveSite: "South Ari MPA",
      peakSeason: "Year-round (whale sharks)",
      bikiniBeach: true,
    },
    whyGoHere: `Hangnaameedhoo is a dive island in South Ari Atoll. Editorial content coming. ${PLACEHOLDER_NOTICE}`,
    thingsToDo: [
      { title: "Snorkel with whale sharks in South Ari MPA" },
      { title: "Manta cleaning station dives" },
      { title: "Sandbank trips" },
      { title: "Night dives on the house reef" },
    ],
    foodAndLife: `A handful of small dive lodges and guesthouses run their own kitchens. ${PLACEHOLDER_NOTICE}`,
    cultureAndEtiquette: `Local island. Bikini beach designated. Modest dress in the village. ${PLACEHOLDER_NOTICE}`,
    howToGetHere: [
      { step: 1, text: "Land at Velana International (MLE)." },
      { step: 2, text: "Speedboat from Malé (~$80, 1.5 hr)." },
      { step: 3, text: "Or domestic flight to Maamigili + boat (~25 min flight + 15 min boat)." },
    ],
    relatedJournalSlugs: [],
  },

  // ============================================================
  // PHASE 2 — Hulhumalé (transit gateway, Kaafu)
  // ============================================================
  hulhumale: {
    tagline: "Walk from the airport. Reset, sleep, and ferry out the next morning.",
    tiers: ["backpacker", "mid"],
    styles: ["local-island"],
    essentials: {
      population: 50000,
      transferFromMale: "Walk or 5-minute taxi from MLE airport",
      transferType: "speedboat",
      transferCost: 0,
      ferryDays: [],
      nearestDiveSite: "—",
      peakSeason: "Year-round (transit)",
      bikiniBeach: false,
    },
    whyGoHere: `Hulhumalé is a transit gateway island in Kaafu Atoll. Editorial content coming. ${PLACEHOLDER_NOTICE}`,
    thingsToDo: [
      { title: "Walk Hulhumalé Beach in the evening" },
      { title: "Eat at Symphony or Stop Café" },
      { title: "Transit storage to leave bags before a 6am ferry" },
      { title: "Same-day day trip to Malé (bus across the bridge)" },
    ],
    foodAndLife: `Hulhumalé runs at city pace — cafés, restaurants, supermarkets, all inside walking distance. ${PLACEHOLDER_NOTICE}`,
    cultureAndEtiquette: `Reclaimed urban island. There is no dedicated bikini beach; the public beach allows swimsuits in the marked tourist zone only. Modest dress elsewhere. ${PLACEHOLDER_NOTICE}`,
    howToGetHere: [
      { step: 1, text: "Land at Velana International (MLE) on Hulhulé island." },
      { step: 2, text: "Take the airport bus (~$1, frequent) or a taxi (~$10–15) across the Sinamalé causeway to Hulhumalé. Walking is technically possible (~3 km, no pedestrian path) but not realistic with luggage." },
      { step: 3, text: "All Hulhumalé guesthouses are within a 10-min taxi from the causeway." },
    ],
    relatedJournalSlugs: [],
  },

  // ============================================================
  // PHASE 2 — Huraa (North Malé / Kaafu)
  // ============================================================
  huraa: {
    tagline: "Cheap base with Four Seasons reef minutes away.",
    tiers: ["backpacker"],
    styles: ["local-island", "budget", "dive"],
    essentials: {
      population: 1100,
      transferFromMale: "30 minutes by speedboat",
      transferType: "speedboat",
      transferCost: 30,
      ferryDays: ["Sun", "Tue", "Thu"],
      nearestDiveSite: "Huraa Reef / Kuda Huraa channel",
      peakSeason: "Nov–Apr",
      bikiniBeach: true,
    },
    whyGoHere: `Huraa is a small North Malé local island. Editorial content coming. ${PLACEHOLDER_NOTICE}`,
    thingsToDo: [
      { title: "Snorkel the channel between Huraa and Four Seasons Kuda Huraa" },
      { title: "Sunset dolphin cruise" },
      { title: "Half-day dive trip" },
    ],
    foodAndLife: `Huraa runs slow. A handful of small guesthouse cafés. Easy day trips to Malé for a wider menu. ${PLACEHOLDER_NOTICE}`,
    cultureAndEtiquette: `Local island. Bikini beach at the eastern tip. Modest dress in the village. ${PLACEHOLDER_NOTICE}`,
    howToGetHere: [
      { step: 1, text: "Land at Velana International (MLE)." },
      { step: 2, text: "Speedboat from Malé (~$30, 30 min)." },
      { step: 3, text: "Public ferry runs Sun/Tue/Thu (~$2, 90 min)." },
    ],
    relatedJournalSlugs: [],
  },

  // ============================================================
  // PHASE 2 — Dharavandhoo (Baa)
  // ============================================================
  dharavandhoo: {
    tagline: "The Baa-Atoll local island that anchors Hanifaru Bay manta visits.",
    tiers: ["backpacker", "mid"],
    styles: ["dive", "wildlife", "local-island"],
    essentials: {
      population: 700,
      transferFromMale: "25 minutes by domestic flight",
      transferType: "domestic-flight",
      transferCost: 200,
      ferryDays: ["Sun", "Tue"],
      nearestDiveSite: "Hanifaru Bay (manta aggregation, May–Nov)",
      peakSeason: "Aug–Oct (manta peak), Nov–Apr (general)",
      bikiniBeach: true,
    },
    whyGoHere: `Dharavandhoo is a Baa-Atoll dive island. Editorial content coming. ${PLACEHOLDER_NOTICE}`,
    thingsToDo: [
      { title: "Snorkel with mantas at Hanifaru Bay (May–Nov)" },
      { title: "Reef dives in the UNESCO Baa Biosphere" },
      { title: "Whale-shark trips to South Ari (long day)" },
      { title: "Sunset cruise" },
    ],
    foodAndLife: `Small island, small food scene. Most guesthouses run half-board kitchens. ${PLACEHOLDER_NOTICE}`,
    cultureAndEtiquette: `Local island. Bikini beach designated. Modest dress in the village. Hanifaru Bay regulated — book through a licensed operator. ${PLACEHOLDER_NOTICE}`,
    howToGetHere: [
      { step: 1, text: "Land at Velana International (MLE)." },
      { step: 2, text: "Domestic flight to Dharavandhoo Airport (~$200 round trip, 25 min)." },
      { step: 3, text: "Walk or short transfer from the airport — the airport is on the island." },
    ],
    relatedJournalSlugs: [],
  },

  // ============================================================
  // PHASE 2 — Ukulhas (North Ari)
  // ============================================================
  ukulhas: {
    tagline: "The cleanest local island in the country.",
    tiers: ["backpacker"],
    styles: ["local-island", "wildlife", "family"],
    essentials: {
      population: 1100,
      transferFromMale: "1.5 hours by speedboat",
      transferType: "speedboat",
      transferCost: 65,
      ferryDays: ["Sun", "Tue", "Thu"],
      nearestDiveSite: "Ukulhas Thila",
      peakSeason: "Nov–Apr",
      bikiniBeach: true,
    },
    whyGoHere: `Ukulhas is an eco-conscious local island in North Ari Atoll. Editorial content coming. ${PLACEHOLDER_NOTICE}`,
    thingsToDo: [
      { title: "Walk the powdery white-sand beach" },
      { title: "Snorkel the house reef from shore" },
      { title: "Sunset cruise with dolphin sightings" },
      { title: "Sandbank picnic" },
    ],
    foodAndLife: `Ukulhas runs proudly clean. Cafés serve simple Maldivian-meets-tourist menus. Repeatedly voted the cleanest local island in the country. ${PLACEHOLDER_NOTICE}`,
    cultureAndEtiquette: `Local island. Designated bikini beach. Strong waste-management culture — follow the bin-sorting, locals appreciate it. ${PLACEHOLDER_NOTICE}`,
    howToGetHere: [
      { step: 1, text: "Land at Velana International (MLE)." },
      { step: 2, text: "Speedboat from Malé (~$65, 1.5 hr)." },
      { step: 3, text: "Public ferry runs Sun/Tue/Thu (~$5, 4 hours)." },
    ],
    relatedJournalSlugs: [],
  },

  // ============================================================
  // PHASE 1 — Mathiveri (North Ari)
  // ============================================================
  mathiveri: {
    tagline: "A long sandbank, a quiet local island, and easy access to whale sharks.",
    tiers: ["backpacker"],
    styles: ["local-island", "wildlife", "budget"],
    essentials: {
      population: 800,
      transferFromMale: "1.5 hours by speedboat, 4 hours by ferry",
      transferType: "speedboat",
      transferCost: 70,
      ferryDays: ["Sun", "Tue", "Thu"],
      nearestDiveSite: "Mathiveri Thila",
      peakSeason: "Nov–Apr",
      bikiniBeach: true,
    },
    whyGoHere: `Mathiveri is a local island in North Ari Atoll. Editorial content coming. ${PLACEHOLDER_NOTICE}`,
    thingsToDo: [
      { title: "Walk the long sandbank off the island's tip" },
      { title: "Snorkel with whale sharks in South Ari (excursion)" },
      { title: "Manta ray cleaning station dives" },
      { title: "Sunset dolphin cruise" },
      { title: "Cycle the village" },
    ],
    foodAndLife: `Mathiveri runs at local-island pace. A few guesthouse restaurants and a couple of cafés serving short eats. Lucky Hiya and Velhi Beach are common stops. ${PLACEHOLDER_NOTICE}`,
    cultureAndEtiquette: `Local island. Bikini beach at the western tip. Cover up in the village. ${PLACEHOLDER_NOTICE}`,
    howToGetHere: [
      { step: 1, text: "Land at Velana International (MLE)." },
      { step: 2, text: "Speedboat from Malé (~$70, 1.5 hours) — most guesthouses arrange this." },
      { step: 3, text: "Or domestic flight to Maamigili (~$120, 25 min) + boat transfer." },
      { step: 4, text: "Or public ferry from Malé via Rasdhoo (~$5, 4 hours, Sun/Tue/Thu)." },
    ],
    relatedJournalSlugs: [],
  },
};

export function getIslandDetail(slug: string): IslandDetail | undefined {
  return islandDetails[slug];
}
