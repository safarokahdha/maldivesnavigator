export type Tier = "budget" | "mid" | "luxury" | "ultra";

export type Stay = {
  slug: string;
  name: string;
  tier: Tier;
  island: string;
  atoll: string;
  priceFrom: string;
  blurb: string;
  perks: string[];
  image: string;
  website?: string;
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
  // Budget
  {
    slug: "arena-beach",
    name: "Arena Beach Hotel",
    tier: "budget",
    island: "Maafushi",
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
    atoll: "Kaafu",
    priceFrom: "$75",
    blurb:
      "Guesthouse-meets-boutique-hotel with a pool and a spa — rare on a local island at this price.",
    perks: ["Pool", "Spa", "Breakfast included"],
    image:
      "https://images.unsplash.com/photo-1520483601560-389dff434fdf?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "batuta-maldives",
    name: "Batuta Maldives Surf View",
    tier: "budget",
    island: "Thulusdhoo",
    atoll: "North Malé",
    priceFrom: "$60",
    blurb:
      "Surf-first guesthouse looking over Coke's break. Board hire, beginner lessons, board-to-door service.",
    perks: ["Surf lessons", "Board storage", "Ocean view"],
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "dhigurah-retreat",
    name: "Dhigurah Retreat Beach",
    tier: "budget",
    island: "Dhigurah",
    atoll: "South Ari",
    priceFrom: "$85",
    blurb:
      "Right next to the whale shark house reef. Simple, clean, and runs daily tours straight from the jetty.",
    perks: ["Whale shark trips", "Beachfront", "Dive centre nearby"],
    image:
      "https://images.unsplash.com/photo-1586500036706-41963de24d8b?auto=format&fit=crop&w=1600&q=80",
  },

  // Mid-range
  {
    slug: "summer-island",
    name: "Summer Island Maldives",
    tier: "mid",
    island: "Ziyaaraiyfushi",
    atoll: "North Malé",
    priceFrom: "$220",
    blurb:
      "An all-inclusive resort known for its eco-credentials — the world's largest 3D-printed artificial reef sits on its house reef.",
    perks: ["All-inclusive", "House reef", "Eco project"],
    image:
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "adaaran-hudhuranfushi",
    name: "Adaaran Select Hudhuranfushi",
    tier: "mid",
    island: "Lohifushi",
    atoll: "North Malé",
    priceFrom: "$260",
    blurb:
      "Surf camp favourite with its own private reef break, beach bungalows and an easy 45-minute speedboat from Malé.",
    perks: ["Private surf break", "All-inclusive", "Speedboat transfer"],
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "sun-siyam-olhuveli",
    name: "Sun Siyam Olhuveli",
    tier: "mid",
    island: "Olhuveli",
    atoll: "South Malé",
    priceFrom: "$320",
    blurb:
      "Overwater villas at almost-mid prices. Huge lagoon, reef sharks in the shallows, and one of the best-value honeymoon picks.",
    perks: ["Overwater villas", "House reef", "Honeymoon packages"],
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80",
  },

  // Luxury
  {
    slug: "anantara-veli",
    name: "Anantara Veli",
    tier: "luxury",
    island: "Veligandu Huraa",
    atoll: "South Malé",
    priceFrom: "$750",
    blurb:
      "Adults-only overwater resort 35 minutes by speedboat from Malé. Candle-lit beach dinners and reef that curls right under the villas.",
    perks: ["Adults only", "Overwater villas", "Speedboat access"],
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "conrad-rangali",
    name: "Conrad Maldives Rangali Island",
    tier: "luxury",
    island: "Rangali",
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
    atoll: "North Malé",
    priceFrom: "$950",
    blurb:
      "A classic 5★ that still sets the standard — lush, intimate, and one of the best house reefs in the country, straight from the jetty.",
    perks: ["House reef", "Fine dining", "25 mins from Malé"],
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=80",
  },

  // Ultra-luxury
  {
    slug: "soneva-jani",
    name: "Soneva Jani",
    tier: "ultra",
    island: "Medhufaru",
    atoll: "Noonu",
    priceFrom: "$3,800",
    blurb:
      "Retractable villa roofs for stargazing in bed, water slides into the lagoon, and the most cinematic ultra-luxury resort on Earth.",
    perks: ["Private slide villas", "Observatory", "No-shoes, no-news"],
    image:
      "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "cheval-blanc-randheli",
    name: "Cheval Blanc Randheli",
    tier: "ultra",
    island: "Randheli",
    atoll: "Noonu",
    priceFrom: "$4,200",
    blurb:
      "LVMH's Maldivian flagship. Five islands, a spa by Guerlain, and design so sharp it could pass for a gallery.",
    perks: ["Guerlain spa", "5 private islands", "LVMH design"],
    image:
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "waldorf-ithaafushi",
    name: "Waldorf Astoria Maldives Ithaafushi",
    tier: "ultra",
    island: "Ithaafushi",
    atoll: "South Malé",
    priceFrom: "$2,800",
    blurb:
      "Three islands, 11 restaurants, and a whole separate private island villa said to be the most expensive in the country.",
    perks: ["11 restaurants", "3 islands", "Private-island villa"],
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "four-seasons-landaa",
    name: "Four Seasons Landaa Giraavaru",
    tier: "ultra",
    island: "Landaa Giraavaru",
    atoll: "Baa",
    priceFrom: "$2,600",
    blurb:
      "Set inside a UNESCO Biosphere Reserve. Manta Trust base, turtle sanctuary and some of the best spa therapists in Asia.",
    perks: ["UNESCO Biosphere", "Manta research", "Ayurvedic spa"],
    image:
      "https://images.unsplash.com/photo-1520483601560-389dff434fdf?auto=format&fit=crop&w=1600&q=80",
  },
];
