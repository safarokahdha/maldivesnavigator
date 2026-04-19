export type Tier = "budget" | "mid" | "luxury" | "ultra";

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
  budget: {
    title: "Budget & Backpacker",
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
    slug: "arena-beach",
    name: "Arena Beach Hotel",
    tier: "budget",
    island: "Maafushi",
    islandSlugs: ["maafushi"],
    atoll: "Kaafu",
    priceFrom: "$55",
    blurb:
      "One of the most booked guesthouses in the Maldives. Steps from bikini beach, rooftop dining and an in-house excursion team.",
    perks: ["Free snorkel gear", "Rooftop restaurant", "Airport transfer"],
    image:
      "https://images.unsplash.com/photo-1540202404-1b927e27fa8b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "kaani-village",
    name: "Kaani Village & Spa",
    tier: "budget",
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
    tier: "budget",
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
    tier: "budget",
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
    tier: "budget",
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
    tier: "budget",
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
    slug: "season-paradise",
    name: "Season Paradise",
    tier: "mid",
    island: "Thulusdhoo",
    islandSlugs: ["thulusdhoo"],
    atoll: "North Malé",
    priceFrom: "$180",
    blurb:
      "Maldives' most established surf hotel. Boat drops at Coke's and Chickens, in-house shaper, all-inclusive plans.",
    perks: ["Surf boats", "All-inclusive", "Board shaper"],
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "ocean-life-thulusdhoo",
    name: "Ocean Life Maldives",
    tier: "budget",
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
    slug: "dhigurah-retreat",
    name: "Dhigurah Retreat Beach",
    tier: "budget",
    island: "Dhigurah",
    islandSlugs: ["dhigurah"],
    atoll: "South Ari",
    priceFrom: "$85",
    blurb:
      "Right next to the whale shark house reef. Simple, clean, runs daily tours straight from the jetty.",
    perks: ["Whale shark trips", "Beachfront", "Dive centre nearby"],
    image:
      "https://images.unsplash.com/photo-1586500036706-41963de24d8b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "boutique-beach",
    name: "Boutique Beach",
    tier: "mid",
    island: "Dhigurah",
    islandSlugs: ["dhigurah"],
    atoll: "South Ari",
    priceFrom: "$240",
    blurb:
      "All-inclusive dive boutique on Dhigurah. Unlimited whale shark snorkel trips, PADI courses and serious food.",
    perks: ["All-inclusive dives", "PADI 5★", "Boutique rooms"],
    image:
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1600&q=80",
  },

  // ============ RASDHOO (budget + mid) ============
  {
    slug: "rasdhoo-inn",
    name: "Rasdhoo Atoll Inn",
    tier: "budget",
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
  {
    slug: "thundi-fulidhoo",
    name: "Thundi Guest House",
    tier: "budget",
    island: "Fulidhoo",
    islandSlugs: ["fulidhoo"],
    atoll: "Vaavu",
    priceFrom: "$55",
    blurb:
      "Cosy family-run stay on sleepy Fulidhoo. Nurse shark beach, Boduberu drums most nights.",
    perks: ["Beachfront", "Boduberu nights", "Snorkel gear"],
    image:
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "fulidhoo-inn",
    name: "Fulidhoo Inn",
    tier: "budget",
    island: "Fulidhoo",
    islandSlugs: ["fulidhoo"],
    atoll: "Vaavu",
    priceFrom: "$70",
    blurb:
      "Small inn a minute from the jetty, excellent home-cooked Maldivian breakfasts and manta night snorkels.",
    perks: ["Local food", "Manta night snorkels", "Guided tours"],
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80",
  },

  // ============ UKULHAS (budget) ============
  {
    slug: "coral-heaven-ukulhas",
    name: "Coral Heaven",
    tier: "budget",
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
    tier: "budget",
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
    tier: "budget",
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
      "Purpose-built stay + dive centre. Tiger shark dives on the south-east corner, threshers at Rasgetheemu.",
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
    tier: "budget",
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
    slug: "summer-island",
    name: "Summer Island Maldives",
    tier: "mid",
    island: "Ziyaaraiyfushi",
    islandSlugs: [],
    atoll: "North Malé",
    priceFrom: "$220",
    blurb:
      "All-inclusive resort known for its eco-credentials — world's largest 3D-printed artificial reef on its house reef.",
    perks: ["All-inclusive", "House reef", "Eco project"],
    image:
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "adaaran-hudhuranfushi",
    name: "Adaaran Select Hudhuranfushi",
    tier: "mid",
    island: "Lohifushi",
    islandSlugs: [],
    atoll: "North Malé",
    priceFrom: "$260",
    blurb:
      "Surf camp favourite with its own private reef break. 45-minute speedboat from Malé.",
    perks: ["Private surf break", "All-inclusive", "Speedboat transfer"],
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1600&q=80",
  },
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
  {
    slug: "anantara-veli",
    name: "Anantara Veli",
    tier: "luxury",
    island: "Veligandu Huraa",
    islandSlugs: [],
    atoll: "South Malé",
    priceFrom: "$750",
    blurb:
      "Adults-only overwater resort 35 minutes by speedboat from Malé. Candle-lit beach dinners, reef under the villas.",
    perks: ["Adults only", "Overwater villas", "Speedboat access"],
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "conrad-rangali",
    name: "Conrad Maldives Rangali Island",
    tier: "luxury",
    island: "Rangali",
    islandSlugs: [],
    atoll: "South Ari",
    priceFrom: "$1,100",
    blurb:
      "Home of Ithaa, the world's first undersea restaurant, plus a wine cellar 6m below the waves. Two islands joined by a footbridge.",
    perks: ["Undersea dining", "Two islands", "Seaplane arrival"],
    image:
      "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "baros",
    name: "Baros Maldives",
    tier: "luxury",
    island: "Baros",
    islandSlugs: [],
    atoll: "North Malé",
    priceFrom: "$950",
    blurb:
      "A classic 5★ that still sets the standard — intimate, one of the best house reefs in the country, straight from the jetty.",
    perks: ["House reef", "Fine dining", "25 mins from Malé"],
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=80",
  },

  // ============ ULTRA-LUXURY ============
  {
    slug: "soneva-jani",
    name: "Soneva Jani",
    tier: "ultra",
    island: "Medhufaru",
    islandSlugs: [],
    atoll: "Noonu",
    priceFrom: "$3,800",
    blurb:
      "Retractable villa roofs for stargazing in bed, water slides into the lagoon — the most cinematic ultra-luxury resort on Earth.",
    perks: ["Private slide villas", "Observatory", "No-shoes, no-news"],
    image:
      "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "cheval-blanc-randheli",
    name: "Cheval Blanc Randheli",
    tier: "ultra",
    island: "Randheli",
    islandSlugs: [],
    atoll: "Noonu",
    priceFrom: "$4,200",
    blurb:
      "LVMH's Maldivian flagship. Five islands, a Guerlain spa, design sharp enough to pass for a gallery.",
    perks: ["Guerlain spa", "5 private islands", "LVMH design"],
    image:
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "waldorf-ithaafushi",
    name: "Waldorf Astoria Maldives Ithaafushi",
    tier: "ultra",
    island: "Ithaafushi",
    islandSlugs: [],
    atoll: "South Malé",
    priceFrom: "$2,800",
    blurb:
      "Three islands, 11 restaurants, and a private-island villa rumoured to be the most expensive in the country.",
    perks: ["11 restaurants", "3 islands", "Private-island villa"],
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "four-seasons-landaa",
    name: "Four Seasons Landaa Giraavaru",
    tier: "ultra",
    island: "Landaa Giraavaru",
    islandSlugs: [],
    atoll: "Baa",
    priceFrom: "$2,600",
    blurb:
      "Set inside a UNESCO Biosphere Reserve. Manta Trust base, turtle sanctuary, some of the best spa therapists in Asia.",
    perks: ["UNESCO Biosphere", "Manta research", "Ayurvedic spa"],
    image:
      "https://images.unsplash.com/photo-1520483601560-389dff434fdf?auto=format&fit=crop&w=1600&q=80",
  },
];
