import type { ScoreCardData } from "@/data/mla-lens/types";

export const scoreCards: ScoreCardData[] = [
  {
    key: "funds",
    label: "Funds",
    value: 72,
    tone: "bg-amber-500/15 text-amber-300 border-amber-500/20",
    description: "Allocation vs visible completion signal",
  },
  {
    key: "development",
    label: "Development",
    value: 66,
    tone: "bg-sky-500/15 text-sky-300 border-sky-500/20",
    description: "Roads, water, schools, health coverage in the news",
  },
  {
    key: "sentiment",
    label: "Sentiment",
    value: 48,
    tone: "bg-rose-500/15 text-rose-300 border-rose-500/20",
    description: "Citizen complaints vs praise across public signals",
  },
];
