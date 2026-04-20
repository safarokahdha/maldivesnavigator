import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, listProducts, withAffiliate } from "@/lib/shopStore";
import { categoryLabel } from "@/data/shopCategories";

export const revalidate = 120;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) return {};
  return { title: `${p.title} — Maldives Navigator`, description: p.description };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const related = (await listProducts())
    .filter((p) => p.slug !== slug && p.category === product.category)
    .slice(0, 4);

  return (
    <article className="mx-auto max-w-[1200px] px-6 py-16 md:px-10">
      <Link href="/shop" className="text-[11px] font-semibold uppercase tracking-[0.28em] text-lagoon hover:underline">
        ← Back to shop
      </Link>

      <div className="mt-8 grid gap-12 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-[28px] border border-ocean/10 bg-white">
          <Image src={product.image} alt={product.title} fill sizes="50vw" className="object-contain p-10" />
        </div>

        <div>
          <div className="eyebrow">{categoryLabel(product.category)}</div>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.05] text-ocean md:text-5xl">
            {product.title}
          </h1>
          {product.priceDisplay && (
            <div className="mt-4 font-display text-2xl font-semibold text-ocean">
              {product.priceDisplay}
              <span className="ml-2 text-[12px] font-normal uppercase tracking-widest text-muted">
                on Amazon
              </span>
            </div>
          )}
          <p className="mt-6 text-[16px] leading-relaxed text-muted">{product.description}</p>

          {product.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {product.tags.map((t) => (
                <span key={t} className="rounded-full bg-ocean/5 px-3 py-1 text-[11px] font-medium text-ocean">
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3">
            <a
              href={withAffiliate(product.amazonUrl)}
              target="_blank"
              rel="noopener sponsored nofollow"
              className="rounded-full bg-ocean px-6 py-4 text-center text-[13px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-ocean-deep"
            >
              Buy on Amazon →
            </a>
            <p className="text-[12px] text-muted">
              Opens Amazon.com. You pay Amazon's price — we earn a small commission at no cost to you.
            </p>
          </div>

          <div className="mt-10 rounded-[22px] bg-ocean/5 p-5 text-[13px] text-muted">
            <strong className="text-ocean">Editor's pick.</strong> We don't hold stock,
            we don't ship, and we don't mark anything up. Amazon handles the transaction.
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <div className="eyebrow">Related</div>
          <h2 className="mt-2 font-display text-3xl font-semibold text-ocean md:text-4xl">
            More {categoryLabel(product.category).toLowerCase()}
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/shop/${r.slug}`}
                className="group overflow-hidden rounded-[18px] border border-ocean/10 bg-white transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image src={r.image} alt={r.title} fill sizes="25vw" className="object-contain p-4 transition group-hover:scale-[1.05]" />
                </div>
                <div className="p-4">
                  <div className="font-display text-sm font-semibold text-ocean">{r.title}</div>
                  {r.priceDisplay && <div className="mt-1 text-[12px] text-muted">{r.priceDisplay}</div>}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
