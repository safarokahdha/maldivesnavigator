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
  { month: "Jul", avgC: 27, rainDays: 14, vibe: "Showery. Surf still firing." },
  { month: "Aug", avgC: 27, rainDays: 13, vibe: "Wet but warm. Plankton blooms feed mantas." },
  { month: "Sep", avgC: 27, rainDays: 14, vibe: "Wettest month. Lowest prices." },
  { month: "Oct", avgC: 28, rainDays: 13, vibe: "Monsoon easing. Shoulder rates." },
  { month: "Nov", avgC: 28, rainDays: 11, vibe: "Northeast monsoon takes over. Seas calm." },
  { month: "Dec", avgC: 28, rainDays: 7, vibe: "High season returns. Christmas peak." },
];

// Empty notice so islands without bespoke copy show only the surrounding
// real content, not a "coming soon" interjection. Owner copy fills in over
// time per audit-fixes 2026-05 §3.3.
const PLACEHOLDER_NOTICE = "";

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
    whyGoHere: `Maafushi is the island that quietly broke the resort monopoly. After local-island tourism opened up in 2010, this 1.2 km strip in South Malé filled with guesthouses, dive shops and breakfast cafés — and the rest of the country followed its template. It's the easiest, cheapest, fastest taste of Maldives life if you're flying in for the first time and don't have weeks to spare. Speedboat from the airport is half an hour, the bikini beach is at the south end, the village has supermarkets, ATMs and proper roads, and excursions (sandbank picnics, snorkel-with-whale-sharks day trips, dolphin cruises) are bookable from any guesthouse front desk. It's also the busiest local island, which means it's lost some of the quiet of, say, Fulidhoo — but you get a full Maldives day-on-the-water for under $80.`,
    thingsToDo: [
      { title: "Snorkel the house reef" },
      { title: "Day-trip to a sandbank picnic" },
      { title: "Whale shark excursion to South Ari" },
      { title: "Sunset dolphin cruise" },
      { title: "Try a local meal at Symphony or Stingray" },
    ],
    foodAndLife: `Maafushi has guesthouse cafés, beach grills, and a few local-style places that serve mas-huni for breakfast and tuna curry by the bowl. Try Symphony Restaurant, Stingray Beach Café, and Arena Lounge.`,
    cultureAndEtiquette: `Maafushi is a local Maldivian island so dress modestly outside the bikini beach (shoulders + knees covered in the village). The bikini beach is at the south end of the island. Alcohol is not sold on the island; some tourist-licensed boats and floating bars sit just offshore.`,
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
    whyGoHere: `Thulusdhoo is the surf town. Two world-class right-handers — Coke's and Chickens — break off the same north-east tip, and you can paddle to one and boat ten minutes to the other. The island itself is small, walkable and largely unbothered by mass tourism: a bakery, a Coca-Cola bottling plant (the actual reason it's called Thulusdhoo locally), a few dive shops, and a row of guesthouses sized for surfers who don't mind a fan-cooled room. Season runs March through October — June and July are the most reliable, with overhead chest-high days. Outside swell windows, it's a competent dive island too: drift dives in the Malé atolls, an outer-reef wall ten minutes out. If you want surf without the resort price, this is where you stay.`,
    thingsToDo: [
      { title: "Surf Coke's reef break" },
      { title: "Surf Chickens (left-hander across the channel)" },
      { title: "Snorkel the house reef" },
      { title: "Visit the Coca-Cola factory (the island is named after it locally)" },
      { title: "Sunset dolphin cruise" },
    ],
    foodAndLife: `Thulusdhoo runs slow and surf-shaped. Cafés open and close around session times. Try Sunrise Café for breakfast bowls, Boduberu for tuna curry, and the bakery near the harbour for fresh roshi.`,
    cultureAndEtiquette: `Local island — dress modestly in the village. Bikini beach is at the southern tip. No alcohol on the island.`,
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
    whyGoHere: `Dhigurah is one of the very few places on the planet where you can snorkel with whale sharks year-round. The island sits inside the South Ari Marine Protected Area, and the channel between Dhigurah and Maamigili is a permanent feeding station for juveniles — sightings aren't a season, they're a Wednesday. Add manta cleaning stations 20 minutes by boat, soft-coral pinnacles for divers, and a 3 km strip of empty white sand along the south end and you understand why dive lodges keep opening here while local-island tourism on Maafushi has plateaued. It's quieter, less polished, more focused: most guests come on a 5–7 night dive package and leave fitter and tanned. Bikini beach is at the southern tip; village life sits at the north.`,
    thingsToDo: [
      { title: "Snorkel with whale sharks" },
      { title: "Manta cleaning station dives" },
      { title: "Walk the long sandbank at the island's south tip" },
      { title: "Bioluminescent plankton at night (seasonal)" },
      { title: "Sunset cruise" },
    ],
    foodAndLife: `Dhigurah is small. A handful of guesthouse restaurants serve breakfast pancakes and curry-rice dinners. Coconut Café, Aveyla, and Boutique Beach are reliable.`,
    cultureAndEtiquette: `Local island. Bikini beach at the southern end (a 10-minute walk from the village). Dress modestly in the village.`,
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
    whyGoHere: `Rasdhoo is the hammerhead island. From November through May, divers wake at 5am and motor out to Madivaru Corner, the channel where scalloped hammerheads patrol just before sunrise — one of the only consistent dawn-shark dives anywhere in Asia. Outside that window it's still a serious atoll for advanced divers (Kuramathi Outside, Madivaru Manta Point) and a quiet local island the rest of the day. The island is small, friendly, and pleasantly unbothered: one main street, a couple of cafés, a 700-person village. Pair it with Mathiveri or Ukulhas if you want a slow week of dives without seeing a resort buggy.`,
    thingsToDo: [
      { title: "Hammerhead dive at sunrise (Madivaru)" },
      { title: "Manta and whale-shark trips to South Ari" },
      { title: "Sandbank picnic at Madivaru Finolhu" },
      { title: "Snorkel the eastern house reef" },
      { title: "Boduberu drum night (ask at your guesthouse)" },
    ],
    foodAndLife: `Rasdhoo is genuinely tiny — under a kilometre across. Most guesthouses serve full board. Reef Edge and Banana Beach café handle drop-ins.`,
    cultureAndEtiquette: `Local island. Cover up in the village; dedicated bikini beach on the eastern side. Friday is the quiet day; many shops close around prayer time.`,
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
    whyGoHere: `Fulidhoo is the slow island. Three streets, white-sand lanes lined with coral walls, no cars, a couple of cafés that close when the kitchen runs out of fish — and a house reef that drops to a wall ten metres out. Vaavu Atoll sees roughly a tenth of Kaafu's traffic, so a stay here feels closer to what local-island tourism looked like a decade ago. The pull beyond the atmosphere is the diving: nurse-shark night dives at Alimathaa, hammerheads at Fotteyo Kandu, and a manta cleaning station 30 minutes out by dhoni. Bring books, plan to do nothing, accept that the boduberu drum sessions on the beach are the evening's main event.`,
    thingsToDo: [
      { title: "Stingray feeding on the beach at sunset" },
      { title: "Night snorkel with nurse sharks at Alimatha" },
      { title: "Manta encounters during peak season" },
      { title: "Boduberu drumming on the beach (Tue / Thu / Sat)" },
      { title: "Sandbank trip" },
    ],
    foodAndLife: `Fulidhoo is small enough to walk in fifteen minutes. Café Yellow, Thundi, and Fulidhoo Sunset serve guests. Catch of the day is usually whatever came in that morning.`,
    cultureAndEtiquette: `Local island. Bikini beach at the eastern tip. Boduberu drum sessions are open to visitors but stay respectful. Dress modestly in the village.`,
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
    whyGoHere: `Gulhi is what Maafushi was a decade ago: half the size, a tenth of the crowd, the same turquoise lagoon. About 1,000 people live here, the village fits in your morning walk, and the bikini beach is wide enough that you can pick an empty stretch even in February. Practically, you trade convenience for quiet — fewer dive shops, smaller excursion menu, less English on signs — but the cost drops too, and the speedboat from MLE is the same 30 minutes. Go for the day from Maafushi and you'll find yourself looking for a guesthouse to come back to.`,
    thingsToDo: [
      { title: "Lagoon snorkel from the bikini beach" },
      { title: "Sandbank picnic between Gulhi and Maafushi" },
      { title: "Half-day dive at Gulhi Corner" },
      { title: "Sunset dolphin cruise" },
    ],
    foodAndLife: `Gulhi is small and quiet. A handful of guesthouse cafés serve breakfast and Maldivian dinners. White Shell, Ocean Pearl, and Velana feature regularly in guest reviews.`,
    cultureAndEtiquette: `Local island — dress modestly in the village. Bikini beach at the southern end. Friday is the quiet day.`,
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
    whyGoHere: `Hangnaameedhoo is Dhigurah's quieter neighbour: the same South Ari MPA, the same year-round whale-shark channel a short boat ride away, fewer dive lodges and almost no other guests. The village is tiny — roughly 600 people — but a 4-room dive boutique and a couple of family-run guesthouses keep things very low-key. Use it as a base if Dhigurah is full, or pair it with two nights on Dhigurah for a contrast: the diving menu is identical, the evenings are quieter, and the guesthouse owners tend to remember your name by day two.`,
    thingsToDo: [
      { title: "Snorkel with whale sharks in South Ari MPA" },
      { title: "Manta cleaning station dives" },
      { title: "Sandbank trips" },
      { title: "Night dives on the house reef" },
    ],
    foodAndLife: `A handful of small dive lodges and guesthouses run their own kitchens.`,
    cultureAndEtiquette: `Local island. Bikini beach designated. Modest dress in the village.`,
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
    whyGoHere: `Hulhumalé is the urban side of the Maldives — a planned, reclaimed island connected to Velana International Airport (on Hulhulé) and Malé by a 2.1 km causeway. It exists for two reasons: housing for greater Malé, and a transit base for travellers with awkward arrival/departure times. The beach is functional rather than beautiful, the cafés are city cafés, and the public-bus network actually works. Stay one night to break a long flight, eat well at Symphony or Stop Café, take the bus to Malé in the morning, and catch your onward speedboat from there. As a destination, it's not why you flew here — but it's an honest, useful piece of how the country actually works.`,
    thingsToDo: [
      { title: "Walk Hulhumalé Beach in the evening" },
      { title: "Eat at Symphony or Stop Café" },
      { title: "Transit storage to leave bags before a 6am ferry" },
      { title: "Same-day day trip to Malé (bus across the bridge)" },
    ],
    foodAndLife: `Hulhumalé runs at city pace — cafés, restaurants, supermarkets, all inside walking distance.`,
    cultureAndEtiquette: `Reclaimed urban island. There is no dedicated bikini beach; the public beach allows swimsuits in the marked tourist zone only. Modest dress elsewhere.`,
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
    whyGoHere: `Huraa is a small, quiet North Malé island that punches above its weight on diving. The Four Seasons reef sits a few minutes away, the channels around Bandos and Kuda Bandos are excellent drift dives, and you reach all of it without paying resort prices. The village (~1,100 people) is unfussy: family guesthouses, a couple of cafés, kids playing football on the harbour wall in the evening. Speedboat from MLE is 30 minutes. It's a good shoulder-of-trip stay if you've already done Maafushi or want a base closer to MLE for a 4–5 day window.`,
    thingsToDo: [
      { title: "Snorkel the channel between Huraa and Four Seasons Kuda Huraa" },
      { title: "Sunset dolphin cruise" },
      { title: "Half-day dive trip" },
    ],
    foodAndLife: `Huraa runs slow. A handful of small guesthouse cafés. Easy day trips to Malé for a wider menu.`,
    cultureAndEtiquette: `Local island. Bikini beach at the eastern tip. Modest dress in the village.`,
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
    whyGoHere: `Dharavandhoo is the local-island gateway to Hanifaru Bay — a UNESCO Biosphere Reserve and one of the largest manta-ray feeding aggregations on earth. From May through November, when plankton blooms drive currents into the bay, manta counts can hit 100+ animals in a single afternoon, and snorkelling is regulated through licensed operators that depart from this island. Outside manta season, Baa Atoll is still extraordinary: Vakkaru's house reef, deep walls, and the kind of clear water that rewards a 30 m visibility day. The island has a domestic airport on it (the only one in the area), four-five guesthouses, and the patient pace of a place that knows its main season runs half the year.`,
    thingsToDo: [
      { title: "Snorkel with mantas at Hanifaru Bay (May–Nov)" },
      { title: "Reef dives in the UNESCO Baa Biosphere" },
      { title: "Whale-shark trips to South Ari (long day)" },
      { title: "Sunset cruise" },
    ],
    foodAndLife: `Small island, small food scene. Most guesthouses run half-board kitchens.`,
    cultureAndEtiquette: `Local island. Bikini beach designated. Modest dress in the village. Hanifaru Bay regulated — book through a licensed operator.`,
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
    whyGoHere: `Ukulhas is the cleanest local island in the country and quietly proud of it. Long before greenwashing became standard, the council here ran a strict waste-segregation program, banned plastic bags, and turned its lanes into the kind of tidy, swept, white-coral streets you see in tourism photos and almost never in real life. Beyond the cleanliness, the diving is genuinely good — manta cleaning stations 30 minutes out, drift dives along the atoll edge, the same South Ari whale-shark channel a longer boat ride south. It's a quiet, friendly, slightly-grown-up alternative to Maafushi: more divers, fewer party-boat day trips, better food in the village.`,
    thingsToDo: [
      { title: "Walk the powdery white-sand beach" },
      { title: "Snorkel the house reef from shore" },
      { title: "Sunset cruise with dolphin sightings" },
      { title: "Sandbank picnic" },
    ],
    foodAndLife: `Ukulhas runs proudly clean. Cafés serve simple Maldivian-meets-tourist menus. Repeatedly voted the cleanest local island in the country.`,
    cultureAndEtiquette: `Local island. Designated bikini beach. Strong waste-management culture — follow the bin-sorting, locals appreciate it.`,
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
    whyGoHere: `Mathiveri is the sandbank island. Walk out at low tide and you can wade most of the way to the empty white spit that appears off the western tip — the kind of postcard Maldives moment that usually costs a $200 day-trip from a resort. It's also a serious base for whale-shark and manta excursions in North Ari, with smaller crowds at the dive sites than you'll see from Rasdhoo. The village is small, sleepy, family-run-guesthouse territory; expect home cooking, simple rooms, and an evening pace that ends at the harbour wall at sunset. Pair it with Rasdhoo or Ukulhas for a quiet North Ari week.`,
    thingsToDo: [
      { title: "Walk the long sandbank off the island's tip" },
      { title: "Snorkel with whale sharks in South Ari (excursion)" },
      { title: "Manta ray cleaning station dives" },
      { title: "Sunset dolphin cruise" },
      { title: "Cycle the village" },
    ],
    foodAndLife: `Mathiveri runs at local-island pace. A few guesthouse restaurants and a couple of cafés serving short eats. Lucky Hiya and Velhi Beach are common stops.`,
    cultureAndEtiquette: `Local island. Bikini beach at the western tip. Cover up in the village.`,
    howToGetHere: [
      { step: 1, text: "Land at Velana International (MLE)." },
      { step: 2, text: "Speedboat from Malé (~$70, 1.5 hours) — most guesthouses arrange this." },
      { step: 3, text: "Or domestic flight to Maamigili (~$120, 25 min) + boat transfer." },
      { step: 4, text: "Or public ferry from Malé via Rasdhoo (~$5, 4 hours, Sun/Tue/Thu)." },
    ],
    relatedJournalSlugs: [],
  },

  // ============================================================
  // PHASE 3 — Hanimaadhoo (Haa Dhaalu, far north)
  // ============================================================
  hanimaadhoo: {
    tagline: "Quiet far-north base with a domestic airport and untouched reefs.",
    tiers: ["backpacker", "mid"],
    styles: ["dive", "local-island"],
    essentials: {
      population: 1500,
      transferFromMale: "1 hour by domestic flight",
      transferType: "domestic-flight",
      transferCost: 240,
      ferryDays: ["Sun", "Wed"],
      nearestDiveSite: "Hanimaadhoo Thila",
      peakSeason: "Nov–Apr",
      bikiniBeach: true,
    },
    whyGoHere: `Hanimaadhoo is the easiest jumping-off point for the far-north atolls (Haa Alif, Haa Dhaalu, Shaviyani) — places most travellers never see and where the dive sites hit numbers visiting boats only dream about. The island has a domestic airport, a small but capable village, jungle-edged trails, and reefs that haven't been bleached or trampled because nobody has been here to do it. It's also a one-night staging stop on your way deeper into the country: most guests fly in, dive a couple of days, and continue by speedboat to a smaller island. If you've already done Maafushi and Dhigurah and want a Maldives that feels truly off-script, this is where to start looking.`,
    thingsToDo: [
      { title: "Dive Hanimaadhoo Thila and far-north channels" },
      { title: "Walk the jungle trails on the eastern side" },
      { title: "Day-trip by speedboat to Kelaa or Utheemu" },
      { title: "Snorkel from the long west-side beach" },
    ],
    foodAndLife: `Small village food scene: a couple of guesthouse kitchens, the airport café, fresh fish at the harbour. Half-board with your guesthouse is the practical choice.`,
    cultureAndEtiquette: `Local island. Modest dress in the village. Bikini beach designated. Friday is quiet — nothing opens till the early afternoon.`,
    howToGetHere: [
      { step: 1, text: "Land at Velana International (MLE)." },
      { step: 2, text: "Domestic flight Maldivian or Manta Air to Hanimaadhoo (~1 hour, ~$240 return)." },
      { step: 3, text: "Walk or short transfer from the airport — it's on the island." },
    ],
    relatedJournalSlugs: [],
  },

  // ============================================================
  // PHASE 3 — Fuvahmulah (Gnaviyani, deep south)
  // ============================================================
  fuvahmulah: {
    tagline: "Tiger sharks, thresher sharks, and a one-island atoll unlike anywhere else.",
    tiers: ["backpacker", "mid"],
    styles: ["dive", "wildlife", "local-island"],
    essentials: {
      population: 13000,
      transferFromMale: "1.5 hours by domestic flight",
      transferType: "domestic-flight",
      transferCost: 320,
      ferryDays: [],
      nearestDiveSite: "Tiger Harbour (north plateau) and Tiger Zoo (south-east corner)",
      peakSeason: "Year-round (tiger sharks)",
      bikiniBeach: false,
    },
    whyGoHere: `Fuvahmulah is the place serious shark divers fly half a world for. It's a one-island atoll — geographically unique in the Maldives — sitting alone south of Huvadhoo, with deep oceanic water on every side. That topography turns it into a permanent station for tiger sharks (south-east corner, year-round, often a dozen on a single dive), thresher sharks at Tiger Harbour on the north plateau, and rotating mola-mola, hammerhead and oceanic-whitetip sightings depending on the season. The diving is advanced — currents, depth, big animals — and not what you do on your first Maldives trip. Outside the water, the island is large by local standards: 13,000 people, a freshwater lake (Bandaara Kilhi), the only proper hill in the country, and a strong cultural identity distinct from the rest of the Maldives.`,
    thingsToDo: [
      { title: "Tiger shark dive on the south-east corner" },
      { title: "Thresher shark dive at Tiger Harbour" },
      { title: "Walk the freshwater lake (Bandaara Kilhi)" },
      { title: "Hike Aboobakuru's Hill (sunset)" },
      { title: "Visit the old mosque and the cultural museum" },
    ],
    foodAndLife: `Bigger food scene than most local islands. Try the lake-side cafés and the local short-eats stalls in the main village. Roshi-and-mas-huni breakfasts everywhere.`,
    cultureAndEtiquette: `One-island atoll with a distinct dialect (Fuvahmulah Ban-bin) and identity. Locals here will tell you they're Fuvahmulahn first, Maldivian second. Dress modestly — there is no dedicated bikini beach. Wear swimsuits only on dive boats and at hotels.`,
    howToGetHere: [
      { step: 1, text: "Land at Velana International (MLE)." },
      { step: 2, text: "Domestic flight to Fuvahmulah Airport on Maldivian (~1.5 hours, ~$320 return)." },
      { step: 3, text: "Or fly to Gan (Addu) and take the inter-atoll speedboat to Fuvahmulah (~3 hours)." },
    ],
    relatedJournalSlugs: [],
  },

  // ============================================================
  // PHASE 3 — Addu City / Hithadhoo (Seenu, southernmost atoll)
  // ============================================================
  addu: {
    tagline: "The country's second city — wartime history, big lagoons, untouched dive sites.",
    tiers: ["backpacker", "mid"],
    styles: ["dive", "culture", "local-island"],
    essentials: {
      population: 19000,
      transferFromMale: "1.5 hours by domestic flight",
      transferType: "domestic-flight",
      transferCost: 280,
      ferryDays: [],
      nearestDiveSite: "British Loyalty wreck, Manta Point, Maa Kandu",
      peakSeason: "Nov–Apr",
      bikiniBeach: true,
    },
    whyGoHere: `Addu is the bottom of the country — a heart-shaped atoll roughly 540 km south of Malé, sitting just south of the equator. It's also the country's second city: 19,000 people, an international airport at Gan, and four of the islands (Hithadhoo, Maradhoo, Feydhoo, Gan) connected by a 14 km causeway you can drive end-to-end. That gives Addu a more developed, more "everyday Maldives" feel than the resort-and-dhoni postcards — supermarkets, schools, working harbours, a 1940s British military airfield (Gan was a Royal Air Force base until 1976) and an unmissable WWII history layer. Below the water, the diving is extraordinary and uncrowded: the British Loyalty wreck, regular manta cleaning at Maa Kandu, big-fish channel dives around the southern points. Outside dive season the same atoll is a quiet, walkable, family-friendly base.`,
    thingsToDo: [
      { title: "Dive the British Loyalty wreck" },
      { title: "Manta cleaning station at Maa Kandu" },
      { title: "Cycle the Gan–Hithadhoo causeway" },
      { title: "Visit the British war memorial at Gan" },
      { title: "Sunset at Eydhigali Kilhi (mangrove walk)" },
    ],
    foodAndLife: `Bigger food scene than smaller local islands — proper restaurants, bakeries, and a few decent cafés in Hithadhoo. Try a cup of saa-hibe (sweet milk tea) at a teahouse in the evening.`,
    cultureAndEtiquette: `Addu has a distinct Adduan dialect and a strong local identity. Bikini beach designated near the resorts. Modest dress in the villages.`,
    howToGetHere: [
      { step: 1, text: "Land at Velana International (MLE) or arrive direct on a Sri Lanka or Colombo connector to Gan." },
      { step: 2, text: "Domestic flight Maldivian or Manta Air to Gan (~1.5 hours from MLE, ~$280 return)." },
      { step: 3, text: "Causeway taxi from Gan to your guesthouse on Hithadhoo, Feydhoo or Maradhoo." },
    ],
    relatedJournalSlugs: [],
  },
};

export function getIslandDetail(slug: string): IslandDetail | undefined {
  return islandDetails[slug];
}
