import Image from "next/image";
import { Logo } from "@/components/Logo";

export const metadata = {
  title: "Opening soon — Maldives Navigator",
  description:
    "Maldives Navigator — a living editorial journal of the 1,192 islands. Opening soon.",
  robots: { index: false, follow: false },
};

const HERO =
  "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=2800&q=90";

export default function ComingSoon() {
  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-ocean-deep text-white">
      <Image
        src={HERO}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-55"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/20 via-ocean-deep/55 to-ocean-deep/95" />

      <main className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1100px] flex-col justify-between px-6 py-10 md:px-12 md:py-14">
        {/* top */}
        <div className="flex items-center justify-between gap-4">
          <Logo mark="white" />
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] backdrop-blur">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-sand animate-pulse" />
            Opening soon · 2026
          </span>
        </div>

        {/* middle */}
        <div>
          <div className="eyebrow text-sand">A living journal of the 1,192 islands</div>
          <h1 className="mt-5 font-display text-[48px] font-semibold leading-[0.98] md:text-[112px]">
            The Maldives,
            <br />
            <span className="italic text-sand">one compass away</span>.
          </h1>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/85 md:text-[17px]">
            Maldives Navigator is an independent editorial journal — from $35 local-island
            guesthouses to the private-island ultra-luxury everyone's heard of. Creator voices,
            a self-writing journal, and a plan-your-trip wizard.
          </p>
          <p className="mt-3 text-[13px] uppercase tracking-[0.28em] text-white/70">
            Launching soon · get the first dispatch
          </p>

          <form
            action="https://formspree.io/f/mayydgql"
            method="POST"
            className="mt-6 flex w-full max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="you@paradise.mv"
              className="flex-1 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm text-white placeholder-white/60 outline-none backdrop-blur focus:border-sand"
            />
            <button
              type="submit"
              className="rounded-full bg-sand px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-ocean transition hover:bg-white"
            >
              Notify me →
            </button>
          </form>
        </div>

        {/* bottom */}
        <div className="grid gap-6 border-t border-white/15 pt-6 text-[12px] text-white/70 md:grid-cols-3">
          <div>
            <div className="eyebrow text-lagoon-light">For hosts</div>
            <a
              href="mailto:hello@maldivesnavigator.com"
              className="mt-2 block text-white hover:underline"
            >
              hello@maldivesnavigator.com
            </a>
          </div>
          <div>
            <div className="eyebrow text-lagoon-light">Follow</div>
            <div className="mt-2 flex gap-3">
              <span className="rounded-full border border-white/25 px-3 py-1">Instagram</span>
              <span className="rounded-full border border-white/25 px-3 py-1">TikTok</span>
            </div>
          </div>
          <div className="md:text-right">
            <div className="eyebrow text-lagoon-light">1,192 islands · 26 atolls</div>
            <div className="mt-2">© {new Date().getFullYear()} Maldives Navigator</div>
          </div>
        </div>
      </main>
    </div>
  );
}
