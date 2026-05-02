import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PartnerForm } from "./PartnerForm";

export const metadata: Metadata = {
  title: "Partners — List your property",
  description:
    "Get your property in front of motivated Maldives travellers. Join the Founding 50 and pick your listing tier. Editorial review, no commission.",
  alternates: { canonical: "/partners" },
};

// Brief §5.8 #2 — Founding 50 banner. Reset to honest 50/50 until real claims
// land; bump
// manually as Founding members onboard.
const FOUNDING_REMAINING = 50;
const FOUNDING_TOTAL = 50;

const tiers: Array<{
  key: "free" | "verified" | "featured" | "sponsor";
  name: string;
  price: string;
  blurb: string;
  highlighted?: boolean;
}> = [
  {
    key: "free",
    name: "Free",
    price: "$0",
    blurb: "Listed in the directory. Basic, single photo, short description.",
  },
  {
    key: "verified",
    name: "Verified",
    price: "$99 / yr",
    blurb: "Verified badge, 8 photos, full description, boosted in search.",
  },
  {
    key: "featured",
    name: "Featured",
    price: "$299 / yr",
    blurb:
      "Top of category, homepage rotation, an editorial review article, one newsletter feature per year.",
    highlighted: true,
  },
  {
    key: "sponsor",
    name: "Sponsor",
    price: "Custom",
    blurb:
      "Top + pinned, deep editorial, quarterly newsletter slot, Voices interview, annual editor visit.",
  },
];

const features: Array<{
  label: string;
  values: [string, string, string, string]; // free | verified | featured | sponsor
}> = [
  { label: "Listed in directory", values: ["✓", "✓", "✓", "✓"] },
  { label: "Photos", values: ["1", "8", "12", "Unlimited"] },
  {
    label: "Description length",
    values: ["200 chars", "Unlimited", "Unlimited", "Unlimited"],
  },
  { label: "Verified badge", values: ["—", "✓", "✓", "✓"] },
  {
    label: "Search priority",
    values: ["Standard", "Boosted", "Top of category", "Top + pinned"],
  },
  { label: "Homepage rotation", values: ["—", "—", "✓", "✓"] },
  { label: "Editorial review article", values: ["—", "—", "✓", "✓ (deep)"] },
  { label: "Newsletter feature", values: ["—", "—", "1×/yr", "1×/quarter"] },
  { label: "Voices interview", values: ["—", "—", "—", "✓"] },
  { label: "Annual visit by editor", values: ["—", "—", "—", "✓"] },
];

