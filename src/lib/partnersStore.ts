import { put } from "@vercel/blob";

export type PartnerKind =
  | "guesthouse"
  | "resort"
  | "villa"
  | "airbnb"
  | "liveaboard"
  | "dive-centre"
  | "excursion-operator"
  | "restaurant"
  | "other";

export type PartnerSubmission = {
  id: string;
  kind: PartnerKind;
  business: string;
  contactName: string;
  email: string;
  phone?: string;
  island: string;
  atoll?: string;
  website?: string;
  priceFrom?: string;
  pitch: string;
  submittedAt: string;
};

const PATH = (id: string) => `partners/${id}.json`;

export function partnersBlobConfigured() {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

export async function savePartnerSubmission(
  sub: PartnerSubmission,
): Promise<{ url: string }> {
  const { url } = await put(PATH(sub.id), JSON.stringify(sub, null, 2), {
    access: "public",
    contentType: "application/json",
    allowOverwrite: true,
  });
  return { url };
}
