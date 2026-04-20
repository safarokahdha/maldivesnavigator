import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { topicForDate } from "@/data/dailyTopics";
import { saveArticle, type GeneratedArticle } from "@/lib/journalStore";

export const runtime = "nodejs";
export const maxDuration = 60;

// Vercel Cron hits this at 04:00 UTC daily.
// Manual trigger: Authorization: Bearer CRON_SECRET
//
// Required env vars:
//   - GEMINI_API_KEY        (Google AI Studio, free tier)
//   - BLOB_READ_WRITE_TOKEN (Vercel Blob — auto-set by store link)
//   - CRON_SECRET           (random string for manual auth)

const IMAGE_POOL = [
  "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1540202404-1b927e27fa8b?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=80",
];

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

function pickImage(day: number) {
  return IMAGE_POOL[day % IMAGE_POOL.length];
}

async function writeWithGemini(topic: string, date: Date) {
  const systemInstruction = `You are a senior travel editor for Maldives Navigator, an independent editorial journal covering the Maldives. Write in a warm, confident, specific voice — like a mix of Condé Nast Traveler and a friend who's actually been. Never invent hotel names or exact prices; when citing prices, use ranges ("$30–$90 / night") and words like "typically". Always write in English.`;

  const userPrompt = `Today's topic: ${topic}. Today's date is ${date.toISOString().slice(0, 10)}.

Write one article for Maldives Navigator readers — travellers planning or dreaming of a Maldives trip. Prioritise practical, specific, upbeat guidance. Assume readers know basic geography (atolls, Malé).

Return STRICT JSON only, matching this schema:
{
  "title": "4–10 words, title case, catchy",
  "excerpt": "20–30 words, no fluff",
  "body": "4–6 short paragraphs separated by blank lines, 350–550 words total, no markdown, no bullet lists, no links",
  "tags": ["3–4 short tags"]
}`;

  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY not set");

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${encodeURIComponent(key)}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemInstruction }] },
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.9,
        maxOutputTokens: 2000,
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini error ${res.status}: ${err}`);
  }

  type GeminiResponse = {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  const data = (await res.json()) as GeminiResponse;
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";

  return JSON.parse(text) as {
    title: string;
    excerpt: string;
    body: string;
    tags: string[];
  };
}

export async function GET(request: Request) {
  const auth = request.headers.get("authorization") ?? "";
  const isCron = request.headers.get("x-vercel-cron") !== null;
  const expected = process.env.CRON_SECRET;
  if (!isCron && (!expected || auth !== `Bearer ${expected}`)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: "GEMINI_API_KEY not set" }, { status: 501 });
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "BLOB_READ_WRITE_TOKEN not set. Create a Vercel Blob store." },
      { status: 501 },
    );
  }

  const now = new Date();
  const topic = topicForDate(now);
  const dayOfYear = Math.floor(
    (now.getTime() - Date.UTC(now.getUTCFullYear(), 0, 0)) / 86400000,
  );

  try {
    const { title, excerpt, body, tags } = await writeWithGemini(topic, now);
    const date = now.toISOString().slice(0, 10);
    const slug = `${date}-${slugify(title)}`;
    const wordCount = body.split(/\s+/).length;
    const readTime = `${Math.max(2, Math.round(wordCount / 230))} min read`;

    const article: GeneratedArticle = {
      slug,
      title,
      excerpt,
      body,
      author: "Maldives Navigator",
      date,
      readTime,
      image: pickImage(dayOfYear),
      tags: Array.isArray(tags) ? tags.slice(0, 4) : ["Maldives", "Travel"],
      generated: true,
    };

    const url = await saveArticle(article);
    // Force both the journal index and article page to re-render immediately
    revalidatePath("/journal");
    revalidatePath(`/journal/${slug}`);
    revalidatePath("/");
    return NextResponse.json({ ok: true, topic, url, article });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "generation failed" },
      { status: 500 },
    );
  }
}
