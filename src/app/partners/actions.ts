"use server";

import {
  savePartnerSubmission,
  partnersBlobConfigured,
  type PartnerKind,
  type PartnerSubmission,
} from "@/lib/partnersStore";

export type SubmitResult =
  | { ok: true; stored: boolean; mailtoHref?: string }
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

function str(formData: FormData, key: string, max = 400) {
  const v = formData.get(key);
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max);
}

function isEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
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
  const honeypot = str(formData, "company", 60); // spam trap

  if (honeypot) return { ok: true, stored: false }; // silently drop bots

  if (!VALID_KINDS.includes(kind)) return { ok: false, error: "Pick a property type." };
  if (!business) return { ok: false, error: "Business name is required." };
  if (!contactName) return { ok: false, error: "Your name is required." };
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
    submittedAt: new Date().toISOString(),
  };

  // Fallback if Blob not configured: we still return ok=true so the user
  // gets a mailto link to send the submission manually.
  if (!partnersBlobConfigured()) {
    const subject = `Navigator listing — ${business} (${kind})`;
    const body = `Property: ${business}
Type: ${kind}
Contact: ${contactName} <${email}>${phone ? `\nPhone: ${phone}` : ""}
Island: ${island}${atoll ? ` (${atoll} Atoll)` : ""}
${website ? `Website: ${website}\n` : ""}${priceFrom ? `Price from: ${priceFrom}\n` : ""}
Pitch:
${pitch}`;
    const mailto = `mailto:hello@maldivesnavigator.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    return { ok: true, stored: false, mailtoHref: mailto };
  }

  try {
    await savePartnerSubmission(submission);
    return { ok: true, stored: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Something went wrong saving your submission.",
    };
  }
}
