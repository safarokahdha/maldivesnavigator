export const shopCategories = [
  { slug: "sun-care", label: "Sun care" },
  { slug: "snorkel-gear", label: "Snorkel & dive gear" },
  { slug: "beach", label: "Beach & swimwear" },
  { slug: "packing", label: "Luggage & packing" },
  { slug: "tech", label: "Tech & photography" },
  { slug: "health", label: "Health & first aid" },
  { slug: "kids", label: "Kids & family" },
  { slug: "accessories", label: "Accessories" },
] as const;

export type ShopCategorySlug = (typeof shopCategories)[number]["slug"];

export function categoryLabel(slug: string): string {
  return shopCategories.find((c) => c.slug === slug)?.label ?? slug;
}
