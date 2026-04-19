import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { journal as seedJournal } from "@/data/journal";
import { loadArticle, loadIndex } from "@/lib/journalStore";

export const revalidate = 600;

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
  const generated = "generated" in article ? Boolean(article.generated) : false;
  const recent = (await loadIndex()).filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <article>
      <section className="relative">
        <div className="relative h-[60vh] min-h-[440px] w-full overflow-hidden">
          <Image src={article.image} alt={article.title} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep via-ocean-deep/40 to-transparent" />
        </div>
        <div className="mx-auto -mt-44 max-w-[900px] px-6 text-white md:px-10">
          <Link href="/journal" className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sand hover:underline">
            ← Back to journal
          </Link>
          <div className="mt-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-lagoon-light">
            <span>{article.date}</span>
            <span>·</span>
            <span>{article.readTime}</span>
            {generated && (
              <>
                <span>·</span>
                <span className="rounded-full bg-lagoon px-2.5 py-1 text-[10px] text-white">
                  Auto-written today
                </span>
              </>
            )}
          </div>
          <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.02] md:text-7xl">
            {article.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">{article.excerpt}</p>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-[760px] px-6 md:px-10">
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
          <strong className="text-ocean">By {article.author}</strong> — {generated
            ? "written automatically overnight by our daily dispatch generator. Facts and opinions reflect real Maldives travel advice; always double-check current prices before booking."
            : "an evergreen field note kept in our editorial archive."}
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
