import { list, put } from "@vercel/blob";

export type GeneratedArticle = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  author: string;
  date: string; // ISO
  readTime: string;
  image: string;
  tags: string[];
  generated: true;
};

const INDEX_PATH = "journal/index.json";
const ARTICLE_PATH = (slug: string) => `journal/${slug}.json`;

export function blobConfigured() {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

export async function saveArticle(article: GeneratedArticle): Promise<string> {
  const articleBlob = await put(ARTICLE_PATH(article.slug), JSON.stringify(article), {
    access: "public",
    contentType: "application/json",
    allowOverwrite: true,
  });
  const existing = await loadIndex();
  const next = [article, ...existing.filter((a) => a.slug !== article.slug)].slice(0, 60);
  await put(INDEX_PATH, JSON.stringify(next), {
    access: "public",
    contentType: "application/json",
    allowOverwrite: true,
  });
  return articleBlob.url;
}

export async function loadIndex(): Promise<GeneratedArticle[]> {
  if (!blobConfigured()) return [];
  try {
    const { blobs } = await list({ prefix: INDEX_PATH, limit: 1 });
    const entry = blobs[0];
    if (!entry) return [];
    const res = await fetch(entry.url, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    return (await res.json()) as GeneratedArticle[];
  } catch {
    return [];
  }
}

export async function loadArticle(slug: string): Promise<GeneratedArticle | null> {
  if (!blobConfigured()) return null;
  try {
    const { blobs } = await list({ prefix: ARTICLE_PATH(slug), limit: 1 });
    const entry = blobs[0];
    if (!entry) return null;
    const res = await fetch(entry.url, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    return (await res.json()) as GeneratedArticle;
  } catch {
    return null;
  }
}
