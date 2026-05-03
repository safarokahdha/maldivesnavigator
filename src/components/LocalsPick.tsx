import Link from "next/link";
import { stays, type Stay } from "@/data/stays";
import { stayDetails } from "@/data/stayDetails";
import { SafeImage } from "@/components/SafeImage";

/**
 * Pick the editor's recommendation from a list of stays:
 *   1. Any stay flagged `editorsPick: true` wins outright.
 *   2. Else, highest combined Booking + Agoda rating wins.
 *   3. Else, returns null (section is hidden).
 */
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

/**
 * Render a "Local's pick" CTA card for a given island slug.
 * Hidden if no candidate emerges.
 */
export function LocalsPick({
  islandSlug,
  scope,
}: {
  /** When set, only consider stays serving this island. */
  islandSlug?: string;
  /** Section copy override. */
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
    <section className="mx-auto mt-20 max-w-[1400px] px-6 md:px-10">
      <div className="overflow-hidden rounded-[28px] border border-coral/30 bg-coral/5">
        <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
          <Link
            href={`/stays/${pick.slug}`}
            className="relative block aspect-[4/3] md:aspect-auto"
          >
            <SafeImage
              src={pick.image}
              alt={pick.name}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
            <span className="absolute left-5 top-5 rounded-full bg-coral px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white">
              Local&apos;s pick
            </span>
          </Link>
          <div className="flex flex-col justify-center gap-4 p-8 md:p-10">
            <p className="eyebrow text-coral">A Maldivian editor&apos;s recommendation</p>
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight tracking-tight text-foreground">
              {pick.name}
            </h2>
            <p className="text-[15px] leading-relaxed text-foreground/85">
              {note}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <Link
                href={`/stays/${pick.slug}`}
                className="rounded-full bg-coral px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-ocean"
              >
                See the property →
              </Link>
              <span className="text-[13px] text-muted">
                from {pick.priceFrom} / night · {pick.island}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
