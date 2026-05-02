# Session summary — Maldives Navigator v1 rebuild

Build sequence per `build.md` §15 (21-day plan). All 21 days touched
in code; remaining work is owner-side verification + content fill.

Last deployment: `dpl_9kZHwPjriTrbAEwADfwJHtCfErBx` → live at
https://maldivesnavigator.com / https://www.maldivesnavigator.com.

---

## Done in this session

### Day 1 — Scaffold + design tokens + layout shell + legal stubs
- Tier rename across 7 files: `budget` → `backpacker`
- Created: `src/components/Header.tsx`, `Footer.tsx`, `Analytics.tsx`,
  `BeehiivEmbed.tsx`, `LiteYouTube.tsx`, `AffiliateDisclosure.tsx`,
  `src/lib/affiliate.ts`
- Created routes: `/about`, `/subscribe`, `/legal/{privacy,terms,disclosure}`,
  `/voices` (initially redirect-stub, became real on Day 13)
- Refactored `src/app/layout.tsx` — drop inline header/footer + SearchBar,
  mount new components, expanded `metadata` (template, twitter, canonical,
  metadataBase)
- Added redirect `/stays/budget` → `/stays/backpacker` in `next.config.ts`

### Day 2 — Homepage to brief §5.1 spec
- Created `src/components/HomeHero.tsx` — full-bleed bg, "VOLUME 01 · 2026"
  label, rotating headline (3 variants, 4.5s cycle), inline Beehiiv compact
- Replaced `src/app/page.tsx` — 8 sections per brief: hero, 4 tiers,
  6 islands, journal preview, 4 voices, newsletter, shop tease, footer

### Day 3 — Island template + 6 Phase-1 islands
- Created `src/data/islandDetails.ts` — `IslandDetail` type + Essentials +
  shared `MALDIVES_WEATHER` constant + records for Maafushi · Thulusdhoo ·
  Dhigurah · Rasdhoo · Fulidhoo · Mathiveri
- Added Mathiveri to `src/data/islands.ts`
- Rewrote `src/app/destinations/[slug]/page.tsx` — 11-section template
  (hero, essentials, why go, where to stay, things to do, food & life,
  culture, how to get here, when to visit, related journal, plan CTA)

### Day 4 — Stay template + 20 backpacker stays
- Created `src/data/stayDetails.ts` — full schema per brief §6
- Appended 20 brief-spec backpacker records to `src/data/stays.ts`
- Created `src/app/stays/[slug]/page.tsx` — 7-section template
  (hero, at-a-glance, editorial take, photos gated to Verified+,
  Stay22 booking buttons, also consider, verified-by)
- Removed `src/app/stays/[tier]/page.tsx`; logic moved to query params
- Updated `StayCard` to link to `/stays/{slug}` + view-details footer
- Updated TierCard `/stays?tier={t}`

### Day 5 — Filters
- Created `src/components/IslandFilterBar.tsx` (client) — sticky,
  5 style chips + atoll dropdown + clear + result count
- Created `src/components/StayFilterBar.tsx` (client) — tier chips,
  atoll, type, price slider, 6 feature toggles, clear-all
- Rewrote `/destinations/page.tsx` + `/stays/page.tsx` to read all
  filter params, filter, render filter bar + grid

### Day 6 — About + Partners polish
- Confirmed `/about` matches §5.7 spec from Day 1
- Rewrote `/partners` for §5.8: hero copy, **Founding 50 banner**
  (47 of 50 hardcoded), full **tier comparison table** (Free $0 ·
  Verified $99/yr · Featured $299/yr · Sponsor custom), removal-request
  mailto card
- Updated `partners/PartnerForm.tsx` — added Tier interest dropdown,
  Photos input (multi-file, up to 8), `enctype="multipart/form-data"`
- Updated `partners/actions.ts` — added optional Resend integration
  (env-gated), photo filenames captured in submission

### Day 7 — Stay22 + Plausible + Beehiiv wiring
- Probed Stay22 docs publicly; Allez URL pattern login-gated. Code
  uses best-guess `https://www.stay22.com/allez/booking?aid=safarey&link=…`
  pattern with TODO to verify
- Note: Stay22 doesn't list Agoda as a supplier → Agoda link is a
  passthrough (no commission today)
- `BeehiivEmbed.tsx` reads `NEXT_PUBLIC_BEEHIIV_PUB_ID` (swap-without-redeploy)
- Added inline newsletter strip on `/destinations/[slug]` and
  `/stays/[slug]` per brief §11
- Created `.env.example` documenting all env vars

### Day 8 — /plan progressive form
- Created `src/data/flightCosts.ts` — 9 continent estimates + 50 country list
- Created `src/components/PlanForm.tsx` (client) — single-page progressive
  form per brief §5.6: tier (4 visual cards), when (3 chips), how-long
  (4–21 day slider), where-from (country dropdown), results panel
