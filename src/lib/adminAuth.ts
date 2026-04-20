import { cookies } from "next/headers";
import { notFound } from "next/navigation";

// Admin-side guard. Server-side only. Calls notFound() on unauthenticated
// access so the admin dashboard never leaks its existence.
export async function requireAdmin() {
  const secret = process.env.PREVIEW_SECRET;
  if (!secret) notFound();
  const jar = await cookies();
  const cookie = jar.get("mnav_preview")?.value;
  if (cookie !== secret) notFound();
}
