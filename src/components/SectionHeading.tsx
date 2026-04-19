import Link from "next/link";

export function SectionHeading({
  eyebrow,
  title,
  sub,
  href,
  linkLabel,
  align = "left",
  onDark = false,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  href?: string;
  linkLabel?: string;
  align?: "left" | "center";
  onDark?: boolean;
}) {
  const isCenter = align === "center";
  return (
    <div className={`flex flex-col gap-4 ${isCenter ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"}`}>
      <div className={isCenter ? "max-w-3xl" : ""}>
        <div className={`eyebrow ${onDark ? "text-lagoon-light" : ""}`}>{eyebrow}</div>
        <h2 className={`mt-3 font-display text-4xl font-semibold leading-[1.05] md:text-5xl ${onDark ? "text-white" : "text-ocean"}`}>
          {title}
        </h2>
        {sub && (
          <p className={`mt-4 max-w-2xl text-[15px] leading-relaxed ${onDark ? "text-white/75" : "text-muted"} ${isCenter ? "mx-auto" : ""}`}>
            {sub}
          </p>
        )}
      </div>
      {href && linkLabel && !isCenter && (
        <Link
          href={href}
          className={`inline-flex w-fit items-center gap-2 border-b pb-1 text-[12px] font-semibold uppercase tracking-[0.26em] transition ${onDark ? "border-white/40 text-white hover:border-white" : "border-ocean/40 text-ocean hover:border-ocean"}`}
        >
          {linkLabel}
          <span aria-hidden>→</span>
        </Link>
      )}
    </div>
  );
}
