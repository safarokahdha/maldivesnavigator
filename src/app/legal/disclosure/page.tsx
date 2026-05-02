import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate disclosure",
  description:
    "How Maldives Navigator earns commissions on bookings, and why the price you pay does not change.",
  alternates: { canonical: "/legal/disclosure" },
};

export default function DisclosurePage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-24">
      <p className="eyebrow text-lagoon">Legal</p>
      <h1 className="mt-3 font-display text-4xl text-foreground md:text-5xl">
        Affiliate disclosure
      </h1>

      <section className="mt-10 space-y-5 text-[16px] leading-[1.75] text-foreground/85">
        <p>
          Maldives Navigator earns a commission when you book accommodation
          through links on this site. We work with Stay22, which routes
          outbound clicks to Booking.com, Agoda, and other booking partners.
          The price you pay does not change.
        </p>

        <p>
          Where you see a &ldquo;Book on Booking.com,&rdquo; &ldquo;Check rates
          on Agoda,&rdquo; or similar button, that link is affiliate-tracked.
          Where you see a &ldquo;Visit official site&rdquo; link, that link
          goes directly to the property and earns us nothing — included so
          you can compare.
        </p>

        <h2 className="font-display text-2xl text-foreground">Sponsored content</h2>
        <p>
          Some pages and listings on this site are sponsored. Sponsored
          content is always clearly labelled at the top of the page or post.
          Editorial reviews — the opinionated paragraph on each stay page —
          are never paid for. Sponsorship buys placement; it does not buy our
          opinion.
        </p>

        <h2 className="font-display text-2xl text-foreground">Listings &amp; verification</h2>
        <p>
          Properties pay an annual fee for &ldquo;Verified&rdquo; or
          &ldquo;Featured&rdquo; placement (see{" "}
          <a href="/partners" className="underline underline-offset-2 hover:text-ocean">
            Partners
          </a>
          ). Free listings appear without payment. A &ldquo;Verified&rdquo;
          badge means the property has been visited or vetted by the editor —
          not that the listing is paid for.
        </p>

        <h2 className="font-display text-2xl text-foreground">Why we disclose this</h2>
        <p>
          Trustworthy curation is the entire product. If you can&apos;t trust
          how the site is funded, you can&apos;t trust what it tells you to
          book. Honest disclosure is part of the editorial standard.
        </p>

        <p>
          Questions? Email{" "}
          <a
            href="mailto:hello@maldivesnavigator.com"
            className="underline underline-offset-2 hover:text-ocean"
          >
            hello@maldivesnavigator.com
          </a>
          .
        </p>
      </section>
    </article>
  );
}
