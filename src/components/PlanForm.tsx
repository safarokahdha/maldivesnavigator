"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { tierMeta, type Stay, type Tier } from "@/data/stays";
import {
  countries,
  flightEstimateByCountry,
} from "@/data/flightCosts";
import { BeehiivEmbed } from "@/components/BeehiivEmbed";

// Brief §5.6 — single-page progressive form. All 5 sections visible from
// the start; each collapses once answered. No "Next" buttons; auto-advance
// on selection.

type Props = { stays: Stay[] };

type Window = "this-month" | "3-6-months" | "6+months";

const TIER_OPTIONS: {
  key: Tier;
  title: string;
  blurb: string;
  perNight: number; // average USD/night used in trip-cost outline
  image: string;
}[] = [
  {
    key: "backpacker",
    title: "Budget",
    blurb: "Local islands, $30–$120/night, ferries and guesthouses.",
    perNight: 60,
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    key: "mid",
    title: "Mid-range",
    blurb: "$200–$500/night. 4★ resorts, transfer included, half-board.",
    perNight: 250,
    image:
      "https://images.unsplash.com/photo-1540202404-1b927e27fa8b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    key: "luxury",
    title: "Luxury",
    blurb: "$500–$1500/night. Overwater villas, name-brand resorts, seaplane.",
    perNight: 750,
    image:
      "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    key: "ultra",
    title: "Ultra-luxury",
    blurb: "$1500+/night. Private islands, butlers, observatories.",
    perNight: 2000,
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80",
  },
];

const WINDOW_OPTIONS: { key: Window; label: string }[] = [
  { key: "this-month", label: "This month" },
  { key: "3-6-months", label: "3–6 months out" },
  { key: "6+months", label: "6+ months out" },
];

function formatRange(low: number, high: number) {
  const fmt = (n: number) =>
    n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : `$${n.toLocaleString()}`;
  return `${fmt(low)}–${fmt(high)}`;
}

