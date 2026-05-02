"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

type Props = {
  atolls: string[];
  totalCount: number;
  resultCount: number;
};

const STYLE_CHIPS: { key: string; label: string }[] = [
  { key: "surf", label: "Surf" },
  { key: "dive", label: "Dive" },
  { key: "budget", label: "Budget" },
  { key: "luxury", label: "Luxury" },
  { key: "local", label: "Local island" },
];

export function IslandFilterBar({ atolls, totalCount, resultCount }: Props) {
  const router = useRouter();
  const sp = useSearchParams();
  const [pending, startTransition] = useTransition();

  const atoll = sp.get("atoll") ?? "";
  const styles = (sp.get("style") ?? "").split(",").filter(Boolean);

  function update(next: Partial<{ atoll: string; styles: string[] }>) {
    const params = new URLSearchParams(sp.toString());
    if (next.atoll !== undefined) {
      if (next.atoll) params.set("atoll", next.atoll);
      else params.delete("atoll");
    }
    if (next.styles !== undefined) {
      if (next.styles.length) params.set("style", next.styles.join(","));
      else params.delete("style");
    }
    const qs = params.toString();
    startTransition(() => {
      router.push(qs ? `/destinations?${qs}` : "/destinations", { scroll: false });
    });
  }

  function toggleStyle(key: string) {
    const next = styles.includes(key)
      ? styles.filter((s) => s !== key)
      : [...styles, key];
    update({ styles: next });
  }

  function clearAll() {
    startTransition(() => router.push("/destinations", { scroll: false }));
  }

  const hasFilter = !!atoll || styles.length > 0;

  return (
    <div className="sticky top-[72px] z-30 -mx-6 mt-10 border-b border-black/5 bg-background/90 px-6 py-4 backdrop-blur md:-mx-10 md:px-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {STYLE_CHIPS.map((c) => {
            const active = styles.includes(c.key);
            return (
              <button
                key={c.key}
                type="button"
                onClick={() => toggleStyle(c.key)}
                aria-pressed={active}
                className={
                  "rounded-full px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] transition " +
                  (active
                    ? "bg-ocean text-white"
                    : "border border-ocean/15 text-ocean hover:bg-ocean/5")
                }
              >
                {c.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-muted">
            <span>Atoll</span>
            <select
              value={atoll}
              onChange={(e) => update({ atoll: e.target.value })}
              className="rounded-full border border-ocean/15 bg-white px-3 py-1.5 text-[13px] font-medium text-ocean focus:border-ocean focus:outline-none"
            >
              <option value="">Any</option>
              {atolls.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </label>

          {hasFilter && (
            <button
              type="button"
              onClick={clearAll}
              className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted hover:text-ocean"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <p className="mt-3 text-[12px] uppercase tracking-[0.14em] text-muted">
        {pending
          ? "Updating…"
          : `Showing ${resultCount} of ${totalCount} islands`}
      </p>
    </div>
  );
}
