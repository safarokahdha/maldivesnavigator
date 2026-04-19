import { creators } from "@/data/creators";
import { CreatorCard } from "@/components/CreatorCard";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata = {
  title: "Voices — YouTube & TikTok — Maldives Compass",
  description:
    "Real YouTubers and TikTok creators making Maldives content. Honest quotes, direct links to every video.",
};

export default function CreatorsPage() {
  const youtube = creators.filter((c) => c.platform === "youtube");
  const tiktok = creators.filter((c) => c.platform === "tiktok");

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10">
      <SectionHeading
        eyebrow="Voices"
        title="The internet's Maldives"
        sub="An evolving wall of real creators — their angle on the Maldives, and the video that proves it. Scraped weekly. Swap opinions for verbatim quotes as you go."
      />

      <h2 className="mt-20 font-display text-3xl font-semibold text-ocean md:text-4xl">On YouTube</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {youtube.map((c) => (
          <CreatorCard key={c.id} creator={c} />
        ))}
      </div>

      <h2 className="mt-20 font-display text-3xl font-semibold text-ocean md:text-4xl">On TikTok</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tiktok.map((c) => (
          <CreatorCard key={c.id} creator={c} />
        ))}
      </div>

      <div className="mt-24 rounded-[28px] border border-ocean/10 bg-surface p-8 shadow-[0_1px_0_rgba(10,42,51,0.05)] md:p-10">
        <div className="eyebrow">For creators</div>
        <h3 className="mt-3 font-display text-3xl font-semibold text-ocean md:text-4xl">Made a Maldives video?</h3>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
          We feature independent creators telling honest, positive stories about the Maldives —
          resort reviews, budget guides, dive clips, cultural vlogs. Send us your link and we'll
          add you to the wall.
        </p>
        <a
          href="mailto:hello@maldivescompass.com"
          className="mt-6 inline-flex rounded-full bg-ocean px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-ocean-deep"
        >
          Submit your video →
        </a>
      </div>
    </div>
  );
}
