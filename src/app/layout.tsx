import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { SearchBar } from "@/components/SearchBar";
import { islands } from "@/data/islands";
import { stays } from "@/data/stays";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maldives Navigator — A living journal of the 1,192 islands",
  description:
    "An independent editorial journal of the Maldives — destinations, local islands, resorts from backpacker to ultra-luxury, and the creators filming it all.",
  openGraph: {
    title: "Maldives Navigator",
    description:
      "A living journal of the Maldives — destinations, stays, and stories from every corner of the archipelago.",
    type: "website",
  },
};

const nav = [
  { href: "/destinations", label: "Destinations" },
  { href: "/stays", label: "Stays" },
  { href: "/plan", label: "Plan trip" },
  { href: "/shop", label: "Shop" },
  { href: "/journal", label: "Journal" },
  { href: "/creators", label: "Voices" },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <header className="sticky top-0 z-50 border-b border-black/5 bg-[color:var(--background)]/85 backdrop-blur-xl">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
            <Link href="/" aria-label="Maldives Navigator home">
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
              <SearchBar islands={islands} stays={stays} />
              <Link
                href="/plan"
                className="hidden rounded-full bg-ocean px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-ocean-deep md:inline-flex"
              >
                Plan trip →
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="mt-24 bg-ocean-deep text-white">
          <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-20 md:grid-cols-12 md:px-10">
            <div className="md:col-span-5">
              <Logo mark="white" />
              <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70">
                An independent editorial journal of the Maldives. We don't run resorts. We don't
                take commissions. We just keep pointing people back to the 1,192 islands that
                changed our lives.
              </p>
              <div className="mt-8 flex gap-3">
                {["Instagram", "TikTok", "YouTube"].map((p) => (
                  <span
                    key={p}
                    className="rounded-full border border-white/20 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-white/80"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-10 md:col-span-7 md:grid-cols-3">
              <div>
                <div className="eyebrow text-lagoon-light">Explore</div>
                <ul className="mt-4 space-y-2 text-sm text-white/80">
                  <li><Link href="/destinations">Destinations</Link></li>
                  <li><Link href="/stays">All stays</Link></li>
                  <li><Link href="/journal">Journal</Link></li>
                </ul>
              </div>
              <div>
                <div className="eyebrow text-lagoon-light">Stays</div>
                <ul className="mt-4 space-y-2 text-sm text-white/80">
                  <li><Link href="/stays/budget">Budget</Link></li>
                  <li><Link href="/stays/mid">Mid-range</Link></li>
                  <li><Link href="/stays/luxury">Luxury</Link></li>
                  <li><Link href="/stays/ultra">Ultra-luxury</Link></li>
                </ul>
              </div>
              <div>
                <div className="eyebrow text-lagoon-light">Voices</div>
                <ul className="mt-4 space-y-2 text-sm text-white/80">
                  <li><Link href="/creators">YouTube</Link></li>
                  <li><Link href="/creators">TikTok</Link></li>
                </ul>
                <div className="eyebrow mt-6 text-lagoon-light">For hosts</div>
                <ul className="mt-4 space-y-2 text-sm text-white/80">
                  <li><Link href="/partners">List your property</Link></li>
                </ul>
                <div className="eyebrow mt-6 text-lagoon-light">Contact</div>
                <ul className="mt-4 space-y-2 text-sm text-white/80">
                  <li>
                    <a href="tel:+13075335538" className="hover:text-white">
                      +1 (307) 533-5538
                    </a>
                  </li>
                  <li className="text-white/70 leading-relaxed">
                    30 N Gould St Ste N<br />
                    Sheridan, WY 82801, USA
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 py-5 text-center text-[11px] uppercase tracking-[0.28em] text-white/40">
            © {new Date().getFullYear()} · Maldives Navigator · 1,192 islands · 26 atolls
          </div>
        </footer>
      </body>
    </html>
  );
}
