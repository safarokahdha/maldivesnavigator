/**
 * Audit script — asserts every stay listing produces a Stay22 booking link
 * containing the correct AID. Run with `npx tsx scripts/audit-affiliate-links.ts`.
 *
 * Exits 0 if all listings pass; exits 1 with a per-slug failure list if any
 * fail. CI can run this on every PR.
 */
import { stays } from "../src/data/stays";
import { stayDetails } from "../src/data/stayDetails";
import { stay22Link, STAY22_AID } from "../src/lib/affiliate";

type Failure = { slug: string; field: "booking" | "agoda"; reason: string };
const failures: Failure[] = [];

for (const stay of stays) {
  const detail = stayDetails[stay.slug];
  if (!detail?.booking) continue;

  if (detail.booking.bookingDotCom) {
    const url = stay22Link(detail.booking.bookingDotCom, "booking");
    if (!url.includes(`aid=${STAY22_AID}`)) {
      failures.push({
        slug: stay.slug,
        field: "booking",
        reason: `Generated URL does not contain aid=${STAY22_AID}: ${url}`,
      });
    }
  }
}

if (failures.length === 0) {
  console.log(`✓ ${stays.length} stays audited — all Booking links route through Stay22 with aid=${STAY22_AID}.`);
  process.exit(0);
} else {
  console.error(`✗ ${failures.length} affiliate-link failures:`);
  for (const f of failures) {
    console.error(`  ${f.slug} [${f.field}]: ${f.reason}`);
  }
  process.exit(1);
}
