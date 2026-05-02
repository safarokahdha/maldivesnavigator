# Maldives Navigator — Claude Code Build Brief

This is the rebuild brief for `maldivesnavigator.com`. The current site is a v0 prototype. This brief specifies the v1 you're rebuilding to.

**You are building a Next.js editorial-led travel discovery site for the Maldives.** The site looks like a magazine, monetizes through affiliate links and (later) listing fees, and is operated solo by the editor (Mohamed Waris, based in Malé).

---

## CRITICAL: things you must NOT touch

These are protected. Do not refactor, restructure, or rename them. The owner has set them up manually and will be unhappy if they break.

1. **The self-publishing journal subdomain/system.** It exists and is connected to maldivesnavigator.com. You will route to it from the journal nav link. You will NOT migrate journal posts into Next.js content.  
2. **The domain and DNS.** Do not change anything DNS-related.  
3. **Any existing affiliate integration with Stay22** if already wired into the prototype.

When in doubt about whether something falls under this list, **ask before changing it.** Better to confirm than to clobber a manual setup.

---

## 1\. Strategic context (why this site exists)

Maldives Navigator is an **editorial-led travel discovery site** for the Maldives. Not a booking engine. Not an OTA. Not a directory. The product is **trustworthy, opinionated curation** of every accommodation type in the Maldives — from $30/night local-island guesthouses to $5,000/night ultra-luxury private islands.

The competitive moat is:

- Locally edited (Mohamed lives in Malé)  
- Editorial voice (named opinions, not generic listings)  
- Honest pricing (every listing shows real prices)  
- Full price-spectrum coverage (most competitors ignore budget)

Revenue at launch comes **only from Stay22 affiliate commissions**. Listing fees, sponsored articles, and digital products are deferred to months 4+. Build the site assuming **affiliate links are the only revenue today** but **all four monetization streams will exist by month 12**.

---

## 2\. Tech stack (locked)

- **Framework:** Next.js (App Router)  
- **Language:** TypeScript  
- **Styling:** Tailwind CSS  
- **Content for stays/islands/static pages:** MDX or a lightweight content layer (Contentlayer, Velite, or `content/` folder with frontmatter — pick the simplest one that works with App Router)  
- **Journal:** Routes to the existing self-publishing journal at `/journal` (do not rebuild)  
- **Forms:** Use Beehiiv embed for newsletter signup (Beehiiv account will be set up separately)  
- **Analytics:** Plausible (privacy-friendly, no cookie banner needed). Add the Plausible script in `app/layout.tsx`.  
- **Image optimization:** Next.js `<Image />` everywhere. Source images from `/public/images/` initially, prepare for CDN migration later.  
- **Affiliate links:** Stay22 dynamic routing. Use a small client component that wraps property URLs and rewrites them through Stay22.  
- **Hosting:** Vercel (assume Vercel for build/deploy unless told otherwise)

**Do not introduce:** a CMS (no Sanity, no Contentful, no headless WordPress), a database (no Supabase, no Postgres for v1), user accounts, payments, search-as-a-service (no Algolia). Static \+ MDX is enough for v1.

---

## 3\. Information architecture — the locked URL structure

| Route | Purpose | Build priority |
| :---- | :---- | :---- |
| `/` | Homepage | P0 |
| `/destinations` | Index of all islands, filterable | P0 |
| `/destinations/[slug]` | Single island page (12 islands at launch) | P0 |
| `/stays` | Index of all stays, filterable | P0 |
| `/stays/[slug]` | Single stay detail page (60 stays at launch) | P0 |
| `/plan` | Single-page progressive trip planner (5 sections) | P1 |
| `/journal` | **Routes to existing self-publishing journal — do not rebuild** | P0 (just the link) |
| `/voices` | Curated YouTube creators \+ interviews | P2 |
| `/shop` | Digital products (placeholder for v1) | P2 |
| `/about` | Editor bio, mission, contact | P0 |
| `/partners` | "List your property" page for guesthouses/operators | P1 |
| `/subscribe` | Dedicated newsletter signup with lead magnet | P1 |
| `/legal/privacy` | Privacy policy | P0 |
| `/legal/terms` | Terms of service | P0 |
| `/legal/disclosure` | Affiliate disclosure | P0 |

