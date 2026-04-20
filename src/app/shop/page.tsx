import Image from "next/image";
import Link from "next/link";
import { listProducts, withAffiliate, type Product } from "@/lib/shopStore";
import { shopCategories, categoryLabel } from "@/data/shopCategories";
import { SectionHeading } from "@/components/SectionHeading";

export const revalidate = 120;

export const metadata = {
  title: "Shop — Maldives travel essentials — Maldives Navigator",
  description:
    "Editor-picked travel essentials for the Maldives — reef-safe sunscreen, snorkel gear, dry bags, underwater cameras and more. Every product links to Amazon.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const products = await listProducts();
  const filtered = cat
    ? products.filter((p) => p.category === cat)
    : products;

  const groups: Record<string, Product[]> = {};
  for (const p of filtered) {
    (groups[p.category] ||= []).push(p);
  }

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10">
      <SectionHeading
        eyebrow="Shop — editor picks"
        title="Pack your Maldives trip"
        sub="Hand-picked travel essentials. Every product links straight to Amazon — we don't hold stock and we don't mark anything up. The price you see is Amazon's price."
      />

      {/* Filter bar */}
      <div className="mt-10 flex flex-wrap gap-2">
        <Link
          href="/shop"
          className={`rounded-full border px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.22em] transition ${
            !cat ? "border-ocean bg-ocean text-white" : "border-ocean/15 bg-white text-ocean hover:border-ocean/40"
          }`}
        >
          All
        </Link>
        {shopCategories.map((c) => (
          <Link
            key={c.slug}
            href={`/shop?cat=${c.slug}`}
            className={`rounded-full border px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.22em] transition ${
              cat === c.slug ? "border-ocean bg-ocean text-white" : "border-ocean/15 bg-white text-ocean hover:border-ocean/40"
            }`}
          >
            {c.label}
          </Link>
        ))}
      </div>

      {products.length === 0 && (
        <div className="mt-16 rounded-[28px] border border-ocean/10 bg-surface p-10 text-center shadow-[0_1px_0_rgba(10,42,51,0.05)]">
          <div className="eyebrow">Shop empty</div>
          <h3 className="mt-3 font-display text-2xl font-semibold text-ocean">
            No products yet
          </h3>
          <p className="mt-2 text-[14px] text-muted">
            Products will appear here as they're added. Editor picks only.
          </p>
        </div>
      )}

      {Object.keys(groups).length > 0 && (
        <div className="mt-14 space-y-16">
          {Object.entries(groups).map(([catSlug, items]) => (
            <section key={catSlug}>
              <div className="mb-6 flex items-end justify-between">
                <div>
                  <div className="eyebrow">{categoryLabel(catSlug)}</div>
                  <h2 className="mt-2 font-display text-3xl font-semibold text-ocean md:text-4xl">
                    {categoryLabel(catSlug)}
                  </h2>
                </div>
                <span className="text-[12px] font-medium uppercase tracking-widest text-muted">
                  {items.length} pick{items.length === 1 ? "" : "s"}
                </span>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      <div className="mt-24 rounded-[24px] bg-ocean/5 p-6 text-[13px] text-muted">
        <strong className="text-ocean">Disclosure:</strong> as an Amazon Associate
        Maldives Navigator earns a small commission from qualifying purchases.
        It costs you nothing extra — Amazon pays us out of their marketing budget.
        We only recommend gear we'd actually pack ourselves.
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-ocean/10 bg-surface shadow-[0_1px_0_rgba(10,42,51,0.05)] transition hover:-translate-y-1 hover:shadow-xl hover:shadow-ocean/10">
      <Link href={`/shop/${product.slug}`} className="relative block aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, 50vw"
          className="object-contain p-6 transition duration-[900ms] group-hover:scale-[1.05]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="eyebrow">{categoryLabel(product.category)}</div>
        <Link href={`/shop/${product.slug}`} className="mt-2 font-display text-lg font-semibold leading-tight text-ocean hover:underline">
          {product.title}
        </Link>
        {product.priceDisplay && (
          <div className="mt-1 text-[13px] font-semibold text-ocean">{product.priceDisplay}</div>
        )}
        <p className="mt-3 line-clamp-3 text-[13px] leading-relaxed text-muted">{product.description}</p>
        <a
          href={withAffiliate(product.amazonUrl)}
          target="_blank"
          rel="noopener sponsored nofollow"
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-ocean px-4 py-2.5 text-[12px] font-semibold uppercase tracking-widest text-white transition hover:bg-ocean-deep"
        >
          Buy on Amazon →
        </a>
      </div>
    </article>
  );
}
