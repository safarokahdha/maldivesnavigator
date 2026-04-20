import type { MetadataRoute } from "next";
import { islands } from "@/data/islands";
import { loadIndex } from "@/lib/journalStore";
import { journal as seedJournal } from "@/data/journal";
import { listProducts } from "@/lib/shopStore";

const BASE = "https://maldivesnavigator.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/destinations`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/stays`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/plan`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE}/creators`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/journal`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/shop`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/partners`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const tierRoutes: MetadataRoute.Sitemap = ["budget", "mid", "luxury", "ultra"].map((t) => ({
    url: `${BASE}/stays/${t}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const islandRoutes: MetadataRoute.Sitemap = islands.map((i) => ({
    url: `${BASE}/destinations/${i.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const generated = await loadIndex().catch(() => []);
  const generatedRoutes: MetadataRoute.Sitemap = generated.map((g) => ({
    url: `${BASE}/journal/${g.slug}`,
    lastModified: new Date(g.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));
  const seedJournalRoutes: MetadataRoute.Sitemap = seedJournal.map((s) => ({
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
    ...tierRoutes,
    ...islandRoutes,
    ...generatedRoutes,
    ...seedJournalRoutes,
    ...productRoutes,
  ];
}
