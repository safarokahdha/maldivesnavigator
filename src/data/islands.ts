export type Island = {
  slug: string;
  name: string;
  atoll: string;
  vibe: "backpacker" | "surf" | "dive" | "family" | "local" | "honeymoon";
  highlight: string;
  blurb: string;
  image: string;
  tags: string[];
};

export const islands: Island[] = [
  {
    slug: "maafushi",
    name: "Maafushi",
    atoll: "Kaafu",
    vibe: "backpacker",
    highlight: "Budget hub of Maldives",
    blurb:
      "The island that cracked the Maldives for backpackers. Guesthouses from $35/night, bikini beach, excursions to sandbanks, whale shark tours, and a ferry straight from Malé.",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=80",
    tags: ["Guesthouses", "Ferry from Malé", "Bikini beach", "Day trips"],
  },
  {
    slug: "thulusdhoo",
    name: "Thulusdhoo",
    atoll: "North Malé",
    vibe: "surf",
    highlight: "Home of Coke's & Chickens surf breaks",
    blurb:
      "Surf capital of the Maldives. Two world-class reef breaks right off the island, chilled local cafés, and a laid-back vibe that pulls in surfers from around the world.",
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1600&q=80",
    tags: ["Surf", "Reef breaks", "Local island", "Guesthouses"],
  },
  {
    slug: "dhigurah",
    name: "Dhigurah",
    atoll: "South Ari",
    vibe: "dive",
    highlight: "Whale sharks year-round",
    blurb:
      "A long, skinny island in South Ari Atoll where whale sharks cruise the house reef all year. Snorkellers swim with them; divers chase manta rays at nearby cleaning stations.",
    image:
      "https://images.unsplash.com/photo-1586500036706-41963de24d8b?auto=format&fit=crop&w=1600&q=80",
    tags: ["Whale sharks", "Manta rays", "Diving", "Long beach"],
  },
  {
    slug: "rasdhoo",
    name: "Rasdhoo",
    atoll: "Rasdhoo",
    vibe: "dive",
    highlight: "Hammerhead dives at dawn",
    blurb:
      "Tiny island, massive dive reputation. Early-morning boat rides to Hammerhead Point where scalloped hammerheads patrol the blue. Sandbank picnics in the afternoon.",
    image:
      "https://images.unsplash.com/photo-1540202404-1b927e27fa8b?auto=format&fit=crop&w=1600&q=80",
    tags: ["Hammerheads", "Scuba", "Sandbank", "Quiet"],
  },
  {
    slug: "fulidhoo",
    name: "Fulidhoo",
    atoll: "Vaavu",
    vibe: "local",
    highlight: "Stingrays, nurse sharks, Boduberu nights",
    blurb:
      "A sleepy Vaavu island where stingrays glide onto the beach at sunset and local drummers play Boduberu after dark. Manta and nurse shark night snorkels are the draw.",
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80",
    tags: ["Culture", "Nurse sharks", "Stingrays", "Tiny island"],
  },
  {
    slug: "ukulhas",
    name: "Ukulhas",
    atoll: "North Ari",
    vibe: "local",
    highlight: "Cleanest island in the Maldives",
    blurb:
      "Repeatedly voted the cleanest local island in the country. Powder-white sand, a pristine bikini beach and reefs that start at ankle depth.",
    image:
      "https://images.unsplash.com/photo-1605538032404-d7f94fab57cf?auto=format&fit=crop&w=1600&q=80",
    tags: ["Eco", "House reef", "Sandbank", "Family-friendly"],
  },
  {
    slug: "gulhi",
    name: "Gulhi",
    atoll: "South Malé",
    vibe: "backpacker",
    highlight: "Quieter neighbour of Maafushi",
    blurb:
      "Same atoll as Maafushi, a fraction of the crowds. Shallow lagoon, a handful of guesthouses, and easy speedboat access from Malé.",
    image:
      "https://images.unsplash.com/photo-1586500036706-41963de24d8b?auto=format&fit=crop&w=1600&q=80",
    tags: ["Quiet", "Lagoon", "Guesthouses"],
  },
  {
    slug: "hanimaadhoo",
    name: "Hanimaadhoo",
    atoll: "Haa Dhaalu",
    vibe: "local",
    highlight: "The untouched north",
    blurb:
      "An under-the-radar island in the far north with its own domestic airport, jungle trails, and reefs almost no tourist has ever seen.",
    image:
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1600&q=80",
    tags: ["Off the beaten path", "Jungle", "Domestic flights"],
  },
  {
    slug: "fuvahmulah",
    name: "Fuvahmulah",
    atoll: "Gnaviyani",
    vibe: "dive",
    highlight: "Tiger sharks on every dive",
    blurb:
      "The only single-island atoll in the country and the world's most reliable spot for tiger shark encounters. Thresher sharks and oceanic mantas round out the bucket list.",
    image:
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1600&q=80",
    tags: ["Tiger sharks", "Advanced diving", "Freshwater lakes"],
  },
  {
    slug: "addu",
    name: "Addu City (Hithadhoo)",
    atoll: "Addu",
    vibe: "local",
    highlight: "Bike the longest atoll chain",
    blurb:
      "The southernmost atoll, famous for its connected islands you can bike between, WWII British sites, and the wrecks of the British Loyalty and Maradhoo.",
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80",
    tags: ["History", "Cycling", "Wreck diving"],
  },
  {
    slug: "mathiveri",
    name: "Mathiveri",
    atoll: "North Ari",
    vibe: "backpacker",
    highlight: "Quiet North Ari with a famous sandbank",
    blurb:
      "A sleepy local island in North Ari Atoll best known for the long sandbank stretching off its tip and easy access to whale-shark and manta excursions in the same atoll.",
    image:
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1600&q=80",
    tags: ["Sandbank", "Local island", "Bikini beach", "Manta excursions"],
  },
  {
    slug: "hangnaameedhoo",
    name: "Hangnaameedhoo",
    atoll: "South Ari",
    vibe: "dive",
    highlight: "Dhigurah's quieter dive-base neighbour",
    blurb:
      "A small South Ari island next door to Dhigurah, with the same access to whale sharks and manta cleaning stations but a fraction of the foot traffic.",
    image:
      "https://images.unsplash.com/photo-1586500036706-41963de24d8b?auto=format&fit=crop&w=1600&q=80",
    tags: ["Whale sharks", "Diving", "Quiet", "Local island"],
  },
  {
    slug: "hulhumale",
    name: "Hulhumalé",
    atoll: "Kaafu",
    vibe: "local",
    highlight: "Transit gateway. Walk-from-airport convenience.",
    blurb:
      "The reclaimed island connected to Velana International Airport by bridge. The most useful first or last night in the country — guesthouses, beach, and direct ferry links to local islands.",
    image:
      "https://images.unsplash.com/photo-1540202404-1b927e27fa8b?auto=format&fit=crop&w=1600&q=80",
    tags: ["Airport gateway", "Local island", "Bridge to MLE", "Transit"],
  },
  {
    slug: "huraa",
    name: "Huraa",
    atoll: "North Malé",
    vibe: "backpacker",
    highlight: "North Malé local island just past the resort line",
    blurb:
      "A small North Malé local island sitting in front of the Four Seasons reef. Cheap base with luxury reefs minutes away by speedboat.",
    image:
      "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=1600&q=80",
    tags: ["Local island", "House reef", "Snorkel", "Quiet"],
  },
  {
    slug: "dharavandhoo",
    name: "Dharavandhoo",
    atoll: "Baa",
    vibe: "dive",
    highlight: "Hanifaru Bay manta gateway, Baa Atoll",
    blurb:
      "The local island that anchors visits to Hanifaru Bay — the UNESCO biosphere where dozens of manta rays gather at peak season. Domestic airport on the island.",
    image:
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1600&q=80",
    tags: ["Mantas", "Hanifaru Bay", "Baa Biosphere", "Domestic airport"],
  },
];
