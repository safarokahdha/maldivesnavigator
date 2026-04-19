import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { stays, tierMeta, type Tier } from "@/data/stays";
import { creators } from "@/data/creators";
import { StayCard } from "@/components/StayCard";
import { CreatorCard } from "@/components/CreatorCard";

const validTiers: Tier[] = ["budget", "mid", "luxury", "ultra"];

const tierHero: Record<Tier, string> = {
  budget:
    "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=2600&q=85",
  mid:
    "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=2600&q=85",
  luxury:
    "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=2600&q=85",
  ultra:
    "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=2600&q=85",
};

export function generateStaticParams() {
  return validTiers.map((tier) => ({ tier }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ tier: string }> },
) {
  const { tier } = await params;
  if (!validTiers.includes(tier as Tier)) return {};
  const meta = tierMeta[tier as Tier];
  return {
    title: `${meta.title} stays — Maldives Compass`,
    description: meta.tagline,
  };
}

export default async function TierPage(
  { params }: { params: Promise<{ tier: string }> },
) {
  const { tier } = await params;
  if (!validTiers.includes(tier as Tier)) notFound();

  const t = tier as Tier;
  const meta = tierMeta[t];
  const list = stays.filter((s) => s.tier === t);
  const creatorVoices = creators.filter((c) => c.tier === t).slice(0, 3);

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="relative h-[60vh] min-h-[440px] w-full">
          <Image src={tierHero[t]} alt={meta.title} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep via-ocean-deep/50 to-ocean-deep/30" />
        </div>
        <div className="mx-auto -mt-40 max-w-[1400px] px-6 text-white md:px-10">
          <Link href="/stays" className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sand hover:underline">
            ← All tiers
          </Link>
          <div className="mt-3 eyebrow text-lagoon-light">{meta.tagline}</div>
          <h1 className="mt-3 font-display text-6xl font-semibold leading-[0.98] md:text-8xl">
            {meta.title}
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-10">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((stay) => (
            <StayCard key={stay.slug} stay={stay} />
          ))}
        </div>
      </section>

      {creatorVoices.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-6 pb-24 md:px-10">
          <div className="eyebrow">Matching voices</div>
          <h2 className="mt-3 font-display text-4xl font-semibold text-ocean md:text-5xl">
            Creators in this tier
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {creatorVoices.map((c) => (
              <CreatorCard key={c.id} creator={c} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
