import { islands } from "@/data/islands";
import { stays } from "@/data/stays";
import { transfers } from "@/data/transfers";
import { activitiesByIsland } from "@/data/activities";
import { PlanWizard } from "@/components/PlanWizard";

export const metadata = {
  title: "Plan a trip — Maldives Navigator",
  description:
    "From airport to water villa in 5 steps. Pick your tier, island and stay — we'll deep-link you into live flight and hotel prices and tell you exactly how you'll get there.",
};

export default function PlanPage() {
  return (
    <PlanWizard
      islands={islands}
      stays={stays}
      transfers={transfers}
      activitiesByIsland={activitiesByIsland}
    />
  );
}
