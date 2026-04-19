// Typical transfer from Malé (VIA airport code MLE) to each island.
// Used by the plan wizard to tell travellers how they'll actually arrive.

import type { Island } from "./islands";

export type TransferInfo = {
  type: "Public ferry" | "Speedboat" | "Seaplane" | "Domestic flight + speedboat";
  duration: string;
  priceUsd: string; // one-way approx
  operator?: string;
  notes: string;
};

export const transfers: Record<Island["slug"], TransferInfo> = {
  maafushi: {
    type: "Public ferry",
    duration: "1h 30m",
    priceUsd: "$2",
    operator: "MTCC public ferry",
    notes: "Public ferry from Malé Villingili terminal. Speedboat ($25, 30 min) runs multiple times daily — easier if you land late.",
  },
  thulusdhoo: {
    type: "Speedboat",
    duration: "45 min",
    priceUsd: "$30",
    operator: "Multiple operators (Iruvai, Thulusdhoo Express)",
    notes: "Direct speedboat from Malé Hulhumalé jetty. Public ferry exists but only 3–4 days/week.",
  },
  dhigurah: {
    type: "Speedboat",
    duration: "2h",
    priceUsd: "$70",
    operator: "ATOLL Transfer / island speedboat",
    notes: "One daily speedboat from Malé. Book a day ahead. Alternative: domestic flight to Maamigili + 10 min boat.",
  },
  rasdhoo: {
    type: "Speedboat",
    duration: "1h 30m",
    priceUsd: "$60",
    operator: "Rasdhoo Express",
    notes: "Twice-daily speedboat from Malé. The airport speedboat stand at Hulhumalé is easiest.",
  },
  fulidhoo: {
    type: "Public ferry",
    duration: "3h 30m",
    priceUsd: "$3",
    operator: "MTCC public ferry",
    notes: "Slow ferry from Malé 3x per week, or a speedboat transfer (~$45) most days.",
  },
  ukulhas: {
    type: "Speedboat",
    duration: "1h 45m",
    priceUsd: "$65",
    operator: "Ukulhas Express",
    notes: "Scheduled speedboat from Malé, most days of the week. Book via your guesthouse.",
  },
  gulhi: {
    type: "Public ferry",
    duration: "1h",
    priceUsd: "$2",
    operator: "MTCC public ferry",
    notes: "Same ferry line as Maafushi — Gulhi is the stop before. Speedboat $20, 25 min.",
  },
  hanimaadhoo: {
    type: "Domestic flight + speedboat",
    duration: "1h flight + short boat",
    priceUsd: "$160",
    operator: "Maldivian Airlines",
    notes: "Domestic flight from Malé to Hanimaadhoo (HAQ). Daily, ~45 min. Then walk/taxi in-island.",
  },
  fuvahmulah: {
    type: "Domestic flight + speedboat",
    duration: "1h 20m flight",
    priceUsd: "$220",
    operator: "Maldivian Airlines",
    notes: "Daily flight Malé → Fuvahmulah (FVM). One of the only single-island atolls in the country.",
  },
  addu: {
    type: "Domestic flight + speedboat",
    duration: "1h 30m flight",
    priceUsd: "$200",
    operator: "Maldivian Airlines",
    notes: "Malé → Gan (GAN). From the airport, islands are linked by causeway — taxi or rent a scooter.",
  },
};
