"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/Logo";

const nav = [
  { href: "/destinations", label: "Destinations" },
  { href: "/stays", label: "Stays" },
  { href: "/plan", label: "Plan" },
  { href: "/journal", label: "Journal" },
  { href: "/voices", label: "Voices" },
  { href: "/shop", label: "Shop" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[color:var(--background)]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-4 md:px-10">
        <Link href="/" aria-label="Maldives Navigator home" onClick={() => setOpen(false)}>
          <Logo mark="brand" />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="rounded-full px-4 py-2 text-[13px] font-medium text-ocean/80 transition hover:bg-ocean/5 hover:text-ocean"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/plan"
            className="hidden rounded-full bg-ocean px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-ocean-deep md:inline-flex"
          >
            Plan trip →
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-black/10 text-ocean md:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              {open ? (
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-black/5 bg-white md:hidden">
          <ul className="mx-auto flex max-w-[1400px] flex-col gap-1 px-6 py-4">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-[15px] font-medium text-ocean transition hover:bg-ocean/5"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Link
                href="/plan"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-ocean px-5 py-3 text-center text-[14px] font-semibold text-white"
              >
                Plan trip →
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
