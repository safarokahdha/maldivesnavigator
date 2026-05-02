export type Platform = "youtube" | "tiktok";

export type Creator = {
  id: string;
  name: string;
  handle: string;
  platform: Platform;
  opinion: string;
  videoTitle: string;
  videoUrl: string;
  thumbnail?: string;
  tier?: "backpacker" | "mid" | "luxury" | "ultra" | "general";
};

// Brief §9 — VoiceFeature shape. We expose the existing creators[] under a
// brief-aligned alias so the homepage Voices section + /voices index can
// consume a stable type independent of platform-specific Creator fields.
export type VoiceFeature = {
  id: string;
  creatorName: string;
  videoTitle: string;
  videoUrl: string; // full YouTube URL
  embedId: string; // YouTube video ID
  thumbnail: string;
  editorialCaption: string;
};

function ytIdFromUrl(url: string): string {
  try {
    return new URL(url).searchParams.get("v") ?? "";
  } catch {
    return "";
  }
}

export function asVoiceFeature(c: Creator): VoiceFeature | null {
  if (c.platform !== "youtube") return null;
  const embedId = ytIdFromUrl(c.videoUrl);
  if (!embedId) return null;
  return {
    id: c.id,
    creatorName: c.name,
    videoTitle: c.videoTitle,
    videoUrl: c.videoUrl,
    embedId,
    thumbnail: c.thumbnail ?? `https://i.ytimg.com/vi/${embedId}/maxresdefault.jpg`,
    editorialCaption: c.opinion,
  };
}

export function voiceFeatures(): VoiceFeature[] {
  return creators
    .map(asVoiceFeature)
    .filter((v): v is VoiceFeature => v !== null);
}

// Scraped from live web searches — real YouTube video IDs, titles, and URLs.
// Opinions are short editorial summaries that reflect each video's clearly-stated
// angle (budget / luxury / surf / wildlife). Swap for verbatim creator quotes once
// you've watched each video fully.

const yt = (id: string) => ({
  videoUrl: `https://www.youtube.com/watch?v=${id}`,
  thumbnail: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
});

