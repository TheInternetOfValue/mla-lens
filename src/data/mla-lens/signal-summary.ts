import type { SignalSummaryCard } from "@/data/mla-lens/types";

export const signalSummaryCards: SignalSummaryCard[] = [
  {
    key: "risk",
    label: "Top risk",
    value: "Water reliability",
    toneClassName: "text-amber-300",
  },
  {
    key: "positive",
    label: "Positive signal",
    value: "School improvements",
    toneClassName: "text-emerald-300",
  },
  {
    key: "watchlist",
    label: "Watchlist",
    value: "Health infra proof",
    toneClassName: "text-sky-300",
  },
  {
    key: "narrative",
    label: "Narrative gap",
    value: "Delivery vs complaints",
    toneClassName: "text-rose-300",
  },
];
