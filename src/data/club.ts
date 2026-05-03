// Atoll Voyager Club — loyalty program tiers.
//
// Math designed honestly: tiers ARE reachable but the top tier requires
// volume only the most frequent travellers and travel-content creators
// hit. Average leisure traveller sits at Sandbar / Atoll for life.
//
// Earning rule (kept simple for marketing transparency):
//   1 point per $1 booked through Maldives Navigator partner links
//   (after the booking is verified by a confirmation email forwarded to
//    rewards@maldivesnavigator.com).
//
// Points expire if no qualifying booking in 24 months — visual decay
// drives "use it or lose it" psychology.

export type Tier = {
  key: "sandbar" | "atoll" | "lagoon" | "reef";
  name: string;
  pointsRequired: number;
  approxSpendUsd: string;
  approxBookings: string;
  perks: string[];
  topPrize?: string;
  visualGradient: string;
  accent: string;
};

export const TIERS: Tier[] = [
  {
    key: "sandbar",
    name: "Sandbar",
    pointsRequired: 0,
    approxSpendUsd: "$0",
    approxBookings: "Sign-up only",
    perks: [
      "Members-only newsletter",
      "Early access to new property launches",
      "5% discount on the printable planner",
    ],
    visualGradient: "from-sand to-sand-deep",
    accent: "text-ocean",
  },
  {
    key: "atoll",
    name: "Atoll",
    pointsRequired: 5_000,
    approxSpendUsd: "$5,000 spent",
    approxBookings: "≈ 4–6 bookings",
    perks: [
      "Priority email support — replies within 12 hours",
      "Editor-curated quarterly itinerary draft",
      "Free 12-page Maldives planner PDF",
      "10% discount on partner dive packages",
    ],
    visualGradient: "from-lagoon-light to-lagoon",
    accent: "text-white",
  },
  {
    key: "lagoon",
    name: "Lagoon",
    pointsRequired: 18_000,
    approxSpendUsd: "$18,000 spent",
    approxBookings: "≈ 12–18 bookings",
    perks: [
      "Direct WhatsApp line to the editor",
      "One bespoke trip plan per year (we build the whole itinerary)",
      "Complimentary speedboat upgrade on partner stays",
      "Refer-a-friend doubles their first-trip points",
    ],
    visualGradient: "from-ocean to-ocean-deep",
    accent: "text-white",
  },
  {
    key: "reef",
    name: "Reef",
    pointsRequired: 60_000,
    approxSpendUsd: "$60,000 spent",
    approxBookings: "≈ 35–60 bookings or referrals",
    perks: [
      "Everything from Lagoon, plus —",
      "One economy return MLE flight per year, sponsored by us",
      "Two complimentary nights at a partner stay",
      "Lifetime membership — never decays",
    ],
    topPrize: "Sponsored economy ticket to Maldives, every year",
    visualGradient: "from-coral to-coral-deep",
    accent: "text-white",
  },
];

export const POINTS_RULES = [
  { rule: "Booking through Booking.com partner link", points: "1 pt per $1 booked" },
  { rule: "Booking through Agoda partner link", points: "1 pt per $1 booked" },
  { rule: "Refer-a-friend who completes a booking", points: "+500 pts (each)" },
  { rule: "Verified Maldives review on the journal", points: "+100 pts (max once per stay)" },
  { rule: "Newsletter signup", points: "+100 pts (one-time)" },
];

export const FAQ = [
  {
    q: "Is this real?",
    a: "Yes. We verify every booking by matching your Booking.com or Agoda confirmation against our partner-portal report. Forward the confirmation email to rewards@maldivesnavigator.com after you book and points appear in your account within 7 days.",
  },
  {
    q: "How long do points last?",
    a: "Sandbar, Atoll and Lagoon points expire after 24 months of inactivity. Reef tier is permanent once reached.",
  },
  {
    q: "Why is Reef tier so high?",
    a: "Honest answer: a sponsored ticket is real money. We need enough commission earned through your bookings (and any guests you refer) to fund the prize and still keep the lights on. Most members will sit at Atoll or Lagoon for life — and that's still a useful set of perks.",
  },
  {
    q: "Can I combine spend across multiple trips?",
    a: "Yes. Every booking through our partner links — yours, your family's, friends you refer — adds to your point total. Travel agents and content creators who book regularly will progress fastest.",
  },
  {
    q: "What if I forget to forward a confirmation?",
    a: "Email rewards@maldivesnavigator.com with your booking ID and travel dates within 60 days. We can usually reconcile via the partner portal.",
  },
];
