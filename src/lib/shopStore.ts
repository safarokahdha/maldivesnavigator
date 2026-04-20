import { del, list, put } from "@vercel/blob";

export type Product = {
  slug: string;
  title: string;
  category: string;
  asin?: string;
  amazonUrl: string; // canonical Amazon URL (e.g. https://www.amazon.com/dp/ASIN)
  image: string;
  description: string;
  priceDisplay?: string; // display price like "$24.99" (manually maintained)
  tags: string[];
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
};

const INDEX_PATH = "shop/index.json";
const PRODUCT_PATH = (slug: string) => `shop/products/${slug}.json`;

export function shopBlobConfigured() {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

export function affiliateTag(): string | undefined {
  return process.env.AMAZON_AFFILIATE_TAG;
}

export function withAffiliate(url: string): string {
  const tag = affiliateTag();
  if (!tag) return url;
  try {
    const u = new URL(url);
    u.searchParams.set("tag", tag);
    return u.toString();
  } catch {
    return url;
  }
}

export async function listProducts(): Promise<Product[]> {
  if (!shopBlobConfigured()) return [];
  try {
    const { blobs } = await list({ prefix: INDEX_PATH, limit: 1 });
    const entry = blobs[0];
    if (!entry) return [];
    const res = await fetch(entry.url, { cache: "no-store" });
    if (!res.ok) return [];
    return (await res.json()) as Product[];
  } catch {
    return [];
  }
}

export async function getProduct(slug: string): Promise<Product | null> {
  if (!shopBlobConfigured()) return null;
  try {
    const { blobs } = await list({ prefix: PRODUCT_PATH(slug), limit: 1 });
    const entry = blobs[0];
    if (!entry) return null;
    const res = await fetch(entry.url, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as Product;
  } catch {
    return null;
  }
}

async function saveIndex(products: Product[]) {
  await put(INDEX_PATH, JSON.stringify(products), {
    access: "public",
    contentType: "application/json",
    allowOverwrite: true,
  });
}

export async function saveProduct(product: Product): Promise<void> {
  await put(PRODUCT_PATH(product.slug), JSON.stringify(product, null, 2), {
    access: "public",
    contentType: "application/json",
    allowOverwrite: true,
  });
  const existing = await listProducts();
  const next = [
    product,
    ...existing.filter((p) => p.slug !== product.slug),
  ].sort((a, b) => (a.featured === b.featured ? a.title.localeCompare(b.title) : a.featured ? -1 : 1));
  await saveIndex(next);
}

export async function deleteProduct(slug: string): Promise<void> {
  if (!shopBlobConfigured()) return;
  try {
    const { blobs } = await list({ prefix: PRODUCT_PATH(slug), limit: 1 });
    if (blobs[0]) await del(blobs[0].url);
  } catch {
    // ignore
  }
  const existing = await listProducts();
  await saveIndex(existing.filter((p) => p.slug !== slug));
}
