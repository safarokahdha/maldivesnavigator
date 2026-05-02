import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of service",
  description: "Terms governing use of Maldives Navigator.",
  alternates: { canonical: "/legal/terms" },
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-24">
      <p className="eyebrow text-lagoon">Legal</p>
      <h1 className="mt-3 font-display text-4xl text-foreground md:text-5xl">
        Terms of service
      </h1>
      <p className="mt-3 text-[12px] uppercase tracking-[0.18em] text-muted">
        Last updated: TODO before public launch
      </p>

      <p className="mt-8 rounded-2xl border border-coral/30 bg-coral/5 p-4 text-[13px] text-coral">
        <strong>TODO:</strong> Replace placeholder with a finalised terms of
        service. Recommend a Termly or Iubenda template scoped to Safarokahdha
        LLC. Required before public launch.
      </p>

      <section className="prose mt-10 max-w-none space-y-5 text-[15px] leading-[1.75] text-foreground/85">
        <p>
          By using maldivesnavigator.com (&ldquo;the Site&rdquo;) you agree to
          the terms below. The Site is operated by Safarokahdha LLC.
        </p>

        <h2 className="font-display text-2xl text-foreground">Editorial content</h2>
        <p>
          All editorial content — written reviews, opinions, recommendations —
          reflects the views of the authors at the time of publication. Prices
          and availability change; we do not guarantee accuracy at the moment
          of your booking. Always confirm with the property or partner.
        </p>

        <h2 className="font-display text-2xl text-foreground">Bookings</h2>
        <p>
          Maldives Navigator does not handle reservations, payments, or
          cancellations. All bookings happen on third-party platforms
          (Booking.com, Agoda, the property&apos;s own site). Their terms
          apply.
        </p>

        <h2 className="font-display text-2xl text-foreground">Property listings</h2>
        <p>
          We list properties we believe travellers should know about. If you
          operate a property listed here and want it removed, email{" "}
          <a
            href="mailto:hello@maldivesnavigator.com"
            className="underline underline-offset-2 hover:text-ocean"
          >
            hello@maldivesnavigator.com
          </a>
          . We honour removal requests within seven days.
        </p>

        <h2 className="font-display text-2xl text-foreground">Liability</h2>
        <p>
          We are an editorial guide, not a travel agent. We are not liable for
          decisions made based on Site content. Verify important details
          (visa, weather, transfers) with primary sources.
        </p>
      </section>
    </article>
  );
}
