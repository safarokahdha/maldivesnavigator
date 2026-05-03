import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { islands } from "@/data/islands";
import { stays as allStays } from "@/data/stays";
import { transfers } from "@/data/transfers";
import {
  getIslandDetail,
  MALDIVES_WEATHER,
  type IslandDetail,
} from "@/data/islandDetails";
import { journal as seedJournal } from "@/data/journal";
import { loadIndex } from "@/lib/journalStore";
import { StayCard } from "@/components/StayCard";
import { LocalsPick } from "@/components/LocalsPick";
import { BeehiivEmbed } from "@/components/BeehiivEmbed";
import { JsonLd } from "@/components/JsonLd";

const SITE_URL = "https://maldivesnavigator.com";

// Build all island slugs at build time.
export function generateStaticParams() {
  return islands.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const island = islands.find((i) => i.slug === slug);
  if (!island) return {};
  const detail = getIslandDetail(slug);
  return {
    title: `${island.name} — ${island.atoll} Atoll guide`,
    description:
      detail?.tagline ?? island.blurb ?? `Travel guide to ${island.name}.`,
    alternates: { canonical: `/destinations/${slug}` },
    openGraph: {
      title: `${island.name} — Maldives Navigator`,
      description: detail?.tagline ?? island.blurb,
      images: [{ url: island.image, width: 1600, height: 900, alt: island.name }],
    },
  };
}

const TIER_LABEL: Record<string, string> = {
  backpacker: "Budget",
  mid: "Mid-range",
  luxury: "Luxury",
  ultra: "Ultra-luxury",
};

const STYLE_LABEL: Record<string, string> = {
  surf: "Surf",
  dive: "Dive",
  budget: "Budget",
  luxury: "Luxury",
  "local-island": "Local island",
  wildlife: "Wildlife",
  culture: "Culture",
  family: "Family",
};

