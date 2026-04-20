"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import {
  deleteProduct,
  getProduct,
  saveProduct,
  type Product,
} from "@/lib/shopStore";

async function ensureAdmin() {
  const secret = process.env.PREVIEW_SECRET;
  if (!secret) throw new Error("Admin disabled: PREVIEW_SECRET not set");
  const jar = await cookies();
  const cookie = jar.get("mnav_preview")?.value;
  if (cookie !== secret) throw new Error("unauthorized");
}

function str(fd: FormData, k: string, max = 400) {
  const v = fd.get(k);
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

function extractAsin(url: string): string | undefined {
  // Amazon URL patterns: /dp/ASIN, /gp/product/ASIN, /product/ASIN
  const m = url.match(/\/(?:dp|gp\/product|product)\/([A-Z0-9]{10})/i);
  return m?.[1];
}

export type ActionResult = { ok: true; slug: string } | { ok: false; error: string };

export async function upsertProduct(formData: FormData): Promise<ActionResult> {
  await ensureAdmin();

  const title = str(formData, "title", 160);
  const category = str(formData, "category");
  const amazonUrl = str(formData, "amazonUrl", 500);
  const image = str(formData, "image", 500);
  const description = str(formData, "description", 1500);
  const priceDisplay = str(formData, "priceDisplay", 40);
  const tagsRaw = str(formData, "tags", 300);
  const featured = formData.get("featured") === "on";
  const explicitSlug = str(formData, "slug", 80);

  if (!title) return { ok: false, error: "Title required." };
  if (!category) return { ok: false, error: "Category required." };
  if (!amazonUrl.includes("amazon.")) return { ok: false, error: "Amazon URL required." };
  if (!image) return { ok: false, error: "Image URL required." };
  if (!description) return { ok: false, error: "Description required." };

  const slug = explicitSlug || slugify(title);
  const now = new Date().toISOString();
  const existing = await getProduct(slug);

  const product: Product = {
    slug,
    title,
    category,
    amazonUrl,
    asin: extractAsin(amazonUrl),
    image,
    description,
    priceDisplay: priceDisplay || undefined,
    tags: tagsRaw
      ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean).slice(0, 8)
      : [],
    featured,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };

  await saveProduct(product);
  revalidatePath("/shop");
  revalidatePath(`/shop/${slug}`);
  revalidatePath("/admin/shop");
  return { ok: true, slug };
}

export async function removeProduct(formData: FormData): Promise<ActionResult> {
  await ensureAdmin();
  const slug = str(formData, "slug", 80);
  if (!slug) return { ok: false, error: "slug missing" };
  await deleteProduct(slug);
  revalidatePath("/shop");
  revalidatePath("/admin/shop");
  return { ok: true, slug };
}
