import Image from "next/image";
import type { Creator } from "@/data/creators";

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden>
    <path d="M23.5 6.2s-.23-1.64-.95-2.36c-.91-.95-1.93-.96-2.4-1.02C16.8 2.5 12 2.5 12 2.5s-4.8 0-8.15.32c-.47.06-1.49.07-2.4 1.02C.73 4.56.5 6.2.5 6.2S.27 8.13.27 10.06v1.88c0 1.93.23 3.86.23 3.86s.23 1.64.95 2.36c.91.95 2.11.92 2.65 1.02 1.92.18 8.15.24 8.15.24s4.8-.01 8.15-.33c.47-.06 1.49-.07 2.4-1.02.72-.72.95-2.36.95-2.36s.23-1.93.23-3.86v-1.88c0-1.93-.23-3.86-.23-3.86zM9.75 14.58V7.42L15.82 11l-6.07 3.58z" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden>
    <path d="M19.5 8.3a6.8 6.8 0 0 1-4-1.3v7.3a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.1v3a2.7 2.7 0 1 0 1.9 2.6V2h2.9a4 4 0 0 0 4 4v2.3z" />
  </svg>
);

export function CreatorCard({ creator }: { creator: Creator }) {
  const isYouTube = creator.platform === "youtube";

  return (
    <a
      href={creator.videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-ocean/10 bg-surface shadow-[0_1px_0_rgba(10,42,51,0.05)] transition hover:-translate-y-1 hover:shadow-xl hover:shadow-ocean/10"
    >
      {creator.thumbnail && (
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={creator.thumbnail}
            alt={creator.videoTitle}
            fill
            sizes="(min-width: 1024px) 33vw, 50vw"
            className="object-cover transition duration-[1200ms] group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/70 via-transparent to-transparent" />
          <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-coral">
            <YouTubeIcon />
            YouTube
          </div>
          <div className="absolute bottom-3 right-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/95 shadow-lg">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="#0a3b4a">
              <path d="M8 5v14l11-7L8 5z" />
            </svg>
          </div>
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        {!creator.thumbnail && (
          <div className="mb-3 flex items-center justify-between">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] ${
                isYouTube ? "bg-coral/10 text-coral" : "bg-ocean text-white"
              }`}
            >
              {isYouTube ? <YouTubeIcon /> : <TikTokIcon />}
              {isYouTube ? "YouTube" : "TikTok"}
            </span>
            {creator.tier && creator.tier !== "general" && (
              <span className="rounded-full bg-ocean/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-ocean">
                {creator.tier}
              </span>
            )}
          </div>
        )}

        {creator.thumbnail && creator.tier && creator.tier !== "general" && (
          <div className="mb-3">
            <span className="rounded-full bg-ocean/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-ocean">
              {creator.tier}
            </span>
          </div>
        )}

        <blockquote className="font-display text-[18px] leading-snug text-ocean">
          {creator.opinion}
        </blockquote>

        <div className="mt-auto pt-5">
          <div className="rule" />
          <div className="mt-4 flex items-center justify-between">
            <div>
              <div className="text-[13px] font-semibold text-ocean">{creator.name}</div>
              <div className="text-[11px] text-muted">{creator.handle}</div>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-lagoon group-hover:text-ocean">
              Watch →
            </span>
          </div>
          <div className="mt-2 line-clamp-1 text-[11px] text-muted">“{creator.videoTitle}”</div>
        </div>
      </div>
    </a>
  );
}
