"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Slide = {
  image: string;
  eyebrow: string;
  title: React.ReactNode;
  sub: string;
  cta: { href: string; label: string };
  secondary?: { href: string; label: string };
};

const slides: Slide[] = [
  {
    image:
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=2800&q=90",
    eyebrow: "A living journal of the Maldives",
    title: (
      <>
        Find <span className="italic text-sand">your</span> Maldives.
        <br />
        From <span className="italic text-lagoon-light">$35 nights</span> to <span className="italic text-sand">private islands</span>.
      </>
    ),
    sub: "Real islands. Real prices. The creators, divers and wanderers who keep pointing north to the 1,192 islands.",
    cta: { href: "/plan", label: "Plan your trip →" },
    secondary: { href: "/destinations", label: "Explore destinations" },
  },
  {
    image:
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=2800&q=90",
    eyebrow: "Swim with giants",
    title: (
      <>
        Whale sharks <span className="italic text-sand">year-round</span>.
        <br />
        Manta rays <span className="italic text-lagoon-light">at dawn</span>.
      </>
    ),
    sub: "Dhigurah, Hanifaru Bay, South Ari — the wildlife that made the Maldives a bucket-list dive.",
    cta: { href: "/destinations/dhigurah", label: "Dhigurah guide →" },
    secondary: { href: "/destinations", label: "All islands" },
  },
  {
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=2800&q=90",
    eyebrow: "Surf the reef breaks",
    title: (
      <>
        Coke's. Chickens.
        <br />
        <span className="italic text-sand">Paradise on a shortboard</span>.
      </>
    ),
    sub: "Thulusdhoo, Huraa, the North Atoll — waves 6 months a year, sleeping on a local island at $60 a night.",
    cta: { href: "/destinations/thulusdhoo", label: "Thulusdhoo →" },
    secondary: { href: "/plan", label: "Plan a surf trip" },
  },
  {
    image:
      "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=2800&q=90",
    eyebrow: "Once-in-a-lifetime",
    title: (
      <>
        Water villas.<br />
        <span className="italic text-sand">Private islands.</span>
      </>
    ),
    sub: "Soneva Jani. Cheval Blanc. Waldorf Ithaafushi. The most talked-about hotels on Earth.",
    cta: { href: "/stays/ultra", label: "Ultra-luxury →" },
    secondary: { href: "/stays/luxury", label: "Luxury stays" },
  },
];

export function HeroSlideshow() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[100svh] min-h-[640px] w-full">
        {slides.map((s, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
              idx === i ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={idx !== i}
          >
            <Image
              src={s.image}
              alt=""
              fill
              priority={idx === 0}
              sizes="100vw"
              className={`object-cover transition-transform duration-[10s] ${idx === i ? "scale-[1.08]" : "scale-100"}`}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/30 via-ocean-deep/10 to-ocean-deep/85" />
          </div>
        ))}

        {/* top rail */}
        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-3 px-6 py-6 md:px-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-white backdrop-blur">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-sand animate-pulse" />
            Live · volume 01 · 2026
          </span>
          <Link
            href="/partners"
            className="inline-flex items-center gap-1.5 rounded-full bg-sand px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ocean shadow-lg transition hover:bg-white"
          >
            <span>Hosts & operators</span>
            <span className="hidden sm:inline">· list yours →</span>
          </Link>
        </div>

        {/* content */}
        <div className="relative z-10 flex h-full items-end">
          <div className="w-full px-6 pb-24 md:px-12 md:pb-28">
            {slides.map((s, idx) => (
              <div
                key={idx}
                className={`transition-all duration-1000 ${idx === i ? "opacity-100 translate-y-0" : "pointer-events-none absolute opacity-0 translate-y-4"}`}
              >
                <div className="eyebrow text-sand">{s.eyebrow}</div>
                <h1 className="mt-4 max-w-[1100px] font-display text-[44px] font-semibold leading-[0.98] text-white md:text-[96px]">
                  {s.title}
                </h1>
                <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/85">{s.sub}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={s.cta.href}
                    className="rounded-full bg-white px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.22em] text-ocean transition hover:bg-sand"
                  >
                    {s.cta.label}
                  </Link>
                  {s.secondary && (
                    <Link
                      href={s.secondary.href}
                      className="rounded-full border border-white/40 bg-white/10 px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur transition hover:bg-white/20"
                    >
                      {s.secondary.label}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* slide controls */}
        <div className="absolute inset-x-0 bottom-6 z-10 flex items-center justify-between px-6 md:px-12">
          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setI(idx)}
                aria-label={`Show slide ${idx + 1}`}
                className="group relative h-1 w-12 overflow-hidden rounded-full bg-white/25"
              >
                <span
                  className={`absolute inset-y-0 left-0 bg-sand transition-all ${
                    idx === i ? (paused ? "w-full" : "w-full") : "w-0"
                  }`}
                  style={idx === i && !paused ? { animation: "heroProgress 6s linear" } : undefined}
                />
              </button>
            ))}
          </div>
          <div className="hidden items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80 md:flex">
            <span>{String(i + 1).padStart(2, "0")}</span>
            <span className="h-px w-8 bg-white/40" />
            <span>{String(slides.length).padStart(2, "0")}</span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes heroProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}
