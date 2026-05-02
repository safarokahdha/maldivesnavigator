import type { Metadata } from "next";
import { Suspense } from "react";
import { stays } from "@/data/stays";
import { PlanForm } from "@/components/PlanForm";

export const metadata: Metadata = {
  title: "Plan a trip — Maldives Navigator",
  description:
    "Build a Maldives trip in five questions. Tier, dates, length, origin — we line up stays, transfers, and a flight estimate.",
  alternates: { canonical: "/plan" },
};

export default function PlanPage() {
  return (
    <Suspense fallback={null}>
      <PlanForm stays={stays} />
    </Suspense>
  );
}
