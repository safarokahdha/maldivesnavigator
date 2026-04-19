import Image from "next/image";
import { journal } from "@/data/journal";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata = {
  title: "Journal — Maldives Compass",
  description: "Stories, guides and field notes from across the 1,192 islands.",
};

export default function JournalPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10">
      <SectionHeading
        eyebrow="Journal"
        title="Field notes from the reef"
        sub="First-hand dispatches, budget breakdowns, dive logs and honest resort reviews."
      />
      <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {journal.map((entry) => (
          <article
            key={entry.slug}
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
          </article>
        ))}
      </div>
    </div>
  );
}
