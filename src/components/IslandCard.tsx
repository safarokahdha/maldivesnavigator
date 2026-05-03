import Image from "next/image";
import Link from "next/link";
import type { Island } from "@/data/islands";

const vibeLabel: Record<Island["vibe"], string> = {
  backpacker: "Budget",
  surf: "Surf",
  dive: "Diving",
  family: "Family",
  local: "Local life",
  honeymoon: "Honeymoon",
};

export function IslandCard({ island, size = "md" }: { island: Island; size?: "sm" | "md" | "lg" }) {
  const ratio = size === "lg" ? "aspect-[4/5]" : size === "sm" ? "aspect-[4/3]" : "aspect-[4/5]";
  return (
    <Link
      href={`/destinations/${island.slug}`}
      className="group relative block overflow-hidden rounded-[28px] bg-ocean-deep"
    >
      <div className={`relative ${ratio} overflow-hidden`}>
        <Image
          src={island.image}
          alt={island.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-[1200ms] group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/90 via-ocean-deep/30 to-transparent" />
      </div>
      <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-white/40 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] backdrop-blur">
            {vibeLabel[island.vibe]}
          </span>
          <span className="text-[10px] uppercase tracking-[0.24em] text-white/75">{island.atoll}</span>
        </div>
        <div>
          <h3 className="font-display text-3xl font-semibold leading-tight md:text-4xl">{island.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/85 line-clamp-2">{island.highlight}</p>
          <div className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-sand">
            Explore island <span aria-hidden>→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