export function PlanForm({ stays }: Props) {
  const router = useRouter();
  const sp = useSearchParams();

  // ─── State, hydrated from URL params ─────────────────────────────
  const initialTier = (sp.get("tier") as Tier) || null;
  const initialIsland = sp.get("island") || null;
  const initialStay = sp.get("stay") || null;
  const initialWindow = (sp.get("when") as Window) || null;
  const initialDays = Number(sp.get("days") ?? 7);
  const initialCountry = sp.get("from") || "";

  const [tier, setTier] = useState<Tier | null>(initialTier);
  const [when, setWhen] = useState<Window | null>(initialWindow);
  const [days, setDays] = useState<number>(
    Number.isFinite(initialDays) ? Math.min(21, Math.max(4, initialDays)) : 7
  );
  const [country, setCountry] = useState<string>(initialCountry);

  // Reflect state changes back into the URL so the plan is shareable.
  useEffect(() => {
    const params = new URLSearchParams();
    if (tier) params.set("tier", tier);
    if (initialIsland) params.set("island", initialIsland);
    if (initialStay) params.set("stay", initialStay);
    if (when) params.set("when", when);
    if (days !== 7) params.set("days", String(days));
    if (country) params.set("from", country);
    const qs = params.toString();
    router.replace(qs ? `/plan?${qs}` : "/plan", { scroll: false });
  }, [tier, when, days, country, initialIsland, initialStay, router]);

  // ─── Recommendation logic ────────────────────────────────────────
  const tierMatchedStays = useMemo(() => {
    if (!tier) return [] as Stay[];
    return stays.filter((s) => s.tier === tier);
  }, [tier, stays]);

  const recommendedStays = useMemo(() => {
    if (tierMatchedStays.length === 0) return [];
    const pool = [...tierMatchedStays];
    // Pseudo-random but deterministic per tier so results are stable per session.
    const seed = (tier ?? "x").length;
    const start = seed % pool.length;
    return [
      pool[start % pool.length],
      pool[(start + 1) % pool.length],
      pool[(start + 2) % pool.length],
    ].filter(Boolean);
  }, [tierMatchedStays, tier]);

  const flight = country ? flightEstimateByCountry(country) : null;
  const tierOption = tier ? TIER_OPTIONS.find((o) => o.key === tier) : null;

  const stayCostLow = tierOption ? tierOption.perNight * days : 0;
  const stayCostHigh = tierOption
    ? Math.round(tierOption.perNight * days * 1.6)
    : 0;
  const totalLow = stayCostLow + (flight?.flightLow ?? 0);
  const totalHigh = stayCostHigh + (flight?.flightHigh ?? 0);

  const allDone = !!tier && !!when && !!days && !!country;

  return (
    <div className="mx-auto max-w-[1100px] px-6 py-16 md:px-10 md:py-20">
      <header className="max-w-3xl">
        <p className="eyebrow text-lagoon">Plan a trip</p>
        <h1 className="mt-3 font-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-tight tracking-tight text-foreground">
          Build a trip in five questions.
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-muted">
          One page, no wizard. Pick a tier, a window, a length, your country —
          we&apos;ll line up stays, flight cost, and a quick outline.
        </p>
      </header>

      <div className="mt-10 space-y-6">
        {/* ─── 1. Tier ─────────────────────────────────────────── */}
        <PlanSection
          step={1}
          title="What kind of Maldives are you here for?"
          answer={tierOption ? tierOption.title : null}
          isOpen={!tier}
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {TIER_OPTIONS.map((o) => {
              const active = tier === o.key;
              return (
                <button
                  key={o.key}
                  type="button"
                  onClick={() => setTier(active ? null : o.key)}
                  aria-pressed={active}
                  className={
                    "group relative flex h-64 flex-col justify-end overflow-hidden rounded-2xl text-left text-white transition " +
                    (active ? "ring-4 ring-ocean ring-offset-2" : "")
                  }
                >
                  <Image
                    src={o.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/95 via-ocean-deep/55 to-transparent" />
                  <div className="relative p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sand/85">
                      Tier
                    </p>
                    <h3 className="mt-2 font-display text-2xl">{o.title}</h3>
                    <p className="mt-2 text-[12px] leading-relaxed text-white/80">
                      {o.blurb}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </PlanSection>

        {/* ─── 2. When ─────────────────────────────────────────── */}
        <PlanSection
          step={2}
          title="Roughly when?"
          answer={
            when
              ? WINDOW_OPTIONS.find((o) => o.key === when)?.label ?? null
              : null
          }
          isOpen={!when}
        >
          <div className="flex flex-wrap gap-2">
            {WINDOW_OPTIONS.map((o) => {
              const active = when === o.key;
              return (
                <button
                  key={o.key}
                  type="button"
                  onClick={() => setWhen(active ? null : o.key)}
                  aria-pressed={active}
                  className={
                    "rounded-full px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.14em] transition " +
                    (active
                      ? "bg-ocean text-white"
                      : "border border-ocean/15 text-ocean hover:bg-ocean/5")
                  }
                >
                  {o.label}
                </button>
              );
            })}
          </div>
        </PlanSection>

        {/* ─── 3. How long ─────────────────────────────────────── */}
        <PlanSection
          step={3}
          title="How long?"
          answer={`${days} day${days === 1 ? "" : "s"}`}
          isOpen={true}
        >
          <div className="rounded-2xl border border-black/5 bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                Length of stay
              </span>
              <span className="font-display text-2xl text-foreground">
                {days} day{days === 1 ? "" : "s"}
              </span>
            </div>
            <input
              type="range"
              min={4}
              max={21}
              step={1}
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              aria-label="Trip length in days"
              className="mt-4 w-full accent-ocean"
            />
            <div className="mt-2 flex justify-between text-[11px] uppercase tracking-[0.14em] text-muted">
              <span>4 days</span>
              <span>21 days</span>
            </div>
          </div>
        </PlanSection>

        {/* ─── 4. Where from ───────────────────────────────────── */}
        <PlanSection
          step={4}
          title="Where from?"
          answer={
            country
              ? countries.find((c) => c.code === country)?.name ?? null
              : null
          }
          isOpen={!country}
        >
          <label className="flex flex-col gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              Country of origin
            </span>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="rounded-2xl border border-black/5 bg-white px-4 py-3 text-[14px] font-medium text-ocean focus:border-ocean focus:outline-none"
            >
              <option value="">Pick a country…</option>
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
        </PlanSection>

        {/* ─── 5. Results ──────────────────────────────────────── */}
        <PlanSection
          step={5}
          title="Your trip outline"
          answer={null}
          isOpen={true}
          highlight
        >
          {!allDone ? (
            <p className="rounded-2xl border border-coral/20 bg-coral/5 p-5 text-[14px] text-coral">
              Answer all four questions above and your trip outline appears
              here.
            </p>
          ) : (
            <div className="space-y-8">
              {/* Outline paragraph */}
              <div className="rounded-2xl bg-shore p-6 md:p-8">
                <p className="text-[16px] leading-[1.7] text-foreground/90">
                  A {days}-day{" "}
                  <strong className="text-ocean">
                    {tierOption!.title.toLowerCase()}
                  </strong>{" "}
                  trip from{" "}
                  <strong className="text-ocean">
                    {countries.find((c) => c.code === country)?.name}
                  </strong>{" "}
                  works out to roughly{" "}
                  <strong>
                    {formatRange(totalLow, totalHigh)}
                  </strong>{" "}
                  total — about{" "}
                  <strong>
                    {formatRange(flight!.flightLow, flight!.flightHigh)}
                  </strong>{" "}
                  for flights and{" "}
                  <strong>
                    {formatRange(stayCostLow, stayCostHigh)}
                  </strong>{" "}
                  for stays.
                  {when === "this-month"
                    ? " Booking last-minute means peak prices and limited inventory."
                    : when === "6+months"
                      ? " Plenty of room to plan; aim for the dry-monsoon window (Nov–Apr)."
                      : " A reasonable lead time. Inventory and pricing are still flexible."}
                </p>
                <div className="mt-4 grid grid-cols-3 gap-3 text-[12px] uppercase tracking-[0.14em] text-muted">
                  <Cell label="Flights" value={formatRange(flight!.flightLow, flight!.flightHigh)} />
                  <Cell label="Stays" value={formatRange(stayCostLow, stayCostHigh)} />
                  <Cell label="Total" value={formatRange(totalLow, totalHigh)} />
                </div>
                {flight!.notes && (
                  <p className="mt-4 text-[12px] text-muted">{flight!.notes}</p>
                )}
              </div>

              {/* Recommended stays */}
              <div>
                <h3 className="font-display text-2xl text-foreground">
                  Three stays that fit
                </h3>
                <div className="mt-5 grid gap-5 md:grid-cols-3">
                  {recommendedStays.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/stays/${s.slug}`}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white transition hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      <div className="relative aspect-[5/4] overflow-hidden">
                        <Image
                          src={s.image}
                          alt={s.name}
                          fill
                          sizes="(min-width: 1024px) 33vw, 100vw"
                          className="object-cover transition duration-700 group-hover:scale-[1.04]"
                        />
                        <span className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-ocean">
                          from {s.priceFrom}
                        </span>
                      </div>
                      <div className="p-5">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
                          {s.atoll} Atoll · {s.island}
                        </p>
                        <h4 className="mt-2 font-display text-lg leading-tight text-foreground">
                          {s.name}
                        </h4>
                        <p className="mt-3 text-[13px] leading-relaxed text-muted">
                          {s.blurb}
                        </p>
                        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-ocean group-hover:text-lagoon">
                          View details →
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-5 flex justify-end">
                  <Link
                    href={`/stays?tier=${tier}`}
                    className="text-[12px] font-semibold uppercase tracking-[0.18em] text-ocean hover:text-lagoon"
                  >
                    All {tierMeta[tier!].title.toLowerCase()} stays →
                  </Link>
                </div>
              </div>

              {/* Email capture / lead magnet */}
              <div className="rounded-3xl border border-black/5 bg-shore p-6 md:p-10">
                <BeehiivEmbed variant="leadmag" />
              </div>
            </div>
          )}
        </PlanSection>
      </div>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────

function PlanSection({
  step,
  title,
  answer,
  isOpen,
  highlight = false,
  children,
}: {
  step: number;
  title: string;
  answer: string | null;
  isOpen: boolean;
  highlight?: boolean;
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(isOpen);
  // Re-open when external isOpen flips back true (e.g. when user clears tier)
  useEffect(() => {
    setExpanded(isOpen);
  }, [isOpen]);

  return (
    <section
      className={
        "rounded-3xl border p-6 md:p-8 " +
        (highlight
          ? "border-ocean/30 bg-ocean/5"
          : "border-black/5 bg-white")
      }
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between gap-4 text-left"
        aria-expanded={expanded}
      >
        <div className="flex items-baseline gap-4">
          <span className="font-display text-3xl font-light text-ocean/40">
            {String(step).padStart(2, "0")}
          </span>
          <h2 className="font-display text-[clamp(1.25rem,2.4vw,1.75rem)] tracking-tight text-foreground">
            {title}
          </h2>
        </div>
        <span className="flex items-center gap-3">
          {answer && (
            <span className="rounded-full bg-ocean px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-white">
              {answer}
            </span>
          )}
          <span
            aria-hidden
            className={"text-[14px] text-muted transition " + (expanded ? "rotate-180" : "")}
          >
            ▾
          </span>
        </span>
      </button>
      {expanded && <div className="mt-6">{children}</div>}
    </section>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-black/5 bg-white p-3">
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
        {label}
      </div>
      <div className="mt-1 font-display text-lg text-foreground">{value}</div>
    </div>
  );
}
