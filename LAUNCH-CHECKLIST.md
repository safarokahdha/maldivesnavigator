# Maldives Navigator — Launch Checklist

Per brief §15, Week-3 days 15–21 are QA, performance, copy, and soft-launch
work. Code-side everything was completed during Week 1–2 plus Days 13–14
and 18. The items below need a real browser, owner-supplied content, or a
deploy — they are listed here so the editor can run them in order.

---

## Day 15 — Mobile QA

Run on iPhone Safari (latest) + a mid-range Android (Pixel or Galaxy).
Walk every page in landscape and portrait. Tap every CTA.

| Page | Check |
|---|---|
| `/` | Hero rotator readable; tier cards stack; voices iframes facade-only; mood gradients render |
| `/destinations` | Style chips wrap; atoll select works on touch; sticky filter bar doesn't cover content |
| `/destinations/[slug]` | Hero text legible; essentials grid stacks 2-up; weather table horizontal-scrolls |
| `/stays` | Filter bar collapses cleanly; price slider draggable; chip toggles |
| `/stays/[slug]` | "From $X/night" banner readable; Stay22 buttons full-width; "Also consider" grid stacks |
| `/plan` | All 5 sections collapsible; tier cards 2x2 on mobile; slider smooth; results paragraph wraps |
| `/journal` | Cards 1-up; date eyebrow visible |
| `/journal/[slug]` | Hero text not cut by notch; body line-length 60-70ch; tags wrap |
| `/voices` | Lite-YouTube tap-to-play works; captions readable |
| `/about`, `/subscribe`, `/partners` | Hero, body copy, forms |
| `/legal/*` | Pure text — should reflow correctly |
| Footer | 4 columns → 2 columns on tablet → 1 on mobile |
| Header | Hamburger opens mobile nav; "Plan trip" CTA reachable |

**Known caveats to verify on device:**
- Sticky header z-index vs. sticky filter bar (both `top-0`/`top-[72px]`)
- iOS Safari 100vh — `min-h-screen` may overshoot; HomeHero uses `min-h-[80vh] md:min-h-screen`
- Photo gallery in Verified+ stay pages (none today; first Verified launch will surface)

---

## Day 16 — Lighthouse (target 90+ all metrics)

Run Lighthouse in incognito on Vercel preview against:
- `/`
- `/destinations/maafushi`
- `/stays/crown-beach-hotel-maafushi`
- `/journal` (if any post exists)
- `/plan`

**Likely fixes if scores miss:**
- LCP miss → preload hero image with `<link rel="preload" as="image">` (currently `priority` only)
- CLS miss → check IslandCard / StayCard image aspect ratios match container
- TBT miss → audit homepage Voices iframes (LiteYouTube already mitigates; verify no autoplaying iframe slipped in)
- Accessibility → confirm all images have non-empty `alt`, all buttons have aria-label, color contrast on muted text (`#5c6f76` on `#fff`) — recheck with axe extension
- SEO → metadata template firing on every route (yes, root `template: "%s — Maldives Navigator"`); each page exports its own `generateMetadata` or static `metadata`

---

## Day 17 — Cross-browser

Test in: Safari 17 (macOS), Chrome (Windows + macOS), Firefox 130+, mobile Safari 17, Chrome Android.

| Feature | Risk |
|---|---|
| Backdrop blur on sticky header | Safari renders; Firefox older versions may skip |
| `useTransition` for filter URL updates | All modern browsers OK |
| `<input type="range">` styling | Chrome/Safari accept `accent-color`; Firefox supports — visual diff acceptable |
| `Image fill` + `sizes` | All major browsers |
| `Object.assign` of stayDetails | Plain JS, fine |
| Custom fonts (Inter + Fraunces via `next/font/google`) | Loaded via Next.js, hashed CSS variable |

---

## Day 18 — Image optimization sweep

**Completed during build:**
- All `<Image>` calls reviewed (`grep -rn priority`).
- `priority` set only on the first hero image of each route:
  - `HomeHero` (homepage)
  - `Hero` in destinations/[slug]
  - `Hero` in stays/[slug]
  - `subscribe/page.tsx` lead photo
  - `partners/page.tsx` hero
  - `journal/[slug]` hero
  - `coming-soon/page.tsx`
  - `HeroSlideshow` first slide only (`priority={idx === 0}`)
