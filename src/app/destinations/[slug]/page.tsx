import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { islands } from "@/data/islands";
import { stays as allStays } from "@/data/stays";
import { transfers } from "@/data/transfers";
import { activitiesFor } from "@/data/activities";
import { creators } from "@/data/creators";
import { StayCard } from "@/components/StayCard";
import { CreatorCard } from "@/components/CreatorCard";

export function generateStaticParams() {
  return islands.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const island = islands.find((i) => i.slug === slug);
  if (!island) return {};
  return {
    title: `${island.name} — Maldives Navigator`,
    description: island.blurb,
  };
}

export default async function IslandPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const island = islands.find((i) => i.slug === slug);
  if (!island) notFound();

  const related = creators.slice(0, 3);
  const islandStays = allStays.filter((s) => s.islandSlugs.includes(slug));
  const activities = activitiesFor(slug);
  const transfer = transfers[slug];

  return (
    <div>
      <section className="relative">
        <div className="relative h-[70vh] min-h-[520px] w-full overflow-hidden">
          <Image src={island.image} alt={island.name} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep via-ocean-deep/40 to-transparent" />
        </div>
        <div className="mx-auto -mt-48 max-w-[1400px] px-6 text-white md:px-10">
          <Link href="/destinations" className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sand hover:underline">
            ← All destinations
          </Link>
          <div className="mt-4 eyebrow text-lagoon-light">{island.atoll} Atoll</div>
          <h1 className="mt-3 font-display text-6xl font-semibold leading-[0.98] md:text-8xl">
            {island.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">{island.highlight}</p>
        </div>
      </section>

      <section className="mx-auto mt-24 grid max-w-[1400px] gap-12 px-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-7">
          <p className="font-display text-2xl leading-relaxed text-ocean md:text-3xl">{island.blurb}</p>
          <div className="mt-10 flex flex-wrap gap-2">
            {island.tags.map((t) => (
              <span key={t} className="rounded-full bg-ocean/5 px-3 py-1 text-[12px] font-medium text-ocean">
                {t}
              </span>
            ))}
          </div>
        </div>
        <aside className="md:col-span-5">
          <div className="rounded-[28px] border border-ocean/10 bg-surface p-7 shadow-[0_1px_0_rgba(10,42,51,0.05)]">
            <div className="eyebrow">Quick facts</div>
            <dl className="mt-5 grid grid-cols-2 gap-5 text-sm">
              <div>
                <dt className="text-muted">Atoll</dt>
                <dd className="mt-1 font-semibold text-ocean">{island.atoll}</dd>
              </div>
              <div>
                <dt className="text-muted">Best for</dt>
                <dd className="mt-1 font-semibold capitalize text-ocean">{island.vibe}</dd>
              </div>
              <div>
                <dt className="text-muted">Transfer</dt>
                <dd className="mt-1 font-semibold text-ocean">{transfer?.type ?? "Ferry / speedboat"}</dd>
              </div>
              <div>
                <dt className="text-muted">From MLE</dt>
                <dd className="mt-1 font-semibold text-ocean">{transfer?.duration ?? "—"}</dd>
              </div>
            </dl>
            <Link
              href="/plan"
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-ocean px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-white hover:bg-ocean-deep"
            >
              Plan a trip here →
            </Link>
          </div>
        </aside>
      </section>

      {/* STAYS on this island */}
      {islandStays.length > 0 && (
        <section className="mx-auto mt-24 max-w-[1400px] px-6 md:px-10">
          <div className="eyebrow">Where to sleep</div>
          <h2 className="mt-3 font-display text-4xl font-semibold text-ocean md:text-5xl">
            Stays on {island.name}
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] text-muted">
            {islandStays.length} curated stay{islandStays.length === 1 ? "" : "s"} across our tier rankings.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {islandStays.map((s) => <StayCard key={s.slug} stay={s} />)}
          </div>
        </section>
      )}

      {/* ACTIVITIES */}
      {activities.length > 0 && (
        <section className="mx-auto mt-24 max-w-[1400px] px-6 md:px-10">
          <div className="eyebrow">Things to do</div>
          <h2 className="mt-3 font-display text-4xl font-semibold text-ocean md:text-5xl">
            On-island & excursions
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activities.map((a) => (
              <div key={a.title} className="rounded-[22px] border border-ocean/10 bg-surface p-6 transition hover:border-ocean/30">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-lagoon/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-lagoon">
                    {a.category}
                  </span>
                  <span className="font-display text-lg font-semibold text-ocean">{a.price}</span>
                </div>
                <div className="mt-4 font-display text-xl font-semibold text-ocean">{a.title}</div>
                <div className="text-[11px] uppercase tracking-widest text-muted">{a.duration}</div>
                <p className="mt-3 text-[13px] leading-relaxed text-muted">{a.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TRANSFER */}
      {transfer && (
        <section className="mx-auto mt-24 max-w-[1400px] px-6 md:px-10">
          <div className="eyebrow">Getting there</div>
          <h2 className="mt-3 font-display text-4xl font-semibold text-ocean md:text-5xl">
            MLE → {island.name}
          </h2>
          <div className="mt-8 grid gap-6 rounded-[28px] border border-ocean/10 bg-surface p-8 md:grid-cols-4">
            <div>
              <div className="text-muted text-[11px] uppercase tracking-widest">Mode</div>
              <div className="mt-1 font-semibold text-ocean">{transfer.type}</div>
            </div>
            <div>
              <div className="text-muted text-[11px] uppercase tracking-widest">Duration</div>
              <div className="mt-1 font-semibold text-ocean">{transfer.duration}</div>
            </div>
            <div>
              <div className="text-muted text-[11px] uppercase tracking-widest">Cost (1-way)</div>
              <div className="mt-1 font-semibold text-ocean">{transfer.priceUsd}</div>
            </div>
            <div>
              <div className="text-muted text-[11px] uppercase tracking-widest">Operator</div>
              <div className="mt-1 font-semibold text-ocean">{transfer.operator ?? "—"}</div>
            </div>
            <p className="md:col-span-4 pt-4 text-[14px] leading-relaxed text-muted">{transfer.notes}</p>
          </div>
        </section>
      )}

      <section className="mx-auto mt-24 max-w-[1400px] px-6 pb-24 md:px-10">
        <div className="eyebrow">Creators loving this island</div>
        <h2 className="mt-3 font-display text-4xl font-semibold text-ocean md:text-5xl">What the internet says</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {related.map((c) => (
            <CreatorCard key={c.id} creator={c} />
          ))}
        </div>
      </section>
    </div>
  );
}
