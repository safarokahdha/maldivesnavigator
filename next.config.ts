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
    ];
  },
};

export default nextConfig;
