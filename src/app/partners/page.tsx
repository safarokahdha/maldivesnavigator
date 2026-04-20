import Image from "next/image";
import { PartnerForm } from "./PartnerForm";

export const metadata = {
  title: "Get on the Navigator — list your property — Maldives Navigator",
  description:
    "List your Maldives guesthouse, resort, villa, Airbnb, liveaboard, dive centre or excursion on Maldives Navigator. Editorial review, free, no commission.",
};

const perks = [
  {
    title: "Editorial, not advertorial",
    body: "Every listing is reviewed by a human editor. We write about you in our own voice — the same voice readers already trust.",
  },
  {
    title: "No commission, no lock-in",
    body: "You keep every booking. We don't take a cut. Our bet is on the journal — if it keeps growing, we both win.",
  },
  {
    title: "Real search traffic",
    body: "Your listing ships with schema, sitemap and SEO — the whole journal is built for Google and AI-assistant search.",
  },
  {
    title: "Featured on the feed",
    body: "The best new listings get a spot on the homepage, the daily journal dispatch and our weekly email.",
  },
];

const partnerKinds = [
  "Guesthouses",
  "Resorts",
  "Private villas",
  "Airbnbs",
  "Liveaboards",
  "Dive centres",
  "Surf schools",
  "Excursion operators",
  "Restaurants",
];

export default function PartnersPage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="relative h-[70vh] min-h-[520px] w-full">
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
        <div className="absolute inset-x-0 bottom-0 px-6 pb-16 md:px-12 md:pb-24">
          <div className="mx-auto max-w-[1200px] text-white">
            <div className="eyebrow text-sand">For hosts, operators & atolls</div>
            <h1 className="mt-4 max-w-4xl font-display text-[48px] font-semibold leading-[0.98] md:text-[88px]">
              Get on the <span className="italic text-sand">Navigator</span>.
            </h1>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/85">
              Maldives Navigator features the country's best places to stay, dive, surf and eat.
              If you run a guesthouse, resort, villa, Airbnb, liveaboard, dive centre or any
              Maldives excursion — we'd love to hear from you.
            </p>
            <a
              href="#apply"
              className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-ocean transition hover:bg-lagoon/10"
            >
              List my property →
            </a>
          </div>
        </div>
      </section>

      {/* WHO */}
      <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-10">
        <div className="eyebrow">Who we feature</div>
        <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.02] text-ocean md:text-5xl">
          If you love what you do, we'd love to list you.
        </h2>
        <div className="mt-8 flex flex-wrap gap-2">
          {partnerKinds.map((k) => (
            <span
              key={k}
              className="rounded-full border border-ocean/15 bg-white px-4 py-2 text-[12px] font-semibold uppercase tracking-widest text-ocean"
            >
              {k}
            </span>
          ))}
        </div>
      </section>

      {/* PERKS */}
      <section className="bg-gradient-to-b from-lagoon/10 to-transparent py-20">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <div className="eyebrow">Why list with us</div>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.02] text-ocean md:text-5xl">
            An editorial journal, not a directory.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {perks.map((p) => (
              <div
                key={p.title}
                className="rounded-[22px] border border-ocean/10 bg-white p-7"
              >
                <h3 className="font-display text-xl font-semibold text-ocean">{p.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="apply" className="mx-auto max-w-[900px] px-6 py-20 md:px-10">
        <PartnerForm />
      </section>

      {/* TRUST STRIP */}
      <section className="mx-auto max-w-[1200px] px-6 pb-24 md:px-10">
        <div className="rounded-[28px] bg-ocean p-8 text-white md:p-12">
          <div className="eyebrow text-sand">Questions?</div>
          <h3 className="mt-3 font-display text-3xl font-semibold leading-[1.02] md:text-4xl">
            Email <span className="text-sand">hello@maldivesnavigator.com</span>
          </h3>
          <p className="mt-3 max-w-xl text-[14px] text-white/80">
            Prefer a chat first? Send a note with your property name and Instagram handle — we'll
            write back the same week.
          </p>
        </div>
      </section>
    </div>
  );
}
