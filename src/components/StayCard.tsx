import Link from "next/link";
import type { Stay } from "@/data/stays";
import { SafeImage } from "@/components/SafeImage";

export function StayCard({ stay }: { stay: Stay }) {
  return (
    <Link
      href={`/stays/${stay.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-ocean/10 bg-surface shadow-[0_1px_0_rgba(10,42,51,0.05)] transition hover:-translate-y-1 hover:shadow-xl hover:shadow-ocean/10"
    >
      <div className="relative aspect-[5/4] overflow-hidden">
        <SafeImage
          src={stay.image}
          alt={stay.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-[1200ms] group-hover:scale-[1.05]"
        />
        <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-ocean">
          from {stay.priceFrom} / night
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="eyebrow">{stay.atoll} Atoll</div>
        <h3 className="mt-2 font-display text-[22px] font-semibold leading-snug text-ocean">
          {stay.name}
        </h3>
        <div className="text-sm text-muted">{stay.island}</div>
        <p className="mt-3 text-[14px] leading-relaxed text-muted">{stay.blurb}</p>
        <p className="mt-2 text-[10.5px] uppercase tracking-[0.16em] text-muted/70">
          Indicative — see full rates incl. 17% GST + Green Tax + 10% service.
        </p>
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {stay.perks.map((perk) => (
            <li
              key={perk}
              className="rounded-full bg-ocean/5 px-2.5 py-1 text-[11px] font-medium text-ocean"
            >
              {perk}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-ocean group-hover:text-lagoon">
          View details →
        </p>
      </div>
    </Link>
  );
}
