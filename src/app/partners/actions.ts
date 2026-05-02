"use server";

import {
  savePartnerSubmission,
  partnersBlobConfigured,
  type PartnerKind,
  type PartnerSubmission,
  type ListingTierInterest,
} from "@/lib/partnersStore";

export type SubmitResult =
  | { ok: true; stored: boolean; emailed?: boolean; mailtoHref?: string }
  | { ok: false; error: string };

const VALID_KINDS: PartnerKind[] = [
  "guesthouse",
  "resort",
  "villa",
  "airbnb",
  "liveaboard",
  "dive-centre",
  "excursion-operator",
  "restaurant",
  "other",
];

const VALID_TIERS: ListingTierInterest[] = [
  "free",
  "verified",
  "featured",
  "sponsor",
  "unsure",
];

function str(formData: FormData, key: string, max = 400) {
  const v = formData.get(key);
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max);
}

function isEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

// Pull up to 8 file *names* from the multi-file input. Actual file storage is
// deferred to post-v1 — for now we capture filenames so the email body lists
// what the partner is willing to send.
function photoNames(formData: FormData, max = 8): string[] {
  const out: string[] = [];
  for (const v of formData.getAll("photos")) {
    if (out.length >= max) break;
    if (v instanceof File && v.size > 0 && v.name) out.push(v.name.slice(0, 200));
  }
  return out;
}

// Optional Resend email — fires only when RESEND_API_KEY + PARTNERS_NOTIFY_TO
// are set in the environment. Failure is non-fatal; the submission is still
// stored / returned to the user.
async function notifyEditor(sub: PartnerSubmission): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.PARTNERS_NOTIFY_TO;
  const from = process.env.RESEND_FROM ?? "noreply@maldivesnavigator.com";
  if (!key || !to) return false;

  const subject = `Navigator listing — ${sub.business} (${sub.kind})`;
  const lines = [
    `Property: ${sub.business}`,
    `Type: ${sub.kind}`,
    `Tier interest: ${sub.tierInterest ?? "—"}`,
    `Contact: ${sub.contactName} <${sub.email}>`,
    sub.phone ? `Phone / WhatsApp: ${sub.phone}` : null,
    `Island: ${sub.island}${sub.atoll ? ` (${sub.atoll} Atoll)` : ""}`,
    sub.website ? `Website: ${sub.website}` : null,
    sub.priceFrom ? `Price from: ${sub.priceFrom}` : null,
    sub.photoFilenames?.length
      ? `Photos to be sent: ${sub.photoFilenames.join(", ")}`
      : null,
    "",
    "Pitch:",
    sub.pitch,
    "",
    `Submission ID: ${sub.id}`,
    `Submitted: ${sub.submittedAt}`,
  ].filter(Boolean);

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: sub.email,
        subject,
        text: lines.join("\n"),
      }),
    });
    return r.ok;
  } catch {
    return false;
  }
}

export async function submitPartner(formData: FormData): Promise<SubmitResult> {
  const kind = str(formData, "kind") as PartnerKind;
  const business = str(formData, "business", 120);
  const contactName = str(formData, "contactName", 120);
  const email = str(formData, "email", 200);
  const phone = str(formData, "phone", 60);
  const island = str(formData, "island", 120);
  const atoll = str(formData, "atoll", 80);
  const website = str(formData, "website", 300);
  const priceFrom = str(formData, "priceFrom", 40);
  const pitch = str(formData, "pitch", 1200);
  const tierField = str(formData, "tierInterest", 20) as ListingTierInterest;
  const tierInterest = VALID_TIERS.includes(tierField) ? tierField : undefined;
  const photoFilenames = photoNames(formData);
  const honeypot = str(formData, "company", 60); // spam trap

  if (honeypot) return { ok: true, stored: false }; // silently drop bots

  if (!VALID_KINDS.includes(kind)) return { ok: false, error: "Pick a property type." };
  if (!business) return { ok: false, error: "Property name is required." };
  if (!contactName) return { ok: false, error: "Owner name is required." };
  if (!isEmail(email)) return { ok: false, error: "Valid email is required." };
  if (!island) return { ok: false, error: "Which island you're on is required." };
  if (pitch.length < 20) return { ok: false, error: "Tell us a bit more (20+ chars)." };

  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const submission: PartnerSubmission = {
    id,
    kind,
    business,
    contactName,
    email,
    phone: phone || undefined,
    island,
    atoll: atoll || undefined,
    website: website || undefined,
    priceFrom: priceFrom || undefined,
    pitch,
    tierInterest,
    photoFilenames: photoFilenames.length ? photoFilenames : undefined,
    submittedAt: new Date().toISOString(),
  };

  // Fire-and-forget Resend (or no-op if env unset).
  const emailed = await notifyEditor(submission);

  // No Blob token → return mailto fallback so submission isn't lost.
  if (!partnersBlobConfigured()) {
    const subject = `Navigator listing — ${business} (${kind})`;
    const body = `Property: ${business}
Type: ${kind}
Tier interest: ${tierInterest ?? "—"}
Contact: ${contactName} <${email}>${phone ? `\nPhone / WhatsApp: ${phone}` : ""}
Island: ${island}${atoll ? ` (${atoll} Atoll)` : ""}
${website ? `Website: ${website}\n` : ""}${priceFrom ? `Price from: ${priceFrom}\n` : ""}${photoFilenames.length ? `Photos: ${photoFilenames.join(", ")}\n` : ""}
Pitch:
${pitch}`;
    const mailto = `mailto:hello@maldivesnavigator.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    return { ok: true, stored: false, emailed, mailtoHref: mailto };
  }

  try {
    await savePartnerSubmission(submission);
    return { ok: true, stored: true, emailed };
  } catch (err) {
    return {
      ok: false,
      error:
        err instanceof Error
          ? err.message
          : "Something went wrong saving your submission.",
    };
  }
}
