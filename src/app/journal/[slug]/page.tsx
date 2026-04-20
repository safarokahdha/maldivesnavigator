import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { journal as seedJournal } from "@/data/journal";
import { loadArticle, loadIndex } from "@/lib/journalStore";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const gen = await loadArticle(slug);
  const seed = seedJournal.find((s) => s.slug === slug);
  const entry = gen ?? seed;
  if (!entry) return {};
  return {
    title: `${entry.title} — Maldives Navigator`,
    description: entry.excerpt,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const gen = await loadArticle(slug);
  const seed = seedJournal.find((s) => s.slug === slug);
  const article = gen ?? seed;
  if (!article) notFound();

  const body = "body" in article && article.body ? (article.body as string) : article.excerpt;
  const recent = (await loadIndex()).filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <article>
      <section className="relative">
        <div className="relative h-[70vh] min-h-[520px] w-full overflow-hidden">
          <Image src={article.image} alt={article.title} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep via-ocean-deep/75 to-ocean-deep/20" />
        </div>
        <div className="absolute inset-x-0 bottom-0 px-6 pb-14 md:px-10 md:pb-20">
          <div className="mx-auto max-w-[1100px] text-white">
            <Link href="/journal" className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80 hover:underline">
              ← Back to journal
            </Link>
            <div className="mt-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-lagoon-light">
              <span>{article.date}</span>
              <span>·</span>
              <span>{article.readTime}</span>
              <span>·</span>
              <span>By Maldives Navigator</span>
            </div>
            <h1 className="mt-4 max-w-5xl font-display text-5xl font-semibold leading-[1.02] drop-shadow-lg md:text-7xl">
              {article.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/90">{article.excerpt}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-[760px] px-6 md:px-10">
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted">
          {article.tags.map((t) => (
            <span key={t} className="rounded-full bg-ocean/5 px-2.5 py-1 font-semibold text-ocean">
              {t}
            </span>
          ))}
        </div>
        <div className="prose prose-lg mt-10 max-w-none font-display text-[19px] leading-[1.75] text-ocean [&_p]:mt-6 [&_p:first-child]:mt-0">
          {body.split(/\n\n+/).map((para: string, idx: number) => (
            <p key={idx}>{para.trim()}</p>
          ))}
        </div>
        <div className="mt-14 rounded-[22px] bg-ocean/5 p-6 text-[13px] text-muted">
          <strong className="text-ocean">By Maldives Navigator</strong> — a field note from our editorial journal. Always double-check current prices and availability before booking.
        </div>
      </section>

      {recent.length > 0 && (
        <section className="mx-auto mt-24 max-w-[1200px] px-6 pb-24 md:px-10">
          <div className="eyebrow">More from the journal</div>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {recent.map((r) => (
              <Link
                key={r.slug}
                href={`/journal/${r.slug}`}
                className="group overflow-hidden rounded-[22px] border border-ocean/10 bg-white transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[5/3] overflow-hidden">
                  <Image src={r.image} alt={r.title} fill sizes="33vw" className="object-cover transition group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-lagoon">{r.date}</div>
                  <div className="mt-1 font-display text-lg font-semibold text-ocean">{r.title}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
