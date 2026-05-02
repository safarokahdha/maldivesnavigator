"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BeehiivEmbed } from "@/components/BeehiivEmbed";

// Hero per brief §5.1 #2:
//   - full-viewport on desktop, ~80vh on mobile
//   - cinematic Maldives photograph
//   - small label "VOLUME 01 · 2026"
//   - rotating headline (3 variants)
//   - sub-headline
//   - primary CTA "Plan a trip"
//   - secondary CTA: inline Beehiiv subscribe form

const HEADLINES = [
  "Find your Maldives.",
  "From $35 nights to private islands.",
  "Edited from Malé. Editorial guide in beta.",
];

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=2800&q=85";

export function HomeHero() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setIdx((i) => (i + 1) % HEADLINES.length),
      4500
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section
      aria-label="Maldives Navigator — introduction"
      className="relative isolate flex min-h-[80vh] w-full flex-col justify-end overflow-hidden bg-ocean-deep text-white md:min-h-screen"
    >
      <Image
        src={HERO_IMAGE}
        alt="Aerial view of a Maldives atoll at first light."
        fill
        priority
        sizes="100vw"
        quality={85}
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ocean-deep/30 via-ocean-deep/30 to-ocean-deep/85" />

      <div className="mx-auto w-full max-w-[1400px] px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40">
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-sand/85">
          Volume 01 · 2026
        </p>

        <h1
          className="mt-6 max-w-[18ch] font-display text-[clamp(2.5rem,7vw,5.5rem)] font-light leading-[1.02] tracking-[-0.02em] text-white"
          aria-live="polite"
        >
          {HEADLINES.map((h, i) => (
            <span
              key={h}
              className={
                "block transition-all duration-700 " +
                (i === idx
                  ? "opacity-100"
                  : "pointer-events-none absolute opacity-0")
              }
              style={i === idx ? undefined : { transform: "translateY(8px)" }}
              aria-hidden={i !== idx}
            >
              {h}
            </span>
          ))}
        </h1>

        <p className="mt-8 max-w-[42ch] text-[15px] leading-relaxed text-white/85 md:text-[17px]">
          An independent editorial guide to the 1,192 islands.
        </p>

        <div className="mt-10 flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-10">
          <Link
            href="/plan"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[14px] font-semibold text-ocean shadow-lg transition hover:bg-sand-deep"
          >
            Plan a trip <span aria-hidden>→</span>
          </Link>

          <div className="w-full max-w-md">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-sand/85">
              Subscribe to the journal
            </p>
            <BeehiivEmbed variant="compact" />
          </div>
        </div>
      </div>
    </section>
  );
}
