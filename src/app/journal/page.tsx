import Image from "next/image";
import Link from "next/link";
import { journal as seedJournal } from "@/data/journal";
import { loadIndex, blobConfigured } from "@/lib/journalStore";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata = {
  title: "Journal — Maldives Navigator",
  description:
    "A self-writing journal of the Maldives. One fresh article every day — scraped topics, real details, a different story from the reef.",
};

export const revalidate = 600;

export default async function JournalPage() {
  const generated = await loadIndex();
  const entries = [
    ...generated.map((g) => ({
      slug: g.slug,
      title: g.title,
      excerpt: g.excerpt,
      date: g.date,
      readTime: g.readTime,
      image: g.image,
      tags: g.tags,
      href: `/journal/${g.slug}`,
      live: true,
    })),
    ...seedJournal.map((s) => ({
      slug: s.slug,
      title: s.title,
      excerpt: s.excerpt,
      date: s.date,
      readTime: s.readTime,
      image: s.image,
      tags: s.tags,
      href: `/journal/${s.slug}`,
      live: false,
    })),
  ];

  const today = new Date().toISOString().slice(0, 10);
  const hasTodayArticle = generated.some((g) => g.date === today);

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10">
      <SectionHeading
        eyebrow="Journal — self-writing"
        title="Field notes from the reef"
        sub="One fresh article every day. Today's topic is picked, researched and written automatically overnight — we only edit the ones that really deserve polish."
      />

      <div className="mt-6 flex flex-wrap items-center gap-2 text-[12px] text-muted">
        <span className="inline-flex items-center gap-2 rounded-full bg-ocean/5 px-3 py-1 font-semibold text-ocean">
          <span className={`inline-block h-2 w-2 rounded-full ${hasTodayArticle ? "bg-lagoon animate-pulse" : "bg-lagoon/40"}`} />
          {hasTodayArticle ? "Today's dispatch live" : "Next dispatch overnight · 04:00 UTC"}
        </span>
        <span>·</span>
        <span>{generated.length} auto-generated</span>
        <span>·</span>
        <span>{seedJournal.length} evergreen</span>
        {!blobConfigured() && (
          <span className="rounded-full bg-lagoon/10 px-3 py-1 text-[11px] font-semibold text-ocean">
            Daily generator not yet configured — see README
          </span>
        )}
      </div>

      <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <Link
            key={entry.slug}
            href={entry.href}
            className="group overflow-hidden rounded-[24px] border border-ocean/10 bg-surface shadow-[0_1px_0_rgba(10,42,51,0.05)] transition hover:-translate-y-1 hover:shadow-xl hover:shadow-ocean/10"
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
              <div className="mt-5 flex flex-wrap gap-1.5">
                {entry.tags.map((t) => (
                  <span key={t} className="rounded-full bg-ocean/5 px-2.5 py-1 text-[11px] font-medium text-ocean">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
