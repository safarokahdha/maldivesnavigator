import type { Metadata } from "next";
import { voiceFeatures } from "@/data/creators";
import { LiteYouTube } from "@/components/LiteYouTube";

export const metadata: Metadata = {
  title: "Voices — Maldives YouTube creators worth your evening",
  description:
    "Curated YouTube creators filming the Maldives — budget travellers, divers, surfers, locals. No sponsored resort tours.",
  alternates: { canonical: "/voices" },
};

export default function VoicesPage() {
  const voices = voiceFeatures();

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-20">
      <header className="max-w-3xl">
        <p className="eyebrow text-lagoon">Voices</p>
        <h1 className="mt-3 font-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-tight tracking-tight text-foreground">
          Filmed by people we trust.
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-muted">
          Curated YouTube creators on the Maldives. Real footage, no sponsored
          resort tours. Each video carries a one-line editorial take from us.
        </p>
      </header>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {voices.map((v) => (
          <figure key={v.id} className="space-y-4">
            <LiteYouTube id={v.embedId} title={v.videoTitle} poster={v.thumbnail} />
            <figcaption className="space-y-2">
              <p className="text-[11px] uppercase tracking-[0.22em] text-muted">
                {v.creatorName}
              </p>
              <p className="font-display text-[20px] leading-snug text-foreground">
                {v.videoTitle}
              </p>
              <p className="text-[14px] leading-relaxed text-muted">
                {v.editorialCaption}
              </p>
              <a
                href={v.videoUrl}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1 text-[12px] font-semibold uppercase tracking-[0.18em] text-ocean hover:text-lagoon"
              >
                Watch on YouTube ↗
              </a>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
