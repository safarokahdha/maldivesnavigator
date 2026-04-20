import Link from "next/link";
import { requireAdmin } from "@/lib/adminAuth";

export const metadata = {
  title: "Admin — Maldives Navigator",
  robots: { index: false, follow: false },
};

const tabs = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/shop", label: "Shop" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();
  return (
    <div className="min-h-[100svh] bg-[color:var(--shore)]">
      <header className="border-b border-ocean/10 bg-white">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-display text-lg font-semibold text-ocean">
              ⚓ Navigator Admin
            </Link>
            <nav className="flex items-center gap-1">
              {tabs.map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className="rounded-full px-3 py-1.5 text-[12px] font-semibold uppercase tracking-widest text-ocean/80 hover:bg-ocean/5 hover:text-ocean"
                >
                  {t.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3 text-[12px] text-muted">
            <Link href="/" className="hover:text-ocean">View site →</Link>
            <Link
              href="/api/preview/disable"
              className="rounded-full border border-ocean/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-ocean hover:bg-ocean/5"
            >
              Log out
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-[1400px] px-6 py-10 md:px-10">{children}</main>
    </div>
  );
}
