// Beehiiv newsletter inline form. Replace REPLACE_ME with the real
// publication ID once the Beehiiv account is provisioned.
//
// Variants:
//   compact  — single-row email + button (hero, footer)
//   default  — stacked with caption (page sections)
//   leadmag  — full lead-magnet pitch w/ headline + bullets

type Variant = "compact" | "default" | "leadmag";

type Props = {
  variant?: Variant;
  publicationId?: string; // optional override per placement
  className?: string;
};

// Brief §11 — Beehiiv embed. The publication ID is read from
// NEXT_PUBLIC_BEEHIIV_PUB_ID at build time so we never need to redeploy
// just to swap it. Falls back to "REPLACE_ME" so the markup still
// renders during local dev before the env var is set; submitting the
// form in that state hits a 404 on Beehiiv (intentional, harmless).
const PUB_ID =
  process.env.NEXT_PUBLIC_BEEHIIV_PUB_ID && process.env.NEXT_PUBLIC_BEEHIIV_PUB_ID.length > 0
    ? process.env.NEXT_PUBLIC_BEEHIIV_PUB_ID
    : "REPLACE_ME";

export function BeehiivEmbed({
  variant = "default",
  publicationId = PUB_ID,
  className = "",
}: Props) {
  const action = `https://embeds.beehiiv.com/${encodeURIComponent(
    publicationId
  )}/subscribe`;

  if (variant === "compact") {
    return (
      <form
        action={action}
        method="post"
        target="_blank"
        rel="noopener"
        className={`flex w-full max-w-md flex-col gap-2 sm:flex-row ${className}`}
      >
        <label htmlFor="beehiiv-compact-email" className="sr-only">
          Email address
        </label>
        <input
          id="beehiiv-compact-email"
          type="email"
          name="email"
          required
          placeholder="you@email.com"
          className="flex-1 rounded-full border border-black/10 bg-white px-4 py-2.5 text-[13px] text-foreground placeholder:text-muted/70 focus:border-ocean focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-full bg-ocean px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-ocean-deep"
        >
          Subscribe →
        </button>
      </form>
    );
  }

  if (variant === "leadmag") {
    return (
      <div className={`max-w-xl ${className}`}>
        <p className="eyebrow text-lagoon">Free guide</p>
        <h3 className="font-display text-3xl text-foreground md:text-4xl">
          The 8 Maldives mistakes tourists make.
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          A free 12-page PDF, sent the moment you subscribe. Edited from Malé.
        </p>
        <form
          action={action}
          method="post"
          target="_blank"
          rel="noopener"
          className="mt-6 flex flex-col gap-2 sm:flex-row"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="you@email.com"
            aria-label="Email address"
            className="flex-1 rounded-full border border-black/10 bg-white px-4 py-3 text-[14px] text-foreground placeholder:text-muted/70 focus:border-ocean focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-full bg-ocean px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-ocean-deep"
          >
            Get the PDF →
          </button>
        </form>
        <p className="mt-3 text-[12px] text-muted">
          One short letter a week. Unsubscribe in one click.
        </p>
      </div>
    );
  }

  return (
    <div className={`max-w-md ${className}`}>
      <p className="text-[14px] leading-relaxed text-muted">
        One letter a week from Malé. Honest pricing, real islands, no spam.
      </p>
      <form
        action={action}
        method="post"
        target="_blank"
        rel="noopener"
        className="mt-3 flex flex-col gap-2 sm:flex-row"
      >
        <input
          type="email"
          name="email"
          required
          placeholder="you@email.com"
          aria-label="Email address"
          className="flex-1 rounded-full border border-black/10 bg-white px-4 py-2.5 text-[13px] text-foreground placeholder:text-muted/70 focus:border-ocean focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-full bg-ocean px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-ocean-deep"
        >
          Subscribe →
        </button>
      </form>
    </div>
  );
}