export default async function IslandPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const island = islands.find((i) => i.slug === slug);
  if (!island) notFound();

  const detail = getIslandDetail(slug);
  const transfer = transfers[slug];
  const islandStays = allStays.filter((s) => s.islandSlugs.includes(slug)).slice(0, 6);

  // Related journal — 3 recent posts whose tags include this island slug or name.
  const generated = await loadIndex().catch(() => []);
  const allJournal = [
    ...generated.map((g) => ({
      slug: g.slug,
      title: g.title,
      excerpt: g.excerpt,
      date: g.date,
      image: g.image,
      tags: g.tags,
    })),
    ...seedJournal.map((s) => ({
      slug: s.slug,
      title: s.title,
      excerpt: s.excerpt,
      date: s.date,
      image: s.image,
      tags: s.tags,
    })),
  ];
  const islandLower = island.name.toLowerCase();
  const relatedArticles = allJournal
    .filter((j) =>
      (j.tags || []).some(
        (t) => t.toLowerCase() === islandLower || t.toLowerCase() === slug
      )
    )
    .slice(0, 3);

  // Structured data — BreadcrumbList + TouristDestination (brief §12)
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Destinations",
        item: `${SITE_URL}/destinations`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: island.name,
        item: `${SITE_URL}/destinations/${island.slug}`,
      },
    ],
  };
  const placeLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: island.name,
    description: detail?.tagline ?? island.blurb,
    image: island.image,
    address: {
      "@type": "PostalAddress",
      addressRegion: `${island.atoll} Atoll`,
      addressCountry: "MV",
    },
    url: `${SITE_URL}/destinations/${island.slug}`,
  };

  return (
    <article>
      <JsonLd data={[breadcrumbLd, placeLd]} />

      {/* §5.3 #1 — Hero */}
      <Hero island={island} detail={detail} />

      {/* §5.3 #2 — Essentials panel */}
      {detail && <EssentialsPanel detail={detail} />}

      {/* §5.3 #3 — Why go here */}
      <EditorialBlock
        eyebrow="Why go"
        heading={`Why go to ${island.name}`}
        body={detail?.whyGoHere ?? island.blurb}
        placeholder={!detail}
      />

      {/* §5.3 #4 — Where to stay */}
      {islandStays.length > 0 && (
        <>
          <Section eyebrow="Where to stay" heading={`Stays on ${island.name}`}>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
              {islandStays.length} curated stay{islandStays.length === 1 ? "" : "s"} on this island. Filtered by tier.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {islandStays.map((s) => (
                <StayCard key={s.slug} stay={s} />
              ))}
            </div>
          </Section>
          <LocalsPick islandSlug={island.slug} scope={island.name} />
        </>
      )}

      {/* §5.3 #5 — Things to do */}
      {detail?.thingsToDo && detail.thingsToDo.length > 0 && (
        <Section eyebrow="Things to do" heading="On the island & nearby">
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {detail.thingsToDo.map((t) => (
              <li
                key={t.title}
                className="flex items-start gap-3 rounded-2xl border border-ocean/10 bg-surface p-5"
              >
                <span
                  aria-hidden
                  className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-lagoon"
                />
                <span className="text-[15px] leading-relaxed text-foreground/85">
                  {t.journalSlug ? (
                    <Link
                      href={`/journal/${t.journalSlug}`}
                      className="underline-offset-2 hover:underline"
                    >
                      {t.title}
                    </Link>
                  ) : (
                    t.title
                  )}
                </span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* §5.3 #6 — Food & life */}
      {detail && (
        <EditorialBlock
          eyebrow="Food & life"
          heading={`Eating and living on ${island.name}`}
          body={detail.foodAndLife}
          placeholder={detail.foodAndLife.includes("[Editorial content coming")}
        />
      )}

      {/* §5.3 #7 — Culture & etiquette */}
      {detail && (
        <EditorialBlock
          eyebrow="Culture & etiquette"
          heading="What to know on a local island"
          body={detail.cultureAndEtiquette}
          placeholder={detail.cultureAndEtiquette.includes(
            "[Editorial content coming"
          )}
        />
      )}

      {/* §5.3 #8 — How to get here */}
      <Section
        eyebrow="How to get here"
        heading={`Malé → ${island.name}`}
      >
        {detail?.howToGetHere && (
          <ol className="mt-8 max-w-3xl space-y-3">
            {detail.howToGetHere.map((step) => (
              <li
                key={step.step}
                className="flex gap-4 rounded-2xl border border-ocean/10 bg-surface p-5"
              >
                <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-ocean text-[12px] font-semibold text-white">
                  {step.step}
                </span>
                <span className="text-[15px] leading-relaxed text-foreground/85">
                  {step.text}
                </span>
              </li>
            ))}
          </ol>
        )}
        {transfer && (
          <div className="mt-6 grid gap-6 rounded-2xl border border-ocean/10 bg-surface p-6 md:grid-cols-4">
            <Spec label="Mode" value={transfer.type} />
            <Spec label="Duration" value={transfer.duration} />
            <Spec label="Cost (1-way)" value={transfer.priceUsd} />
            <Spec label="Operator" value={transfer.operator ?? "—"} />
            {transfer.notes && (
              <p className="md:col-span-4 pt-2 text-[14px] leading-relaxed text-muted">
                {transfer.notes}
              </p>
            )}
          </div>
        )}
      </Section>

      {/* §5.3 #9 — When to visit */}
      <Section eyebrow="When to visit" heading="Year-round at a glance">
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
          The Maldives has two monsoons. Northeast (Nov–Apr) is dry and busy; southwest (May–Oct) is wetter and cheaper, with surf and manta seasons in full swing.
        </p>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-ocean/10 bg-surface">
          <table className="w-full text-left text-[14px]">
            <thead className="bg-ocean/5">
              <tr>
                <th scope="col" className="px-5 py-3 font-semibold text-ocean">Month</th>
                <th scope="col" className="px-5 py-3 font-semibold text-ocean">Avg °C</th>
                <th scope="col" className="px-5 py-3 font-semibold text-ocean">Rain days</th>
                <th scope="col" className="px-5 py-3 font-semibold text-ocean">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ocean/5">
              {MALDIVES_WEATHER.map((m) => (
                <tr key={m.month}>
                  <td className="px-5 py-3 font-semibold text-foreground">{m.month}</td>
                  <td className="px-5 py-3 text-muted">{m.avgC}°</td>
                  <td className="px-5 py-3 text-muted">{m.rainDays}</td>
                  <td className="px-5 py-3 text-muted">{m.vibe}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* §5.3 #10 — Related journal articles */}
      {relatedArticles.length > 0 && (
        <Section eyebrow="From the journal" heading={`More on ${island.name}`}>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {relatedArticles.map((a) => (
              <Link
                key={a.slug}
                href={`/journal/${a.slug}`}
                className="group flex flex-col overflow-hidden rounded-3xl bg-shore transition hover:-translate-y-0.5"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={a.image}
                    alt={a.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-5">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
                    {new Date(a.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  <h3 className="mt-2 font-display text-[20px] leading-tight text-foreground">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">
                    {a.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* Brief §11 — newsletter embed at bottom of every island page */}
      <section className="mx-auto mt-24 max-w-[1400px] px-6 md:px-10">
        <div className="rounded-3xl border border-black/5 bg-shore p-6 md:p-10">
          <div className="grid items-center gap-6 md:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="eyebrow text-lagoon">From the journal</p>
              <h3 className="mt-3 font-display text-2xl text-foreground md:text-3xl">
                One letter a week, edited from Malé.
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-muted">
                Honest pricing, real islands, no spam.
              </p>
            </div>
            <BeehiivEmbed variant="compact" />
          </div>
        </div>
      </section>

      {/* §5.3 #11 — Plan a trip CTA */}
      <section className="mt-24 bg-ocean-deep py-20 text-white">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-sand/85">
                Ready to go
              </p>
              <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
                Plan a trip to {island.name} →
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                Five questions, one summary. Tier, dates, length, origin — we&apos;ll line up stays, transfers, and a flight estimate.
              </p>
            </div>
            <Link
              href={`/plan?island=${island.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[14px] font-semibold text-ocean shadow-lg transition hover:bg-sand-deep"
            >
              Plan a trip <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}

// ─── Sub-components ──────────────────────────────────────────────

function Hero({
  island,
  detail,
}: {
  island: (typeof islands)[number];
  detail?: IslandDetail;
}) {
  return (
    <section className="relative">
      <div className="relative h-[78vh] min-h-[560px] w-full overflow-hidden">
        <Image
          src={island.banner ?? island.image}
          alt={island.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep via-ocean-deep/45 to-transparent" />
      </div>
      <div className="mx-auto -mt-64 max-w-[1400px] px-6 pb-2 text-white md:px-10">
        <Link
          href="/destinations"
          className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sand hover:underline"
        >
          ← All destinations
        </Link>
        <p className="mt-4 text-[12px] uppercase tracking-[0.32em] text-sand/85">
          {island.atoll} Atoll
        </p>
        <h1 className="mt-3 font-display text-[clamp(3rem,9vw,7rem)] font-light leading-[0.98] tracking-[-0.02em]">
          {island.name}
        </h1>
        {detail?.tagline && (
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/85 md:text-[19px]">
            {detail.tagline}
          </p>
        )}
        <div className="relative z-10 mt-6 flex flex-wrap gap-2">
          {detail?.tiers?.map((t) => (
            <span
              key={t}
              className="rounded-full bg-lagoon px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-md"
            >
              {TIER_LABEL[t] ?? t}
            </span>
          ))}
          {detail?.styles?.map((s) => (
            <span
              key={s}
              className="rounded-full bg-white/95 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ocean shadow-md"
            >
              {STYLE_LABEL[s] ?? s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function EssentialsPanel({ detail }: { detail: IslandDetail }) {
  const e = detail.essentials;
  const cells: { k: string; v: string }[] = [
    { k: "Population", v: e.population.toLocaleString() },
    { k: "Transfer from Malé", v: e.transferFromMale },
    {
      k: "Ferry days",
      v: e.ferryDays.length ? e.ferryDays.join(" · ") : "—",
    },
    { k: "Nearest dive site", v: e.nearestDiveSite },
    { k: "Peak season", v: e.peakSeason },
    {
      k: "Bikini beach",
      v: e.bikiniBeach ? "Yes" : "No",
    },
  ];
  return (
    <section className="mx-auto mt-24 max-w-[1400px] px-6 md:px-10">
      <p className="eyebrow text-lagoon">Essentials</p>
      <h2 className="mt-3 font-display text-[clamp(1.75rem,3vw,2.5rem)] tracking-tight text-foreground">
        The basics, at a glance
      </h2>
      <dl className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
        {cells.map(({ k, v }) => (
          <div
            key={k}
            className="rounded-2xl border border-ocean/10 bg-surface p-5"
          >
            <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              {k}
            </dt>
            <dd className="mt-2 font-display text-[20px] leading-tight text-foreground">
              {v}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Section({
  eyebrow,
  heading,
  children,
}: {
  eyebrow: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto mt-24 max-w-[1400px] px-6 md:px-10">
      <p className="eyebrow text-lagoon">{eyebrow}</p>
      <h2 className="mt-3 font-display text-[clamp(2rem,3.5vw,3rem)] leading-tight tracking-tight text-foreground">
        {heading}
      </h2>
      {children}
    </section>
  );
}

function EditorialBlock({
  eyebrow,
  heading,
  body,
  placeholder = false,
}: {
  eyebrow: string;
  heading: string;
  body: string;
  placeholder?: boolean;
}) {
  return (
    <Section eyebrow={eyebrow} heading={heading}>
      <p className="mt-6 max-w-3xl text-[16px] leading-[1.85] text-foreground/85">
        {body}
      </p>
    </Section>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
        {label}
      </div>
      <div className="mt-1 font-semibold text-foreground">{value}</div>
    </div>
  );
}
