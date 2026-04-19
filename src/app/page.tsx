import Image from "next/image";
import Link from "next/link";
import { islands } from "@/data/islands";
import { stays, tierMeta } from "@/data/stays";
import { creators } from "@/data/creators";
import { journal as seedJournal } from "@/data/journal";
import { loadIndex } from "@/lib/journalStore";
import { SectionHeading } from "@/components/SectionHeading";
import { IslandCard } from "@/components/IslandCard";
import { StayCard } from "@/components/StayCard";
import { CreatorCard } from "@/components/CreatorCard";
import { TierCard } from "@/components/TierBadge";
import { Logo } from "@/components/Logo";
import { HeroSlideshow } from "@/components/HeroSlideshow";

export const revalidate = 600;

const experienceImages = [
  {
    title: "Surf the North Atoll breaks",
    slug: "thulusdhoo",
    tag: "Surf",
    img: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Snorkel with whale sharks",
    slug: "dhigurah",
    tag: "Wildlife",
    img: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Sleep in a water villa",
    slug: "rangali",
    tag: "Luxury",
    img: "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Drums on a local island",
    slug: "fulidhoo",
    tag: "Culture",
    img: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80",
  },
];

const tickerItems = [
  "175 resorts",
  "158 liveaboards",
  "843 guesthouses",
  "1,192 islands",
  "26 natural atolls",
  "year-round 28°C",
  "$35 / night from",
  "the sunny side of life",
];

