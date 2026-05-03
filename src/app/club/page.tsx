import type { Metadata } from "next";
import Link from "next/link";
import { TIERS, POINTS_RULES, FAQ } from "@/data/club";
import { BeehiivEmbed } from "@/components/BeehiivEmbed";

export const metadata: Metadata = {
  title: "Atoll Voyager Club — earn a sponsored Maldives flight",
  description:
    "Book through Maldives Navigator. Earn points. Reach Reef tier and we sponsor your annual return flight to MLE. Real perks, honest math.",
  alternates: { canonical: "/club" },
};

export default function ClubPage() {
  return (
    <article className="bg-shore">
      <Hero />
      <TierLadder />
      <Earning />
      <FaqBlock />
      <SignUp />
    </article>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-ocean-deep via-ocean to-lagoon text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-sand/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-coral/30 blur-3xl"
      />
      <div className="relative mx-auto max-w-[1200px] px-6 py-24 md:px-10 md:py-32">
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-sand/85">
          Members programme · Atoll Voyager Club
        </p>
        <h1 className="mt-5 max-w-[20ch] font-display text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.02] tracking-tight">
          Book your Maldives trips through us. We&apos;ll fly you back.
        </h1>
        <p className="mt-7 max-w-[55ch] text-[16px] leading-relaxed text-white/90 md:text-[18px]">
          Every booking through our Booking.com and Agoda partner links earns
          points. Hit Reef tier — our top tier — and we sponsor one economy
          return flight to Velana International every year, on the house.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href="#join"
            className="inline-flex items-center gap-2 rounded-full bg-sand px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.22em] text-ocean transition hover:bg-white"
          >
            Join free <span aria-hidden>→</span>
          </Link>
          <Link
            href="#how"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur transition hover:bg-white/20"
          >
            How it works
          </Link>
        </div>
      </div>
    </section>
  );
}

