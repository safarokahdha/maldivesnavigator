import type { ReviewSummary } from "@/lib/reviews";
import type { StayBooking } from "@/data/stayDetails";

const SOURCE_LABEL: Record<string, string> = {
  google: "Google",
  booking: "Booking.com",
  agoda: "Agoda",
  tripadvisor: "Tripadvisor",
  owner: "Owner",
  manual: "curated",
};

function Stars({ value }: { value: number }) {
  const v = Math.max(0, Math.min(5, value));
  const full = Math.floor(v);
  const half = v - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span aria-label={`${v.toFixed(1)} of 5`} className="inline-flex">
      {"★".repeat(full)}
      {half && "☆"}
      {"☆".repeat(empty)}
    </span>
  );
}

function Score10({ score, label }: { score: number; label: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="font-display text-3xl text-ocean tabular-nums">
        {score.toFixed(1)}
      </span>
      <span className="text-[12px] uppercase tracking-[0.18em] text-muted">
        / 10 · {label}
      </span>
    </div>
  );
}

export function Reviews({
  summary,
  booking,
  bookingUrl,
  agodaUrl,
}: {
  summary: ReviewSummary | null;
  booking?: StayBooking;
  bookingUrl: string | null;
  agodaUrl: string | null;
}) {
  const showLiveSummary = summary !== null;
  const showAggregateScores =
    !showLiveSummary &&
    (booking?.bookingRating !== undefined || booking?.agodaRating !== undefined);

  return (
    <div className="space-y-8">
      {showLiveSummary && summary && (
        <div>
          <div className="flex flex-wrap items-baseline gap-3">
            {summary.rating !== null && (
              <span className="font-display text-3xl text-ocean tabular-nums">
                {summary.rating.toFixed(1)}
              </span>
            )}
            {summary.rating !== null && (
              <span className="text-coral text-xl tracking-widest">
                <Stars value={summary.rating} />
              </span>
            )}
            {summary.count > 0 && (
              <span className="text-[13px] text-muted">
                {summary.count} review{summary.count === 1 ? "" : "s"}
              </span>
            )}
            <span className="text-[11px] uppercase tracking-[0.18em] text-muted/70">
              via {SOURCE_LABEL[summary.source] ?? summary.source}
            </span>
          </div>

          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {summary.reviews.slice(0, 6).map((r, i) => (
              <li
                key={i}
                className="rounded-2xl border border-ocean/10 bg-shore p-5"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-coral text-sm tracking-widest">
                    <Stars value={r.rating} />
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-muted/70">
                    {SOURCE_LABEL[r.source] ?? r.source}
                  </span>
                </div>
                <p className="mt-3 text-[14.5px] leading-relaxed text-foreground/85">
                  “{r.text.length > 320 ? r.text.slice(0, 317).trimEnd() + "…" : r.text}”
                </p>
                <p className="mt-3 text-[12px] text-muted">
                  {r.author ?? "Guest"}
                  {r.date && ` · ${r.date}`}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showAggregateScores && booking && (
        <div className="grid gap-4 md:grid-cols-2">
          {booking.bookingRating !== undefined && (
            <div className="rounded-2xl border border-ocean/10 bg-shore p-5">
              <Score10 score={booking.bookingRating} label="Booking.com" />
              {booking.bookingReviewCount && (
                <p className="mt-1 text-[13px] text-muted">
                  {booking.bookingReviewCount.toLocaleString()} guest review{booking.bookingReviewCount === 1 ? "" : "s"}
                </p>
              )}
            </div>
          )}
          {booking.agodaRating !== undefined && (
            <div className="rounded-2xl border border-ocean/10 bg-shore p-5">
              <Score10 score={booking.agodaRating} label="Agoda" />
              {booking.agodaReviewCount && (
                <p className="mt-1 text-[13px] text-muted">
                  {booking.agodaReviewCount.toLocaleString()} guest review{booking.agodaReviewCount === 1 ? "" : "s"}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {(bookingUrl || agodaUrl) && (
        <div className="rounded-2xl border border-ocean/10 bg-surface p-6">
          <h3 className="font-display text-[20px] text-ocean">
            Read full guest reviews
          </h3>
          <p className="mt-2 text-[14px] leading-relaxed text-muted">
            We don&apos;t mirror reviews here — both sites publish thousands of
            verified ones in real time. Click through to read what guests
            actually wrote.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {bookingUrl && (
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-ocean px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-lagoon"
              >
                Reviews on Booking.com →
              </a>
            )}
            {agodaUrl && (
              <a
                href={agodaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-ocean px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-ocean transition hover:bg-ocean hover:text-white"
              >
                Reviews on Agoda →
              </a>
            )}
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-ocean/15 bg-shore p-6">
        <h3 className="font-display text-[20px] text-ocean">
          Why book through Maldives Navigator
        </h3>
        <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-foreground/85">
          <li>
            <strong>Same price, no extra fees.</strong> Our partner links route
            through Booking.com and Agoda directly — your rate is identical to
            booking on their site.
          </li>
          <li>
            <strong>Locally edited.</strong> Every property here has an
            editorial take written by a Maldivian editor, not a press kit
            rewrite. We tell you who it&apos;s for and who it isn&apos;t.
          </li>
          <li>
            <strong>Removed if it fails.</strong> If a property gets bad
            reports from guests we sent there, we de-list it. We&apos;d rather
            lose the commission than lose your trust.
          </li>
          <li>
            <strong>One question, one answer.</strong> Email{" "}
            <a className="underline" href="mailto:hello@maldivesnavigator.com">
              hello@maldivesnavigator.com
            </a>{" "}
            for direct help with the trip — not a chatbot, not a queue.
          </li>
        </ul>
      </div>
    </div>
  );
}