export default function PartnersPage() {
  return (
    <div>
      {/* §5.8 #1 — Hero */}
      <section className="relative overflow-hidden">
        <div className="relative h-[64vh] min-h-[480px] w-full">
          <Image
            src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=2600&q=85"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/30 via-ocean-deep/40 to-ocean-deep/90" />
        </div>
        <div className="absolute inset-x-0 bottom-0 px-6 pb-16 md:px-10 md:pb-20">
          <div className="mx-auto max-w-[1200px] text-white">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-sand/85">
              Partners
            </p>
            <h1 className="mt-3 max-w-4xl font-display text-[clamp(2.5rem,7vw,5.5rem)] font-light leading-[1.0] tracking-[-0.02em]">
              Get your property in front of motivated Maldives travellers.
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/85">
              Maldives Navigator features the country&apos;s best places to
              stay, dive, surf and eat. If you run a guesthouse, resort,
              villa, Airbnb, liveaboard, dive centre, or any Maldives
              excursion — apply below.
            </p>
            <Link
              href="#apply"
              className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-ocean transition hover:bg-sand-deep"
            >
              Apply to be listed →
            </Link>
          </div>
        </div>
      </section>

      {/* §5.8 #2 — Founding 50 banner */}
      <section className="border-b border-black/5 bg-coral/5 py-6">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start gap-3 px-6 md:flex-row md:items-center md:justify-between md:px-10">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-coral px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white">
              Founding 50
            </span>
            <p className="text-[14px] text-foreground">
              <strong>{FOUNDING_REMAINING} of {FOUNDING_TOTAL}</strong>{" "}
              founding-member spots available — early-bird pricing locked for life.
            </p>
          </div>
          <Link
            href="#apply"
            className="text-[12px] font-semibold uppercase tracking-[0.18em] text-coral hover:underline"
          >
            Claim a spot →
          </Link>
        </div>
      </section>

      {/* §5.8 #3 — Tier comparison */}
      <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-24">
        <p className="eyebrow text-lagoon">Listing tiers</p>
        <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.25rem)] leading-tight tracking-tight text-foreground">
          Pick the level that fits how visible you want to be.
        </h2>

        {/* Tier cards summary */}
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {tiers.map((t) => (
            <div
              key={t.key}
              className={
                "flex flex-col rounded-2xl border p-6 transition " +
                (t.highlighted
                  ? "border-ocean bg-ocean text-white shadow-xl shadow-ocean/20"
                  : "border-black/5 bg-white text-foreground")
              }
            >
              <p
                className={
                  "text-[11px] font-semibold uppercase tracking-[0.22em] " +
                  (t.highlighted ? "text-sand" : "text-lagoon")
                }
              >
                {t.name}
              </p>
              <p className="mt-3 font-display text-3xl leading-tight">
                {t.price}
              </p>
              <p
                className={
                  "mt-3 text-[14px] leading-relaxed " +
                  (t.highlighted ? "text-white/85" : "text-muted")
                }
              >
                {t.blurb}
              </p>
              <Link
                href="#apply"
                className={
                  "mt-6 inline-flex w-fit rounded-full px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.18em] transition " +
                  (t.highlighted
                    ? "bg-white text-ocean hover:bg-sand-deep"
                    : "border border-ocean/20 text-ocean hover:bg-ocean/5")
                }
              >
                Apply →
              </Link>
            </div>
          ))}
        </div>

        {/* Feature comparison table */}
        <div className="mt-12 overflow-x-auto rounded-2xl border border-ocean/10 bg-surface">
          <table className="w-full text-left text-[14px]">
            <thead>
              <tr className="bg-ocean/5">
                <th className="px-5 py-3 font-semibold text-ocean" scope="col">
                  Feature
                </th>
                {tiers.map((t) => (
                  <th
                    key={t.key}
                    scope="col"
                    className={
                      "px-5 py-3 text-center font-semibold " +
                      (t.highlighted ? "text-ocean" : "text-ocean")
                    }
                  >
                    {t.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-ocean/5">
              {features.map((row) => (
                <tr key={row.label}>
                  <th
                    scope="row"
                    className="px-5 py-3 text-left text-[13px] font-medium text-muted"
                  >
                    {row.label}
                  </th>
                  {row.values.map((v, i) => (
                    <td
                      key={i}
                      className={
                        "px-5 py-3 text-center text-[13px] " +
                        (tiers[i].highlighted
                          ? "bg-ocean/5 font-semibold text-ocean"
                          : "text-foreground")
                      }
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* §5.8 #4 — Application form */}
      <section
        id="apply"
        className="mx-auto max-w-[900px] px-6 py-16 md:px-10 md:py-20"
      >
        <PartnerForm />
      </section>

      {/* §5.8 #6 — Property removal request */}
      <section className="mx-auto max-w-[1200px] px-6 pb-24 md:px-10">
        <div className="rounded-2xl border border-black/5 bg-shore p-6 text-[13px] text-foreground/85 md:p-8">
          <p className="eyebrow text-lagoon">Already listed?</p>
          <h3 className="mt-3 font-display text-2xl text-foreground">
            Want your property removed?
          </h3>
          <p className="mt-3 max-w-2xl leading-relaxed">
            We honour removal requests within seven days. Email{" "}
            <a
              href="mailto:hello@maldivesnavigator.com?subject=Property%20removal%20request"
              className="font-semibold text-ocean underline underline-offset-2"
            >
              hello@maldivesnavigator.com
            </a>{" "}
            with the property name and we&apos;ll take it down.
          </p>
        </div>
      </section>
    </div>
  );
}