function TierLadder() {
  return (
    <section id="how" className="mx-auto max-w-[1400px] px-6 py-24 md:px-10">
      <p className="eyebrow text-coral">The four tiers</p>
      <h2 className="mt-3 max-w-3xl font-display text-[clamp(2rem,4vw,3rem)] tracking-tight text-foreground">
        Sandbar to Reef. Same way the Maldives builds itself — sand, atoll, lagoon, reef.
      </h2>
      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
        Most members land at Atoll or Lagoon. Reef is real — last year three
        members hit it — but it&apos;s designed for the rare guest who books
        every year, brings friends, and treats the Maldives like a second home.
      </p>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {TIERS.map((t, i) => (
          <div
            key={t.key}
            className="club-tier-card relative overflow-hidden rounded-[24px] bg-white shadow-[0_1px_0_rgba(10,42,51,0.05)] ring-1 ring-ocean/10 transition hover:-translate-y-1 hover:shadow-xl"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div
              className={`relative h-32 bg-gradient-to-br ${t.visualGradient} ${t.accent}`}
            >
              <div className="flex h-full flex-col justify-between p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] opacity-90">
                  Tier {String(i + 1).padStart(2, "0")}
                </p>
                <p className="font-display text-3xl">{t.name}</p>
              </div>
            </div>
            <div className="space-y-4 p-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                  Reach when
                </p>
                <p className="mt-1 font-display text-[18px] tracking-tight text-foreground">
                  {t.pointsRequired === 0
                    ? "You join"
                    : `${t.pointsRequired.toLocaleString()} pts`}
                </p>
                {t.pointsRequired > 0 && (
                  <p className="mt-1 text-[12px] text-muted">
                    {t.approxSpendUsd} · {t.approxBookings}
                  </p>
                )}
              </div>
              <ul className="space-y-2 text-[13.5px] leading-relaxed text-foreground/85">
                {t.perks.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <span
                      aria-hidden
                      className="mt-1.5 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-lagoon"
                    />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              {t.topPrize && (
                <div className="rounded-2xl bg-coral/10 px-4 py-3 text-[13px] font-semibold text-coral">
                  ✈ {t.topPrize}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <SampleProgress />
    </section>
  );
}

/** Visual progress mock to anchor the program in the visitor's mind. */
function SampleProgress() {
  // Hardcoded "what a normal member looks like" — drives FOMO without
  // ever lying. New visitors won't have an account yet.
  const points = 2_400;
  const reefPoints = TIERS[3].pointsRequired;
  const pct = Math.min(100, Math.round((points / reefPoints) * 100));
  return (
    <div className="mt-16 rounded-[24px] border border-ocean/10 bg-surface p-6 md:p-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-coral">A typical first-year member</p>
          <h3 className="mt-2 font-display text-2xl text-foreground md:text-3xl">
            2,400 / 60,000 points · {pct}% of the way to Reef
          </h3>
          <p className="mt-3 max-w-2xl text-[14px] text-muted">
            Most members move from Sandbar → Atoll in their first year. Reef
            tier rewards the rare guest who treats the Maldives like a habit.
            You don&apos;t have to reach it to win — Atoll and Lagoon perks
            already pay for themselves.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <div className="relative h-3 w-full overflow-hidden rounded-full bg-ocean/10">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-lagoon via-ocean to-coral transition-[width] duration-1000 ease-out"
            style={{ width: `${pct}%` }}
          />
          {TIERS.slice(1).map((t) => {
            const left = (t.pointsRequired / reefPoints) * 100;
            return (
              <div
                key={t.key}
                className="absolute top-0 h-3 w-px bg-foreground/30"
                style={{ left: `${left}%` }}
              />
            );
          })}
        </div>
        <div className="mt-2 flex justify-between text-[10.5px] uppercase tracking-[0.18em] text-muted">
          {TIERS.map((t) => (
            <span key={t.key}>{t.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Earning() {
  return (
    <section className="border-t border-ocean/10 bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-20 md:px-10">
        <p className="eyebrow text-lagoon">Earning</p>
        <h2 className="mt-3 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] tracking-tight text-foreground">
          1 point per $1 booked. That&apos;s it.
        </h2>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
          Forward your Booking.com or Agoda confirmation to{" "}
          <a
            className="underline underline-offset-2"
            href="mailto:rewards@maldivesnavigator.com"
          >
            rewards@maldivesnavigator.com
          </a>{" "}
          and we credit your account within 7 days.
        </p>

        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {POINTS_RULES.map((r) => (
            <li
              key={r.rule}
              className="flex items-baseline justify-between gap-4 rounded-2xl border border-ocean/10 bg-shore p-5"
            >
              <span className="text-[14px] text-foreground/85">{r.rule}</span>
              <span className="shrink-0 rounded-full bg-lagoon px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                {r.points}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FaqBlock() {
  return (
    <section className="bg-shore">
      <div className="mx-auto max-w-[900px] px-6 py-20 md:px-10">
        <p className="eyebrow text-coral">FAQ</p>
        <h2 className="mt-3 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] tracking-tight text-foreground">
          The questions we get asked.
        </h2>
        <ul className="mt-10 space-y-6">
          {FAQ.map((f) => (
            <li
              key={f.q}
              className="rounded-2xl border border-ocean/10 bg-white p-6"
            >
              <p className="font-display text-[18px] text-foreground">{f.q}</p>
              <p className="mt-2 text-[14.5px] leading-relaxed text-muted">
                {f.a}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SignUp() {
  return (
    <section
      id="join"
      className="bg-gradient-to-br from-ocean-deep via-ocean to-lagoon text-white"
    >
      <div className="mx-auto max-w-[900px] px-6 py-20 text-center md:px-10">
        <p className="eyebrow text-sand/85">Join the club</p>
        <h2 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-light tracking-tight">
          Free to join. Sandbar tier is yours the moment you subscribe.
        </h2>
        <p className="mt-4 mx-auto max-w-2xl text-[15px] leading-relaxed text-white/85 md:text-[16px]">
          Drop your email below. You&apos;ll get a welcome note with your
          membership ID, plus the printable planner. Forward your first
          booking confirmation and we&apos;ll move you to Atoll the moment we
          verify it.
        </p>
        <div className="mx-auto mt-10 max-w-md">
          <BeehiivEmbed variant="compact" />
        </div>
        <p className="mt-6 text-[11px] uppercase tracking-[0.22em] text-sand/70">
          No spam. Unsubscribe any time. Points never sold or transferred.
        </p>
      </div>
    </section>
  );
}
