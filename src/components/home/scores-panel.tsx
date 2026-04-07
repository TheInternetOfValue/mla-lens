"use client";

import { MetricCard } from "@/components/home/metric-card";
import { scoreCardIcons } from "@/components/home/home-icons";
import type { ScoreCardData } from "@/lib/mla-lens/homepage/types";

interface ScoresPanelProps {
  cards: ScoreCardData[];
}

export function ScoresPanel({ cards }: ScoresPanelProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <MetricCard
          key={card.key}
          description={card.description}
          icon={scoreCardIcons[card.key]}
          label={card.label}
          tone={card.tone}
          value={card.value}
        />
      ))}
    </div>
  );
}
