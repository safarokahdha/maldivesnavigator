import type { ReviewSummary } from "@/lib/reviews";

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

export function Reviews({ summary }: { summary: ReviewSummary }) {
  const visible = summary.reviews.slice(0, 6);

  return (
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
        {visible.map((r, i) => (
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
  );
}
