import Image from "next/image";
import Link from "next/link";
import { islands } from "@/data/islands";
import { type Tier } from "@/data/stays";
import { creators } from "@/data/creators";
import { journal as seedJournal } from "@/data/journal";
import { loadIndex } from "@/lib/journalStore";
import { HomeHero } from "@/components/HomeHero";
import { IslandCard } from "@/components/IslandCard";
import { LiteYouTube } from "@/components/LiteYouTube";
import { BeehiivEmbed } from "@/components/BeehiivEmbed";
import { TierCard } from "@/components/TierBadge";

// Refresh homepage every 10 minutes — picks up new journal posts written by
// the daily cron without forcing a full rebuild.
export const revalidate = 600;

const TIER_ORDER: Tier[] = ["backpacker", "mid", "luxury", "ultra"];

// 6 featured islands per brief §5.1 #4. Phase-1 launch list.
const FEATURED_ISLAND_SLUGS = [
  "maafushi",
  "thulusdhoo",
  "dhigurah",
  "rasdhoo",
  "fulidhoo",
  "mathiveri",
];

// Brief §5.1 #8 — 3 placeholder digital product cards. Real /shop is the
// Amazon-affiliate store (live), so these tease links route to /subscribe so
// the visitor can be notified when the digital products ship.
const SHOP_TEASE = [
  {
    slug: "backpackers-maldives",
    title: "The Backpacker's Maldives",
    blurb:
      "100-page printable PDF — guesthouses, ferries, day-trips, costs, the full $30/night playbook.",
    price: "$19",
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=85",
  },
  {
    slug: "maldives-7-days-mid",
    title: "Maldives in 7 Days · Mid-Range Plan",
    blurb:
      "Day-by-day plan for $200–500/night travellers — resorts, transfers, what to skip.",
    price: "$29",
    image:
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=900&q=85",
  },
  {
    slug: "divers-maldives",
    title: "Diver's Maldives",
    blurb:
      "Reef map, dive-site index, liveaboard comparison, manta + whale-shark season chart.",
    price: "$24",
    image:
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=900&q=85",
  },
];

function ytIdFromUrl(url: string): string | null {
  try {
    const u = new URL(url);
    return u.searchParams.get("v");
  } catch {
    return null;
  }
}

export default async function Home() {
  const featured = FEATURED_ISLAND_SLUGS
    .map((slug) => islands.find((i) => i.slug === slug))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  const generated = await loadIndex().catch(() => []);
  const journalCards = [
    ...generated.map((g) => ({
      slug: g.slug,
      title: g.title,
      excerpt: g.excerpt,
      date: g.date,
      image: g.image,
      href: `/journal/${g.slug}`,
    })),
    ...seedJournal.map((s) => ({
      slug: s.slug,
      title: s.title,
      excerpt: s.excerpt,
      date: s.date,
      image: s.image,
      href: `/journal/${s.slug}`,
    })),
  ].slice(0, 3);

  const voicePicks = creators.filter((c) => c.platform === "youtube").slice(0, 4);

  return (
    <>
      <HomeHero />

      {/* §5.1 #3 — 4 tiers row */}
      <section className="relative bg-background py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="eyebrow text-lagoon">Where to stay</p>
              <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.25rem)] leading-tight tracking-tight text-foreground">
                Four tiers. From backpacker to private island.
              </h2>
            </div>
            <Link
              href="/stays"
              className="text-[13px] font-semibold uppercase tracking-[0.18em] text-ocean transition hover:text-lagoon"
            >
              All stays →
            </Link>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {TIER_ORDER.map((t) => (
              <TierCard key={t} tier={t} />
            ))}
          </div>
        </div>
      </section>

      {/* §5.1 #4 — Featured islands grid */}
      <section className="relative bg-shore py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="eyebrow text-lagoon">Destinations</p>
              <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.25rem)] leading-tight tracking-tight text-foreground">
                Six islands to start with.
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                Local islands, dive bases, and surf hubs — each with a guide
                edited from the ground.
              </p>
            </div>
            <Link
              href="/destinations"
              className="text-[13px] font-semibold uppercase tracking-[0.18em] text-ocean transition hover:text-lagoon"
            >
              All destinations →
            </Link>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {featured.map((i) => (
              <IslandCard key={i.slug} island={i} />
            ))}
          </div>
        </div>
      </section>

      {/* §5.1 #5 — From the journal */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="eyebrow text-lagoon">From the journal</p>
              <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.25rem)] leading-tight tracking-tight text-foreground">
                Recent dispatches.
              </h2>
            </div>
            <Link
              href="/journal"
              className="text-[13px] font-semibold uppercase tracking-[0.18em] text-ocean transition hover:text-lagoon"
            >
              All articles →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {journalCards.map((j) => (
              <Link
                key={j.slug}
                href={j.href}
                className="group flex flex-col overflow-hidden rounded-3xl bg-shore transition hover:-translate-y-0.5"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={j.image}
                    alt={j.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-6">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
                    {new Date(j.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  <h3 className="mt-2 font-display text-[22px] leading-tight text-foreground">
                    {j.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-muted">
                    {j.excerpt}
                  </p>
                  <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-ocean group-hover:text-lagoon">
                    Read in journal →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* §5.1 #6 — Voices (4 YouTube creators) */}
      <section className="bg-ocean-deep py-20 text-white md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-sand/85">
                Voices
              </p>
              <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.25rem)] leading-tight tracking-tight text-white">
                Filmed by people we trust.
              </h2>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/70">
                Four creators worth your evening. Real footage, no sponsored
                resort tours.
              </p>
            </div>
            <Link
              href="/voices"
              className="text-[13px] font-semibold uppercase tracking-[0.18em] text-sand transition hover:text-lagoon-light"
            >
              All voices →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {voicePicks.map((c) => {
              const id = ytIdFromUrl(c.videoUrl);
              if (!id) return null;
              return (
                <figure key={c.id} className="space-y-4">
                  <LiteYouTube
                    id={id}
                    title={c.videoTitle}
                    poster={c.thumbnail}
                  />
                  <figcaption className="space-y-2">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-sand/80">
                      {c.name}
                    </p>
                    <p className="text-[15px] leading-relaxed text-white/85">
                      {c.opinion}
                    </p>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      {/* §5.1 #7 — Newsletter / lead magnet */}
      <section className="relative overflow-hidden bg-shore py-24 md:py-32">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-6 md:grid-cols-2 md:px-10">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl">
            <Image
              src="https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=1400&q=85"
              alt="Maldives lagoon at dusk."
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <BeehiivEmbed variant="leadmag" />
        </div>
      </section>

      {/* §5.1 #8 — Shop tease (3 placeholder digital products) */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="eyebrow text-lagoon">In the shop · coming soon</p>
              <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.25rem)] leading-tight tracking-tight text-foreground">
                Printable guides.
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                Three downloadable plans built for the way real travellers move
                here. Get notified when each lands.
              </p>
            </div>
            <Link
              href="/subscribe"
              className="text-[13px] font-semibold uppercase tracking-[0.18em] text-ocean transition hover:text-lagoon"
            >
              Get notified →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {SHOP_TEASE.map((p) => (
              <Link
                key={p.slug}
                href="/subscribe"
                className="group flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-white transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-ocean/10"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-ocean">
                    {p.price}
                  </div>
                  <div className="absolute left-3 top-3 rounded-full bg-coral/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                    Coming soon
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-[22px] leading-tight text-foreground">
                    {p.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[14px] leading-relaxed text-muted">
                    {p.blurb}
                  </p>
                  <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-ocean group-hover:text-lagoon">
                    Get notified →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