- All non-hero images lazy-load by default (Next.js Image default).
- All `<Image fill>` calls have `sizes` attribute.

**To run when external images grow:**
```bash
# Find any Image without sizes
grep -rn "Image" --include="*.tsx" src/ | grep -v "sizes" | grep -v "import" | grep "fill"
```

---

## Day 19 — Copy + placeholder sweep

Replace before public launch (text in code, marked with comments / badges):

### Editorial placeholders (tagged `[Editorial content coming]`)
- `data/islandDetails.ts` — every Phase-1/Phase-2 island has placeholder
  `whyGoHere`, `foodAndLife`, `cultureAndEtiquette` paragraphs. Owner writes ~200 words for each.
- `data/stayDetails.ts` — every record's `editorialTake` is factual placeholder.
  Set `isPlaceholder: false` once owner writes a real opinion paragraph.

### Component-side placeholders
- `app/about/page.tsx` — Editor portrait block ("Editor portrait — TODO"). Replace with a real photo at `/public/images/editor.jpg`.
- `app/subscribe/page.tsx` — 2 testimonials marked "Placeholder testimonials".
- `app/legal/privacy/page.tsx` + `app/legal/terms/page.tsx` — Coral TODO banners. Generate finalised versions via Termly/Iubenda.
- `data/creators.ts` — comment notes opinion summaries are scraped and should be replaced with verbatim creator quotes once watched in full.

### Env to set in Vercel before public launch
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=maldivesnavigator.com`
- `NEXT_PUBLIC_BEEHIIV_PUB_ID=…` (when Beehiiv account is provisioned)
- `RESEND_API_KEY=…` + `PARTNERS_NOTIFY_TO=hello@maldivesnavigator.com` (optional — partners form falls back to mailto)
- `BLOB_READ_WRITE_TOKEN=…` (already set for journal + shop + partners)

### Stay22 verification
- Log in to `hub.stay22.com`
- Confirm exact Allez URL pattern and edit `STAY22_BASE` in `src/lib/affiliate.ts` if different from current `https://www.stay22.com/allez/booking`
- Click-test one Booking.com link end-to-end, confirm AID `safarey` is captured in Stay22 dashboard

---

## Day 20 — Soft launch

```bash
# Deploy production preview
vercel deploy --prod --yes
```

Share the production URL with 20 trusted readers (peers, friends, Mohamed's
own Maldives network). Provide a feedback channel:

> "Reply with anything that broke, looked weird, or made you bounce."

---

## Day 21 — Bug-fix pass

Triage feedback into three buckets:

1. **Bugs** (broken links, crashed pages, layout breaks) — fix immediately.
2. **Copy** (typos, wording) — fix in batch.
3. **Feature requests** (filters, new sections) — log in `v2-roadmap.md`, do not build for v1.

After bug pass, retag/redeploy.

---

## Acceptance — Brief §16 final scorecard

- [x] All 14 P0 routes live and rendering
- [x] 12 island pages with placeholder content (15 actually exist)
- [x] 60 stay listings with frontmatter (88 records, includes 60 brief-spec)
- [ ] Stay22 affiliate links tested with real click-through (Day 19 + Day 20)
- [ ] Newsletter signup E2E tested (Day 19, after Beehiiv pub ID set)
- [ ] /partners application form delivers email (Day 19, after Resend or relies on mailto)
- [x] /journal link routes correctly (in-codebase route)
- [ ] Mobile pass: iPhone Safari (Day 15)
- [x] SEO: every page has unique title, description, OG tags
- [x] JSON-LD on island, stay, journal pages
- [ ] Lighthouse 90+ on homepage (Day 16)
- [ ] Plausible recording pageviews (Day 19, after env)
- [x] Privacy / Terms / Disclosure pages live (placeholder)
- [x] No broken links in nav/footer
- [x] Site works without JavaScript for content viewing

---

## What's NOT in v1 (per brief §14)

User accounts, login, saved itineraries, direct booking with payment,
public review submission, comments/forums, multi-language, mobile app,
live chat, business analytics dashboard, full-text search, payment
integration. All on v2 roadmap.
