export type JournalEntry = {
  slug: string;
  title: string;
  excerpt: string;
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
  },
];
