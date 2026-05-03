"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BeehiivEmbed } from "@/components/BeehiivEmbed";

// Hero per brief §5.1 #2 — cinematic intro with rotating Unsplash slides.

const HEADLINES = [
  "Find your Maldives.",
  "From $35 nights to private islands.",
  "Guided by a Maldivian local.",
];

// Curated Unsplash photos — local islands, lagoons, overwater villas, surf.
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=2800&q=85",
  "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2800&q=85",
  "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=2800&q=85",
  "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=2800&q=85",
  "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=2800&q=85",
];

export function HomeHero() {
  const [headline, setHeadline] = useState(0);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setHeadline((i) => (i + 1) % HEADLINES.length),
      4500,
    );
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(
      () => setSlide((i) => (i + 1) % HERO_IMAGES.length),
      6500,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section
      aria-label="Maldives Navigator — introduction"
      className="relative isolate flex min-h-[80vh] w-full flex-col justify-end overflow-hidden bg-ocean-deep text-white md:min-h-screen"
    >
      {HERO_IMAGES.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt="Maldives — Indian Ocean"
          fill
          priority={i === 0}
          sizes="100vw"
          quality={85}
          className={`-z-10 object-cover transition-opacity duration-[1500ms] ease-out ${
            i === slide ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ocean-deep/30 via-ocean-deep/30 to-ocean-deep/85" />

      <div className="mx-auto w-full max-w-[1400px] px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40">
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-sand/85">
          Volume 01 · 2026
        </p>

        <h1
          className="relative mt-6 max-w-[18ch] font-display text-[clamp(2.5rem,7vw,5.5rem)] font-light leading-[1.02] tracking-[-0.02em] text-white"
          aria-live="polite"
        >
          {HEADLINES.map((h, i) => (
            <span
              key={h}
              className={`block transition-all duration-700 ${
                i === headline
                  ? "opacity-100 translate-y-0"
                  : "pointer-events-none absolute inset-0 opacity-0 translate-y-2"
              }`}
              aria-hidden={i !== headline}
            >
              {h}
            </span>
          ))}
        </h1>

        <p className="mt-8 max-w-[44ch] text-[15px] leading-relaxed text-white/85 md:text-[17px]">
          An independent guide to the 1,192 islands — written and curated by a
          Maldivian who actually lives here.
        </p>

        <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          <Link
            href="/plan"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-[14px] font-semibold text-ocean shadow-lg transition hover:bg-sand-deep"
          >
            Plan a trip <span aria-hidden>→</span>
          </Link>

          <Link
            href="/stays"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3.5 text-[14px] font-semibold text-white backdrop-blur transition hover:bg-white/20"
          >
            Browse stays <span aria-hidden>→</span>
          </Link>

          <div className="w-full sm:ml-auto sm:max-w-md">
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
