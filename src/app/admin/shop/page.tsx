import Image from "next/image";
import Link from "next/link";
import { listProducts, affiliateTag, withAffiliate } from "@/lib/shopStore";
import { categoryLabel } from "@/data/shopCategories";
import { ProductForm } from "./ProductForm";
import { DeleteButton } from "./DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminShopPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;
  const products = await listProducts();
  const editing = edit ? products.find((p) => p.slug === edit) : undefined;
  const tag = affiliateTag();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-semibold text-ocean md:text-5xl">Shop admin</h1>
          <p className="mt-3 max-w-2xl text-[14px] text-muted">
            Add, edit and remove Amazon affiliate products. All changes appear on /shop within a minute.
          </p>
        </div>
        <div className="flex items-center gap-3 text-[12px]">
          {tag ? (
            <span className="rounded-full bg-lagoon/10 px-3 py-1 font-semibold text-ocean">
              Affiliate tag: <code>{tag}</code>
            </span>
          ) : (
            <span className="rounded-full bg-coral/10 px-3 py-1 font-semibold text-coral">
              AMAZON_AFFILIATE_TAG not set
            </span>
          )}
          <Link href="/shop" className="rounded-full border border-ocean/15 px-3 py-1 font-semibold text-ocean hover:bg-ocean/5">
            View /shop →
          </Link>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold text-ocean">
          {editing ? `Editing: ${editing.title}` : "Add a product"}
        </h2>
        <div className="mt-4">
          <ProductForm initial={editing} />
          {editing && (
            <div className="mt-3 text-[12px]">
              <Link href="/admin/shop" className="text-muted hover:text-ocean">
                ← Cancel edit, add new instead
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-semibold text-ocean">
          Current products <span className="text-muted">({products.length})</span>
        </h2>

        {products.length === 0 ? (
          <div className="mt-6 rounded-[22px] border border-dashed border-ocean/20 bg-white p-10 text-center">
            <p className="text-[14px] text-muted">
              No products yet. Add one above and it'll appear on /shop instantly.
            </p>
          </div>
        ) : (
          <div className="mt-6 divide-y divide-ocean/10 rounded-[22px] border border-ocean/10 bg-white">
            {products.map((p) => (
              <div key={p.slug} className="flex items-center gap-4 p-4">
                <div className="relative h-16 w-16 flex-none overflow-hidden rounded-lg border border-ocean/10 bg-white">
                  <Image src={p.image} alt={p.title} fill sizes="64px" className="object-contain p-1" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="truncate font-semibold text-ocean">{p.title}</div>
                    {p.featured && (
                      <span className="rounded-full bg-lagoon/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-lagoon">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-muted">
                    <span>{categoryLabel(p.category)}</span>
                    {p.priceDisplay && <span>· {p.priceDisplay}</span>}
                    {p.asin && <span>· ASIN {p.asin}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={withAffiliate(p.amazonUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-ocean/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-ocean hover:bg-ocean/5"
                  >
                    Open Amazon
                  </a>
                  <Link
                    href={`/shop/${p.slug}`}
                    className="rounded-full border border-ocean/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-ocean hover:bg-ocean/5"
                  >
                    View
                  </Link>
                  <Link
                    href={`/admin/shop?edit=${p.slug}`}
                    className="rounded-full bg-ocean px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white hover:bg-ocean-deep"
                  >
                    Edit
                  </Link>
                  <DeleteButton slug={p.slug} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-16 rounded-[22px] border border-ocean/10 bg-white p-6 text-[13px] text-muted">
        <div className="eyebrow">How this works</div>
        <ul className="mt-3 space-y-2">
          <li>• You enter the product. Amazon handles checkout, stock, shipping, returns.</li>
          <li>• Every "Buy on Amazon" link has your <code>?tag=AMAZON_AFFILIATE_TAG</code> appended.</li>
          <li>• Price shown here is for display only — users always pay Amazon's live price.</li>
          <li>• No markup, no inventory, no tax headaches. You earn commission on qualifying clicks.</li>
          <li>
            • Live PA-API sync (real-time price + stock) unlocks after your first 3 qualifying
            Associates sales. Until then, manually refresh price fields here.
          </li>
        </ul>
      </section>
    </div>
  );
}