- Replaced multi-step PlanWizard import; wizard file kept on disk

### Day 9 — /subscribe polish
- Added "Read a sample issue →" link → `/journal` (TODO: swap to Beehiiv archive)

### Day 10 — Phase-2 islands
- Added 4 islands to `data/islands.ts`: hangnaameedhoo, hulhumale,
  huraa, dharavandhoo
- Added 6 detail records (gulhi, hangnaameedhoo, hulhumale, huraa,
  dharavandhoo, ukulhas)
- All 12 brief launch islands now fully populated

### Days 11–12 — Mid + Luxury + Ultra stays
- Appended 15 mid + 15 luxury + 10 ultra records (40 total) per brief §7
- Wrote `resort()` helper to keep 40 detail records concise

### Day 13 — Voices
- Added `VoiceFeature` type + `asVoiceFeature()` + `voiceFeatures()` to
  `data/creators.ts` per brief §9
- Rewrote `/voices/page.tsx` from redirect-stub → real index page using
  `<LiteYouTube />` + editorial captions
- Deleted `/creators` folder; redirect `/creators` → `/voices` added

### Day 14 — SEO + structured data
- Created `src/components/JsonLd.tsx` — escape `<`, `>`, `&`, U+2028, U+2029
- `/destinations/[slug]` emits `BreadcrumbList` + `TouristDestination` JSON-LD
- `/stays/[slug]` emits `BreadcrumbList` + `LodgingBusiness` JSON-LD
  (priceRange, rooms, address)
- `/journal/[slug]` emits `BreadcrumbList` + `Article` JSON-LD
  (datePublished, author, publisher) + improved `generateMetadata`
- All other routes already had per-page metadata

### Day 18 — Image audit
- Verified `priority` only on first hero per route
- All `<Image fill>` calls have `sizes`

### Days 15, 16, 17, 19, 20, 21 — `LAUNCH-CHECKLIST.md`
- Mobile QA matrix per page
- Lighthouse run plan + likely-fix list
- Cross-browser risks
- Day-19 placeholder/copy sweep list
- Day-20 deploy command
- Day-21 triage buckets
- Brief §16 final scorecard

### Final deploy
- `vercel deploy --prod` → `dpl_9kZHwPjriTrbAEwADfwJHtCfErBx`
- All 11 sample routes return 200 on https://maldivesnavigator.com

---

## Pending — owner side

### Stay22 verification
- Log in to `hub.stay22.com` → confirm exact Allez URL pattern
- If different from current `https://www.stay22.com/allez/booking?aid=safarey&link=…`,
  edit `STAY22_BASE` constant in `src/lib/affiliate.ts`
- Click-test one Booking.com link end-to-end; verify AID `safarey`
  registers in Stay22 dashboard
- Decide on Agoda: keep as direct link (no commission today), or wire a
  native Agoda affiliate ID — edit `agodaLink()` in `src/lib/affiliate.ts`

### Vercel env vars to set (Production + Preview)
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=maldivesnavigator.com` — turns on Plausible
- `NEXT_PUBLIC_BEEHIIV_PUB_ID=…` — once Beehiiv account is provisioned
- `RESEND_API_KEY=…` (optional) + `PARTNERS_NOTIFY_TO=hello@maldivesnavigator.com`
  (optional) — partners form falls back to mailto without these
- `BLOB_READ_WRITE_TOKEN=…` — already set; required for journal/shop/partners

### Editorial content owner must write
Brief §8 says editor writes these; code stubs mark them with
`[Editorial content coming]`:

**Per-island (12 islands × ~1500–2000 words each)** in `src/data/islandDetails.ts`:
- `whyGoHere` — ~200 words editorial
- `foodAndLife` — ~100 words naming 3 specific places
- `cultureAndEtiquette` — local-island notes (dress, alcohol, prayer, bikini-beach)

**Per-stay (60 stays)** in `src/data/stayDetails.ts`:
- `editorialTake` — 200-word opinionated paragraph (today: factual placeholder)
- Set `isPlaceholder: false` once real opinion lands
- For Verified+ tier: populate `gallery: [...]` with property photos and
  set `verified: true`, `verifiedDate: "YYYY-MM-DD"`, `verifiedBy: "Mohamed Waris"`,
  `listingTier: "verified"`/`"featured"`/`"sponsor"`

### Page placeholders to replace
- `src/app/about/page.tsx` — Editor portrait block ("Editor portrait — TODO").
  Drop a real photo at `/public/images/editor.jpg` and replace the gradient block.
- `src/app/subscribe/page.tsx` — 2 testimonials marked "Placeholder testimonials".
- `src/app/legal/privacy/page.tsx` + `legal/terms/page.tsx` — Coral TODO
  banners. Generate finalised text via Termly or Iubenda; name Safarokahdha
  LLC as data controller.
- `src/data/creators.ts` — opinion summaries are scraped; replace with verbatim
  creator quotes once each video has been watched in full.

### Voices videos
- `data/creators.ts` has 7 YouTube creators with real video IDs / opinions.
  Owner verifies each video URL is still live and that opinion text is fair.
  Replace any stale URL.

### QA to run on real devices (per `LAUNCH-CHECKLIST.md`)
- Day 15 mobile QA: iPhone Safari + Android (Pixel/Galaxy). Walk every page.
- Day 16 Lighthouse: target 90+ on Performance, A11y, Best Practices, SEO
  for at least `/`, `/destinations/maafushi`, `/stays/crown-beach-hotel-maafushi`,
  `/plan`, `/journal` (if any post)
- Day 17 cross-browser: Safari 17, Chrome, Firefox 130+, mobile Safari, Chrome Android

### Soft launch + bug-fix
- Day 20: share live URL with ~20 trusted readers, request feedback
- Day 21: triage feedback into bugs / copy / feature requests; fix bugs, batch
  copy, log feature requests for v2

### Open questions still pending owner answer (from pre-flight)
1. Confirm design tokens — using existing palette (`#0a3b4a` ocean,
   `#0891b2` lagoon, etc.); change in `globals.css` if not approved