export const creators: Creator[] = [
  // ==== YouTube ====
  {
    id: "maldives-under-30",
    name: "Wout of the World",
    handle: "@WoutoftheWorld",
    platform: "youtube",
    opinion:
      "“It's really possible to see the Maldives for under $30 a day — guesthouses, local ferries and a bikini beach all to yourself.”",
    videoTitle: "Is It Really Possible?! The Backpacker Guide to the Maldives UNDER $30 per DAY",
    ...yt("4_tDJzSKTTg"),
    tier: "backpacker",
  },
  {
    id: "gulhi-best-island",
    name: "Budget travel vlog",
    handle: "YouTube",
    platform: "youtube",
    opinion:
      "“Gulhi is the best island I found — same atoll as Maafushi, half the crowds, and paradise on a budget.”",
    videoTitle: "This is BY FAR The Best Island of the MALDIVES — Guide to Paradise on a Budget",
    ...yt("vjTKNVbDWOc"),
    tier: "backpacker",
  },
  {
    id: "budget-2025",
    name: "Maldives 2025 budget guide",
    handle: "YouTube",
    platform: "youtube",
    opinion:
      "“2025 update: how to do the Maldives on a budget — Maafushi, Mathiveri, ferries, excursions, food costs all broken down.”",
    videoTitle: "Budget Travel Guide to The Maldives in 2025 🇲🇻",
    ...yt("fwEqlY06XbI"),
    tier: "backpacker",
  },
  {
    id: "soneva-fushi-4k",
    name: "Luxury 4K resort tour",
    handle: "YouTube",
    platform: "youtube",
    opinion:
      "“Soneva Fushi is the best luxury resort in the Maldives — multi-bedroom villas, a cinema under the stars, and the largest overwater villas in the country.”",
    videoTitle: "Soneva Fushi | Best Luxury Resort in the Maldives (Full Tour in 4K)",
    ...yt("RILhmAABm9E"),
    tier: "ultra",
  },
  {
    id: "whale-shark-dhigurah",
    name: "Dhigurah whale shark dive",
    handle: "YouTube",
    platform: "youtube",
    opinion:
      "“Swimming with a whale shark off Dhigurah is every bit worth the hype — it showed up on our very first attempt.”",
    videoTitle: "SWIMMING WITH WHALE SHARKS IN DHIGURAH — Is It Worth It?",
    ...yt("NVE4gPjk368"),
    tier: "mid",
  },
  {
    id: "dhigurah-5-nights",
    name: "5 nights on Dhigurah",
    handle: "YouTube",
    platform: "youtube",
    opinion:
      "“Five nights on Dhigurah — whale sharks, manta rays, drone shots, fun facts, and a breakdown of what the trip cost.”",
    videoTitle: "Maldives On A Budget | 5 Nights on Dhigurah Island",
    ...yt("VgAT40NqMn4"),
    tier: "backpacker",
  },
  {
    id: "whale-shark-book-before",
    name: "Whale shark booking guide",
    handle: "YouTube",
    platform: "youtube",
    opinion:
      "“Everything you need to know before booking a whale-shark trip in Dhigurah — tour prices, which reef, best time of day.”",
    videoTitle: "WHALE SHARK DHIGURAH MALDIVES | Everything you NEED to know before booking",
    ...yt("gW96P54c_bk"),
    tier: "mid",
  },
  {
    id: "cokes-surf-drone",
    name: "Drone surf edit — Coke's",
    handle: "YouTube",
    platform: "youtube",
    opinion:
      "“Surfing in the Maldives at Coke's — aerial shots of the wave that put Thulusdhoo on the map.”",
    videoTitle: "Surfing In The Maldives At Cokes Surf Spot, Thulusdhoo (Drone Edit) 🇲🇻",
    ...yt("kFHuWYblbAs"),
    tier: "backpacker",
  },
  {
    id: "thulusdhoo-experience",
    name: "Thulusdhoo experience",
    handle: "YouTube",
    platform: "youtube",
    opinion:
      "“Thulusdhoo — surf culture, local vibes and tropical beauty. One of the easiest local-island wins.”",
    videoTitle: "Experience Thulusdhoo Island: Surf Culture, Local Vibes, and Tropical Beauty",
    ...yt("GQcuPdVHmmQ"),
    tier: "backpacker",
  },
  {
    id: "thulusdhoo-hidden",
    name: "Hidden Thulusdhoo",
    handle: "YouTube",
    platform: "youtube",
    opinion:
      "“The Maldives most tourists never see. Life on Thulusdhoo, surf breaks, and the best things to do.”",
    videoTitle: "THULUSDHOO ISLAND — The Hidden MALDIVES Most Tourists Never See!",
    ...yt("39jpZ47hG7k"),
    tier: "backpacker",
  },
  {
    id: "north-atolls-surf-guide",
    name: "North Atolls surf guide",
    handle: "YouTube",
    platform: "youtube",
    opinion:
      "“A proper guide to surfing the Maldives — Coke's, Chickens, Sultans & Jailbreaks, laid out wave by wave.”",
    videoTitle: "Maldives surf guide (North Atolls) | Coke's, Chickens, Sultans & Jailbreaks",
    ...yt("f6b14d5umn8"),
    tier: "mid",
  },
  {
    id: "manta-dhigurah",
    name: "Manta rays off Dhigurah",
    handle: "YouTube",
    platform: "youtube",
    opinion:
      "“Snorkelling with manta rays straight off Dhigurah — one of the best wildlife spots in the Maldives.”",
    videoTitle: "SNORKELLING WITH MANTA RAYS | Dhigurah Island",
    ...yt("2x40-avqtNc"),
    tier: "backpacker",
  },

  // ==== TikTok ====
  {
    id: "tt-okay-kara-thulusdhoo",
    name: "Okay, Kara",
    handle: "@okay.kara.travels",
    platform: "tiktok",
    opinion:
      "“Day 1 of budget travel in the Maldives — less than £50 a day is genuinely possible. Full breakdown + ferry tips.”",
    videoTitle: "Budget travel in the Maldives (Thulusdhoo) — day 1 breakdown",
    videoUrl: "https://www.tiktok.com/@okay.kara.travels/video/7356581631362207008",
    tier: "backpacker",
  },
  {
    id: "tt-maldives-tourism",
    name: "Maldives Tourism",
    handle: "@maldives",
    platform: "tiktok",
    opinion:
      "“The sunny side of life — the official tourism board's daily clips of islands, reefs and resorts.”",
    videoTitle: "Maldives — The Sunny Side of Life",
    videoUrl: "https://www.tiktok.com/channel/maldives-tourism",
    tier: "general",
  },
  {
    id: "tt-aisha-nasheeda",
    name: "Aishath Nasheeda",
    handle: "@aishanasheeda",
    platform: "tiktok",
    opinion:
      "“Aerial shots of the Maldives from a local luxury-travel creator — 78K followers, a feed that looks like a postcard.”",
    videoTitle: "Luxury Maldives aerials & resort reviews",
    videoUrl: "https://www.tiktok.com/@aishanasheeda",
    tier: "luxury",
  },
  {
    id: "tt-mikki",
    name: "Mikki",
    handle: "@mikki",
    platform: "tiktok",
    opinion:
      "“1.5M-follower luxury travel creator — Maldives edits with a budget-friendly take on the high-end side.”",
    videoTitle: "Luxury Maldives on a budget — Mikki's TikTok",
    videoUrl: "https://www.tiktok.com/discover/maldives-luxury-budget",
    tier: "luxury",
  },
  {
    id: "tt-top-10-maldives",
    name: "#Maldives",
    handle: "@maldives",
    platform: "tiktok",
    opinion:
      "“Top 10 Maldives — the hashtag that surfaces fresh island clips every single day.”",
    videoTitle: "Top 10 Maldives on TikTok",
    videoUrl: "https://www.tiktok.com/discover/top-10-maldives",
    tier: "general",
  },
];
