import type { Metadata } from "next";
import { RemovalForm } from "./removal-form";

export const metadata: Metadata = {
  title: "Property listing removal — Maldives Navigator",
  description:
    "Property owners can request removal of any listing on Maldives Navigator. Verified requests are honoured within 24 hours.",
  alternates: { canonical: "/legal/property-removal" },
  robots: { index: false, follow: true },
};

export default function PropertyRemovalPage() {
  return (
    <article className="mx-auto max-w-2xl px-6 py-16 md:px-10 md:py-24">
      <p className="eyebrow text-lagoon">Legal</p>
      <h1 className="mt-3 font-display text-4xl leading-tight tracking-tight text-foreground md:text-5xl">
        Property listing removal
      </h1>
      <p className="mt-4 text-[15px] leading-relaxed text-muted">
        We list properties in good faith, with original editorial. If you own
        or manage a property featured here and want it removed, send the
        request below. We honour verified requests within 24 hours, no
        questions asked.
      </p>

      <div className="mt-10 rounded-2xl border border-ocean/10 bg-shore p-6">
        <RemovalForm />
      </div>

      <p className="mt-8 text-[12px] text-muted">
        Prefer email?{" "}
        <a className="underline" href="mailto:hello@maldivesnavigator.com?subject=Property%20listing%20removal%20request">
          hello@maldivesnavigator.com
        </a>{" "}
        — please mention the property name and your role.
      </p>
    </article>
  );
}
