export type JournalEntry = {
  slug: string;
  title: string;
  excerpt: string;
  body?: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
};

export const journal: JournalEntry[] = [
  {
    slug: "first-timer-guide-2026",
    title: "A First-Timer's Navigator to the Maldives",
    excerpt:
      "Where to fly into, when to go, what a day actually costs — the unfiltered first-timer's guide for 2026.",
    author: "Maldives Navigator",
    date: "2026-04-02",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80",
    tags: ["Planning", "Budget", "Travel tips"],
    body: `The Maldives is 1,192 islands across 26 natural atolls, but the part of it you actually go to is small: a single airport, four or five gateway local islands, and a few hundred resorts. If this is your first trip, the honest version of "how to do it" looks nothing like an Instagram caption. Here's what we'd tell a friend.

**Fly into Velana International (MLE)** — it's on Hulhulé island, north of Malé. From there, every onward leg is a boat or another small plane. Don't book a flight that lands at 11pm if you're connecting to a seaplane resort: seaplanes only fly in daylight and you'll spend the night at an airport hotel. Ask your accommodation what time their last transfer leaves.

**The high season is November to April.** That's when the seas are flat, visibility is best, and prices peak. May to October is the southwest monsoon — wetter, windier, but cheaper, and surf season for the Malé atolls. We don't usually recommend July–September for first-timers; you'll get half-price rooms, and you'll watch a lot of rain from inside them.

**Decide your tier first, not your island.** The Maldives stratifies hard:

- **Backpacker** ($30–$120/night): local islands, guesthouses, ferries. Maafushi, Thulusdhoo, Dhigurah, Gulhi, Fulidhoo. You'll snorkel, eat tuna curry, take public boats, and fly home for under $1,500 all-in.
- **Mid** ($200–$500/night): 3–4★ resorts and dive lodges. Half-board, included transfer, fewer extras built in. Reethi Beach, Vilamendhoo, Boutique Beach, Sun Siyam Olhuveli.
- **Luxury** ($500–$1,500/night): 5★ resorts, overwater villas, seaplane to property. Conrad Rangali, Six Senses Laamu, Niyama, Constance Halaveli.
- **Ultra-luxury** ($1,500+): Soneva, Cheval Blanc, Joali, Waldorf Astoria. Private islands, private chefs, private sand bars.

Pick a tier, look at islands inside that tier, then look at properties.

**What a day actually costs.** A backpacker on Maafushi spends maybe $80/day all-in: $50 guesthouse, $5 breakfast at a local café, $25 sandbank trip, the rest on water and snacks. A mid-range guest on a half-board package at Vilamendhoo spends roughly $400/day for two: rooms, food, maybe one $80/person dive. A luxury guest at Conrad pays $1,200/night before they've eaten. The 5–7-night sweet spot for a first trip is usually three nights backpacker + four nights mid, or seven nights mid — enough to see two atolls without spending the whole trip on transfers.

**Don't underestimate transfers.** A "30-minute speedboat from Malé" can mean four hours of waiting at the harbour after your flight. Resorts post their schedules; local-island guesthouses usually meet you at the jetty. Build a buffer day on either end.

**Two non-negotiables.** Travel insurance with diving cover (the Maldives does not have a hyperbaric chamber on every atoll). And a copy of your guesthouse booking confirmation in offline format — immigration sometimes asks.

That's the first-timer's frame. From here, the rest is choosing one of fifteen islands and packing reef-safe sunscreen.`,
  },
  {
    slug: "whale-sharks-dhigurah",
    title: "Swimming With Whale Sharks in Dhigurah",
    excerpt:
      "A $35 tour, four fins in the water, and the moment a 9-metre whale shark glided under the boat.",
    author: "Maldives Navigator",
    date: "2026-03-21",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1600&q=80",
    tags: ["Wildlife", "South Ari", "Snorkel"],
    body: `Six of us were on the dhoni — me, two German divers, a French couple celebrating their tenth anniversary, and Yamin, our spotter. We'd left Dhigurah harbour at 7am. The captain killed the engine inside the South Ari Marine Protected Area, and Yamin climbed onto the roof with binoculars.

This is how the trips work. The boat motors slowly along the channel between Dhigurah and Maamigili, where the seafloor drops to about 30 metres and juvenile whale sharks come up from deeper water to feed and warm themselves in the sun-blasted top layer. The spotter scans for the dark grey shadow that gives them away from above. When he calls "shark!", the captain accelerates, you put on your fins and mask before he stops, and you slide off the back into 28°C water with strict instructions: stay on the surface, no flash photography, no touching, no swimming directly in front of the animal.

We dropped in at 9.15am. I went over the side with the German divers, kicked away from the boat, and looked down. Nothing. Twenty seconds of pale-blue empty water. Then a shape emerged from the haze — slow, patient, twice the length of the dhoni — and a 9-metre whale shark glided directly under us, eight metres down. The pattern of white spots on its grey-blue back is unique to each animal; researchers ID them like fingerprints. This one was missing the tip of its dorsal fin, probably a propeller scar from earlier in life.

We swam alongside for roughly two minutes before it picked up speed and dropped into the deep. You can't keep up. Whale sharks cruise around 5 km/h and you, snorkelling hard, manage maybe 2.5 km/h. The right way to do it is to see them, get a few seconds, and let them go.

The trip cost $35 each, ran for three hours, and we got two more sightings — both shorter, both magic. The South Ari channel is one of the only places on Earth where whale-shark sightings are essentially year-round; researchers have logged the same juveniles returning month after month for years.

A few notes if you go. Book through your guesthouse — the licensed operators run small boats, follow the protected-area code, and brief you in English. Don't book the cheapest option you find on a third-party site; the unlicensed boats sometimes overload, anchor on coral, or get too close. Bring reef-safe sunscreen (apply 30 minutes before, give it time to bind to your skin so it doesn't leach into the water). Wear a rash guard rather than relying on cream alone. And bring antihistamines — about half the boats in the channel have a few sea-stinger jellyfish that drift through with the current, and a brush is more annoying than dangerous.

Best window: 8–10am, when the channel water is calm and visibility is at its best. Don't bother with the late-afternoon trips — animals are deeper and the spot lighter.

I'd do it again tomorrow. The country is full of overrated things; this isn't one of them.`,
  },
  {
    slug: "maafushi-48-hours",
    title: "48 Hours on Maafushi on $150 Total",
    excerpt:
      "Guesthouse, sandbank trip, sunset fishing and three local meals — a full Maldives experience for the price of a resort transfer.",
    author: "Maldives Navigator",
    date: "2026-03-10",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=80",
    tags: ["Budget", "Itinerary", "Local island"],
    body: `Two nights on Maafushi, end-to-end, for $150. That's the budget. Here's exactly how it broke down.

**Day 1**

I caught the 10am public ferry from the Villingili Ferry Terminal in Malé — $2.40 each way, 90 minutes, three other passengers, all locals heading home. The ferry runs Sunday, Tuesday, Thursday, Saturday only; if your flight lands on a Monday or Friday you'll need to take the speedboat ($30, twice as fast, runs daily). The ferry is the better story. The speedboat is the better fit for tight schedules.

Checked into a small guesthouse near the centre of the island for $42 a night ($84 for two nights, breakfast included). Standard room, AC, hot shower, fan, towel, the works. Plenty of guesthouses on Maafushi cost more, but you don't need one of those for a 48-hour stay.

Lunch at Stingray Beach Café — $8 for grilled tuna, rice, and a salad. The fish was caught that morning. Walked the bikini beach at the south end for an hour. Snorkelled the house reef from the same beach for free; saw a moray, two stingrays and a small octopus.

At 4pm I joined a group sandbank-and-sunset trip — $25 a person. We motored 25 minutes to a deserted sandbank that exists only at low tide, drank a soda we'd brought from the supermarket, swam, took photos, and watched the sun drop into the western ocean from a position you'd pay $300 a head for at a resort excursion desk. Same sandbank.

Dinner at Symphony Restaurant — $12 for fish curry, roshi (flatbread), and a fresh juice. Total day-1 spend: $89.

**Day 2**

Up at 6am for a sunrise dolphin trip — $20. Three pods, the closest about 20 metres from the boat. Back by 8am.

Mas-huni for breakfast at a local-style café off the main street — $3.50 for tuna-coconut breakfast and a milk tea. Sat next to a fisherman who sketched the day's market price for yellowfin on his receipt.

The afternoon was free. Walked the island, swam, read. Around 4pm I joined an evening fishing trip — $15. Hand-line fishing on the lagoon edge. Caught a small grouper that the captain grilled for me at the harbour after we got back, throwing in roshi and salad for another $4. That's dinner. Total fishing-trip-and-grilled-fish: $19.

**Day 3 (depart)**

Last breakfast at the guesthouse (included). Speedboat back to Malé to make a 1pm flight — $30.

**Total: $149.50** (guesthouse $84, ferry+speedboat $32, three excursions $60, four meals out $27.50). I'd budgeted $150.

The rest of the country has bigger numbers and bigger photos. But Maafushi is the cheapest way to spend two days on the country's water — bikini beach, sandbank, dolphins, fish you watched come out of the ocean — and it's the version of the Maldives that the country actually lives in. Go. It's not the only thing you'll do, but it's the easiest thing you'll do.`,
  },
];
