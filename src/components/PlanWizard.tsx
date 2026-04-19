"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Island } from "@/data/islands";
import { tierMeta, type Stay, type Tier } from "@/data/stays";
import type { TransferInfo } from "@/data/transfers";
import type { Activity } from "@/data/activities";

type Props = {
  islands: Island[];
  stays: Stay[];
  transfers: Record<string, TransferInfo>;
  activitiesByIsland: Record<string, Activity[]>;
};

const tierOptions: { key: Tier; blurb: string; tag: string }[] = [
  { key: "budget", blurb: "Local island guesthouses, $30–$90 / night", tag: "from $35" },
  { key: "mid", blurb: "3–4★ resorts & boutique stays, $150–$400 / night", tag: "from $160" },
  { key: "luxury", blurb: "Overwater villas, 5★ resorts, $500–$1,500 / night", tag: "from $750" },
  { key: "ultra", blurb: "Private islands, butlers, $1,500+ / night", tag: "from $2,600" },
];

const originCities = [
  { code: "LHR", label: "London" },
  { code: "DXB", label: "Dubai" },
  { code: "DOH", label: "Doha" },
  { code: "SIN", label: "Singapore" },
  { code: "BOM", label: "Mumbai" },
  { code: "DEL", label: "Delhi" },
  { code: "CMB", label: "Colombo" },
  { code: "IST", label: "Istanbul" },
  { code: "FRA", label: "Frankfurt" },
  { code: "CDG", label: "Paris" },
  { code: "JFK", label: "New York" },
  { code: "SYD", label: "Sydney" },
  { code: "HND", label: "Tokyo" },
];

function stepLabel(n: number) {
  return String(n).padStart(2, "0");
}
function gfxUrl(origin: string, depart: string, returnDate: string) {
  return `https://www.google.com/travel/flights?q=Flights%20from%20${origin}%20to%20MLE%20on%20${depart}%20returning%20${returnDate}`;
}
function skyscannerUrl(origin: string, depart: string, returnDate: string) {
  const d = depart.replaceAll("-", "").slice(2);
  const r = returnDate.replaceAll("-", "").slice(2);
  return `https://www.skyscanner.com/transport/flights/${origin}/mle/${d}/${r}/`;
}
function bookingUrl(query: string, checkin: string, checkout: string) {
  return `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(query)}&checkin=${checkin}&checkout=${checkout}`;
}
function expediaUrl(query: string, checkin: string, checkout: string) {
  return `https://www.expedia.com/Hotel-Search?destination=${encodeURIComponent(query)}&startDate=${checkin}&endDate=${checkout}`;
}
function daysBetween(a: string, b: string) {
  const ms = new Date(b).getTime() - new Date(a).getTime();
  return Math.max(1, Math.round(ms / 86400000));
}

// Map which tiers an island actually has stays for
function tiersForIsland(stays: Stay[], slug: string): Tier[] {
  const set = new Set<Tier>();
  for (const s of stays) if (s.islandSlugs.includes(slug)) set.add(s.tier);
  return Array.from(set);
}

