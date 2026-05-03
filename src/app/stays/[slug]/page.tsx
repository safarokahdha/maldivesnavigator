import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { stays, tierMeta, type Stay } from "@/data/stays";
import {
  getStayDetail,
  type StayDetail,
} from "@/data/stayDetails";
import { islands } from "@/data/islands";
import { StayCard } from "@/components/StayCard";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { BeehiivEmbed } from "@/components/BeehiivEmbed";
import { JsonLd } from "@/components/JsonLd";
import { stay22Link } from "@/lib/affiliate";

const SITE_URL = "https://maldivesnavigator.com";

export function generateStaticParams() {
  return stays.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const stay = stays.find((s) => s.slug === slug);
  if (!stay) return {};
  return {
    title: `${stay.name} — ${tierMeta[stay.tier].title} stay`,
    description: stay.blurb,
    alternates: { canonical: `/stays/${slug}` },
    openGraph: {
      title: `${stay.name} — Maldives Navigator`,
      description: stay.blurb,
      images: [{ url: stay.image, width: 1600, height: 900, alt: stay.name }],
    },
  };
}

const TYPE_LABEL: Record<string, string> = {
  guesthouse: "Guesthouse",
  resort: "Resort",
  "dive-lodge": "Dive lodge",
  liveaboard: "Liveaboard",
};

const INCLUSION_LABEL: Record<string, string> = {
  RO: "Room only",
  BB: "Bed & breakfast",
  HB: "Half board",
  FB: "Full board",
  AI: "All-inclusive",
};

