export type Tier = "backpacker" | "mid" | "luxury" | "ultra";

export type Stay = {
  slug: string;
  name: string;
  tier: Tier;
  island: string; // display name (may be resort's own island)
  islandSlugs: string[]; // keys into islands[].slug — "base" islands this stay serves
  atoll: string;
  priceFrom: string;
  blurb: string;
  perks: string[];
  image: string;
  bookingQuery?: string; // override for booking.com deep-link search
};

export const tierMeta: Record<Tier, { title: string; tagline: string; color: string }> = {
  backpacker: {
    title: "Backpacker",
    tagline: "$30–$90 per night · local islands · guesthouses",
    color: "from-emerald-400 to-teal-500",
  },
  mid: {
    title: "Mid-Range",
    tagline: "$150–$400 per night · 3–4★ resorts & boutique stays",
    color: "from-sky-400 to-cyan-500",
  },
  luxury: {
    title: "Luxury",
    tagline: "$500–$1,500 per night · overwater villas · 5★ resorts",
    color: "from-indigo-400 to-blue-600",
  },
  ultra: {
    title: "Ultra-Luxury",
    tagline: "$1,500+ per night · private islands · the best in the world",
    color: "from-amber-400 to-rose-500",
  },
};

export const stays: Stay[] = [
  // ============ MAAFUSHI (budget) ============
  {
    slug: "kaani-village",
    name: "Kaani Village & Spa",
    tier: "backpacker",
    island: "Maafushi",
    islandSlugs: ["maafushi"],
    atoll: "Kaafu",
    priceFrom: "$75",
    blurb:
      "Guesthouse-meets-boutique-hotel with a pool and a spa — rare on a local island at this price.",
    perks: ["Pool", "Spa", "Breakfast included"],
    image:
      "https://images.unsplash.com/photo-1520483601560-389dff434fdf?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "crystal-sands",
    name: "Crystal Sands",
    tier: "backpacker",
    island: "Maafushi",
    islandSlugs: ["maafushi"],
    atoll: "Kaafu",
    priceFrom: "$85",
    blurb:
      "Beachfront rooms opening straight onto bikini beach. One of the best breakfast buffets on the island.",
    perks: ["Beachfront", "Buffet breakfast", "Water sports"],
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=80",
  },

  // ============ GULHI (budget) ============
  {
    slug: "wave-sound-gulhi",
    name: "Wave Sound of Gulhi",
    tier: "backpacker",
    island: "Gulhi",
    islandSlugs: ["gulhi"],
    atoll: "South Malé",
    priceFrom: "$50",
    blurb:
      "Small guesthouse on sleepy Gulhi. Private tropical feel, same turquoise lagoon Maafushi's crowds are missing.",
    perks: ["Private beach access", "Kitchenette rooms", "Free snorkel"],
    image:
      "https://images.unsplash.com/photo-1586500036706-41963de24d8b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "thundi-gulhi",
    name: "Thundi Gulhi",
    tier: "backpacker",
    island: "Gulhi",
    islandSlugs: ["gulhi"],
    atoll: "South Malé",
    priceFrom: "$65",
    blurb:
      "Family-run, freshly renovated, and the fastest way onto Gulhi's bikini beach.",
    perks: ["Quiet island", "Ferry-friendly", "Airport transfer"],
    image:
      "https://images.unsplash.com/photo-1520483601560-389dff434fdf?auto=format&fit=crop&w=1600&q=80",
  },

  // ============ THULUSDHOO (budget + mid) ============
  {
    slug: "batuta-maldives",
    name: "Batuta Maldives Surf View",
    tier: "backpacker",
    island: "Thulusdhoo",
    islandSlugs: ["thulusdhoo"],
    atoll: "North Malé",
    priceFrom: "$60",
    blurb:
      "Surf-first guesthouse looking over Coke's break. Board hire, beginner lessons, board-to-door service.",
    perks: ["Surf lessons", "Board storage", "Ocean view"],
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "ocean-life-thulusdhoo",
    name: "Ocean Life Maldives",
    tier: "backpacker",
    island: "Thulusdhoo",
    islandSlugs: ["thulusdhoo"],
    atoll: "North Malé",
    priceFrom: "$70",
    blurb:
      "Chilled surfer guesthouse with a shared deck, laundry and a dive centre next door.",
    perks: ["Dive centre", "Surfer hangout", "Laundry"],
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80",
  },

  // ============ DHIGURAH (budget + mid) ============
  {
    slug: "boutique-beach",
    name: "Boutique Beach",
    tier: "mid",
    island: "Dhigurah",
    islandSlugs: ["dhigurah"],
    atoll: "South Ari",
    priceFrom: "$240",
    blurb:
      "Seven-room PADI 5★ dive boutique on Dhigurah, owner-run by Romney Drury. All-inclusive dive packages, unlimited whale-shark snorkels, serious kitchen.",
    perks: ["7 rooms", "PADI 5★ dive centre", "All-inclusive"],
    image:
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1600&q=80",
  },

  // ============ RASDHOO (budget + mid) ============
  {
    slug: "rasdhoo-inn",
    name: "Rasdhoo Atoll Inn",
    tier: "backpacker",
    island: "Rasdhoo",
    islandSlugs: ["rasdhoo"],
    atoll: "Rasdhoo",
    priceFrom: "$70",
    blurb:
      "Well-run guesthouse with a dive operation running 6 dives a day. Hammerhead trips before breakfast.",
    perks: ["Dive centre", "Early hammerhead trips", "Beach access"],
    image:
      "https://images.unsplash.com/photo-1540202404-1b927e27fa8b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "velana-view-rasdhoo",
    name: "Velana View",
    tier: "mid",
    island: "Rasdhoo",
    islandSlugs: ["rasdhoo"],
    atoll: "Rasdhoo",
    priceFrom: "$160",
    blurb:
      "Roomier boutique option with a rooftop pool. Easy jumping-off point for Madivaru hammerhead dive.",
    perks: ["Rooftop pool", "Madivaru dives", "Half-board"],
    image:
      "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=1600&q=80",
  },

  // ============ FULIDHOO (budget) ============

  // ============ UKULHAS (budget) ============
  {
    slug: "coral-heaven-ukulhas",
    name: "Coral Heaven",
    tier: "backpacker",
    island: "Ukulhas",
    islandSlugs: ["ukulhas"],
    atoll: "North Ari",
    priceFrom: "$70",
    blurb:
      "Bright boutique guesthouse on the cleanest local island in the country. House reef starts at ankle depth.",
    perks: ["House reef", "Eco island", "Beach access"],
    image:
      "https://images.unsplash.com/photo-1605538032404-d7f94fab57cf?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "ukulhas-sand-dune",
    name: "Ukulhas Sand Dune",
    tier: "backpacker",
    island: "Ukulhas",
    islandSlugs: ["ukulhas"],
    atoll: "North Ari",
    priceFrom: "$65",
    blurb:
      "Quiet, clean and friendly — exactly the pitch. Manta and whale shark trips into South Ari from the jetty.",
    perks: ["Whale shark trips", "Pool", "Half-board"],
    image:
      "https://images.unsplash.com/photo-1520483601560-389dff434fdf?auto=format&fit=crop&w=1600&q=80",
  },

  // ============ HANIMAADHOO (budget) ============
  {
    slug: "hanifaru-transit-inn",
    name: "Hanifaru Transit Inn",
    tier: "backpacker",
    island: "Hanimaadhoo",
    islandSlugs: ["hanimaadhoo"],
    atoll: "Haa Dhaalu",
    priceFrom: "$65",
    blurb:
      "The easiest base for the under-the-radar northern atolls. Near the domestic airport, jungle trails, untouched reefs.",
    perks: ["Airport transfer", "Jungle trail", "Off the tourist trail"],
    image:
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1600&q=80",
  },

  // ============ FUVAHMULAH (mid) ============
  {
    slug: "fuvahmulah-dive-school",
    name: "Fuvahmulah Dive School",
    tier: "mid",
    island: "Fuvahmulah",
    islandSlugs: ["fuvahmulah"],
    atoll: "Gnaviyani",
    priceFrom: "$190",
    blurb:
      "Purpose-built stay + dive centre. Tiger shark dives on the south-east corner, thresher sharks on the north plateau (Tiger Harbour).",
    perks: ["Tiger shark dives", "Half-board", "Transfers"],
    image:
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "stream-fuvahmulah",
    name: "Stream Fuvahmulah",
    tier: "mid",
    island: "Fuvahmulah",
    islandSlugs: ["fuvahmulah"],
    atoll: "Gnaviyani",
    priceFrom: "$210",
    blurb:
      "Boutique stay on the only single-island atoll. A rare mix of freshwater lakes, surf and world-class diving.",
    perks: ["Boutique rooms", "Tiger shark pkgs", "Bike hire"],
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=80",
  },

  // ============ ADDU (budget + mid) ============
  {
    slug: "equator-village",
    name: "Equator Village",
    tier: "backpacker",
    island: "Addu (Gan)",
    islandSlugs: ["addu"],
    atoll: "Addu",
    priceFrom: "$95",
    blurb:
      "Classic Addu resort on the old RAF base — bungalows with palm views, bikes for the 30 km causeway ride, British Loyalty wreck dives.",
    perks: ["Bike hire", "Wreck dives", "Half-board"],
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "canareef-addu",
    name: "Canareef Resort Maldives",
    tier: "mid",
    island: "Addu (Herathera)",
    islandSlugs: ["addu"],
    atoll: "Addu",
    priceFrom: "$210",
    blurb:
      "All-inclusive beach-bungalow resort stretched along the south's longest natural beach. 2.5 km of beach, all to itself.",
    perks: ["All-inclusive", "2.5 km beach", "Dive centre"],
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "south-palm-addu",
    name: "South Palm Resort Maldives",
    tier: "mid",
    island: "Addu (Meedhoo)",
    islandSlugs: ["addu"],
    atoll: "Addu",
    priceFrom: "$240",
    blurb:
      "Modern resort on Addu's eastern arm. Dive access to Manta Point and the British Loyalty shipwreck.",
    perks: ["Manta Point dives", "All-inclusive", "Wreck dives"],
    image:
      "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=1600&q=80",
  },

  // ============ MID resorts (close to Malé, reachable from any local island via MLE) ============
  {
    slug: "sun-siyam-olhuveli",
    name: "Sun Siyam Olhuveli",
    tier: "mid",
    island: "Olhuveli",
    islandSlugs: [],
    atoll: "South Malé",
    priceFrom: "$320",
    blurb:
      "Overwater villas at almost-mid prices. Huge lagoon, reef sharks in the shallows, one of the best-value honeymoon picks.",
    perks: ["Overwater villas", "House reef", "Honeymoon packages"],
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80",
  },

  // ============ LUXURY resorts (own private islands) ============

  // ============ ULTRA-LUXURY ============

  // ============================================================
  // PHASE-1 LAUNCH LIST — 20 backpacker stays per brief §7
  // Records below pair with detailed schema in stayDetails.ts.
  // Slugs follow brief naming convention.
  // ============================================================

  // Maafushi (5)
  {
    slug: "crown-beach-hotel-maafushi",
    name: "Crown Beach Hotel",
    tier: "backpacker",
    island: "Maafushi",
    islandSlugs: ["maafushi"],
    atoll: "Kaafu",
    priceFrom: "$65",
    blurb:
      "Long-running 18-room guesthouse on Maafushi's main beach, popular with European backpackers for location and dive package.",
    perks: ["Dive packages", "Bikini beach access", "Airport transfer"],
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "arena-beach-hotel-maafushi",
    name: "Arena Beach Hotel",
    tier: "backpacker",
    island: "Maafushi",
    islandSlugs: ["maafushi"],
    atoll: "Kaafu",
    priceFrom: "$60",
    blurb:
      "One of Maafushi's most-booked guesthouses — 35 rooms, rooftop restaurant, in-house excursion desk, walkable to bikini beach.",
    perks: ["Rooftop restaurant", "Excursion desk", "Free snorkel gear"],
    image:
      "https://images.unsplash.com/photo-1540202404-1b927e27fa8b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "stingray-beach-inn-maafushi",
    name: "Stingray Beach Inn",
    tier: "backpacker",
    island: "Maafushi",
    islandSlugs: ["maafushi"],
    atoll: "Kaafu",
    priceFrom: "$55",
    blurb:
      "Family-run 14-room guesthouse a short walk from Maafushi's bikini beach. Simple breakfasts, dependable excursion partners.",
    perks: ["Family-run", "Bikini beach access", "Breakfast included"],
    image:
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "kaani-beach-hotel-maafushi",
    name: "Kaani Beach Hotel",
    tier: "backpacker",
    island: "Maafushi",
    islandSlugs: ["maafushi"],
    atoll: "Kaafu",
    priceFrom: "$70",
    blurb:
      "On Maafushi's southern bikini-beach side. 24 rooms, pool, breakfast included, sister property to Kaani Village & Spa.",
    perks: ["Pool", "Beachfront", "Breakfast included"],
    image:
      "https://images.unsplash.com/photo-1520483601560-389dff434fdf?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "triton-beach-hotel-spa-maafushi",
    name: "Triton Beach Hotel & Spa",
    tier: "backpacker",
    island: "Maafushi",
    islandSlugs: ["maafushi"],
    atoll: "Kaafu",
    priceFrom: "$75",
    blurb:
      "Slightly upscale option on Maafushi — pool, spa, rooftop bar. Pulls a mid-range crowd at backpacker prices.",
    perks: ["Spa", "Rooftop bar", "Pool"],
    image:
      "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=1600&q=80",
  },

  // Thulusdhoo (4)
  {
    slug: "thulusdhoo-inn",
    name: "Thulusdhoo Inn",
    tier: "backpacker",
    island: "Thulusdhoo",
    islandSlugs: ["thulusdhoo"],
    atoll: "North Malé",
    priceFrom: "$50",
    blurb:
      "Small 10-room guesthouse in the surf hub of North Malé Atoll. Walking distance to Coke's break.",
    perks: ["Walk to Coke's break", "Surf packages", "Family-run"],
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "season-paradise-thulusdhoo",
    name: "Season Paradise",
    tier: "backpacker",
    island: "Thulusdhoo",
    islandSlugs: ["thulusdhoo"],
    atoll: "North Malé",
    priceFrom: "$55",
    blurb:
      "Long-running 12-room guesthouse on Thulusdhoo. Reliable surf-package partner with daily boat trips to Chickens.",
    perks: ["Surf packages", "Daily Chickens boat", "Beachfront café"],
    image:
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "cokes-beach-maldives-thulusdhoo",
    name: "Coke's Beach Maldives",
    tier: "backpacker",
    island: "Thulusdhoo",
    islandSlugs: ["thulusdhoo"],
    atoll: "North Malé",
    priceFrom: "$65",
    blurb:
      "Closest to the Coke's break on Thulusdhoo. 14 rooms, surf-school discounts, communal evenings.",
    perks: ["Closest to Coke's", "Surf school discount", "Communal vibe"],
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1600&q=80",
  },
  // Dhigurah (3)
  {
    slug: "cyrus-beach-inn-dhigurah",
    name: "Cyrus Beach Inn",
    tier: "backpacker",
    island: "Dhigurah",
    islandSlugs: ["dhigurah"],
    atoll: "South Ari",
    priceFrom: "$50",
    blurb:
      "Small 10-room guesthouse on Dhigurah's village side. Whale-shark excursions arranged daily.",
    perks: ["Whale-shark trips daily", "Family-run", "Bikini beach"],
    image:
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "aveyla-manta-village-dhigurah",
    name: "Aveyla Manta Village",
    tier: "backpacker",
    island: "Dhigurah",
    islandSlugs: ["dhigurah"],
    atoll: "South Ari",
    priceFrom: "$70",
    blurb:
      "Leans into Dhigurah's wildlife reputation — 16 rooms, in-house dive centre, manta and whale-shark focus.",
    perks: ["In-house dive centre", "Wildlife focus", "House reef"],
    image:
      "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "dhigurah-retreat",
    name: "Dhigurah Retreat",
    tier: "backpacker",
    island: "Dhigurah",
    islandSlugs: ["dhigurah"],
    atoll: "South Ari",
    priceFrom: "$55",
    blurb:
      "Quieter 12-room option on the village side. Beachfront access, breakfast included, walkable to bikini beach.",
    perks: ["Beachfront", "Quieter side", "Breakfast included"],
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80",
  },

  // Fulidhoo (3)
  {
    slug: "fulidhoo-inn-vaavu",
    name: "Fulidhoo Inn",
    tier: "backpacker",
    island: "Fulidhoo",
    islandSlugs: ["fulidhoo"],
    atoll: "Vaavu",
    priceFrom: "$45",
    blurb:
      "One of the original guesthouses on tiny Fulidhoo — 8 rooms, central, family-run, easy reach of the stingray feeding beach.",
    perks: ["Stingrays at sunset", "Family-run", "Boduberu nights"],
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "fulidhoo-sunrise-beach",
    name: "Fulidhoo Sunrise Beach",
    tier: "backpacker",
    island: "Fulidhoo",
    islandSlugs: ["fulidhoo"],
    atoll: "Vaavu",
    priceFrom: "$50",
    blurb:
      "Faces the eastern bikini beach — 10 rooms, sunrise breakfast, easy access to the night-snorkel trip.",
    perks: ["Bikini beach access", "Sunrise breakfast", "Night-snorkel trips"],
    image:
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "thundi-guesthouse-fulidhoo",
    name: "Thundi Guesthouse",
    tier: "backpacker",
    island: "Fulidhoo",
    islandSlugs: ["fulidhoo"],
    atoll: "Vaavu",
    priceFrom: "$50",
    blurb:
      "12-room family-run option on Fulidhoo. Reliable Boduberu drum-night recommendations and full-board packages.",
    perks: ["Full-board option", "Boduberu nights", "Family-run"],
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80",
  },

  // Other local islands (5)
  {
    slug: "white-shell-island-hotel-gulhi",
    name: "White Shell Island Hotel",
    tier: "backpacker",
    island: "Gulhi",
    islandSlugs: ["gulhi"],
    atoll: "South Malé",
    priceFrom: "$50",
    blurb:
      "14-room mid-budget option on Gulhi — quieter than Maafushi, same atoll, excellent lagoon snorkelling.",
    perks: ["Lagoon snorkel", "Quieter alternative to Maafushi", "Easy MLE access"],
    image:
      "https://images.unsplash.com/photo-1586500036706-41963de24d8b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "lucky-hiya-maldives-mathiveri",
    name: "Lucky Hiya Maldives",
    tier: "backpacker",
    island: "Mathiveri",
    islandSlugs: ["mathiveri"],
    atoll: "North Ari",
    priceFrom: "$55",
    blurb:
      "12-room guesthouse on quiet Mathiveri — North Ari Atoll, sandbank-walking distance, manta and whale-shark trips.",
    perks: ["Sandbank walking distance", "Manta trips", "Quiet local island"],
    image:
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "bliss-dhigurah",
    name: "Bliss Dhigurah",
    tier: "backpacker",
    island: "Dhigurah",
    islandSlugs: ["dhigurah"],
    atoll: "South Ari",
    priceFrom: "$60",
    blurb:
      "16-room mid-budget option set back from the bikini beach. Family-friendly, quieter than the village-side options.",
    perks: ["Family-friendly", "Quieter", "Bikini beach short walk"],
    image:
      "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "ui-inn-hulhumale",
    name: "UI Inn",
    tier: "backpacker",
    island: "Hulhumalé",
    islandSlugs: [],
    atoll: "Kaafu",
    priceFrom: "$40",
    blurb:
      "24-room transit-friendly guesthouse on Hulhumalé. Short taxi (~$10–15) or airport bus from Velana International — useful for first or last nights.",
    perks: ["Transit-friendly", "Near airport", "Affordable"],
    image:
      "https://images.unsplash.com/photo-1540202404-1b927e27fa8b?auto=format&fit=crop&w=1600&q=80",
  },

  // ============================================================
  // PHASE-1 LAUNCH LIST — 15 mid-range stays per brief §7
  // ============================================================
  {
    slug: "summer-island-maldives",
    name: "Summer Island Maldives",
    tier: "mid",
    island: "Ziyaaraifushi",
    islandSlugs: [],
    atoll: "North Malé",
    priceFrom: "$250",
    blurb: "Eco-leaning 4★ resort with the country's first 3D-printed reef. Half-board base, transfer included.",
    perks: ["Half-board", "3D-printed reef", "Speedboat transfer"],
    image: "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "adaaran-select-hudhuranfushi",
    name: "Adaaran Select Hudhuranfushi",
    tier: "mid",
    island: "Hudhuranfushi",
    islandSlugs: [],
    atoll: "North Malé",
    priceFrom: "$280",
    blurb: "All-inclusive 4★ on a long beach with the famous Lohi's surf break right offshore.",
    perks: ["All-inclusive", "Lohi's break", "Long beach"],
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "reethi-beach-resort",
    name: "Reethi Beach Resort",
    tier: "mid",
    island: "Fonimagoodhoo",
    islandSlugs: [],
    atoll: "Baa",
    priceFrom: "$240",
    blurb: "Long-running 4★ resort in the Baa biosphere. Reasonable rates, manta access in season.",
    perks: ["Baa Biosphere", "Manta season", "Half-board"],
    image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "kuredu-island-resort",
    name: "Kuredu Island Resort",
    tier: "mid",
    island: "Kuredu",
    islandSlugs: [],
    atoll: "Lhaviyani",
    priceFrom: "$300",
    blurb: "Big-island 4★ with golf, diving, and a serious surf break (Foxy's). All-inclusive plans common.",
    perks: ["Surf break", "Dive school", "Golf"],
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "meeru-island-resort",
    name: "Meeru Island Resort",
    tier: "mid",
    island: "Meerufenfushi",
    islandSlugs: [],
    atoll: "North Malé",
    priceFrom: "$280",
    blurb: "Big-island 4★ with multiple beach categories, dive base, and reliable all-inclusive packages.",
    perks: ["All-inclusive", "Dive base", "Multiple beaches"],
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "vilamendhoo-island-resort",
    name: "Vilamendhoo Island Resort",
    tier: "mid",
    island: "Vilamendhoo",
    islandSlugs: [],
    atoll: "South Ari",
    priceFrom: "$320",
    blurb: "House-reef-famous 4★ in South Ari. Whale shark and manta excursions short hop away.",
    perks: ["House reef", "Whale shark trips", "Half-board"],
    image: "https://images.unsplash.com/photo-1586500036706-41963de24d8b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "embudu-village",
    name: "Embudu Village",
    tier: "mid",
    island: "Embudhu",
    islandSlugs: [],
    atoll: "South Malé",
    priceFrom: "$220",
    blurb: "Long-running budget-leaning 4★ with a famous house reef and reliable dive school.",
    perks: ["House reef", "Dive school", "Full-board"],
    image: "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "bandos-maldives",
    name: "Bandos Maldives",
    tier: "mid",
    island: "Bandos",
    islandSlugs: [],
    atoll: "North Malé",
    priceFrom: "$260",
    blurb: "One of the country's oldest resorts. 15 minutes from MLE, big island, family-friendly.",
    perks: ["15-min transfer", "Family-friendly", "Mid-priced"],
    image: "https://images.unsplash.com/photo-1540202404-1b927e27fa8b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "vilu-reef-beach-resort",
    name: "Vilu Reef Beach Resort",
    tier: "mid",
    island: "Meedhuffushi",
    islandSlugs: [],
    atoll: "Dhaalu",
    priceFrom: "$310",
    blurb: "4★ with a tight house reef and quiet South Atoll setting. Domestic-flight transfer.",
    perks: ["House reef", "Domestic flight transfer", "Half-board"],
    image: "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "holiday-island-resort",
    name: "Holiday Island Resort",
    tier: "mid",
    island: "Dhiffushi",
    islandSlugs: [],
    atoll: "South Ari",
    priceFrom: "$270",
    blurb: "Long-running 4★ in South Ari, regular all-inclusive deals and short whale-shark trips.",
    perks: ["Whale shark trips", "All-inclusive", "Big island"],
    image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "ellaidhoo-maldives-by-cinnamon",
    name: "Ellaidhoo Maldives by Cinnamon",
    tier: "mid",
    island: "Ellaidhoo",
    islandSlugs: [],
    atoll: "North Ari",
    priceFrom: "$290",
    blurb: "House-reef destination 4★ in North Ari with a dependable dive operation.",
    perks: ["House reef", "Dive school", "Half-board"],
    image: "https://images.unsplash.com/photo-1586500036706-41963de24d8b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "olhuveli-beach-spa",
    name: "Olhuveli Beach & Spa",
    tier: "mid",
    island: "Olhuveli",
    islandSlugs: [],
    atoll: "South Malé",
    priceFrom: "$300",
    blurb: "4★ with a long house reef, water villas at the lower end of mid-tier pricing, kid-friendly.",
    perks: ["Water villas", "House reef", "Kid-friendly"],
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "eriyadu-island-resort",
    name: "Eriyadu Island Resort",
    tier: "mid",
    island: "Eriyadu",
    islandSlugs: [],
    atoll: "North Malé",
    priceFrom: "$240",
    blurb: "Mid-budget 4★ with a famous house reef and shark-watching channel just off the beach.",
    perks: ["Shark channel", "House reef", "Half-board"],
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "adaaran-club-rannalhi",
    name: "Adaaran Club Rannalhi",
    tier: "mid",
    island: "Rannalhi",
    islandSlugs: [],
    atoll: "South Malé",
    priceFrom: "$260",
    blurb: "All-inclusive 4★ on a small island. Classic Maldives shape, water villas, popular with European groups.",
    perks: ["All-inclusive", "Water villas", "Small island"],
    image: "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "fihalhohi-island-resort",
    name: "Fihalhohi Island Resort",
    tier: "mid",
    island: "Fihalhohi",
    islandSlugs: [],
    atoll: "South Malé",
    priceFrom: "$230",
    blurb: "Mid-tier 4★ with a long house reef and reliable half-board pricing close to MLE.",
    perks: ["House reef", "Half-board", "Quiet"],
    image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1600&q=80",
  },

  // ============================================================
  // PHASE-1 LAUNCH LIST — 15 luxury stays per brief §7
  // ============================================================
  {
    slug: "conrad-maldives-rangali-island",
    name: "Conrad Maldives Rangali Island",
    tier: "luxury",
    island: "Rangali",
    islandSlugs: [],
    atoll: "South Ari",
    priceFrom: "$1,200",
    blurb: "Twin-island 5★ home of the Ithaa underwater restaurant. Long-haul-couple favourite.",
    perks: ["Underwater restaurant", "Twin-island", "Seaplane"],
    image: "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "niyama-private-islands",
    name: "Niyama Private Islands",
    tier: "luxury",
    island: "Olhuveli",
    islandSlugs: [],
    atoll: "Dhaalu",
    priceFrom: "$1,100",
    blurb: "Two-island 5★ with the Subsix underwater nightclub and fast-paced food/drink scene.",
    perks: ["Subsix underwater club", "Two islands", "Seaplane"],
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "constance-halaveli",
    name: "Constance Halaveli",
    tier: "luxury",
    island: "Halaveli",
    islandSlugs: [],
    atoll: "North Ari",
    priceFrom: "$950",
    blurb: "Crescent-shaped island 5★ with overwater villas, dhoni-style architecture, and Constance signature service.",
    perks: ["Overwater villas", "Dhoni design", "Seaplane"],
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "anantara-veli",
    name: "Anantara Veli",
    tier: "luxury",
    island: "Veligandu Huraa",
    islandSlugs: [],
    atoll: "South Malé",
    priceFrom: "$850",
    blurb: "Adults-only 5★ a 30-minute speedboat from MLE — the closest reach to a luxury Maldives.",
    perks: ["Adults-only", "30-min speedboat", "Overwater villas"],
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "six-senses-laamu",
    name: "Six Senses Laamu",
    tier: "luxury",
    island: "Olhuveli",
    islandSlugs: [],
    atoll: "Laamu",
    priceFrom: "$1,400",
    blurb: "Far-south 5★ with the most consistent right-hander surf in the country (Yin Yang).",
    perks: ["Yin Yang surf", "Far south", "Sustainability"],
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "the-residence-dhigurah",
    name: "The Residence Dhigurah",
    tier: "luxury",
    island: "Dhigurah",
    islandSlugs: [],
    atoll: "Gaafu Alifu",
    priceFrom: "$1,000",
    blurb: "Far-south 5★ on a 1.6km-long island. Quietest atolls in the country, reliable diving.",
    perks: ["1.6km island", "Far south", "Domestic flight"],
    image: "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "velaa-private-island",
    name: "Velaa Private Island",
    tier: "luxury",
    island: "Velaavaru",
    islandSlugs: [],
    atoll: "Noonu",
    priceFrom: "$1,500",
    blurb: "Boutique private-island 5★ at the lower end of ultra-luxury — small, signature.",
    perks: ["Private island feel", "Signature design", "Seaplane"],
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "baros-maldives",
    name: "Baros Maldives",
    tier: "luxury",
    island: "Baros",
    islandSlugs: [],
    atoll: "North Malé",
    priceFrom: "$900",
    blurb: "Long-running 5★, 25-min speedboat from MLE. Adults-leaning, intimate, classic Maldives.",
    perks: ["25-min transfer", "Intimate", "House reef"],
    image: "https://images.unsplash.com/photo-1540202404-1b927e27fa8b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "kuramathi-island-resort",
    name: "Kuramathi Island Resort",
    tier: "luxury",
    island: "Kuramathi",
    islandSlugs: [],
    atoll: "Rasdhoo",
    priceFrom: "$700",
    blurb: "Big-island 5★ with a 100m sandbank stretching off the tip and reliable dive operations.",
    perks: ["Long sandbank", "Big island", "Dive school"],
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "constance-moofushi",
    name: "Constance Moofushi",
    tier: "luxury",
    island: "Moofushi",
    islandSlugs: [],
    atoll: "South Ari",
    priceFrom: "$950",
    blurb: "All-inclusive 5★ in South Ari. Whale shark MPA on the doorstep, manta encounters frequent.",
    perks: ["All-inclusive", "Whale sharks", "South Ari"],
    image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "lily-beach-resort",
    name: "Lily Beach Resort",
    tier: "luxury",
    island: "Huvahendhoo",
    islandSlugs: [],
    atoll: "South Ari",
    priceFrom: "$900",
    blurb: "Premium all-inclusive 5★ with a strong reputation for service and food breadth.",
    perks: ["Premium AI", "Food breadth", "House reef"],
    image: "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "centara-grand-island-resort",
    name: "Centara Grand Island Resort",
    tier: "luxury",
    island: "Machchafushi",
    islandSlugs: [],
    atoll: "South Ari",
    priceFrom: "$850",
    blurb: "All-inclusive 5★ with a strong family lean, kids' clubs, and South Ari MPA access.",
    perks: ["All-inclusive", "Family lean", "Kids' club"],
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "vakkaru-maldives",
    name: "Vakkaru Maldives",
    tier: "luxury",
    island: "Vakkarufalhi",
    islandSlugs: [],
    atoll: "Baa",
    priceFrom: "$1,100",
    blurb: "Baa-biosphere 5★ near Hanifaru Bay with overwater villas and serious manta-season access.",
    perks: ["Hanifaru access", "Overwater villas", "Baa Biosphere"],
    image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "coco-bodu-hithi",
    name: "Coco Bodu Hithi",
    tier: "luxury",
    island: "Bodu Hithi",
    islandSlugs: [],
    atoll: "North Malé",
    priceFrom: "$1,000",
    blurb: "Adults-leaning 5★ with the country's longest infinity-edge pool and a 40-min transfer.",
    perks: ["Adults-leaning", "Infinity pool", "40-min transfer"],
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "the-sun-siyam-iru-fushi",
    name: "The Sun Siyam Iru Fushi",
    tier: "luxury",
    island: "Iru Fushi",
    islandSlugs: [],
    atoll: "Noonu",
    priceFrom: "$900",
    blurb: "All-inclusive 5★ on a long Noonu island with a strong dive program and Manta season nearby.",
    perks: ["All-inclusive", "Long island", "Dive program"],
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80",
  },

  // ============================================================
  // PHASE-1 LAUNCH LIST — 10 ultra-luxury stays per brief §7
  // ============================================================
  {
    slug: "soneva-fushi",
    name: "Soneva Fushi",
    tier: "ultra",
    island: "Kunfunadhoo",
    islandSlugs: [],
    atoll: "Baa",
    priceFrom: "$3,200",
    blurb: "Original barefoot-luxury 6★ in the Baa biosphere. Observatory, water slides, manta access.",
    perks: ["Observatory", "Baa Biosphere", "Barefoot luxury"],
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "soneva-jani",
    name: "Soneva Jani",
    tier: "ultra",
    island: "Medhufaru",
    islandSlugs: [],
    atoll: "Noonu",
    priceFrom: "$3,800",
    blurb: "Sister to Soneva Fushi — overwater villas with private water slides, far-north Noonu setting.",
    perks: ["Private water slides", "Overwater villas", "Far north"],
    image: "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "cheval-blanc-randheli",
    name: "Cheval Blanc Randheli",
    tier: "ultra",
    island: "Randheli",
    islandSlugs: [],
    atoll: "Noonu",
    priceFrom: "$4,200",
    blurb: "LVMH-owned 6★ with a private-jet-friendly seaplane terminal and Guerlain spa.",
    perks: ["LVMH design", "Guerlain spa", "Private terminal"],
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "waldorf-astoria-maldives-ithaafushi",
    name: "Waldorf Astoria Maldives Ithaafushi",
    tier: "ultra",
    island: "Ithaafushi",
    islandSlugs: [],
    atoll: "South Malé",
    priceFrom: "$3,600",
    blurb: "Three-island 6★ with the country's largest private-island residence and 45-min transfer.",
    perks: ["Three islands", "Private residence", "45-min transfer"],
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "one-and-only-reethi-rah",
    name: "One&Only Reethi Rah",
    tier: "ultra",
    island: "Reethi Rah",
    islandSlugs: [],
    atoll: "North Malé",
    priceFrom: "$4,500",
    blurb: "Big-island 6★ with 12 distinct beaches and one of the largest spas in the country.",
    perks: ["12 beaches", "Largest spa", "45-min speedboat"],
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "joali-maldives",
    name: "Joali Maldives",
    tier: "ultra",
    island: "Muravandhoo",
    islandSlugs: [],
    atoll: "Raa",
    priceFrom: "$3,400",
    blurb: "Art-forward 6★ with site-specific installations and a strong design-magazine reputation.",
    perks: ["Art installations", "Raa Atoll", "Design-led"],
    image: "https://images.unsplash.com/photo-1540202404-1b927e27fa8b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "joali-being",
    name: "Joali Being",
    tier: "ultra",
    island: "Bodufushi",
    islandSlugs: [],
    atoll: "Raa",
    priceFrom: "$3,600",
    blurb: "Sister wellness-only 6★. Programmed retreats, in-house naturopathy, no children.",
    perks: ["Wellness retreat", "Adults-only", "Programmed stays"],
    image: "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "four-seasons-resort-landaa-giraavaru",
    name: "Four Seasons Resort Landaa Giraavaru",
    tier: "ultra",
    island: "Landaa Giraavaru",
    islandSlugs: [],
    atoll: "Baa",
    priceFrom: "$2,800",
    blurb: "Big-island 6★ with the Manta Trust HQ on site and turtle hospital on the property.",
    perks: ["Manta Trust HQ", "Turtle hospital", "Baa Biosphere"],
    image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "four-seasons-resort-kuda-huraa",
    name: "Four Seasons Resort Kuda Huraa",
    tier: "ultra",
    island: "Kuda Huraa",
    islandSlugs: [],
    atoll: "North Malé",
    priceFrom: "$2,500",
    blurb: "Closer-to-MLE 6★ sister to Landaa Giraavaru. 30-min speedboat or short seaplane.",
    perks: ["30-min speedboat", "Sister to Landaa", "Surf school"],
    image: "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "the-st-regis-maldives-vommuli",
    name: "The St. Regis Maldives Vommuli",
    tier: "ultra",
    island: "Vommuli",
    islandSlugs: [],
    atoll: "Dhaalu",
    priceFrom: "$2,800",
    blurb: "St. Regis-flagship-level 6★ with butler service, signature whale-shape overwater villa, far south.",
    perks: ["Butler service", "Signature villa", "Domestic flight"],
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=80",
  },
];
