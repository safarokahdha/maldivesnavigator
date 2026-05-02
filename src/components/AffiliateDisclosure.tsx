import Link from "next/link";

type Props = { className?: string; long?: boolean };

export function AffiliateDisclosure({ className = "", long = false }: Props) {
  if (long) {
    return (
      <p className={`text-[12px] leading-relaxed text-muted ${className}`}>
        Maldives Navigator earns a commission on bookings made through Booking.com,
        Agoda, and partner links on this site. The price you pay does not change.
        Sponsored content is labelled explicitly. Read the full{" "}
        <Link
          href="/legal/disclosure"
          className="underline underline-offset-2 hover:text-ocean"
        >
          affiliate disclosure
        </Link>
        .
      </p>
    );
  }
  return (
    <p className={`text-[11px] uppercase tracking-[0.18em] text-muted ${className}`}>
      We earn a commission on bookings made through these links. The price you
      pay does not change.
    </p>
  );
}