export default async function StayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const stay = stays.find((s) => s.slug === slug);
  if (!stay) notFound();

  const detail = getStayDetail(slug);
  const island = islands.find((i) => stay.islandSlugs[0] === i.slug);

  // §5.5 #6 — Also consider: 4 same-tier same-atoll properties
  const alsoConsider = stays
    .filter(
      (s) =>
        s.slug !== slug &&
        s.tier === stay.tier &&
        s.atoll === stay.atoll
    )
    .slice(0, 4);

  // Stay22-routed booking links (only if Booking.com / Agoda URL provided)
  const bookingDotComUrl = detail?.booking?.bookingDotCom
    ? stay22Link(detail.booking.bookingDotCom, "booking")
    : null;
  const agodaUrl = detail?.booking?.agoda
    ? stay22Link(detail.booking.agoda, "agoda")
    : null;
  const officialUrl = detail?.booking?.official ?? null;

  // Structured data — BreadcrumbList + LodgingBusiness (brief §12)
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Stays", item: `${SITE_URL}/stays` },
      {
        "@type": "ListItem",
        position: 3,
        name: stay.name,
        item: `${SITE_URL}/stays/${stay.slug}`,
      },
    ],
  };
  const lodgingLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: stay.name,
    description: detail?.editorialTake ?? stay.blurb,
    image: stay.image,
    address: {
      "@type": "PostalAddress",
      addressLocality: stay.island,
      addressRegion: `${stay.atoll} Atoll`,
      addressCountry: "MV",
    },
    url: `${SITE_URL}/stays/${stay.slug}`,
    priceRange: detail
      ? `$${detail.priceLow}–$${detail.priceHigh}`
      : stay.priceFrom,
  };
  if (detail?.rooms) lodgingLd.numberOfRooms = detail.rooms;

  return (
    <article>
      <JsonLd data={[breadcrumbLd, lodgingLd]} />
      <Hero stay={stay} detail={detail} />

      {detail && <AtAGlance detail={detail} stay={stay} />}

      {/* §5.5 #3 — Editorial take */}
      <Section eyebrow="The editorial take" heading={`Why ${stay.name}`}>
        {detail?.isPlaceholder && (
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-coral/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-coral">
            Placeholder copy
          </div>
        )}
        <p className="mt-6 max-w-3xl text-[16px] leading-[1.85] text-foreground/85">
          {detail?.editorialTake ?? stay.blurb}
        </p>
      </Section>

      {/* §5.5 #4 — Photos (renders whenever a gallery is present) */}
      {detail?.gallery && detail.gallery.length > 0 && (
        <Section eyebrow="Photos" heading="The property">
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {detail.gallery.slice(0, 12).map((src, i) => (
              <div
                key={src}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl"
              >
                <Image
                  src={src}
                  alt={`${stay.name} — photo ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* §5.5 #5 — Book this stay */}
      <Section eyebrow="Book this stay" heading="Compare rates">
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
          Booking buttons route through Stay22 — same destination, same price,
          we earn a small commission.
        </p>

        <div className="mt-8 grid gap-3 md:max-w-2xl md:grid-cols-2">
          {bookingDotComUrl && (
            <a
              href={bookingDotComUrl}
              target="_blank"
              rel="noopener sponsored"
              className="inline-flex items-center justify-between gap-3 rounded-full bg-ocean px-6 py-4 text-[14px] font-semibold text-white transition hover:bg-ocean-deep"
            >
              <span>Check rates on Booking.com</span>
              <span aria-hidden>→</span>
            </a>
          )}
          {agodaUrl && (
            <a
              href={agodaUrl}
              target="_blank"
              rel="noopener sponsored"
              className="inline-flex items-center justify-between gap-3 rounded-full bg-ocean px-6 py-4 text-[14px] font-semibold text-white transition hover:bg-ocean-deep"
            >
              <span>Check rates on Agoda</span>
              <span aria-hidden>→</span>
            </a>
          )}
          {officialUrl && (
            <a
              href={officialUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-between gap-3 rounded-full border border-ocean/20 bg-white px-6 py-4 text-[14px] font-semibold text-ocean transition hover:border-ocean"
            >
              <span>Visit official site</span>
              <span aria-hidden>→</span>
            </a>
          )}
          {!bookingDotComUrl && !agodaUrl && !officialUrl && (
            <p className="text-[14px] text-muted">
              Booking links coming soon — check back, or{" "}
              <Link href="/subscribe" className="underline underline-offset-2">
                subscribe
              </Link>{" "}
              for the launch.
            </p>
          )}
        </div>
        <div className="mt-6">
          <AffiliateDisclosure />
        </div>
      </Section>

      {/* §5.5 #6 — Also consider */}
      {alsoConsider.length > 0 && (
        <Section
          eyebrow="Also consider"
          heading={`Other ${tierMeta[stay.tier].title.toLowerCase()} stays in ${stay.atoll}`}
        >
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {alsoConsider.map((s) => (
              <StayCard key={s.slug} stay={s} />
            ))}
          </div>
        </Section>
      )}

      {/* §5.5 #7 — Verified by */}
      {detail?.verified && (
        <section className="mx-auto mt-24 max-w-[1400px] px-6 md:px-10">
          <div className="rounded-2xl border border-lagoon/30 bg-lagoon/5 p-5 text-[13px] text-foreground">
            <span className="mr-2 font-semibold uppercase tracking-[0.18em] text-lagoon">
              ✓ Verified
            </span>
            by {detail.verifiedBy ?? "the editor"}
            {detail.verifiedDate
              ? ` on ${new Date(detail.verifiedDate).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}`
              : ""}
          </div>
        </section>
      )}

      {/* Brief §11 — newsletter embed at bottom of every stay page */}
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

      {/* Plan-trip CTA */}
      <section className="mt-24 bg-ocean-deep py-20 text-white">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-sand/85">
                Build a trip
              </p>
              <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
                Plan a trip with {stay.name} →
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                Pre-fill the planner with this property and we&apos;ll do the
                rest — transfers, dates, flight estimate.
              </p>
            </div>
            <Link
              href={
                island
                  ? `/plan?island=${island.slug}&stay=${stay.slug}`
                  : `/plan?stay=${stay.slug}`
              }
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[14px] font-semibold text-ocean shadow-lg transition hover:bg-sand-deep"
            >
              Plan with this stay <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}

// ─── Sub-components ──────────────────────────────────────────────

function Hero({ stay, detail }: { stay: Stay; detail?: StayDetail }) {
  return (
    <section className="relative">
      <div className="relative h-[68vh] min-h-[480px] w-full overflow-hidden">
        <Image
          src={stay.image}
          alt={stay.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep via-ocean-deep/40 to-transparent" />
      </div>
      <div className="mx-auto -mt-56 max-w-[1400px] px-6 pb-2 text-white md:px-10">
        <Link
          href="/stays"
          className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sand hover:underline"
        >
          ← All stays
        </Link>
        <p className="mt-4 text-[12px] uppercase tracking-[0.32em] text-sand/85">
          {stay.atoll} Atoll · {stay.island}
        </p>
        <h1 className="mt-3 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-light leading-[1.0] tracking-[-0.02em]">
          {stay.name}
        </h1>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
            {tierMeta[stay.tier].title}
          </span>
          {detail?.verified && (
            <span className="rounded-full bg-lagoon/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
              ✓ Verified
            </span>
          )}
          <span className="ml-auto rounded-2xl bg-white px-5 py-2.5 text-[14px] font-semibold text-ocean">
            From {stay.priceFrom} / night
          </span>
        </div>
      </div>
    </section>
  );
}

function AtAGlance({
  detail,
  stay,
}: {
  detail: StayDetail;
  stay: Stay;
}) {
  const cells: { k: string; v: string }[] = [
    {
      k: "Type",
      v: TYPE_LABEL[detail.type] ?? detail.type,
    },
    {
      k: "Rooms",
      v: detail.rooms ? String(detail.rooms) : "—",
    },
    {
      k: "Transfer",
      v: detail.transfer
        ? `${detail.transfer.type.replace("-", " ")} · ${detail.transfer.time} · $${detail.transfer.cost}`
        : "—",
    },
    {
      k: "Included",
      v: detail.inclusion ? INCLUSION_LABEL[detail.inclusion] : "—",
    },
    {
      k: "Guest type",
      v: detail.guestType
        ? detail.guestType.charAt(0).toUpperCase() + detail.guestType.slice(1)
        : "—",
    },
    {
      k: "Dive on-site",
      v: detail.features?.diveCenter ? "Yes" : "No",
    },
    {
      k: "Alcohol",
      v: detail.features?.alcohol ? "Yes" : "No",
    },
    {
      k: "Price band",
      v: `$${detail.priceLow}–$${detail.priceHigh} / night`,
    },
  ];
  return (
    <section className="mx-auto mt-24 max-w-[1400px] px-6 md:px-10">
      <p className="eyebrow text-lagoon">At a glance</p>
      <h2 className="mt-3 font-display text-[clamp(1.75rem,3vw,2.5rem)] tracking-tight text-foreground">
        {stay.name} in numbers
      </h2>
      <dl className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {cells.map(({ k, v }) => (
          <div
            key={k}
            className="rounded-2xl border border-ocean/10 bg-surface p-5"
          >
            <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              {k}
            </dt>
            <dd className="mt-2 font-display text-[18px] leading-tight text-foreground">
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
