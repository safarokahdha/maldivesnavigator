import type { MetadataRoute } from "next";
import { islands } from "@/data/islands";
import { stays } from "@/data/stays";
import { loadIndex } from "@/lib/journalStore";
import { journal as seedJournal } from "@/data/journal";
import { listProducts } from "@/lib/shopStore";

const BASE = "https://maldivesnavigator.com";

// Journal slugs that exist in the index but resolve to 404 (orphaned cron
// metadata). Filtered out of the sitemap until the underlying blobs are
// either restored or purged. See audit-fixes 2026-05.
const BROKEN_JOURNAL_SLUGS = new Set([
  "2026-04-28-beyond-the-postcard-5-maldives-surprises",
  "2026-04-27-beyond-the-brochure-10-maldives-experiences-locals-love",
  "2026-04-26-island-hopping-the-maldives-beyond-the-resorts",
  "2026-04-24-beyond-the-overwater-maldives-hidden-photo-gems",
  "2026-04-22-mal-sandbanks-your-ultimate-day-trip-guide",
  "2026-04-21-thulusdhoo-vs-himmafushi-which-surf-island-wins",
  "2026-04-20-seven-free-wonders-unforgettable-maldivian-experiences",
]);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/destinations`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/stays`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/plan`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE}/voices`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/journal`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/shop`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/partners`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/subscribe`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/club`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/legal/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/legal/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/legal/disclosure`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const islandRoutes: MetadataRoute.Sitemap = islands.map((i) => ({
    url: `${BASE}/destinations/${i.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const stayRoutes: MetadataRoute.Sitemap = stays.map((s) => ({
    url: `${BASE}/stays/${s.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const generated = await loadIndex().catch(() => []);
  const generatedRoutes: MetadataRoute.Sitemap = generated
    .filter((g) => !BROKEN_JOURNAL_SLUGS.has(g.slug))
    .map((g) => ({
      url: `${BASE}/journal/${g.slug}`,
      lastModified: new Date(g.date),
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  const seedJournalRoutes: MetadataRoute.Sitemap = seedJournal
    .filter((s) => !BROKEN_JOURNAL_SLUGS.has(s.slug))
    .map((s) => ({
      url: `${BASE}/journal/${s.slug}`,
      lastModified: new Date(s.date),
      changeFrequency: "monthly",
      priority: 0.5,
    }));

  const products = await listProducts().catch(() => []);
  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE}/shop/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [
    ...staticRoutes,
    ...islandRoutes,
    ...stayRoutes,
    ...generatedRoutes,
    ...seedJournalRoutes,
    ...productRoutes,
  ];
}
