"use client";

import { useTransition } from "react";
import { removeProduct } from "./actions";

export function DeleteButton({ slug }: { slug: string }) {
  const [pending, startTransition] = useTransition();

  function onClick() {
    if (!confirm(`Delete ${slug}? This can't be undone.`)) return;
    const fd = new FormData();
    fd.set("slug", slug);
    startTransition(async () => {
      await removeProduct(fd);
    });
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      className="rounded-full border border-coral/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-coral transition hover:bg-coral/10 disabled:opacity-50"
    >
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}
