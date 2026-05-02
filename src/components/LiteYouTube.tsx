"use client";

import Image from "next/image";
import { useState } from "react";

// Lightweight YouTube facade. Renders a clickable poster image until the
// user clicks play, then mounts the iframe. Avoids the ~600 KB cost of
// embedding YouTube on page load.
//
// Per brief §13 — performance budget excludes third-party scripts beyond
// Plausible, Beehiiv, Stay22, and lite YouTube embeds.

type Props = {
  id: string;
  title: string;
  className?: string;
  poster?: string;
};

export function LiteYouTube({ id, title, className = "", poster }: Props) {
  const [active, setActive] = useState(false);
  const thumb = poster || `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

  if (active) {
    return (
      <iframe
        className={`aspect-video w-full ${className}`}
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      aria-label={`Play: ${title}`}
      className={`group relative aspect-video w-full overflow-hidden bg-ocean-deep text-white ${className}`}
    >
      <Image
        src={thumb}
        alt={title}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover transition group-hover:scale-[1.02]"
      />
      <span className="absolute inset-0 grid place-items-center bg-black/20 transition group-hover:bg-black/10">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-white/90 text-ocean shadow-lg transition group-hover:scale-110">
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
      <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-left text-[13px] font-medium leading-snug text-white">
        {title}
      </span>
    </button>
  );
}
