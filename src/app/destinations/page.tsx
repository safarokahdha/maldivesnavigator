import type { Metadata } from "next";
import { islands, type Island } from "@/data/islands";
import { IslandCard } from "@/components/IslandCard";
import { IslandFilterBar } from "@/components/IslandFilterBar";

export const metadata: Metadata = {
  title: "Destinations — Islands of the Maldives",
  description:
    "Every island in the Maldives Navigator journal — local-island guesthouse hubs, dive bases, surf spots. Filter by atoll or style.",
  alternates: { canonical: "/destinations" },
};

// Brief §5.2 — Style chips. Map brief keys → island.vibe values.
const STYLE_TO_VIBES: Record<string, Island["vibe"][]> = {
  surf: ["surf"],
  dive: ["dive"],
  budget: ["backpacker"],
  luxury: ["honeymoon"],
  local: ["local"],
};

export default async function DestinationsPage({
  searchParams,
}: {
  searchParams: Promise<{ atoll?: string; style?: string }>;
}) {
  const sp = await searchParams;
  const atollFilter = sp.atoll?.trim() ?? "";
  const styleKeys = (sp.style ?? "").split(",").filter(Boolean);

  const allowedVibes = new Set<Island["vibe"]>();
  styleKeys.forEach((k) => {
    (STYLE_TO_VIBES[k] ?? []).forEach((v) => allowedVibes.add(v));
  });

  const filtered = islands.filter((i) => {
    if (atollFilter && i.atoll !== atollFilter) return false;
    if (allowedVibes.size > 0 && !allowedVibes.has(i.vibe)) return false;
    return true;
  });

  const atolls = Array.from(new Set(islands.map((i) => i.atoll))).sort();

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-20">
      <header className="max-w-3xl">
        <p className="eyebrow text-lagoon">Destinations</p>
        <h1 className="mt-3 font-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-tight tracking-tight text-foreground">
          Islands of the Maldives.
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-muted">
          Every island in the journal. Local-island guesthouse hubs, dive
          bases, surf spots. Filter by atoll or by the kind of trip you&apos;re
          planning.
        </p>
      </header>

      <IslandFilterBar
        atolls={atolls}
        totalCount={islands.length}
        resultCount={filtered.length}
      />

      {filtered.length === 0 ? (
        <p className="mt-12 rounded-2xl border border-coral/30 bg-coral/5 p-6 text-[14px] text-coral">
          No islands match those filters. Try clearing one.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((island) => (
            <IslandCard key={island.slug} island={island} />
          ))}
        </div>
      )}
    </div>
  );
}
