import type { Metadata } from "next";
import Image from "next/image";
import { BeehiivEmbed } from "@/components/BeehiivEmbed";

export const metadata: Metadata = {
  title: "Subscribe to the Journal",
  description:
    "One letter a week from Malé. Honest pricing, real islands, no spam. Get the free 12-page Maldives mistakes PDF when you subscribe.",
  alternates: { canonical: "/subscribe" },
};

const sample = [
  "What you actually pay at a $35/night guesthouse versus the listed rate.",
  "Why the seaplane transfer to a luxury resort is sometimes longer than the flight to Malé.",
  "How to tell the difference between a real local-island guesthouse and a resort overflow.",
];

const testimonials = [
  {
    quote:
      "Finally — Maldives writing that doesn't read like a travel-agent press release.",
    name: "Aisha R.",
    where: "Diver, London",
  },
  {
    quote:
      "The honest pricing alone saved me a confused afternoon comparing Booking results.",
    name: "Tom K.",
    where: "Backpacker, Berlin",
  },
];

export default function SubscribePage() {
  return (
    <article className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-24">
      <div className="grid items-start gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <Image
            src="https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1400&q=85"
            alt="Aerial view of a Maldives atoll at first light."
            width={900}
            height={1100}
            priority
            className="aspect-[4/5] w-full rounded-2xl object-cover"
          />
          <p className="mt-3 text-[12px] uppercase tracking-[0.18em] text-muted">
            North Malé Atoll · 2026
          </p>
        </div>

        <div>
          <BeehiivEmbed variant="leadmag" />

          <section className="mt-12 space-y-3 text-[15px] leading-relaxed text-foreground/85">
            <h2 className="font-display text-2xl text-foreground">
              What&apos;s in a sample issue
            </h2>
            <ul className="space-y-2 pl-5 [list-style-type:disc] marker:text-lagoon">
              {sample.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            {/* TODO: replace # with link to a Beehiiv-archived sample issue
                once the publication has at least one issue published. */}
            <p className="pt-2">
              <a
                href="/journal"
                className="text-[13px] font-semibold uppercase tracking-[0.18em] text-ocean underline-offset-2 hover:underline"
              >
                Read a sample issue →
              </a>
            </p>
          </section>

          <section className="mt-12 space-y-6">
            <h2 className="font-display text-2xl text-foreground">
              From other readers
            </h2>
            {testimonials.map((t) => (
              <blockquote
                key={t.name}
                className="border-l-2 border-lagoon pl-4 text-[15px] italic text-foreground/85"
              >
                &ldquo;{t.quote}&rdquo;
                <footer className="mt-2 text-[12px] not-italic uppercase tracking-[0.18em] text-muted">
                  {t.name} · {t.where}
                </footer>
              </blockquote>
            ))}
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted/70">
              Placeholder testimonials — replace before public launch.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