**Build P0 in week 1, P1 in week 2, P2 in week 3\.** Do not build pages outside this list.

---

## 4\. Visual / brand direction

The current site already has the right aesthetic — keep that DNA. Specifically:

- **Tone:** Editorial, magazine-like. Not "tropical vacation site."  
- **Typography:** Serif for display headings (the current site uses something like a refined editorial serif — keep it). Sans-serif for body. No more than 2 fonts.  
- **Colors:** Restrained. Primary palette: deep navy or charcoal, warm cream/sand background, single accent color (current site uses a teal/aqua — keep). Avoid travel-industry clichés (no bright turquoise gradients, no sunset oranges).  
- **Imagery:** Full-bleed hero photographs. Editorial captions under each image with location and date when available.  
- **Whitespace:** Generous. The site should feel uncrowded.  
- **Motion:** Minimal. Subtle hover states, no animated decorations, no parallax.  
- **Mobile:** Mobile-first. Most travelers research on phones.

The reference aesthetic is Cereal Magazine, Suitcase Magazine, or Monocle's travel content. NOT TripAdvisor, NOT Booking.com, NOT generic Wordpress travel themes.

---

## 5\. Page-by-page specs

### 5.1 Homepage `/`

Sections in vertical order:

1. **Header** — sticky on scroll. Logo (left), nav (center: Destinations / Stays / Plan / Journal / Voices / Shop), CTA "Plan trip" button (right). Mobile: hamburger menu.  
     
2. **Hero section** — full-viewport-height on desktop, \~80vh on mobile. Background: cinematic Maldives photograph. Overlay text:  
     
   - Small label: "VOLUME 01 · 2026"  
   - Headline (rotating, 3 variants): "Find your Maldives." / "From $35 nights to private islands." / "Edited from Malé. Reported from the islands."  
   - Sub-headline: "An independent editorial guide to the 1,192 islands."  
   - Primary CTA: "Plan a trip" → `/plan`  
   - Secondary CTA: small "Subscribe to the journal" inline form (email field \+ button). On submit, sends to Beehiiv.

   

3. **The 4 tiers section** — 4 cards horizontal on desktop, stacked on mobile:  
     
   - **Backpacker** — "From $30/night. Local islands, guesthouses, ferry life." → links to `/stays?tier=backpacker`  
   - **Mid-range** — "$200–500/night. 4-star resorts, transfer included." → `/stays?tier=mid`  
   - **Luxury** — "$500–1,500/night. Overwater villas, name-brand resorts." → `/stays?tier=luxury`  
   - **Ultra-luxury** — "$1,500+/night. Private islands, seaplane transfers, butler service." → `/stays?tier=ultra`

   

4. **Featured islands section** — 6 island cards in a grid. Each card: hero image, island name, atoll, 1-line tag ("Surf · Budget"). Click → `/destinations/[slug]`. The 6 launch islands: Maafushi, Thulusdhoo, Dhigurah, Rasdhoo, Fulidhoo, Mathiveri.  
     