export function PlanWizard({ islands, stays, transfers, activitiesByIsland }: Props) {
  const [step, setStep] = useState(1);
  const [tier, setTier] = useState<Tier | null>(null);
  const [islandSlug, setIslandSlug] = useState<string | null>(null);
  const [stayId, setStayId] = useState<string | null>(null);
  const [origin, setOrigin] = useState("LHR");
  const today = new Date();
  const d1 = new Date(today.getTime() + 14 * 86400000).toISOString().slice(0, 10);
  const d2 = new Date(today.getTime() + 21 * 86400000).toISOString().slice(0, 10);
  const [depart, setDepart] = useState(d1);
  const [returnDate, setReturnDate] = useState(d2);

  const selectedIsland = useMemo(
    () => islands.find((i) => i.slug === islandSlug) ?? null,
    [islands, islandSlug],
  );
  const selectedStay = useMemo(
    () => stays.find((s) => s.slug === stayId) ?? null,
    [stays, stayId],
  );
  const transfer = islandSlug ? transfers[islandSlug] : null;
  const nights = daysBetween(depart, returnDate);
  const activities = islandSlug ? activitiesByIsland[islandSlug] ?? [] : [];

  // Islands that offer the picked tier (if any tier picked)
  const islandOptions = useMemo(() => {
    if (!tier) return islands;
    // Local islands with this tier OR (for luxury/ultra) all islands are acceptable as "base for transfer"
    const local = islands.filter((i) =>
      stays.some((s) => s.tier === tier && s.islandSlugs.includes(i.slug)),
    );
    return local.length > 0 ? local : islands;
  }, [tier, islands, stays]);

  // Stays that match BOTH island AND tier; fall back to stays just for island, then just for tier.
  const stayCandidates = useMemo(() => {
    if (!tier && !islandSlug) return stays;
    const bothMatch = stays.filter(
      (s) => (!tier || s.tier === tier) && (!islandSlug || s.islandSlugs.includes(islandSlug)),
    );
    if (bothMatch.length > 0) return bothMatch;
    // Fallback 1: all stays on that island (any tier)
    if (islandSlug) {
      const islandOnly = stays.filter((s) => s.islandSlugs.includes(islandSlug));
      if (islandOnly.length > 0) return islandOnly;
    }
    // Fallback 2: all stays of that tier (regional resorts, no island lock)
    if (tier) return stays.filter((s) => s.tier === tier);
    return [];
  }, [stays, tier, islandSlug]);

  const noCuratedMatch =
    !!tier && !!islandSlug &&
    !stays.some(
      (s) => s.tier === tier && s.islandSlugs.includes(islandSlug),
    );

  const canNext =
    (step === 1 && !!tier) ||
    (step === 2 && !!islandSlug) ||
    (step === 3 && !!stayId) ||
    step >= 4;

  const bookingQuery = selectedStay?.bookingQuery
    ?? (selectedStay ? selectedStay.name : selectedIsland ? `${selectedIsland.name} Maldives` : "Maldives");

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-16 md:px-10">
      {/* header */}
      <div className="eyebrow">Plan your trip</div>
      <h1 className="mt-3 font-display text-5xl font-semibold leading-[1.02] text-ocean md:text-6xl">
        From airport to <span className="italic text-lagoon">water villa</span> — in 5 steps.
      </h1>
      <p className="mt-4 max-w-2xl text-[15px] text-muted">
        Answer 5 questions. We'll pair you with the right tier, island and stay, tell you exactly how
        you'll get there, and deep-link you into real flight and hotel searches with your dates pre-filled.
      </p>

      {/* progress */}
      <div className="mt-10 flex items-center gap-3">
        {[1, 2, 3, 4, 5].map((n) => (
          <div key={n} className="flex flex-1 items-center gap-2">
            <button
              type="button"
              onClick={() => n < step && setStep(n)}
              className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold transition ${
                n === step
                  ? "bg-ocean text-white"
                  : n < step
                    ? "bg-sand text-ocean hover:bg-sand-deep"
                    : "bg-ocean/10 text-ocean/50"
              }`}
            >
              {stepLabel(n)}
            </button>
            {n < 5 && <div className={`h-px flex-1 ${n < step ? "bg-ocean" : "bg-ocean/15"}`} />}
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-[28px] border border-ocean/10 bg-white p-6 shadow-[0_1px_0_rgba(10,42,51,0.05)] md:p-10">
        {/* STEP 1 — Tier */}
        {step === 1 && (
          <div>
            <div className="eyebrow">Step 01</div>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ocean md:text-4xl">Pick your tier</h2>
            <p className="mt-2 text-[14px] text-muted">
              Don't overthink it — you can change later. Everything adjusts to your choice.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {tierOptions.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTier(t.key)}
                  className={`group relative overflow-hidden rounded-[22px] border p-6 text-left transition ${
                    tier === t.key ? "border-ocean bg-ocean text-white" : "border-ocean/15 bg-white hover:border-ocean/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`eyebrow ${tier === t.key ? "text-sand" : ""}`}>{tierMeta[t.key].title}</div>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest ${
                        tier === t.key ? "bg-sand text-ocean" : "bg-ocean/5 text-ocean"
                      }`}
                    >
                      {t.tag}
                    </span>
                  </div>
                  <div className="mt-3 font-display text-2xl font-semibold">{tierMeta[t.key].title}</div>
                  <p className={`mt-2 text-[13px] ${tier === t.key ? "text-white/85" : "text-muted"}`}>{t.blurb}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2 — Island */}
        {step === 2 && (
          <div>
            <div className="eyebrow">Step 02</div>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ocean md:text-4xl">
              Where do you want to wake up?
            </h2>
            <p className="mt-2 text-[14px] text-muted">
              {tier === "ultra" || tier === "luxury"
                ? "Resorts sit on their own private atolls. Pick a base island to set your transfer region — most luxury resorts reach from any entry point via speedboat or seaplane."
                : "Local islands open to independent travellers. All reachable by ferry or speedboat."}
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {islandOptions.map((i) => {
                const tiers = tiersForIsland(stays, i.slug);
                return (
                  <button
                    key={i.slug}
                    type="button"
                    onClick={() => setIslandSlug(i.slug)}
                    className={`group relative overflow-hidden rounded-[22px] border text-left transition ${
                      islandSlug === i.slug ? "border-ocean ring-2 ring-ocean" : "border-ocean/10 hover:border-ocean/40"
                    }`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src={i.image} alt={i.name} fill sizes="33vw" className="object-cover transition group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/70 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <div className="text-[10px] uppercase tracking-widest text-sand">{i.atoll} Atoll</div>
                        <div className="font-display text-xl font-semibold">{i.name}</div>
                      </div>
                    </div>
                    <div className="bg-white p-4">
                      <p className="line-clamp-2 text-[13px] text-muted">{i.highlight}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {tiers.map((t) => (
                          <span key={t} className="rounded-full bg-ocean/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-ocean">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3 — Stay */}
        {step === 3 && (
          <div>
            <div className="eyebrow">Step 03</div>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ocean md:text-4xl">
              Pick a stay {selectedIsland && <span className="italic text-lagoon">on {selectedIsland.name}</span>}
            </h2>
            <p className="mt-2 text-[14px] text-muted">
              Curated from our journal. We'll deep-link you into Booking.com afterwards for live prices on your exact dates.
            </p>

            {noCuratedMatch && (
              <div className="mt-6 rounded-[18px] bg-sand/40 p-4 text-[13px] text-ocean">
                <strong>Heads-up:</strong> no curated <strong>{tier}</strong> stays on{" "}
                <strong>{selectedIsland?.name}</strong> yet. We're showing other options on this
                island and you can still book a tier-match via Booking.com on the final step.
              </div>
            )}

            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {stayCandidates.map((s) => (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => setStayId(s.slug)}
                  className={`group relative overflow-hidden rounded-[22px] border text-left transition ${
                    stayId === s.slug ? "border-ocean ring-2 ring-ocean" : "border-ocean/10 hover:border-ocean/40"
                  }`}
                >
                  <div className="relative aspect-[5/4] overflow-hidden">
                    <Image src={s.image} alt={s.name} fill sizes="33vw" className="object-cover transition group-hover:scale-105" />
                    <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-ocean">
                      from {s.priceFrom}
                    </div>
                    <div className="absolute right-3 top-3 rounded-full bg-ocean/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
                      {s.tier}
                    </div>
                  </div>
                  <div className="bg-white p-4">
                    <div className="eyebrow">{s.atoll} Atoll</div>
                    <div className="mt-1 font-display text-lg font-semibold text-ocean">{s.name}</div>
                    <div className="text-[12px] text-muted">{s.island}</div>
                  </div>
                </button>
              ))}
            </div>
            {stayCandidates.length === 0 && (
              <p className="mt-4 rounded-xl bg-ocean/5 p-4 text-[13px] text-muted">
                No curated matches. Skip ahead — final step gives you a live Booking.com search for {selectedIsland?.name ?? "your island"}.
              </p>
            )}
          </div>
        )}

        {/* STEP 4 — Transfer + Activities */}
        {step === 4 && (
          <div>
            <div className="eyebrow">Step 04</div>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ocean md:text-4xl">Getting there + what to do</h2>
            <p className="mt-2 text-[14px] text-muted">
              Every trip lands at Malé Velana International (MLE). Then your island transfer and the things to actually do on {selectedIsland?.name ?? "your island"}.
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-[22px] border border-ocean/10 p-6">
                <div className="eyebrow">Flight</div>
                <h3 className="mt-2 font-display text-2xl font-semibold text-ocean">
                  Your airport → <span className="italic text-lagoon">MLE</span>
                </h3>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <label className="flex flex-col gap-1 text-[12px] font-semibold text-ocean">
                    Flying from
                    <select value={origin} onChange={(e) => setOrigin(e.target.value)} className="rounded-lg border border-ocean/15 bg-white p-2 text-[14px] font-normal text-ocean">
                      {originCities.map((c) => <option key={c.code} value={c.code}>{c.label} ({c.code})</option>)}
                    </select>
                  </label>
                  <label className="flex flex-col gap-1 text-[12px] font-semibold text-ocean">
                    Passengers
                    <select className="rounded-lg border border-ocean/15 bg-white p-2 text-[14px] font-normal text-ocean">
                      <option>1</option><option>2</option><option>3</option><option>4</option>
                    </select>
                  </label>
                  <label className="flex flex-col gap-1 text-[12px] font-semibold text-ocean">
                    Depart
                    <input type="date" value={depart} onChange={(e) => setDepart(e.target.value)} className="rounded-lg border border-ocean/15 bg-white p-2 text-[14px] font-normal text-ocean" />
                  </label>
                  <label className="flex flex-col gap-1 text-[12px] font-semibold text-ocean">
                    Return
                    <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} className="rounded-lg border border-ocean/15 bg-white p-2 text-[14px] font-normal text-ocean" />
                  </label>
                </div>
                <div className="mt-4 text-[13px] text-muted">{nights} nights · {origin} → MLE</div>
                <div className="mt-4 flex flex-col gap-2">
                  <a href={gfxUrl(origin, depart, returnDate)} target="_blank" rel="noopener noreferrer" className="rounded-full bg-ocean px-5 py-2.5 text-center text-[12px] font-semibold uppercase tracking-widest text-white hover:bg-ocean-deep">
                    Live prices on Google Flights →
                  </a>
                  <a href={skyscannerUrl(origin, depart, returnDate)} target="_blank" rel="noopener noreferrer" className="rounded-full border border-ocean/20 px-5 py-2.5 text-center text-[12px] font-semibold uppercase tracking-widest text-ocean hover:bg-ocean/5">
                    Compare on Skyscanner →
                  </a>
                </div>
              </div>

              <div className="rounded-[22px] border border-ocean/10 p-6">
                <div className="eyebrow">Transfer</div>
                <h3 className="mt-2 font-display text-2xl font-semibold text-ocean">
                  MLE → <span className="italic text-lagoon">{selectedIsland?.name ?? "your island"}</span>
                </h3>
                {transfer ? (
                  <>
                    <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
                      <div><dt className="text-muted">Mode</dt><dd className="mt-1 font-semibold text-ocean">{transfer.type}</dd></div>
                      <div><dt className="text-muted">Duration</dt><dd className="mt-1 font-semibold text-ocean">{transfer.duration}</dd></div>
                      <div><dt className="text-muted">Price (1-way)</dt><dd className="mt-1 font-semibold text-ocean">{transfer.priceUsd}</dd></div>
                      <div><dt className="text-muted">Operator</dt><dd className="mt-1 font-semibold text-ocean">{transfer.operator ?? "-"}</dd></div>
                    </dl>
                    <p className="mt-4 text-[13px] text-muted">{transfer.notes}</p>
                  </>
                ) : (
                  <p className="mt-3 text-[13px] text-muted">Pick an island in step 2 to see transfer details.</p>
                )}
              </div>
            </div>

            {/* Activities */}
            {activities.length > 0 && (
              <div className="mt-10">
                <div className="eyebrow">What to do on {selectedIsland?.name}</div>
                <h3 className="mt-2 font-display text-2xl font-semibold text-ocean">Curated experiences</h3>
                <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {activities.map((a) => (
                    <div key={a.title} className="rounded-[18px] border border-ocean/10 p-5">
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-lagoon/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-lagoon">
                          {a.category}
                        </span>
                        <span className="font-semibold text-ocean">{a.price}</span>
                      </div>
                      <div className="mt-3 font-display text-lg font-semibold text-ocean">{a.title}</div>
                      <div className="text-[11px] uppercase tracking-widest text-muted">{a.duration}</div>
                      <p className="mt-2 text-[13px] leading-relaxed text-muted">{a.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 5 — Book */}
        {step === 5 && (
          <div>
            <div className="eyebrow">Step 05</div>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ocean md:text-4xl">Your trip plan</h2>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <div className="rounded-[22px] border border-ocean/10 p-6">
                <div className="eyebrow">Tier</div>
                <div className="mt-2 font-display text-xl font-semibold text-ocean">
                  {tier ? tierMeta[tier].title : "-"}
                </div>
                <p className="mt-2 text-[12px] text-muted">{tier ? tierMeta[tier].tagline : ""}</p>
              </div>
              <div className="rounded-[22px] border border-ocean/10 p-6">
                <div className="eyebrow">Island</div>
                <div className="mt-2 font-display text-xl font-semibold text-ocean">
                  {selectedIsland?.name ?? "-"}
                </div>
                <p className="mt-2 text-[12px] text-muted">{selectedIsland?.atoll ?? ""} Atoll</p>
              </div>
              <div className="rounded-[22px] border border-ocean/10 p-6">
                <div className="eyebrow">Stay</div>
                <div className="mt-2 font-display text-xl font-semibold text-ocean">
                  {selectedStay?.name ?? "(skipped — use live search)"}
                </div>
                <p className="mt-2 text-[12px] text-muted">
                  {selectedStay ? `from ${selectedStay.priceFrom} / night` : "Browse with live Booking prices"}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <a href={gfxUrl(origin, depart, returnDate)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-[22px] bg-ocean p-6 text-white transition hover:bg-ocean-deep">
                <div>
                  <div className="eyebrow text-sand">Flights</div>
                  <div className="mt-2 font-display text-xl font-semibold">{origin} → MLE · {nights} nights</div>
                  <div className="mt-1 text-[12px] text-white/80">{depart} → {returnDate}</div>
                </div>
                <span className="text-[12px] font-semibold uppercase tracking-widest text-sand">Google Flights →</span>
              </a>
              <a href={bookingUrl(bookingQuery, depart, returnDate)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-[22px] bg-sand p-6 text-ocean transition hover:bg-sand-deep">
                <div>
                  <div className="eyebrow">Stay</div>
                  <div className="mt-2 font-display text-xl font-semibold">{bookingQuery} — live rates</div>
                  <div className="mt-1 text-[12px]">{depart} → {returnDate}</div>
                </div>
                <span className="text-[12px] font-semibold uppercase tracking-widest">Booking.com →</span>
              </a>
              <a href={skyscannerUrl(origin, depart, returnDate)} target="_blank" rel="noopener noreferrer" className="rounded-full border border-ocean/20 px-5 py-3 text-center text-[12px] font-semibold uppercase tracking-widest text-ocean transition hover:bg-ocean/5">
                Compare flights · Skyscanner →
              </a>
              <a href={expediaUrl(bookingQuery, depart, returnDate)} target="_blank" rel="noopener noreferrer" className="rounded-full border border-ocean/20 px-5 py-3 text-center text-[12px] font-semibold uppercase tracking-widest text-ocean transition hover:bg-ocean/5">
                Compare stays · Expedia →
              </a>
            </div>

            {transfer && (
              <div className="mt-8 rounded-[22px] bg-lagoon/10 p-6">
                <div className="eyebrow text-lagoon">On-arrival transfer</div>
                <div className="mt-2 text-[14px] text-ocean">
                  <strong>{transfer.type}</strong> · {transfer.duration} · {transfer.priceUsd} one-way
                </div>
                <p className="mt-1 text-[13px] text-muted">{transfer.notes}</p>
              </div>
            )}

            {activities.length > 0 && (
              <div className="mt-8">
                <div className="eyebrow">Book on arrival</div>
                <h3 className="mt-1 font-display text-xl font-semibold text-ocean">
                  Top activities on {selectedIsland?.name}
                </h3>
                <ul className="mt-4 grid gap-2 md:grid-cols-2">
                  {activities.map((a) => (
                    <li key={a.title} className="flex items-start justify-between gap-3 rounded-[14px] border border-ocean/10 p-3">
                      <div>
                        <div className="text-[13px] font-semibold text-ocean">{a.title}</div>
                        <div className="text-[11px] uppercase tracking-widest text-lagoon">{a.category} · {a.duration}</div>
                      </div>
                      <div className="text-[13px] font-semibold text-ocean">{a.price}</div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 rounded-[22px] border border-ocean/10 bg-ocean/5 p-6 text-[13px] text-muted">
              <strong className="text-ocean">Pro tip:</strong> most guesthouses on local islands and
              every resort handle the MLE-to-island transfer for you — just email them your flight
              number after booking. E-visa on arrival for most nationalities, free, 30 days.
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {selectedIsland && (
                <Link href={`/destinations/${selectedIsland.slug}`} className="rounded-full bg-ocean px-5 py-3 text-[12px] font-semibold uppercase tracking-widest text-white hover:bg-ocean-deep">
                  Full {selectedIsland.name} guide →
                </Link>
              )}
              <button type="button" onClick={() => { setStep(1); setTier(null); setIslandSlug(null); setStayId(null); }} className="rounded-full border border-ocean/20 px-5 py-3 text-[12px] font-semibold uppercase tracking-widest text-ocean hover:bg-ocean/5">
                Start over
              </button>
            </div>
          </div>
        )}

        {/* nav */}
        <div className="mt-10 flex items-center justify-between border-t border-ocean/10 pt-6">
          <button type="button" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1} className="rounded-full px-5 py-2.5 text-[12px] font-semibold uppercase tracking-widest text-ocean disabled:opacity-30">
            ← Back
          </button>
          <div className="text-[12px] text-muted">Step {stepLabel(step)} / 05</div>
          {step < 5 ? (
            <button type="button" onClick={() => canNext && setStep((s) => Math.min(5, s + 1))} disabled={!canNext} className="rounded-full bg-ocean px-6 py-2.5 text-[12px] font-semibold uppercase tracking-widest text-white hover:bg-ocean-deep disabled:opacity-30">
              Next →
            </button>
          ) : (
            <span className="rounded-full bg-sand px-6 py-2.5 text-[12px] font-semibold uppercase tracking-widest text-ocean">
              Plan complete
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
