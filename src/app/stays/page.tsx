import type { Metadata } from "next";
import { stays, tierMeta, type Tier } from "@/data/stays";
import { stayDetails, type StayDetail, type StayType } from "@/data/stayDetails";
import { StayCard } from "@/components/StayCard";
import { TierCard } from "@/components/TierBadge";
import { StayFilterBar } from "@/components/StayFilterBar";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { LocalsPick } from "@/components/LocalsPick";

export const metadata: Metadata = {
  title: "Stays — Backpacker to Ultra-Luxury",
  description:
    "Every kind of Maldives stay — guesthouses, mid-range resorts, luxury overwater villas, ultra-luxury private islands. Filter by atoll, type, features, and price.",
  alternates: { canonical: "/stays" },
};

const ALL_TIERS: Tier[] = ["backpacker", "mid", "luxury", "ultra"];

const TIER_BLURB: Record<Tier, string> = {
  backpacker:
    "Local islands like Maafushi, Dhigurah and Thulusdhoo. Guesthouses, bikini beaches, $35 excursions.",
  mid:
    "4★ resorts & boutique stays — half the price of the big names with the same lagoon.",
  luxury:
    "Overwater villas, world-class dining, seaplane arrivals — the Maldives most people picture.",
  ultra:
    "Private islands, butlers, observatories. The most talked-about hotels on the planet.",
};

const PRICE_MIN = 30;
const PRICE_MAX = 5000;

const FEATURE_KEYS = [
  "waterVillas",
  "alcohol",
  "houseReef",
  "diveCenter",
  "surfAccess",
  "childFriendly",
] as const;
type FeatureKey = (typeof FEATURE_KEYS)[number];

// Best-effort price parse from a Stay.priceFrom string ("$65", "$1,200").
function parsePriceFrom(p: string): number {
  const num = Number(p.replace(/[^0-9.]/g, ""));
  return Number.isFinite(num) ? num : 0;
}

export default async function StaysIndex({
  searchParams,
}: {
  searchParams: Promise<{
    tier?: string;
    atoll?: string;
    type?: string;
    features?: string;
    priceMin?: string;
    priceMax?: string;
  }>;
}) {
  const sp = await searchParams;

  const tier = ALL_TIERS.includes(sp.tier as Tier) ? (sp.tier as Tier) : null;
  const atoll = sp.atoll?.trim() ?? "";
  const type = (sp.type ?? "") as StayType | "";
  const features = (sp.features ?? "").split(",").filter(Boolean) as FeatureKey[];
  const priceMin = sp.priceMin ? Number(sp.priceMin) : PRICE_MIN;
  const priceMax = sp.priceMax ? Number(sp.priceMax) : PRICE_MAX;

  // Filter
  const filtered = stays.filter((s) => {
    if (tier && s.tier !== tier) return false;
    if (atoll && s.atoll !== atoll) return false;

    const detail: StayDetail | undefined = stayDetails[s.slug];

    if (type) {
      // Type only matches stays with detail records that declare a type.
      if (!detail || detail.type !== type) return false;
    }

    if (features.length > 0) {
      // Stays without detail records skip feature filtering.
      if (!detail || !detail.features) return false;
      for (const f of features) {
        if (!detail.features[f]) return false;
      }
    }

    // Price band: prefer detail.priceLow/High when present; fall back to
    // parsing the Stay.priceFrom string.
    const low = detail?.priceLow ?? parsePriceFrom(s.priceFrom);
    const high = detail?.priceHigh ?? low;
    if (high < priceMin || low > priceMax) return false;

    return true;
  });

  const showLanding =
    !tier && !atoll && !type && features.length === 0 &&
    priceMin === PRICE_MIN && priceMax === PRICE_MAX;

  const atolls = Array.from(new Set(stays.map((s) => s.atoll))).sort();

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-20">
      <header className="max-w-3xl">
        <p className="eyebrow text-lagoon">Stays</p>
        <h1 className="mt-3 font-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-tight tracking-tight text-foreground">
          {tier ? tierMeta[tier].title : "Where to sleep in the Maldives."}
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-muted">
          {tier
            ? TIER_BLURB[tier]
            : "Every kind of Maldives stay, locally edited. Filter by tier, atoll, type, features, or price."}
        </p>
      </header>

      <StayFilterBar
        atolls={atolls}
        totalCount={stays.length}
        resultCount={filtered.length}
        priceMin={PRICE_MIN}
        priceMax={PRICE_MAX}
      />

      {/* Tier landing — only on default view */}
      {showLanding && (
        <section className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {ALL_TIERS.map((t) => (
            <TierCard key={t} tier={t} />
          ))}
        </section>
      )}

      {/* Filtered grid — group by tier on the default view, alphabetize within tier (audit §2.9) */}
      <section className="mt-12">
        {filtered.length === 0 ? (
          <p className="rounded-2xl border border-coral/30 bg-coral/5 p-6 text-[14px] text-coral">
            No stays match those filters. Try clearing one.
          </p>
        ) : tier ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...filtered]
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((s) => (
                <StayCard key={s.slug} stay={s} />
              ))}
          </div>
        ) : (
          <div className="space-y-16">
            {ALL_TIERS.map((t) => {
              const inTier = filtered
                .filter((s) => s.tier === t)
                .sort((a, b) => a.name.localeCompare(b.name));
              if (inTier.length === 0) return null;
              return (
                <div key={t}>
                  <div className="mb-6 flex items-end justify-between gap-4">
                    <div>
                      <p className="eyebrow text-lagoon">{tierMeta[t].title}</p>
                      <h2 className="mt-2 font-display text-2xl tracking-tight text-foreground md:text-3xl">
                        {tierMeta[t].tagline}
                      </h2>
                    </div>
                    <p className="shrink-0 text-[12px] uppercase tracking-[0.18em] text-muted">
                      {inTier.length} stay{inTier.length === 1 ? "" : "s"}
                    </p>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {inTier.map((s) => (
                      <StayCard key={s.slug} stay={s} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <LocalsPick />

      <div className="mt-16 border-t border-black/5 pt-8">
        <AffiliateDisclosure long />
      </div>
    </div>
  );
}
