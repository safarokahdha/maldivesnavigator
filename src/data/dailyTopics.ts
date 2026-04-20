// Reader-friendly topic pool — listicles, rankings, comparisons, "best of",
// "avoid", "cheapest", "hidden", practical itineraries.
// The daily generator picks one based on day-of-year.

export const dailyTopics = [
  "Top 10 things to do in the Maldives",
  "10 best local islands in the Maldives for first-timers",
  "7 cheapest resorts in the Maldives that still feel luxury",
  "5 things I wish I knew before my first Maldives trip",
  "The 5 best whale shark snorkel trips in South Ari Atoll",
  "Top 10 overwater villas worth the splurge",
  "How much does a Maldives trip actually cost in 2026?",
  "Maldives vs Seychelles vs Bora Bora — which one wins?",
  "10 Instagram spots in the Maldives everyone is missing",
  "The only Maldives packing list you will ever need",
  "7 under-rated Maldives islands to visit before the crowds",
  "Soneva Jani vs Soneva Fushi — which ultra-luxury to pick",
  "5 reasons the Maldives is safer for solo female travellers than you think",
  "10 best dive sites in the Maldives, ranked",
  "Maldives food tour — 8 dishes every traveller should try",
  "Best month to visit the Maldives for every type of traveller",
  "5 Maldives resorts with the most insane water villas on Earth",
  "How to do the Maldives on a backpacker budget in 2026",
  "10 surf breaks in the Maldives every surfer should know",
  "The real story of Maldives e-visa on arrival, in 2 minutes",
  "5 island-hopping itineraries for a 7-day Maldives trip",
  "Best Maldives resorts for honeymooners (and how to find deals)",
  "10 things no one tells you about Malé airport transfers",
  "Top 7 Maldives liveaboards for divers and serious snorkellers",
  "Why local islands are the best secret in the Maldives",
  "5 Maldives dive sites for absolute beginners",
  "Addu vs Fuvahmulah — the south's shark-diving showdown",
  "10 budget-friendly Maldives resorts under $300 a night",
  "Hanifaru Bay mantas — when to go and how to book responsibly",
  "The ultimate Maldives family trip — 10 things to book",
  "7 unbelievable things you can do for free in the Maldives",
  "Thulusdhoo vs Himmafushi — which surf island is right for you?",
  "10 incredible Maldives sandbank trips you can book from Malé",
  "Best resorts in the Maldives for a luxury proposal",
  "5 underrated photo spots beyond the water villa",
  "Top 10 Maldives spa treatments worth flying for",
  "How to island-hop the Maldives without a resort",
  "10 hidden Maldives experiences locals actually recommend",
  "5 surprising ways the Maldives is different from what you imagined",
  "The 10 most beautiful overwater restaurants in the Maldives",
];

export function topicForDate(date = new Date()): string {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const diff = date.getTime() - start;
  const day = Math.floor(diff / 86400000);
  return dailyTopics[day % dailyTopics.length];
}