5. **From the journal** — 3 most recent journal posts (pulled from the existing self-publishing journal via RSS feed or static fetch — implement as a server component that reads the journal's RSS and renders the latest 3 cards). Each card: image, title, excerpt, "Read in journal →" link that opens the journal post in the same tab.  
     
6. **Voices (creators)** — 4 curated YouTube videos with editorial captions. For v1, render 4 hardcoded `<iframe>` embeds with caption text below each. Click → opens YouTube in new tab. Real curation list provided in Section 8 below.  
     
7. **Newsletter block** — full-width section with the lead magnet pitch: "The 8 Maldives Mistakes Tourists Make — free 12-page PDF when you subscribe." Inline Beehiiv form.  
     
8. **Shop tease** — 3 digital product cards with placeholder content for v1: "The Backpacker's Maldives" ($19), "Maldives in 7 Days: Mid-Range Plan" ($29), "Diver's Maldives" ($24). Click → `/shop/[slug]` placeholder pages reading "Coming soon — get notified" with email capture.  
     
9. **Footer** — 4-column on desktop:  
     
   - Col 1: Logo \+ tagline \+ social icons (Instagram, Pinterest, YouTube)  
   - Col 2: Site (Destinations / Stays / Plan / Journal / Voices / Shop)  
   - Col 3: About (About / Contact / Partners / Press)  
   - Col 4: Legal (Privacy / Terms / Affiliate Disclosure / Property Removal Request → mailto link)  
   - Bottom strip: "Maldives Navigator is published by Safarokahdha LLC. Edited from Malé. © 2026."

### 5.2 Destinations index `/destinations`

- Page header: "Destinations" \+ 1-line description  
- Filter bar (sticky on scroll): Atoll dropdown, Style chips (Surf / Dive / Budget / Luxury / Local-island)  
- Grid of island cards (12 at launch, room for more). Card content: hero image, name, atoll, 2-3 tag chips, 1-line description, price range ("From $XX/night")  
- No pagination needed at 12; add when \>24

### 5.3 Single island page `/destinations/[slug]`

This is the SEO moat — every island page must rank for "\[Island name\] Maldives guide." Sections in order:

1. **Hero** — full-bleed image, overlay: island name, atoll, tier chips, 1-line tagline  
2. **Essentials panel** — 6-cell grid of facts: Population · Transfer from Malé · Ferry days · Nearest dive site · Peak season · Local-island bikini beach (Y/N)  
3. **Why go here** — 200-word editorial paragraph (in MDX content)  
4. **Where to stay** — 4-6 stay cards from this island, click-through to `/stays/[slug]`  
5. **Things to do** — bullet list of 4-8 activities, with optional links to deeper articles in `/journal`  
6. **Food & life** — 100-word editorial paragraph naming 3 specific restaurants/cafes  
7. **Culture & etiquette** — local-island-specific (dress code, alcohol, prayer times, bikini-beach existence)  
8. **How to get here** — step-by-step transfer guide with cost (from Malé to this island)  
9. **When to visit** — monthly weather chart (simple table for v1, can upgrade to chart later)  
10. **Related journal articles** — 3 articles tagged with this island (pulled from journal RSS by tag)  
11. **Plan a trip CTA** — "Plan a trip to \[Island\] →" button that opens `/plan?island=[slug]` pre-filled

### 5.4 Stays index `/stays`

Filterable list of all 60 stays. Filters:

- **Tier** chips (Backpacker / Mid / Luxury / Ultra) — primary filter  
- **Atoll** dropdown  
- **Type** dropdown (Guesthouse / Resort / Dive lodge / Liveaboard)  
- **Features** checkboxes (Has water villas / Allows alcohol / Has house reef / Surf access / Dive center on-site / Child-friendly)  
- **Price** dual-handle slider ($30–$5,000/night)

Stay cards in grid. Card: hero image, name, tier badge, atoll, price range, 3-icon feature row, "View details →" link.

URL params should reflect filters (`/stays?tier=backpacker&atoll=south-male`) so filters are bookmarkable and shareable.

### 5.5 Single stay page `/stays/[slug]`

1. **Hero** — large property photo, overlay: name, tier chip, atoll, "From $XXX/night" price banner  
2. **At a glance** — 6-cell spec grid: Rooms · Transfer (type \+ cost \+ time) · Included (B\&B / HB / FB / AI) · Guest type · Dive on-site · Alcohol  
3. **The editorial take** — 200-word opinionated paragraph (in MDX). This is the differentiator. Default placeholder for unverified properties: a 2-sentence factual description.  
4. **Photos** — gallery of up to 12 (only show if Verified+ tier; otherwise show 1 hero photo only)  
5. **Book this stay** — 3 buttons routed via Stay22:  
   - "Check rates on Booking.com" (Stay22-routed)  
   - "Check rates on Agoda" (Stay22-routed)  
   - "Visit official site" (direct link, no commission)  
   - Below buttons: small text disclosure: "We earn a commission on bookings made through these links. The price you pay does not change."  
6. **Also consider** — 4 similar properties at same tier (matched by tier \+ atoll)  
7. **Verified by** — small footer-style block: "Verified by Mohamed Waris on \[date\]" — only shows on Verified+ tier listings

### 5.6 Plan trip page `/plan`

**Single-page progressive form. NOT a multi-step wizard. NOT separate pages.**

5 sections, all visible from the start. Each section can be collapsed/expanded but completed answers stay visible. No "Next" buttons; auto-advance on selection.

1. **What kind of Maldives are you here for?** — 4 large visual cards (Backpacker / Mid / Luxury / Ultra). Click one to select.  
2. **Roughly when?** — 3 chips: "This month" / "3–6 months out" / "6+ months out"  
3. **How long?** — slider 4–21 days  
4. **Where from?** — country dropdown (drives flight estimate; use a static lookup table for v1)  
5. **Results** — auto-rendered when sections 1–4 are complete:  
   - 1-paragraph trip outline ("A 7-day backpacker trip from Germany costs roughly $1,400 total...")  
   - 3 recommended stays (matched on tier)  
   - Flight cost estimate (rough range from country)  
   - Email capture: "Save this plan \+ get the 8 Maldives Mistakes PDF"

For v1, the recommendation logic is rule-based (not AI):

- Tier filter → matches stay tier  
- Activity inferred from tier (Backpacker → local islands; Diver wasn't asked here, defer to v2)  
- Recommendations are random from the matching tier pool  
- Flight estimate is from a static `flightCosts.ts` lookup file (continent-level, not airport-level)

### 5.7 About `/about`

Single page. Sections:

1. **Lead photo** — your face. Real photo. Not a stock illustration.  
2. **Headline:** "I'm Mohamed. I'm Maldivian. I built this guide because the existing English-language coverage of my country misses everything that makes it interesting beyond the resort brochures."  
3. **The mission** — 3 paragraphs: why this exists, what it covers, what it refuses to cover (no commodity booking, no fake reviews, no SEO spam)  
4. **How it's funded** — 1 paragraph stating affiliate revenue, listing fees, sponsored articles. Disclose all.  
5. **Editorial standards** — short bullet list: prices shown always, sponsorships labeled always, on-the-ground reporting always  
6. **Contact** — email, social  
7. **Publishing entity disclosure** — single line at the bottom: "Maldives Navigator is published by Safarokahdha LLC, edited from Malé."

### 5.8 Partners `/partners`

This is the "list your property" page. Sections:

1. **Hero:** "Get your property in front of motivated Maldives travelers."  
2. **Founding 50 banner** — countdown of remaining Founding Member spots. For launch, hardcode as "47 of 50 spots remaining."  
3. **Tier comparison table:**

| Feature | Free | Verified $99/yr | Featured $299/yr | Sponsor (custom) |
| :---- | :---- | :---- | :---- | :---- |
| Listed in directory | ✓ | ✓ | ✓ | ✓ |
| Photos | 1 | 8 | 12 | Unlimited |
| Description length | 200 chars | Unlimited | Unlimited | Unlimited |
| Verified badge | — | ✓ | ✓ | ✓ |
| Search priority | Standard | Boosted | Top of category | Top \+ Pinned |
| Homepage rotation | — | — | ✓ | ✓ |
| Editorial review article | — | — | ✓ | ✓ deep |
| Newsletter feature | — | — | 1×/yr | 1×/quarter |
| Voices interview | — | — | — | ✓ |
| Annual visit by editor | — | — | — | ✓ |

4. **CTA:** "Apply to be listed →" — opens a contact form with fields: Property name, Owner name, Email, WhatsApp, Tier interest (dropdown), Photos (file upload — accept up to 8), notes.  
5. **For v1, form submission goes to email** (not a database). Use a simple API route `/api/partners-application` that emails Mohamed via Resend or similar.  
6. **Property removal request** — small footer link: "Already listed and want to be removed? Email us." Direct mailto link.

### 5.9 Subscribe `/subscribe`

Dedicated capture page with the lead magnet pitch. Beehiiv embed form. Hero image. Below the fold: testimonials (placeholder for v1: just 2 hardcoded), what's in the newsletter, sample issue link.

### 5.10 Legal pages

Three pages, each generated from a template:

- `/legal/privacy` — GDPR-compliant privacy policy. Use Termly or Iubenda template, edit to name Safarokahdha LLC as data controller.  
- `/legal/terms` — basic terms of service.  
- `/legal/disclosure` — explicit affiliate disclosure: "Maldives Navigator earns commissions on bookings made through links on this site. The price you pay does not change. We label sponsored content explicitly."

For v1, **placeholder content is acceptable** with a TODO comment to replace before public launch.

---

## 6\. Data model (content as files, not database)

Use a `/content/` directory with this structure:

/content

  /islands

    maafushi.mdx

    thulusdhoo.mdx

    dhigurah.mdx

    ...

  /stays

    crown-beach-hotel-maafushi.mdx

    soneva-fushi.mdx

    ...

  /products

    backpackers-maldives.mdx

    ...

### Island MDX frontmatter schema

\---

slug: maafushi

name: Maafushi

atoll: South Malé Atoll

tagline: The most established budget island in the Maldives.

tiers: \[backpacker\]

styles: \[budget, local-island\]

heroImage: /images/islands/maafushi-hero.jpg

essentials:

  population: 3000

  transferFromMale: 30 minutes

  transferType: speedboat

  transferCost: 30

  ferryDays: \[Sun, Tue, Thu, Sat\]

  nearestDiveSite: Maafushi Reef

  peakSeason: Nov–Apr

  bikiniBeach: true

publishedAt: 2026-04-01

updatedAt: 2026-04-01

\---

Body of MDX \= the editorial sections (Why go here, Things to do, Food & life, Culture, How to get here, When to visit).

### Stay MDX frontmatter schema

\---

slug: crown-beach-hotel-maafushi

name: Crown Beach Hotel

island: maafushi

atoll: South Malé Atoll

tier: backpacker  \# backpacker | mid | luxury | ultra

type: guesthouse  \# guesthouse | resort | dive-lodge | liveaboard

priceLow: 65

priceHigh: 120

currency: USD

rooms: 18

features:

  waterVillas: false

  houseReef: false

  alcohol: false

  childFriendly: true

  diveCenter: true

  surfAccess: false

  allInclusive: false

transfer:

  type: speedboat

  cost: 30

  time: 30

booking:

  bookingDotCom: https://www.booking.com/hotel/...

  agoda: https://www.agoda.com/...

  official: https://crownbeachmaldives.com

heroImage: /images/stays/crown-beach-hero.jpg

gallery: \[\]  \# only populated for verified+

verified: false  \# set true when Founding Member onboarded

verifiedDate: null

verifiedBy: null

listingTier: free  \# free | verified | featured | sponsor

foundingMember: false

publishedAt: 2026-04-01

\---

Body of MDX \= the editorial take (200-word opinion paragraph). For unverified launch listings, it's a 2-sentence factual description with a `<!-- editorial:placeholder -->` comment so the editor knows to upgrade it later.

---

## 7\. The 60 launch listings — list to build

You asked me to decide. Here is the list. Build all 60 as basic listings (free tier) with factual MDX entries. Editorial-take paragraphs are placeholder ("Crown Beach Hotel is a long-running 18-room guesthouse on Maafushi's main beach, popular with European backpackers for its location and dive package.") to be edited later.

**Photos:** For unverified listings, use 1 stock photo of the island/atoll itself, NOT the property's marketing photos. Use Unsplash or Pexels with credit. Verified listings (post-Founding-Member onboarding) get the property's own photos.

### Backpacker tier (20 listings, $30–120/night)

**Maafushi (5 listings)**

1. Crown Beach Hotel  
2. Arena Beach Hotel  
3. Stingray Beach Inn  
4. Kaani Beach Hotel  
5. Triton Beach Hotel & Spa

**Thulusdhoo (4 listings)** 6\. Thulusdhoo Inn 7\. Season Paradise 8\. Coke's Beach Maldives 9\. Boutique Beach (Hangnaameedhoo overflow)

**Dhigurah (3 listings)** 10\. Cyrus Beach Inn 11\. Aveyla Manta Village 12\. Dhigurah Retreat

**Fulidhoo (3 listings)** 13\. Fulidhoo Inn 14\. Fulidhoo Sunrise Beach 15\. Thundi Guesthouse

**Other local islands (5 listings)** 16\. White Shell Island Hotel — Gulhi 17\. Lucky Hiya Maldives — Mathiveri 18\. Boutique Beach — Dhigurah/Hangnaameedhoo 19\. Bliss Dhigurah — Dhigurah 20\. UI Inn — Hulhumalé (transit option)

### Mid-range tier (15 listings, $200–500/night)

21. Summer Island Maldives — North Malé  
22. Adaaran Select Hudhuranfushi — North Malé  
23. Reethi Beach Resort — Baa Atoll  
24. Kuredu Island Resort — Lhaviyani  
25. Meeru Island Resort — North Malé  
26. Vilamendhoo Island Resort — South Ari  
27. Embudu Village — South Malé  
28. Bandos Maldives — North Malé  
29. Vilu Reef Beach Resort — Dhaalu  
30. Holiday Island Resort — South Ari  
31. Ellaidhoo Maldives by Cinnamon — North Ari  
32. Olhuveli Beach & Spa — South Malé  
33. Eriyadu Island Resort — North Malé  
34. Adaaran Club Rannalhi — South Malé  
35. Fihalhohi Island Resort — South Malé

### Luxury tier (15 listings, $500–1,500/night)

36. Conrad Maldives Rangali Island — South Ari  
37. Niyama Private Islands — Dhaalu  
38. Constance Halaveli — North Ari  
39. Anantara Veli — South Malé  
40. Six Senses Laamu — Laamu  
41. The Residence Dhigurah — Gaafu Alifu  
42. Velaa Private Island — Noonu (lower lux pricing tier)  
43. Baros Maldives — North Malé  
44. Kuramathi Island Resort — Rasdhoo  
45. Constance Moofushi — South Ari  
46. Lily Beach Resort — South Ari  
47. Centara Grand Island Resort — South Ari  
48. Vakkaru Maldives — Baa  
49. Coco Bodu Hithi — North Malé  
50. The Sun Siyam Iru Fushi — Noonu

### Ultra-luxury tier (10 listings, $1,500+/night)

51. Soneva Fushi — Baa  
52. Soneva Jani — Noonu  
53. Cheval Blanc Randheli — Noonu  
54. Waldorf Astoria Maldives Ithaafushi — South Malé  
55. One\&Only Reethi Rah — North Malé  
56. Joali Maldives — Raa  
57. Joali Being — Raa  
58. Four Seasons Resort Landaa Giraavaru — Baa  
59. Four Seasons Resort Kuda Huraa — North Malé  
60. The St. Regis Maldives Vommuli — Dhaalu

**Important:** Before publishing any listing, check each property's website for a "no republishing" or "do not list" notice. If found, **remove from list and replace with the next available property in that atoll/tier**. Maintain a `/content/_donotlist.md` file with names of any properties that ask for removal post-launch.

---

## 8\. The 12 launch islands — destination pages to build

In priority order (build first 6 first):

**Phase 1 (week 1):**

1. Maafushi (South Malé)  
2. Thulusdhoo (North Malé)  
3. Dhigurah (South Ari)  
4. Rasdhoo (North Ari)  
5. Fulidhoo (Vaavu)  
6. Mathiveri (North Ari)

**Phase 2 (week 2):** 7\. Gulhi (South Malé) 8\. Hangnaameedhoo (South Ari) 9\. Hulhumalé (transit gateway) 10\. Huraa (North Malé) 11\. Dharavandhoo (Baa) 12\. Ukulhas (North Ari)

For each, the body MDX needs \~1,500-2,000 words covering the 11 sections from the island page spec. **The owner will write these. Build the templates and stub out placeholder content for now.** Generate placeholder text that says "\[ISLAND\] is a \[tier\] island in \[atoll\]. Editorial content coming." in each section — clearly marked as placeholder.

---

## 9\. Voices section — 4 launch creators

Hardcode these YouTube embeds on the homepage Voices section (and on a `/voices` index page later). All 4 are real Maldives content creators on YouTube. Caption format: "\[Creator name\] — \[1-line editorial caption from us about why this video is worth watching\]."

The owner will choose specific videos. For now, build the component as a list of:

type VoiceFeature \= {

  id: string

  creatorName: string

  videoTitle: string

  videoUrl: string  // YouTube URL

  embedId: string  // YouTube video ID

  thumbnail: string

  editorialCaption: string  // our 1-line take

}

Stub with 4 placeholder entries — owner fills in real content later.

---

## 10\. Stay22 affiliate integration

The owner is approved on Stay22 with AID `safarey`.

**Implementation:**

Create a utility `lib/affiliate.ts`:

const STAY22\_AID \= "safarey"

export function stay22Link(propertyUrl: string): string {

  // Stay22 dynamic link routing

  // Input: a Booking.com or Agoda property URL

  // Output: a Stay22 link that routes optimally

  const encoded \= encodeURIComponent(propertyUrl)

  return \`https://www.stay22.com/allez/booking?aid=${STAY22\_AID}\&link=${encoded}\`

}

**Use the official Stay22 docs to confirm exact URL format** — the function above is illustrative. Read [https://docs.stay22.com](https://docs.stay22.com) or the Stay22 Hub Documentation page after login, and implement accordingly.

Apply this on every "Book on Booking.com" or "Check rates on Agoda" button on stay detail pages.

**Disclosure rule:** every page with a Stay22-routed link must have either inline disclosure ("We earn a commission on bookings made through these links") or footer disclosure visible. The `/legal/disclosure` page has the long version; pages just need a 1-liner.

---

## 11\. Newsletter integration

Newsletter is on Beehiiv. Owner will set up the Beehiiv publication. Build the integration as:

- Inline embed form on homepage hero (compact: just email input \+ button)  
- Inline embed form at the bottom of every island page  
- Inline embed form at the bottom of every stay detail page  
- Dedicated form on `/subscribe` with full lead magnet pitch  
- Inline form in footer on every page

For v1, render a placeholder Beehiiv embed with `data-beehiiv-publication-id="REPLACE_ME"` — owner will swap in the real publication ID.

---

## 12\. SEO setup

- Use Next.js metadata API. Every page exports `generateMetadata`.  
- Add `<title>` and `<meta description>` for every page.  
- Add OpenGraph \+ Twitter card metadata for social sharing.  
- Add JSON-LD schema:  
  - `LocalBusiness` schema for stay detail pages  
  - `Article` schema for journal posts (if rendering them)  
  - `BreadcrumbList` schema on island and stay pages  
- Generate `sitemap.xml` automatically (next-sitemap or similar).  
- Generate `robots.txt` allowing all crawlers, pointing to sitemap.  
- Canonical URLs on every page.  
- All images have descriptive alt text (use frontmatter `altText` field per image).

---

## 13\. Performance budget

- LCP under 2.5s on 4G  
- All hero images use Next.js Image with `priority` flag  
- All other images lazy-loaded  
- Total page weight under 1.5 MB on first load  
- Tailwind CSS purged in production  
- No third-party scripts beyond: Plausible, Beehiiv embed, Stay22 redirect, YouTube iframes (use lite-youtube-embed for performance)

---

## 14\. What to NOT build for v1

- User accounts, login, saved itineraries  
- Direct booking with payment processing  
- Public review submission  
- Comments / forums  
- Multi-language (English only)  
- Mobile app or PWA  
- Live chat  
- Business analytics dashboard for paid listees  
- Search-as-you-type or full-text search across the site (filters are enough)  
- Payment integration (Stripe etc.) — even for /shop, stub products as "coming soon"

If you find yourself wanting to add any of these, stop and ask the owner. They are all on the v2 roadmap and explicitly out of scope for v1.

---

## 15\. Build sequence (the only correct order)

**Week 1 — Foundation \+ P0 pages**

- Day 1: Project scaffold, design tokens, layout shell (header/footer/nav), legal pages stubbed  
- Day 2: Homepage built to spec  
- Day 3: Island page template \+ 6 island MDX stubs (Phase 1 islands)  
- Day 4: Stay detail page template \+ 20 stay MDX stubs (backpacker tier)  
- Day 5: Stays index \+ Destinations index with filters working  
- Day 6: About page \+ Partners page  
- Day 7: Stay22 integration tested live, Plausible installed, Beehiiv embed wired

**Week 2 — P1 \+ content fill**

- Day 8: /plan progressive form built and working  
- Day 9: /subscribe page built  
- Day 10: Add remaining 6 island pages (Phase 2\)  
- Day 11–12: Add remaining 40 stay listings (mid \+ luxury \+ ultra)  
- Day 13: Voices section component \+ placeholder data  
- Day 14: SEO meta \+ sitemap \+ structured data

**Week 3 — Polish \+ soft-launch ready**

- Day 15: Mobile QA on every page  
- Day 16: Lighthouse pass on every page (target: 90+ on all metrics)  
- Day 17: Cross-browser testing (Safari, Chrome, Firefox, mobile Safari)  
- Day 18: Image optimization sweep  
- Day 19: Final copy editing, replace all placeholder content owner has provided real text for  
- Day 20: Soft launch to private list of 20 friends/peers  
- Day 21: Apply feedback, fix bugs

---

## 16\. Acceptance criteria — done means done

The site is ready for soft launch when:

- [ ] All 14 P0 routes are live and rendering  
- [ ] 12 island pages exist with at least placeholder content in all 11 sections  
- [ ] 60 stay listings exist with at least the frontmatter populated  
- [ ] Stay22 affiliate links work and have been tested with a real click-through  
- [ ] Newsletter signup works end-to-end (test email lands in Beehiiv)  
- [ ] /partners application form delivers email to Mohamed  
- [ ] /journal link routes correctly to existing self-publishing journal  
- [ ] Mobile pass: every page works on iPhone Safari  
- [ ] SEO pass: every page has unique title, description, OG tags  
- [ ] Lighthouse: 90+ on Performance, Accessibility, Best Practices, SEO on homepage  
- [ ] Plausible analytics is recording pageviews  
- [ ] Privacy/Terms/Disclosure pages are live (even with placeholder text)  
- [ ] No broken links in the nav or footer  
- [ ] Site works without JavaScript for content viewing (progressive enhancement for filters)

---

## 17\. Things to ask Mohamed (the site owner) before starting

Pause and ask before any of the following:

1. **Is the existing self-publishing journal at `maldivesnavigator.com/journal` or a subdomain?** Confirm the URL pattern so the journal nav link routes correctly.  
2. **Confirm the design tokens** — extract them from the current site (colors, fonts, spacing) and confirm with owner before applying. Do not invent new ones.  
3. **Confirm Beehiiv publication ID** when ready to wire up newsletter.  
4. **Confirm the Stay22 link format** by reading their docs after login.  
5. **Confirm Plausible domain configuration** when installing analytics.  
6. **Get the Resend API key (or alternative)** for the partners application form email handler.

If any of the protected items in section "CRITICAL: things you must NOT touch" come up, stop and ask before changing.

---

## 18\. Owner's stated style preferences

- Direct, opinionated copy. No "discover paradise" travel-cliché writing.  
- Show prices everywhere. Honest pricing is the brand.  
- Always credit photos with location and date.  
- Sponsorships clearly labeled.  
- No fake "verified" badges — verification means something.

---

## 19\. Communication during build

- Surface decisions you can't reverse (URL structure changes, component-architecture forks) before making them  
- Don't refactor existing journal-related routes  
- Push small commits often; the owner reviews per-feature  
- If a section in this brief contradicts itself, ask — don't guess

— end of brief —  
