import Link from "next/link";
import { stays, type Stay } from "@/data/stays";
import { stayDetails } from "@/data/stayDetails";
import { SafeImage } from "@/components/SafeImage";

function pickEditorChoice(candidates: Stay[]): Stay | null {
  const flagged = candidates.find((s) => stayDetails[s.slug]?.editorsPick);
  if (flagged) return flagged;

  let best: { stay: Stay; score: number } | null = null;
  for (const s of candidates) {
    const d = stayDetails[s.slug];
    if (!d?.booking) continue;
    const b = d.booking.bookingRating ?? 0;
    const a = d.booking.agodaRating ?? 0;
    const score = b + a;
    if (score > 0 && (!best || score > best.score)) best = { stay: s, score };
  }
  return best?.stay ?? null;
}

export function LocalsPick({
  islandSlug,
  scope,
}: {
  islandSlug?: string;
  scope?: string;
}) {
  const candidates = islandSlug
    ? stays.filter((s) => s.islandSlugs.includes(islandSlug))
    : stays;
  const pick = pickEditorChoice(candidates);
  if (!pick) return null;

  const detail = stayDetails[pick.slug];
  const note =
    detail?.editorsPickNote ??
    `Of the places I've featured${scope ? ` on ${scope}` : ""}, this is the one I'd book myself. — Mohamed`;

  return (
    <section className="mx-auto mt-24 max-w-[1400px] px-6 md:px-10">
      <div className="locals-pick-card group relative overflow-hidden rounded-[28px] bg-gradient-to-br from-ocean-deep via-ocean to-lagoon shadow-[0_24px_60px_-24px_rgba(10,42,51,0.45)]">
        {/* decorative blob */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sand/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-16 -bottom-16 h-56 w-56 rounded-full bg-lagoon-light/30 blur-3xl"
        />

        <div className="relative grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <Link
            href={`/stays/${pick.slug}`}
            className="relative block aspect-[4/3] overflow-hidden md:aspect-auto"
          >
            <SafeImage
              src={pick.image}
              alt={pick.name}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-ocean-deep/45 to-transparent" />
            <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-ocean shadow-md">
              <span aria-hidden className="locals-pick-pulse inline-block h-2 w-2 rounded-full bg-coral" />
              Mohamed&apos;s pick
            </span>
          </Link>

          <div className="flex flex-col justify-center gap-5 p-8 text-white md:p-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-sand">
              From a Maldivian editor in Malé
            </p>
            <h2 className="font-display text-[clamp(1.75rem,3.6vw,2.85rem)] leading-[1.05] tracking-tight">
              {pick.name}
            </h2>
            <p className="text-[15px] leading-relaxed text-white/85">
              {note}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <Link
                href={`/stays/${pick.slug}`}
                className="group/cta inline-flex items-center gap-2 rounded-full bg-sand px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.22em] text-ocean transition hover:bg-white"
              >
                See the property
                <span
                  aria-hidden
                  className="inline-block transition-transform group-hover/cta:translate-x-1"
                >
                  →
                </span>
              </Link>
              <span className="text-[12px] uppercase tracking-[0.18em] text-sand/85">
                from {pick.priceFrom} · {pick.island}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
