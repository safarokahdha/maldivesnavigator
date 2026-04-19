// Rotating topic pool — the daily generator picks one based on day-of-year.
// 30+ topics so a new one appears every day for a month before repeating.

export const dailyTopics = [
  "the cheapest way to spend 3 nights on Maafushi in 2026",
  "whale shark season in Dhigurah month-by-month",
  "Thulusdhoo's Coke's surf break — wind, swell, when to go",
  "5 reasons to skip the resort and stay on a local island",
  "how to book a Maldives liveaboard for under $1,200",
  "Fuvahmulah's tiger shark dive — what to expect",
  "Hanifaru Bay manta ray season and booking rules",
  "Soneva Jani vs Soneva Fushi — which ultra-luxury to pick",
  "the first-timer's Maldives packing list",
  "Gulhi vs Maafushi vs Thulusdhoo — which local island for you?",
  "surf charter boats in the North Atolls — guide for intermediate surfers",
  "best value overwater villas in the Maldives under $800",
  "free bikini beaches on local islands — where they are and etiquette",
  "the 30-day e-visa on arrival — everything non-residents should know",
  "Ramadan in the Maldives — what changes for tourists",
  "Maldives ferry routes from Malé — a traveller's cheat sheet",
  "snorkelling the house reef at Conrad Rangali Island",
  "why November is the sweet spot for a Maldives trip",
  "the cheapest Maldives excursions that are actually worth it",
  "Baros vs Kurumba — the classic close-to-Malé 5★ duel",
  "Ukulhas — the cleanest local island and why it matters",
  "Addu Atoll — the Maldives most tourists miss",
  "island-hopping the south of Malé Atoll in 4 days",
  "the real cost of a Maldives honeymoon in 2026",
  "Fulidhoo stingray beach and Boduberu drum nights",
  "under-$100 dive sites in South Ari Atoll",
  "Rasdhoo's Madivaru hammerhead dive — what to pack",
  "the difference between seaplane, speedboat and domestic flight transfers",
  "best month for visibility in the Maldives — dive-season guide",
  "how to tip in the Maldives without awkwardness",
  "Maldivian food tour — 5 dishes worth finding on a local island",
  "how to photograph an overwater villa sunset (and not mess up white-balance)",
  "Manta Trust citizen science dives — how to join one",
];

export function topicForDate(date = new Date()): string {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const diff = date.getTime() - start;
  const day = Math.floor(diff / 86400000);
  return dailyTopics[day % dailyTopics.length];
}
