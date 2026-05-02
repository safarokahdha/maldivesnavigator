# Changelog

## 2026-05 — audit fixes (phases 1, 2, 3 complete except where noted)

### Phase 1 — credibility-critical
- Filtered 7 broken journal slugs from `sitemap.xml` (orphaned cron metadata).
- Removed "Editor portrait — TODO" placeholder from `/about`.
- Reset partners scarcity counter from "47 of 50" → honest "50 of 50 available".
- De-duplicated Boutique Beach: one Dhigurah listing (7 rooms, owner Romney Drury, PADI 5★). Old slugs (`/stays/boutique-beach-hangnaameedhoo`, `/stays/boutique-beach-dhigurah`) → 301 redirect to canonical `/stays/boutique-beach`.
- Hulhumalé/airport copy corrected — Hulhulé is the airport island; Hulhumalé connects via the Sinamalé causeway. Updated `/destinations/hulhumale` and `/stays/ui-inn-hulhumale`.
- Fuvahmulah Dive School: "Rasgetheemu" (in Raa Atoll, ~1,000 km north of Fuvahmulah) → "Tiger Harbour" (real thresher site on Fuvahmulah's north plateau).

### Phase 2 — structural cleanup
- **2.1 De-duplication.** Stays count: 92 → 76. Deleted 14 duplicate/alias entries from `stays.ts`. Added 12 × 301 redirects in `next.config.ts`.
- **2.4 Transfer-info corrections** against official property sources:
  - Coco Bodu Hithi: 40 min → 35 min private speedboat.
  - Soneva Fushi: 65 → 64 villas; inclusion = `AI` (Soneva Unlimited).
  - Cheval Blanc Randheli: 5 → 6 islands (Noonu Atoll).
  - Four Seasons Kuda Huraa: 30 min "or short seaplane" → 25 min speedboat-only.
  - St. Regis Vommuli: corrected to shared seaplane (~45 min, $870 return per person).
- **2.5 Ferry information.** Cleared all hardcoded `ferryDays` arrays — schedules change. Each `howToGetHere` step that references public transport now flags "Check current MTCC timetable before travel". MTCC route numbers added: 309 (Maafushi/Gulhi), 308 (Thulusdhoo/Huraa), 306 (Fulidhoo, ~3h 20min), 301 (Rasdhoo/Ukulhas/Mathiveri/Feridhoo/Maalhos/Himandhoo).
- **2.6** Removed "Manta season peaks in Baa" from generic monthly-weather table (only Dharavandhoo has the bespoke manta context as inline copy).
- **2.7** Dharavandhoo "Where to stay" populated — Reethi Beach Resort, Vakkaru Maldives, Four Seasons Landaa Giraavaru linked to the `dharavandhoo` islandSlug. Fuvahmulah islandDetails entry written end-to-end.
- **2.8** Stripped all `"Editorial content coming."` placeholder copy from `islandDetails.ts` and `stayDetails.ts`. `PLACEHOLDER_PREFIX` and `PLACEHOLDER_NOTICE` set to empty string.
- **2.10** Credited "Wout of the World" for video `4_tDJzSKTTg` (was generic "Independent travel vlogger"). Other video creator names still pending.
- **2.11** Tax / fee disclosure under every StayCard price: "Indicative — see full rates incl. 17% GST + Green Tax + 10% service".
- **2.9** /stays default view groups by tier (Backpacker → Mid → Luxury → Ultra), alphabetised within tier; section headers + per-tier counts.

### Phase 3 — substance build-out
- **3.1** Editorial bodies for all three seed journal articles (`first-timer-guide-2026`, `whale-sharks-dhigurah`, `maafushi-48-hours`). 2,000+ words total.
- **3.2** Humanized 2-paragraph editorial takes for **all 58 stayDetails entries** — backpacker, mid, luxury, and ultra. Voice: real differentiators, named details, "best for / skip if".
- **3.3** Humanized `whyGoHere` editorial for all **15 destinations**. Voice rules followed: confident, specific, local. No "paradise / dream / fairytale".
- **3.4** Brand promise softened — "Reported from the islands" → "Editorial guide in beta". Owner can upgrade to Option A once substance lands.

### Out of scope this round (kept for follow-up)
- **2.2** Stay22 widgets in place of manual prices.
- **2.3** Property-specific photography. Spec recommends emailing owners; user instructed Booking/Agoda hotlinking but those terms forbid reuse — flagged for separate decision.
- **2.10** Channel names for remaining 3 voices (`vjTKNVbDWOc`, `fwEqlY06XbI`, `RILhmAABm9E`).
- **2.12** Holiday Island Resort operating-status verification.

### Site stats after this audit
- Stays: 76 (was 92).
- Destinations: 15 (all with full content).
- Journal seed articles: 3 (all with bodies).
- Sitemap: clean (no broken journal slugs, no duplicate stay entries).
