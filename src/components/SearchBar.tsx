"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Island } from "@/data/islands";
import type { Stay } from "@/data/stays";

type SearchItem =
  | ({ kind: "island" } & Island)
  | ({ kind: "stay" } & Stay);

export function SearchBar({ islands, stays }: { islands: Island[]; stays: Stay[] }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Global ⌘K / ctrl+K
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  const items = useMemo<SearchItem[]>(
    () => [
      ...islands.map((i) => ({ kind: "island" as const, ...i })),
      ...stays.map((s) => ({ kind: "stay" as const, ...s })),
    ],
    [islands, stays],
  );

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return items.slice(0, 8);
    return items
      .map((it) => {
        const hay =
          it.kind === "island"
            ? [it.name, it.atoll, it.highlight, it.blurb, ...it.tags].join(" ")
            : [it.name, it.island, it.atoll, it.tier, it.blurb, ...it.perks].join(" ");
        const score = hay.toLowerCase().includes(term)
          ? 10 - hay.toLowerCase().indexOf(term) / 50
          : 0;
        return { it, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map((x) => x.it);
  }, [q, items]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-3 rounded-full border border-ocean/15 bg-white/70 px-4 py-2 text-[13px] text-muted shadow-sm backdrop-blur transition hover:bg-white"
        aria-label="Search"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <span className="hidden md:inline">Search islands, resorts, guesthouses…</span>
        <span className="md:hidden">Search</span>
        <kbd className="ml-2 hidden rounded border border-ocean/15 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-muted md:inline">⌘K</kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-ocean-deep/60 p-4 pt-[10vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-[24px] border border-ocean/10 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-ocean/10 px-5 py-4">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" className="text-ocean" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Try: Maafushi, whale shark, Soneva, surf, ultra-luxury…"
                className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted"
              />
              <button
                onClick={() => setOpen(false)}
                className="rounded border border-ocean/15 px-1.5 py-0.5 text-[10px] font-semibold text-muted"
              >
                ESC
              </button>
            </div>
            <ul className="max-h-[60vh] overflow-y-auto p-2">
              {results.length === 0 && (
                <li className="p-6 text-center text-sm text-muted">
                  Nothing matched. Try a different island or vibe.
                </li>
              )}
              {results.map((r) => {
                const href =
                  r.kind === "island" ? `/destinations/${r.slug}` : `/stays/${r.tier}`;
                const label = r.kind === "island" ? "Island" : r.tier.toUpperCase();
                const subtitle =
                  r.kind === "island" ? `${r.atoll} Atoll · ${r.highlight}` : `${r.island} · ${r.atoll} Atoll · from ${r.priceFrom}/night`;
                const title = r.name;
                return (
                  <li key={`${r.kind}-${r.slug}`}>
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-4 rounded-xl p-3 transition hover:bg-ocean/5"
                    >
                      <div className="relative h-14 w-20 flex-none overflow-hidden rounded-lg bg-ocean/10">
                        <Image
                          src={r.image}
                          alt=""
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex items-center gap-2">
                          <span className="rounded-full bg-ocean/5 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-ocean">
                            {label}
                          </span>
                          <span className="truncate font-semibold text-ocean">{title}</span>
                        </div>
                        <div className="truncate text-[12px] text-muted">{subtitle}</div>
                      </div>
                      <span className="text-[11px] font-semibold uppercase tracking-widest text-lagoon">↗</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center justify-between border-t border-ocean/10 bg-ocean/5 px-5 py-3 text-[11px] text-muted">
              <span>Searching {items.length} islands & stays</span>
              <Link href="/plan" onClick={() => setOpen(false)} className="font-semibold text-ocean hover:underline">
                Or plan my trip →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
