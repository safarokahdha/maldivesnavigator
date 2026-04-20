import Link from "next/link";
import { listProducts } from "@/lib/shopStore";
import { loadIndex as loadJournal } from "@/lib/journalStore";

export default async function AdminDashboard() {
  const [products, journal] = await Promise.all([
    listProducts(),
    loadJournal(),
  ]);

  const cards = [
    {
      href: "/admin/shop",
      title: "Shop",
      stat: `${products.length} products`,
      body: "Manage Amazon affiliate products. Add ASIN, image, price, description.",
    },
    {
      href: "/journal",
      title: "Journal",
      stat: `${journal.length} auto-articles`,
      body: "One article per day, auto-written by Gemini. View live journal.",
      external: false,
    },
  ];

  return (
    <div>
      <h1 className="font-display text-4xl font-semibold text-ocean md:text-5xl">Dashboard</h1>
      <p className="mt-3 max-w-2xl text-[14px] text-muted">
        Welcome back. Manage shop products, review partner submissions, and monitor
        the auto-writing journal from here.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group rounded-[22px] border border-ocean/10 bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div className="font-display text-xl font-semibold text-ocean">{c.title}</div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-lagoon">{c.stat}</span>
            </div>
            <p className="mt-3 text-[13px] text-muted">{c.body}</p>
            <span className="mt-4 inline-block text-[11px] font-semibold uppercase tracking-widest text-ocean group-hover:underline">
              Open →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
