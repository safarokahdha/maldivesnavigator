import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
  async redirects() {
    return [
      // Legacy tier path → new query-param convention (brief §5.4)
      { source: "/stays/budget", destination: "/stays?tier=backpacker", permanent: true },
      { source: "/stays/backpacker", destination: "/stays?tier=backpacker", permanent: true },
      { source: "/stays/mid", destination: "/stays?tier=mid", permanent: true },
      { source: "/stays/luxury", destination: "/stays?tier=luxury", permanent: true },
      { source: "/stays/ultra", destination: "/stays?tier=ultra", permanent: true },
      // Brief §5 — canonical URL is /voices. /creators kept as 308 alias.
      { source: "/creators", destination: "/voices", permanent: true },
      // audit-fixes 2026-05 §1.5 — Boutique Beach is one Dhigurah listing.
      // Old duplicate slugs redirect to canonical.
      { source: "/stays/boutique-beach-hangnaameedhoo", destination: "/stays/boutique-beach", permanent: true },
      { source: "/stays/boutique-beach-dhigurah", destination: "/stays/boutique-beach", permanent: true },
      // audit-fixes 2026-05 §2.1 — de-duplicate stay slugs. Aliases/dupes
      // redirect to canonical full-name slug.
      { source: "/stays/arena-beach", destination: "/stays/arena-beach-hotel-maafushi", permanent: true },
      { source: "/stays/season-paradise", destination: "/stays/season-paradise-thulusdhoo", permanent: true },
      { source: "/stays/thundi-fulidhoo", destination: "/stays/thundi-guesthouse-fulidhoo", permanent: true },
      { source: "/stays/fulidhoo-inn", destination: "/stays/fulidhoo-inn-vaavu", permanent: true },
      { source: "/stays/summer-island", destination: "/stays/summer-island-maldives", permanent: true },
      { source: "/stays/adaaran-hudhuranfushi", destination: "/stays/adaaran-select-hudhuranfushi", permanent: true },
      { source: "/stays/conrad-rangali", destination: "/stays/conrad-maldives-rangali-island", permanent: true },
      { source: "/stays/baros", destination: "/stays/baros-maldives", permanent: true },
      { source: "/stays/waldorf-ithaafushi", destination: "/stays/waldorf-astoria-maldives-ithaafushi", permanent: true },
      { source: "/stays/four-seasons-landaa", destination: "/stays/four-seasons-resort-landaa-giraavaru", permanent: true },
    ];
  },
};

export default nextConfig;
