import { islands } from "@/data/islands";
import { IslandCard } from "@/components/IslandCard";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata = {
  title: "Destinations — Maldives Compass",
  description:
    "Every island in our journal, from backpacker-friendly Maafushi to the tiger-shark-famous Fuvahmulah.",
};

const vibes = ["All", "Backpacker", "Surf", "Diving", "Local life"];

export default function DestinationsPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10">
      <SectionHeading
        eyebrow="Destinations"
        title="Islands, atolls & local neighbourhoods"
        sub="A curated directory. Every island here is open to independent travellers — filter by the vibe you're chasing."
      />

      <div className="mt-10 flex flex-wrap gap-2">
        {vibes.map((v) => (
          <span
            key={v}
            className="rounded-full border border-ocean/15 bg-surface px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.22em] text-ocean"
          >
            {v}
          </span>
        ))}
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {islands.map((island) => (
          <IslandCard key={island.slug} island={island} />
        ))}
      </div>
    </div>
  );
}
