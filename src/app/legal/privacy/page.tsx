import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How Maldives Navigator collects, stores, and uses your data.",
  alternates: { canonical: "/legal/privacy" },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-24">
      <p className="eyebrow text-lagoon">Legal</p>
      <h1 className="mt-3 font-display text-4xl text-foreground md:text-5xl">
        Privacy policy
      </h1>
      <p className="mt-3 text-[12px] uppercase tracking-[0.18em] text-muted">
        Last updated: TODO before public launch
      </p>

      <p className="mt-8 rounded-2xl border border-coral/30 bg-coral/5 p-4 text-[13px] text-coral">
        <strong>TODO:</strong> Replace this placeholder with a GDPR-compliant
        privacy policy generated from Termly or Iubenda. Name Safarokahdha LLC
        as data controller. Required before public launch.
      </p>

      <section className="prose mt-10 max-w-none space-y-5 text-[15px] leading-[1.75] text-foreground/85">
        <p>
          Maldives Navigator (&ldquo;the Site&rdquo;) is operated by Safarokahdha
          LLC. This page explains, in plain English, what data we collect when
          you use the Site, how we use it, and your rights to access or delete
          it.
        </p>

        <h2 className="font-display text-2xl text-foreground">What we collect</h2>
        <ul className="space-y-2 pl-5 [list-style-type:disc] marker:text-lagoon">
          <li>
            <strong>Anonymous traffic data</strong> via Plausible Analytics —
            no cookies, no personal identifiers, no cross-site tracking.
          </li>
          <li>
            <strong>Email addresses</strong> when you subscribe to the
            newsletter (handled by Beehiiv) or fill out the partners form.
          </li>
          <li>
            <strong>Form submissions</strong> from the partners application
            (sent by email, not stored in a database for v1).
          </li>
        </ul>

        <h2 className="font-display text-2xl text-foreground">What we don&apos;t do</h2>
        <ul className="space-y-2 pl-5 [list-style-type:disc] marker:text-lagoon">
          <li>We don&apos;t sell your data.</li>
          <li>We don&apos;t set advertising cookies.</li>
          <li>We don&apos;t use Facebook Pixel or Google Ads tracking.</li>
        </ul>

        <h2 className="font-display text-2xl text-foreground">Affiliate links</h2>
        <p>
          When you click an outbound &ldquo;Book on Booking.com&rdquo; or
          &ldquo;Check rates on Agoda&rdquo; link, the click is routed through
          Stay22 so we can earn a commission if you book. Your data on the
          destination site (Booking.com, Agoda) is governed by their own
          privacy policies.
        </p>

        <h2 className="font-display text-2xl text-foreground">Your rights</h2>
        <p>
          Email{" "}
          <a
            href="mailto:hello@maldivesnavigator.com"
            className="underline underline-offset-2 hover:text-ocean"
          >
            hello@maldivesnavigator.com
          </a>{" "}
          to access, correct, or delete any data we hold about you. We respond
          within seven days.
        </p>
      </section>
    </article>
  );
}
