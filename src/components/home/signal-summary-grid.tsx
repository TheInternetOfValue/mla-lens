import type { SignalSummaryCard } from "@/lib/mla-lens/homepage/types";

import { signalSummaryIcons } from "@/components/home/home-icons";
import { Card, CardContent } from "@/components/ui/card";

interface SignalSummaryGridProps {
  cards: SignalSummaryCard[];
}

export function SignalSummaryGrid({ cards }: SignalSummaryGridProps) {
  return (
    <div className="mt-10 grid gap-4 md:grid-cols-4">
      {cards.map((card) => {
        const Icon = signalSummaryIcons[card.key];

        return (
          <Card key={card.key} className="border-zinc-800 bg-zinc-950/70">
            <CardContent className="flex items-center gap-3 p-4">
              <Icon className={`h-5 w-5 ${card.toneClassName}`} />
              <div>
                <p className="text-sm text-zinc-400">{card.label}</p>
                <p className="font-medium text-white">{card.value}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
