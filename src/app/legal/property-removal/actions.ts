"use server";

import { z } from "zod";

const schema = z.object({
  property: z.string().trim().min(1).max(200),
  role: z.enum(["owner", "manager", "authorized"]),
  email: z.string().email().max(200),
  message: z.string().trim().max(2000).optional().default(""),
});

export async function submitRemovalRequest(
  formData: FormData,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const parsed = schema.safeParse({
    property: formData.get("property"),
    role: formData.get("role"),
    email: formData.get("email"),
    message: formData.get("message"),
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  // Server-side log entry. Replace with Resend / SES / forwarding when keys
  // are wired up. For now we structured-log so requests are visible in the
  // Vercel function logs and can be exported.
  const entry = {
    type: "REMOVAL_REQUEST",
    received_at: new Date().toISOString(),
    ...parsed.data,
  };
  console.log(JSON.stringify(entry));

  // Optional Resend dispatch — only if RESEND_API_KEY is set.
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const NOTIFY_TO = process.env.REMOVAL_NOTIFY_TO ?? "hello@maldivesnavigator.com";
  if (RESEND_API_KEY) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Maldives Navigator <noreply@maldivesnavigator.com>",
          to: [NOTIFY_TO],
          subject: `[REMOVAL REQUEST] ${parsed.data.property}`,
          text: [
            `Property: ${parsed.data.property}`,
            `Role: ${parsed.data.role}`,
            `Email: ${parsed.data.email}`,
            ``,
            `Notes:`,
            parsed.data.message || "(none)",
            ``,
            `Received: ${entry.received_at}`,
          ].join("\n"),
        }),
      });
    } catch (e) {
      // Don't fail the form; log so editor can fall back to JSON log.
      console.error("[removal-request] Resend dispatch failed", e);
    }
  }

  return { ok: true };
}
