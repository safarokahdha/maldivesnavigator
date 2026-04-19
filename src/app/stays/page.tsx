import { tierMeta, type Tier } from "@/data/stays";
import { SectionHeading } from "@/components/SectionHeading";
import { TierCard } from "@/components/TierBadge";

export const metadata = {
  title: "Stays — Budget to Ultra-Luxury — Maldives Compass",
  description:
    "Every kind of Maldives stay, categorised: guesthouse, mid-range, luxury, ultra-luxury.",
};

export default function StaysIndex() {
  const tiers: Tier[] = ["budget", "mid", "luxury", "ultra"];
  return (
    <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10">
      <SectionHeading
        eyebrow="Stay"
        title="From $35 guesthouses to $10,000 water villas"
        sub="Start with the tier that fits your trip. Every one opens into a dedicated page of the best stays we trust right now."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {tiers.map((t) => (
          <TierCard key={t} tier={t} />
        ))}
      </div>

      <div className="mt-20 grid gap-6 md:grid-cols-2">
        {tiers.map((t) => (
          <div key={t} className="rounded-[24px] border border-ocean/10 bg-surface p-7 shadow-[0_1px_0_rgba(10,42,51,0.05)]">
            <div className="eyebrow">{tierMeta[t].tagline}</div>
            <h3 className="mt-3 font-display text-2xl font-semibold text-ocean">{tierMeta[t].title}</h3>
            <p className="mt-3 text-[14px] leading-relaxed text-muted">
              {t === "budget" &&
                "Local islands like Maafushi, Dhigurah and Thulusdhoo. Guesthouses, bikini beaches, $35 excursions."}
              {t === "mid" &&
                "4★ resorts & boutique stays — half the price of the big names with the same lagoon."}
              {t === "luxury" &&
                "Overwater villas, world-class dining, seaplane arrivals — the Maldives most people picture."}
              {t === "ultra" &&
                "Private islands, butlers, observatories. The most talked-about hotels on the planet."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
