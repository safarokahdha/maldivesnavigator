import Link from "next/link";
import Image from "next/image";
import type { Tier } from "@/data/stays";
import { tierMeta } from "@/data/stays";

const tierImage: Record<Tier, string> = {
  backpacker:
    "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80",
  mid:
    "https://images.unsplash.com/photo-1540202404-1b927e27fa8b?auto=format&fit=crop&w=1200&q=80",
  luxury:
    "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=1200&q=80",
  ultra:
    "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80",
};

const tierNumber: Record<Tier, string> = {
  backpacker: "01",
  mid: "02",
  luxury: "03",
  ultra: "04",
};

export function TierCard({ tier }: { tier: Tier }) {
  const meta = tierMeta[tier];
  return (
    <Link
      href={`/stays?tier=${tier}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[28px] bg-ocean-deep text-white"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={tierImage[tier]}
          alt={meta.title}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover opacity-80 transition duration-[1200ms] group-hover:scale-[1.06] group-hover:opacity-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep via-ocean-deep/60 to-transparent" />
      </div>
      <div className="absolute inset-0 flex flex-col justify-between p-7">
        <div className="flex items-start justify-between">
          <span className="font-display text-4xl font-semibold text-sand">{tierNumber[tier]}</span>
          <span className="rounded-full border border-white/35 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]">
            Tier
          </span>
        </div>
        <div>
          <h3 className="font-display text-[28px] font-semibold leading-tight">{meta.title}</h3>
          <p className="mt-2 text-[12px] text-white/80">{meta.tagline}</p>
          <div className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-sand">
            Explore stays <span aria-hidden>→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
