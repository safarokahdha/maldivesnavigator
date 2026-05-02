"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

type Props = {
  atolls: string[];
  totalCount: number;
  resultCount: number;
  priceMin: number;
  priceMax: number;
};

const TIER_CHIPS: { key: string; label: string }[] = [
  { key: "backpacker", label: "Backpacker" },
  { key: "mid", label: "Mid-range" },
  { key: "luxury", label: "Luxury" },
  { key: "ultra", label: "Ultra-luxury" },
];

const TYPE_OPTIONS: { key: string; label: string }[] = [
  { key: "guesthouse", label: "Guesthouse" },
  { key: "resort", label: "Resort" },
  { key: "dive-lodge", label: "Dive lodge" },
  { key: "liveaboard", label: "Liveaboard" },
];

const FEATURE_OPTIONS: { key: string; label: string }[] = [
  { key: "waterVillas", label: "Water villas" },
  { key: "alcohol", label: "Alcohol allowed" },
  { key: "houseReef", label: "House reef" },
  { key: "diveCenter", label: "Dive centre on-site" },
  { key: "surfAccess", label: "Surf access" },
  { key: "childFriendly", label: "Child-friendly" },
];

export function StayFilterBar({
  atolls,
  totalCount,
  resultCount,
  priceMin,
  priceMax,
}: Props) {
  const router = useRouter();
  const sp = useSearchParams();
  const [pending, startTransition] = useTransition();

  const tier = sp.get("tier") ?? "";
  const atoll = sp.get("atoll") ?? "";
  const type = sp.get("type") ?? "";
  const features = (sp.get("features") ?? "").split(",").filter(Boolean);
  const urlPriceMin = Number(sp.get("priceMin") ?? priceMin);
  const urlPriceMax = Number(sp.get("priceMax") ?? priceMax);

  // Local state for sliders so dragging is smooth; commit to URL on change end.
  const [localMin, setLocalMin] = useState(urlPriceMin);
  const [localMax, setLocalMax] = useState(urlPriceMax);
  useEffect(() => {
    setLocalMin(urlPriceMin);
    setLocalMax(urlPriceMax);
  }, [urlPriceMin, urlPriceMax]);

  function pushParams(next: URLSearchParams) {
    const qs = next.toString();
    startTransition(() => {
      router.push(qs ? `/stays?${qs}` : "/stays", { scroll: false });
    });
  }

  function update(
    patches: Partial<{
      tier: string;
      atoll: string;
      type: string;
      features: string[];
      priceMin: number | null;
      priceMax: number | null;
    }>
  ) {
    const params = new URLSearchParams(sp.toString());
    if ("tier" in patches) {
      if (patches.tier) params.set("tier", patches.tier);
      else params.delete("tier");
    }
    if ("atoll" in patches) {
      if (patches.atoll) params.set("atoll", patches.atoll);
      else params.delete("atoll");
    }
    if ("type" in patches) {
      if (patches.type) params.set("type", patches.type);
      else params.delete("type");
    }
    if ("features" in patches) {
      if (patches.features && patches.features.length)
        params.set("features", patches.features.join(","));
      else params.delete("features");
    }
    if ("priceMin" in patches) {
      if (patches.priceMin != null && patches.priceMin > priceMin)
        params.set("priceMin", String(patches.priceMin));
      else params.delete("priceMin");
    }
    if ("priceMax" in patches) {
      if (patches.priceMax != null && patches.priceMax < priceMax)
        params.set("priceMax", String(patches.priceMax));
      else params.delete("priceMax");
    }
    pushParams(params);
  }

  function toggleFeature(key: string) {
    const next = features.includes(key)
      ? features.filter((f) => f !== key)
      : [...features, key];
    update({ features: next });
  }

  function clearAll() {
    startTransition(() => router.push("/stays", { scroll: false }));
  }

  const hasFilter =
    !!tier ||
    !!atoll ||
    !!type ||
    features.length > 0 ||
    urlPriceMin > priceMin ||
    urlPriceMax < priceMax;

  return (
    <div className="sticky top-[72px] z-30 -mx-6 mt-10 border-b border-black/5 bg-background/90 px-6 py-4 backdrop-blur md:-mx-10 md:px-10">
      {/* Tier chips */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => update({ tier: "" })}
          aria-pressed={!tier}
          className={
            "rounded-full px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] transition " +
            (!tier ? "bg-ocean text-white" : "border border-ocean/15 text-ocean hover:bg-ocean/5")
          }
        >
          All
        </button>
        {TIER_CHIPS.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => update({ tier: tier === c.key ? "" : c.key })}
            aria-pressed={tier === c.key}
            className={
              "rounded-full px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] transition " +
              (tier === c.key
                ? "bg-ocean text-white"
                : "border border-ocean/15 text-ocean hover:bg-ocean/5")
            }
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Atoll + Type + Price row */}
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        <label className="flex items-center justify-between gap-2 rounded-2xl border border-black/5 bg-white px-3 py-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
            Atoll
          </span>
          <select
            value={atoll}
            onChange={(e) => update({ atoll: e.target.value })}
            className="bg-transparent text-[13px] font-medium text-ocean focus:outline-none"
          >
            <option value="">Any</option>
            {atolls.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center justify-between gap-2 rounded-2xl border border-black/5 bg-white px-3 py-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
            Type
          </span>
          <select
            value={type}
            onChange={(e) => update({ type: e.target.value })}
            className="bg-transparent text-[13px] font-medium text-ocean focus:outline-none"
          >
            <option value="">Any</option>
            {TYPE_OPTIONS.map((t) => (
              <option key={t.key} value={t.key}>
                {t.label}
              </option>
            ))}
          </select>
        </label>

        <div className="rounded-2xl border border-black/5 bg-white px-3 py-2 lg:col-span-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              Price
            </span>
            <span className="text-[12px] font-semibold text-ocean">
              ${localMin} – ${localMax}
            </span>
          </div>
          <div className="mt-1 grid grid-cols-2 gap-2">
            <input
              type="range"
              min={priceMin}
              max={priceMax}
              step={10}
              value={localMin}
              onChange={(e) => setLocalMin(Math.min(Number(e.target.value), localMax - 10))}
              onMouseUp={() => update({ priceMin: localMin })}
              onTouchEnd={() => update({ priceMin: localMin })}
              aria-label="Minimum price"
              className="accent-ocean"
            />
            <input
              type="range"
              min={priceMin}
              max={priceMax}
              step={10}
              value={localMax}
              onChange={(e) => setLocalMax(Math.max(Number(e.target.value), localMin + 10))}
              onMouseUp={() => update({ priceMax: localMax })}
              onTouchEnd={() => update({ priceMax: localMax })}
              aria-label="Maximum price"
              className="accent-ocean"
            />
          </div>
        </div>
      </div>

      {/* Features row */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
          Features
        </span>
        {FEATURE_OPTIONS.map((f) => {
          const active = features.includes(f.key);
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => toggleFeature(f.key)}
              aria-pressed={active}
              className={
                "rounded-full px-3 py-1 text-[12px] font-medium transition " +
                (active
                  ? "bg-lagoon text-white"
                  : "border border-lagoon/30 text-lagoon hover:bg-lagoon/5")
              }
            >
              {f.label}
            </button>
          );
        })}
        {hasFilter && (
          <button
            type="button"
            onClick={clearAll}
            className="ml-auto text-[12px] font-semibold uppercase tracking-[0.14em] text-muted hover:text-ocean"
          >
            Clear all
          </button>
        )}
      </div>

      <p className="mt-3 text-[12px] uppercase tracking-[0.14em] text-muted">
        {pending ? "Updating…" : `Showing ${resultCount} of ${totalCount} stays`}
      </p>
    </div>
  );
}
