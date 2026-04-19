// Per-island activities & excursions. Prices are USD, realistic ranges
// travellers actually pay on the jetty or through guesthouses.

export type Activity = {
  title: string;
  category: "Wildlife" | "Dive" | "Surf" | "Culture" | "Island hop" | "Food" | "Chill";
  price: string;
  duration: string;
  description: string;
};

export const activitiesByIsland: Record<string, Activity[]> = {
  maafushi: [
    { title: "Sandbank + dolphin tour", category: "Island hop", price: "$35", duration: "Half-day", description: "Boat to a private sandbank, snorkel over turtles, spinner dolphins on the way home." },
    { title: "Whale shark snorkel", category: "Wildlife", price: "$80", duration: "Full-day", description: "Speedboat down to South Ari, 2–3 reef stops, up to three whale shark attempts." },
    { title: "Sunset fishing", category: "Food", price: "$25", duration: "3 hours", description: "Traditional line fishing; your catch gets grilled back on the beach." },
    { title: "Scuba intro dive", category: "Dive", price: "$90", duration: "Half-day", description: "Beginner-friendly pool + open-water dive on the house reef." },
  ],
  gulhi: [
    { title: "Nurse shark snorkel", category: "Wildlife", price: "$25", duration: "2 hours", description: "Jetty-to-reef snorkel where nurse sharks cruise the shallows every evening." },
    { title: "Resort day trip", category: "Chill", price: "$120", duration: "Full-day", description: "Day pass to a nearby 5★ — pool, lunch, overwater villa photos on budget." },
    { title: "Local island hop", category: "Island hop", price: "$30", duration: "Half-day", description: "Half-day boat to Maafushi and a sandbank; see the busier side of the atoll." },
  ],
  thulusdhoo: [
    { title: "Coke's surf session", category: "Surf", price: "$25", duration: "2 hours", description: "Boat drop-off and pickup at Coke's; board hire extra. Paddle-out times depend on tide." },
    { title: "Chickens boat trip", category: "Surf", price: "$40", duration: "Half-day", description: "Full-session boat to Chickens left — easier take-off, long wall." },
    { title: "Manta night snorkel", category: "Wildlife", price: "$60", duration: "Evening", description: "Nearby reef where mantas come to feed under boat lights." },
    { title: "Coca-Cola factory visit", category: "Culture", price: "$8", duration: "1 hour", description: "Tour the only Coca-Cola factory making the drink from desalinated sea water." },
  ],
  dhigurah: [
    { title: "Whale shark house reef", category: "Wildlife", price: "$60", duration: "Half-day", description: "Dhigurah's whale shark reef is right off the island — sightings year-round." },
    { title: "Manta cleaning station dive", category: "Dive", price: "$90", duration: "Half-day", description: "Two-tank dive at a manta cleaning station; resident rays most days Apr–Oct." },
    { title: "Sandbank picnic", category: "Chill", price: "$45", duration: "Half-day", description: "Boat to a pop-up sandbank with a packed lunch and a snorkel break." },
  ],
  rasdhoo: [
    { title: "Madivaru hammerhead dive", category: "Dive", price: "$110", duration: "Pre-dawn", description: "5am boat, 30m dive at dawn; scalloped hammerheads in small schools." },
    { title: "Rasdhoo Madivaru sandbank", category: "Chill", price: "$30", duration: "Half-day", description: "Shallow sandbank between Rasdhoo and Kuramathi — incredible photo stop." },
    { title: "Kuramathi reef snorkel", category: "Wildlife", price: "$25", duration: "2 hours", description: "Drift snorkel over turtles and reef sharks along Kuramathi's outer wall." },
  ],
  fulidhoo: [
    { title: "Nurse shark + stingray beach", category: "Wildlife", price: "Free", duration: "Evening", description: "Nurse sharks and stingrays come to the beach every sunset to be fed by fishermen." },
    { title: "Manta night snorkel", category: "Wildlife", price: "$45", duration: "Evening", description: "Boat to a reef where mantas feed in the lights after dark. Wild experience." },
    { title: "Boduberu drum night", category: "Culture", price: "Free", duration: "Evening", description: "Traditional drum + dance session put on by island locals most evenings." },
  ],
  ukulhas: [
    { title: "House reef snorkel", category: "Wildlife", price: "Free", duration: "Any", description: "Reef starts at ankle depth — turtles, reef sharks, eagle rays all from the beach." },
    { title: "Whale shark trip (South Ari)", category: "Wildlife", price: "$85", duration: "Full-day", description: "Boat into South Ari Atoll — one of the most reliable whale shark hunts." },
    { title: "Sandbank + BBQ", category: "Chill", price: "$35", duration: "Half-day", description: "Sandbank picnic with a BBQ lunch grilled on the sand by your guesthouse." },
  ],
  hanimaadhoo: [
    { title: "Tuna big-game fishing", category: "Food", price: "$90", duration: "Half-day", description: "Trolling for yellowfin in the channels — the north's main fishery." },
    { title: "Northern reef dives", category: "Dive", price: "$70", duration: "Half-day", description: "Reefs virtually untouched by tourists — hard coral gardens and grey reef sharks." },
    { title: "Bike the island + jungle", category: "Culture", price: "$10", duration: "Half-day", description: "Rent a bike, loop through interior forest trails barely any tourist has ridden." },
  ],
  fuvahmulah: [
    { title: "Tiger shark dive", category: "Dive", price: "$150", duration: "Half-day", description: "The world's most reliable tiger shark dive. You will see them. Non-baited, 14m." },
    { title: "Thresher shark dive", category: "Dive", price: "$120", duration: "Half-day", description: "Early-morning thresher dive on the outside reef." },
    { title: "Freshwater lake walk", category: "Culture", price: "Free", duration: "2 hours", description: "Walk around Bandaara Kilhi, a freshwater lake — rare in the Maldives." },
  ],
  addu: [
    { title: "British Loyalty wreck dive", category: "Dive", price: "$90", duration: "Half-day", description: "140m WWII tanker lying at 30m — one of the south's signature dives." },
    { title: "Cycle the atoll causeway", category: "Culture", price: "$10", duration: "Full-day", description: "30km of linked islands joined by causeway — bike Gan to Hithadhoo for the day." },
    { title: "Manta Point dive", category: "Dive", price: "$85", duration: "Half-day", description: "Seasonal manta ray cleaning station on the western edge (Aug–Nov)." },
    { title: "Koattey protected area", category: "Wildlife", price: "Free", duration: "Half-day", description: "Mangroves, banyan trees, 19th-century British forts — Addu's natural reserve." },
  ],
};

export function activitiesFor(slug: string): Activity[] {
  return activitiesByIsland[slug] ?? [];
}
