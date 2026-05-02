import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Maldives Navigator exists, who runs it, and what it refuses to cover.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-24">
      <p className="eyebrow text-lagoon">About</p>

      <h1 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight text-foreground md:text-6xl">
        I&apos;m Mohamed. I&apos;m Maldivian. I built this guide because the
        existing English-language coverage of my country misses everything
        that makes it interesting beyond the resort brochures.
      </h1>

      <section className="mt-12 space-y-5 text-[16px] leading-[1.75] text-foreground/85">
        <h2 className="font-display text-2xl text-foreground">The mission</h2>
        <p>
          The Maldives is 1,192 islands across 26 natural atolls. Most of
          what travellers read in English only describes about thirty of
          them — the resorts. This site is the rest of the picture: the
          local islands, the budget guesthouses, the dive operators, the
          surf, the food, the parts of the country I grew up around.
        </p>
        <p>
          It is opinionated. Every stay listed is named, with real prices,
          and an editorial take written by a human who has either stayed
          there, knows it, or knows someone who has. We don&apos;t recycle
          press kits.
        </p>
        <p>
          It refuses, on principle, to do three things: sell commodity
          bookings, accept fake reviews, or rank by SEO spam. If a stay
          shows up here, it&apos;s because we think it&apos;s worth showing
          up here.
        </p>
      </section>

      <section className="mt-12 space-y-5 text-[16px] leading-[1.75] text-foreground/85">
        <h2 className="font-display text-2xl text-foreground">How it&apos;s funded</h2>
        <p>
          Today, the site earns money in one way: small commissions on
          accommodation bookings made through partner links (Booking.com,
          Agoda, etc.). The price you pay does not change. Going forward,
          we&apos;ll add three more revenue streams — paid listings for
          guesthouses and operators, sponsored editorial (always labelled),
          and digital products like printable guides. Each will be
          disclosed plainly.
        </p>
      </section>

      <section className="mt-12 space-y-3 text-[16px] leading-[1.75] text-foreground/85">
        <h2 className="font-display text-2xl text-foreground">Editorial standards</h2>
        <ul className="space-y-2 pl-5 [list-style-type:disc] marker:text-lagoon">
          <li>Prices shown — always.</li>
          <li>Sponsorships labelled — always.</li>
          <li>On-the-ground reporting — always.</li>
          <li>No fake &ldquo;verified&rdquo; badges. Verification means a real visit.</li>
          <li>Property removal requests honoured within seven days.</li>
        </ul>
      </section>

      <section id="contact" className="mt-12 space-y-3 text-[16px] leading-[1.75] text-foreground/85">
        <h2 className="font-display text-2xl text-foreground">Contact</h2>
        <p>
          Email{" "}
          <a
            href="mailto:hello@maldivesnavigator.com"
            className="underline underline-offset-2 hover:text-ocean"
          >
            hello@maldivesnavigator.com
          </a>{" "}
          for editorial, listings, partnerships, or anything press-related.
        </p>
        <p>
          Find us on{" "}
          <Link href="https://instagram.com/maldivesnavigator" target="_blank" className="underline underline-offset-2 hover:text-ocean">
            Instagram
          </Link>
          ,{" "}
          <Link href="https://pinterest.com/maldivesnavigator" target="_blank" className="underline underline-offset-2 hover:text-ocean">
            Pinterest
          </Link>
          , and{" "}
          <Link href="https://youtube.com/@maldivesnavigator" target="_blank" className="underline underline-offset-2 hover:text-ocean">
            YouTube
          </Link>
          .
        </p>
      </section>

      <p className="mt-16 border-t border-black/5 pt-6 text-[12px] uppercase tracking-[0.18em] text-muted">
        Maldives Navigator is published by Safarokahdha LLC, edited from Malé.
      </p>
    </article>
  );
}
