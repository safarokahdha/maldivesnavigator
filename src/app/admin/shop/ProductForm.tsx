"use client";

import { useRef, useState, useTransition } from "react";
import { upsertProduct, type ActionResult } from "./actions";
import { shopCategories } from "@/data/shopCategories";
import type { Product } from "@/lib/shopStore";

type FetchResult = {
  ok?: boolean;
  error?: string;
  asin?: string;
  amazonUrl?: string;
  title?: string;
  image?: string;
  description?: string;
  priceDisplay?: string;
};

export function ProductForm({ initial }: { initial?: Product }) {
  const [pending, startTransition] = useTransition();
  const [fetching, setFetching] = useState(false);
  const [fetchMsg, setFetchMsg] = useState<string | null>(null);
  const [result, setResult] = useState<ActionResult | null>(null);

  const urlRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);

  async function autofill() {
    const url = urlRef.current?.value.trim();
    if (!url || !url.includes("amazon.")) {
      setFetchMsg("Paste a full Amazon URL first.");
      return;
    }
    setFetching(true);
    setFetchMsg(null);
    try {
      const res = await fetch(`/api/admin/fetch-amazon?url=${encodeURIComponent(url)}`);
      const data = (await res.json()) as FetchResult;
      if (data.error && !data.ok) {
        setFetchMsg(data.error);
      } else {
        setFetchMsg("Fetched — review and edit before saving.");
      }
      if (data.amazonUrl && urlRef.current) urlRef.current.value = data.amazonUrl;
      if (data.title && titleRef.current && !titleRef.current.value) titleRef.current.value = data.title;
      if (data.image && imageRef.current && !imageRef.current.value) imageRef.current.value = data.image;
      if (data.priceDisplay && priceRef.current && !priceRef.current.value)
        priceRef.current.value = data.priceDisplay;
      if (data.description && descRef.current && !descRef.current.value)
        descRef.current.value = data.description;
    } catch {
      setFetchMsg("Fetch failed. Fill manually.");
    } finally {
      setFetching(false);
    }
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await upsertProduct(fd);
      setResult(res);
      if (res.ok && !initial) {
        (e.target as HTMLFormElement).reset();
        setFetchMsg(null);
      }
    });
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[22px] border border-ocean/10 bg-white p-6 md:p-8"
    >
      {initial && <input type="hidden" name="slug" defaultValue={initial.slug} />}

      {/* Amazon URL + Fetch — full-width at top */}
      <label className="block">
        <span className="text-[12px] font-semibold uppercase tracking-widest text-ocean">
          Amazon URL * <span className="text-muted font-normal">paste and hit Fetch</span>
        </span>
        <div className="mt-2 flex gap-2">
          <input
            ref={urlRef}
            type="text"
            name="amazonUrl"
            defaultValue={initial?.amazonUrl}
            placeholder="https://www.amazon.com/dp/B07XXX"
            required
            className="flex-1 rounded-xl border border-ocean/15 bg-white p-3 text-[14px] text-ocean outline-none focus:border-ocean"
          />
          <button
            type="button"
            onClick={autofill}
            disabled={fetching}
            className="rounded-xl bg-lagoon px-5 text-[12px] font-semibold uppercase tracking-widest text-white transition hover:bg-lagoon-light disabled:opacity-50"
          >
            {fetching ? "Fetching…" : "Fetch ↓"}
          </button>
        </div>
        {fetchMsg && (
          <div className="mt-2 text-[12px] text-muted">{fetchMsg}</div>
        )}
      </label>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="block md:col-span-2">
          <span className="text-[12px] font-semibold uppercase tracking-widest text-ocean">Title *</span>
          <input
            ref={titleRef}
            type="text"
            name="title"
            defaultValue={initial?.title}
            required
            className="mt-2 w-full rounded-xl border border-ocean/15 bg-white p-3 text-[14px] text-ocean outline-none focus:border-ocean"
          />
        </label>
        <Field
          label="Category *"
          name="category"
          type="select"
          defaultValue={initial?.category}
          options={shopCategories.map((c) => ({ value: c.slug, label: c.label }))}
          required
        />
        <label className="block">
          <span className="text-[12px] font-semibold uppercase tracking-widest text-ocean">
            Display price
          </span>
          <input
            ref={priceRef}
            type="text"
            name="priceDisplay"
            defaultValue={initial?.priceDisplay}
            placeholder="$19.99"
            className="mt-2 w-full rounded-xl border border-ocean/15 bg-white p-3 text-[14px] text-ocean outline-none focus:border-ocean"
          />
        </label>
        <label className="block md:col-span-2">
          <span className="text-[12px] font-semibold uppercase tracking-widest text-ocean">
            Image URL *
          </span>
          <input
            ref={imageRef}
            type="text"
            name="image"
            defaultValue={initial?.image}
            placeholder="https://..."
            required
            className="mt-2 w-full rounded-xl border border-ocean/15 bg-white p-3 text-[14px] text-ocean outline-none focus:border-ocean"
          />
        </label>
        <Field
          label="Tags (comma-separated)"
          name="tags"
          defaultValue={initial?.tags.join(", ")}
          placeholder="reef-safe, SPF 50, eco"
        />
        <div className="flex items-end">
          <label className="inline-flex items-center gap-2 text-[13px] text-ocean">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={initial?.featured}
              className="h-4 w-4"
            />
            Feature on shop homepage
          </label>
        </div>
      </div>

      <label className="mt-4 block">
        <span className="text-[12px] font-semibold uppercase tracking-widest text-ocean">
          Description *
        </span>
        <textarea
          ref={descRef}
          name="description"
          rows={4}
          required
          defaultValue={initial?.description}
          className="mt-2 w-full rounded-xl border border-ocean/15 bg-white p-3 text-[14px] text-ocean outline-none focus:border-ocean"
          placeholder="Why you'd pack this for the Maldives."
        />
      </label>

      {result && !result.ok && (
        <div className="mt-5 rounded-xl bg-coral/10 p-4 text-[13px] font-medium text-coral">
          {result.error}
        </div>
      )}
      {result?.ok && (
        <div className="mt-5 rounded-xl bg-lagoon/10 p-4 text-[13px] font-medium text-ocean">
          Saved · <code>{result.slug}</code>
        </div>
      )}

      <div className="mt-6 flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-ocean px-6 py-3 text-[12px] font-semibold uppercase tracking-widest text-white transition hover:bg-ocean-deep disabled:opacity-50"
        >
          {pending ? "Saving…" : initial ? "Save changes" : "Add product"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  defaultValue,
  options,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
  options?: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="text-[12px] font-semibold uppercase tracking-widest text-ocean">{label}</span>
      {type === "select" && options ? (
        <select
          name={name}
          required={required}
          defaultValue={defaultValue ?? ""}
          className="mt-2 w-full rounded-xl border border-ocean/15 bg-white p-3 text-[14px] text-ocean outline-none focus:border-ocean"
        >
          <option value="" disabled>
            Pick one…
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          defaultValue={defaultValue}
          className="mt-2 w-full rounded-xl border border-ocean/15 bg-white p-3 text-[14px] text-ocean outline-none focus:border-ocean"
        />
      )}
    </label>
  );
}