2. Confirm Beehiiv publication ID timing
3. Stay22 link format (see above)
4. Plausible domain wiring (see above)
5. Resend or alt for partners form

### v2 backlog (deliberately out of scope per brief §14)
- User accounts, login, saved itineraries
- Direct booking + payment processing
- Public review submission
- Comments / forums
- Multi-language (English-only for v1)
- Mobile app / PWA
- Live chat
- Business analytics dashboard for paid listees
- Full-text search
- Stripe / payment integration

---

## Repo state notes

- Build passes (`npm run build` clean)
- 15 islands SSG'd (12 brief launch list + 3 bonus)
- 88 stay slugs SSG'd (60 brief-spec + 28 legacy retained — dedupe in v2)
- `/stays`, `/destinations`, `/plan` are dynamic (`ƒ`) — read query params
- All other public pages static (`○`)

## Files / dirs touched

```
src/app/
  about/page.tsx                         (created)
  destinations/[slug]/page.tsx           (rewritten — 11 sections + JSON-LD)
  destinations/page.tsx                  (rewritten — filters)
  journal/[slug]/page.tsx                (added JSON-LD + improved metadata)
  layout.tsx                             (refactored, expanded metadata)
  legal/disclosure/page.tsx              (created)
  legal/privacy/page.tsx                 (created — placeholder)
  legal/terms/page.tsx                   (created — placeholder)
  page.tsx                               (rewritten — homepage to spec)
  partners/PartnerForm.tsx               (added tier dropdown + photos)
  partners/actions.ts                    (added Resend integration)
  partners/page.tsx                      (rewritten — Founding 50 + tier table)
  plan/page.tsx                          (rewritten — uses PlanForm)
  sitemap.ts                             (added stay routes + new pages)
  stays/[slug]/page.tsx                  (created — 7 sections + JSON-LD)
  stays/page.tsx                         (rewritten — filters)
  subscribe/page.tsx                     (created)
  voices/page.tsx                        (real index page)
src/components/
  AffiliateDisclosure.tsx                (created)
  Analytics.tsx                          (created)
  BeehiivEmbed.tsx                       (created)
  Footer.tsx                             (created)
  Header.tsx                             (created)
  HomeHero.tsx                           (created)
  IslandFilterBar.tsx                    (created)
  JsonLd.tsx                             (created)
  LiteYouTube.tsx                        (created)
  PlanForm.tsx                           (created)
  StayCard.tsx                           (linkified)
  StayFilterBar.tsx                      (created)
  TierBadge.tsx                          (links updated)
src/data/
  creators.ts                            (added VoiceFeature alias)
  flightCosts.ts                         (created)
  islandDetails.ts                       (created — 12 islands)
  islands.ts                             (added Mathiveri + 4 Phase-2)
  stayDetails.ts                         (created — 60 stays)
  stays.ts                               (tier rename + 60 brief records)
src/lib/
  affiliate.ts                           (created — Stay22 helper)
  partnersStore.ts                       (added tier + photo fields)
next.config.ts                           (redirects)
.env.example                             (created)
LAUNCH-CHECKLIST.md                      (created)
SESSION-SUMMARY.md                       (this file)
```

## Files protected — not touched

- `src/app/journal/page.tsx` (only `[slug]/page.tsx` got additive JSON-LD)
- `src/lib/journalStore.ts`
- `src/app/api/journal/generate/route.ts`
- `src/data/journal.ts`
- `vercel.json` cron entry
- `src/app/admin/*` (admin shell)
- `src/app/shop/*` (Amazon affiliate shop)
- `src/proxy.ts`
- `src/app/coming-soon/page.tsx`

— end —