export default async function Home() {
  const featuredIslands = islands.slice(0, 6);
  const tiers: (keyof typeof tierMeta)[] = ["budget", "mid", "luxury", "ultra"];
  const luxPicks = stays.filter((s) => s.tier === "luxury" || s.tier === "ultra").slice(0, 3);
  const creatorPicks = creators.filter((c) => c.platform === "youtube").slice(0, 6);

  const generated = await loadIndex();
  const featuredEntries = [
    ...generated.slice(0, 2).map((g) => ({ ...g, href: `/journal/${g.slug}`, live: true })),
    ...seedJournal.map((s) => ({ ...s, href: `/journal/${s.slug}`, live: false as const })),
  ].slice(0, 3);

  return (
    <div>
      {/* ============ HERO — FULL-WIDTH SLIDESHOW ============ */}
      <HeroSlideshow />

      {/* Fact ticker */}
      <div className="overflow-hidden border-y border-ocean/10 bg-ocean py-4 text-white">
        <div className="rail-mask flex gap-12">
          <div className="ticker-track flex shrink-0 gap-12 whitespace-nowrap">
            {[...tickerItems, ...tickerItems].map((t, i) => (
              <span key={i} className="flex items-center gap-12 text-[12px] font-semibold uppercase tracking-[0.28em] text-sand">
                {t}
                <span aria-hidden className="text-lagoon-light">◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ============ EDITORIAL INTRO ============ */}
      <section className="mx-auto max-w-[1400px] px-6 pt-24 md:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="eyebrow">A note from the editors</div>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] text-ocean md:text-5xl">
              The Maldives isn't one place. <span className="italic text-lagoon">It's 1,192.</span>
            </h2>
          </div>
          <div className="md:col-span-7 md:pl-8">
            <p className="font-display text-xl leading-relaxed text-ocean/85 md:text-2xl">
              A honeymooner's Maldives is overwater villas and sunset champagne. A backpacker's
              Maldives is a $35 guesthouse on Gulhi and a $4 tuna curry. A diver's Maldives is a
              boat at dawn and a hammerhead at 30 metres. They all share the same water.
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-muted">
              This journal keeps up with every version. Scraped from real creators, real travellers
              and a small editorial team who keep flying back. Bookmark it. It grows every week.
            </p>
          </div>
        </div>
      </section>

      {/* ============ EXPERIENCES — EDITORIAL TILES ============ */}
      <section className="mx-auto mt-24 max-w-[1400px] px-6 md:px-10">
        <SectionHeading
          eyebrow="Experiences"
          title="Why people come"
          sub="The four things every Maldives itinerary should include at least one of."
          href="/destinations"
          linkLabel="All destinations"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-4">
          {experienceImages.map((e) => (
            <article
              key={e.slug}
              className="group relative aspect-[3/4] overflow-hidden rounded-[24px] bg-ocean-deep"
            >
              <Image
                src={e.img}
                alt={e.title}
                fill
                sizes="(min-width: 768px) 25vw, 100vw"
                className="object-cover transition duration-[1200ms] group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/95 via-ocean-deep/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                <span className="w-fit rounded-full border border-white/40 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] backdrop-blur">
                  {e.tag}
                </span>
                <h3 className="font-display text-2xl font-semibold leading-tight">{e.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ============ STAYS — TIERS ============ */}
      <section className="mx-auto mt-28 max-w-[1400px] px-6 md:px-10">
        <SectionHeading
          eyebrow="Stay"
          title="Four ways to sleep in paradise"
          sub="Backpacker to ultra-luxury. The same lagoon, four very different experiences. Pick your tier."
          href="/stays"
          linkLabel="See all stays"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {tiers.map((t) => (
            <TierCard key={t} tier={t} />
          ))}
        </div>
      </section>

      {/* ============ DESTINATIONS ============ */}
      <section className="mx-auto mt-28 max-w-[1400px] px-6 md:px-10">
        <SectionHeading
          eyebrow="Destinations"
          title="Islands worth the seaplane"
          sub="Hand-picked islands our journal returns to — beautiful, welcoming, and open to the world."
          href="/destinations"
          linkLabel="All destinations"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredIslands.map((island) => (
            <IslandCard key={island.slug} island={island} />
          ))}
        </div>
      </section>

      {/* ============ FEATURE STRIP — BUDGET ============ */}
      <section className="mt-28 bg-[color:var(--sand)] py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="eyebrow text-palm">Backpacker edition</div>
              <h2 className="mt-4 font-display text-5xl font-semibold leading-[1.02] text-ocean md:text-6xl">
                The Maldives <span className="italic">from $35</span> a night.
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ocean/80">
                Since 2009, locals have been allowed to open guesthouses. It changed the country.
                Maafushi, Gulhi, Dhigurah, Thulusdhoo — the same water for a fraction of the price.
              </p>
              <Link
                href="/stays/budget"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-ocean px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-ocean-deep"
              >
                Budget stays →
              </Link>
            </div>
            <div className="md:col-span-7">
              <div className="grid grid-cols-2 gap-5">
                {stays.filter((s) => s.tier === "budget").slice(0, 4).map((s, i) => (
                  <div
                    key={s.slug}
                    className={`overflow-hidden rounded-[24px] bg-white shadow-[0_1px_0_rgba(10,42,51,0.05)] ${i % 2 === 0 ? "md:translate-y-8" : ""}`}
                  >
                    <div className="relative aspect-[5/4] overflow-hidden">
                      <Image src={s.image} alt={s.name} fill sizes="50vw" className="object-cover" />
                    </div>
                    <div className="p-4">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-lagoon">
                        from {s.priceFrom}
                      </div>
                      <div className="mt-1 font-display text-base font-semibold text-ocean">{s.name}</div>
                      <div className="text-[12px] text-muted">{s.island}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURE STRIP — LUXURY ============ */}
      <section className="relative overflow-hidden bg-ocean-deep py-28 text-white">
        <Image
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2600&q=85"
          alt=""
          fill
          sizes="100vw"
          className="absolute inset-0 object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/80 via-ocean-deep/70 to-ocean-deep" />
        <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
          <SectionHeading
            eyebrow="Luxury & ultra-luxury"
            title="Water villas. Private islands. Once in a lifetime."
            sub="The best hotels on earth all happen to be in one country. From Conrad's undersea restaurant to Soneva's retractable roofs — these are the places people book years out."
            href="/stays/ultra"
            linkLabel="Ultra-luxury picks"
            onDark
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {luxPicks.map((stay) => (
              <StayCard key={stay.slug} stay={stay} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ CREATOR VOICES (YouTube) ============ */}
      <section className="mx-auto mt-28 max-w-[1400px] px-6 md:px-10">
        <SectionHeading
          eyebrow="Voices"
          title="What YouTube says about the Maldives"
          sub="We scrape new Maldives videos every week. The honest ones, from real travellers — here are the picks worth your evening."
          href="/creators"
          linkLabel="All voices"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {creatorPicks.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      </section>

      {/* ============ DISCOVER MALDIVES STATS — VM-style ============ */}
      <section className="mt-28 bg-ocean py-24 text-white">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="grid gap-12 md:grid-cols-12 md:items-end">
            <div className="md:col-span-5">
              <div className="eyebrow text-lagoon-light">Discover the Maldives</div>
              <h2 className="mt-4 font-display text-5xl font-semibold leading-[1.02] md:text-6xl">
                A country made <span className="italic text-sand">of water</span>.
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/80">
                99% of the Maldives is ocean. The rest is islands barely above sea level —
                linked by ferries, speedboats and seaplanes. Here's what it's made of.
              </p>
            </div>
            <div className="md:col-span-7">
              <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
                {[
                  { k: "1,192", v: "islands" },
                  { k: "26", v: "natural atolls" },
                  { k: "175", v: "resorts" },
                  { k: "843", v: "guesthouses" },
                  { k: "158", v: "liveaboards" },
                  { k: "28°C", v: "year-round" },
                  { k: "99%", v: "ocean" },
                  { k: "1.2M", v: "annual visitors" },
                ].map((s) => (
                  <div key={s.v}>
                    <div className="font-display text-5xl font-semibold text-sand">{s.k}</div>
                    <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/70">
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ JOURNAL — SELF-WRITING ============ */}
      <section className="mx-auto mt-28 max-w-[1400px] px-6 md:px-10">
        <SectionHeading
          eyebrow="Journal — updates daily"
          title="A journal that writes itself"
          sub="One fresh Maldives article every day at 04:00 UTC, topic picked, researched and written overnight. Evergreen field notes sit alongside it."
          href="/journal"
          linkLabel="Open journal"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {featuredEntries.map((entry, i) => (
            <Link
              key={entry.slug}
              href={entry.href}
              className={`group overflow-hidden rounded-[24px] border border-ocean/10 bg-surface shadow-[0_1px_0_rgba(10,42,51,0.05)] transition hover:-translate-y-1 hover:shadow-xl hover:shadow-ocean/10 ${i === 0 ? "md:-translate-y-4" : ""}`}
            >
              <div className="relative aspect-[5/3] overflow-hidden">
                <Image
                  src={entry.image}
                  alt={entry.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition duration-[1200ms] group-hover:scale-[1.05]"
                />
                {entry.live && (
                  <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-lagoon px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                    Today
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-lagoon">
                  <span>{entry.date}</span>
                  <span>·</span>
                  <span>{entry.readTime}</span>
                </div>
                <h3 className="mt-3 font-display text-[22px] font-semibold text-ocean">{entry.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-muted">{entry.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ NEWSLETTER CTA ============ */}
      <section className="mx-auto mt-28 max-w-[1400px] px-6 pb-24 md:px-10">
        <div className="relative overflow-hidden rounded-[36px] bg-ocean p-10 text-white md:p-16">
          <div className="relative z-10 grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Logo mark="white" showWord={false} />
              <div className="mt-6 eyebrow text-sand">The Navigator newsletter</div>
              <h3 className="mt-3 font-display text-4xl font-semibold leading-[1.02] md:text-5xl">
                One email a month. <span className="italic text-sand">Ocean only.</span>
              </h3>
              <p className="mt-4 max-w-md text-[15px] text-white/80">
                The best new guesthouses, resort deals, dive sightings and creator videos —
                delivered straight from the reef.
              </p>
            </div>
            <form className="flex flex-col gap-3 md:col-span-5">
              <label className="text-[10px] font-semibold uppercase tracking-[0.26em] text-sand">
                Your email
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  placeholder="you@paradise.mv"
                  className="flex-1 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm text-white placeholder-white/60 outline-none backdrop-blur focus:border-sand"
                />
                <button
                  type="submit"
                  className="rounded-full bg-sand px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.22em] text-ocean transition hover:bg-white"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
          <div className="pointer-events-none absolute -right-20 -top-24 h-96 w-96 rounded-full bg-lagoon/30 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-sand/25 blur-3xl" aria-hidden />
        </div>
      </section>
    </div>
  );
}
