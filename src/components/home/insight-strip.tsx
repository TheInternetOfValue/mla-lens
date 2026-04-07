import type { Insight } from "@/lib/mla-lens/homepage/insights";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface InsightStripProps {
  insights: Insight[];
}

const toneStyles: Record<Insight["tone"], string> = {
  positive: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
  negative: "border-rose-500/20 bg-rose-500/10 text-rose-300",
  neutral: "border-zinc-700 bg-zinc-900 text-zinc-300",
};

export function InsightStrip({ insights }: InsightStripProps) {
  return (
    <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {insights.map((insight) => (
          <Card key={insight.id} className="border-zinc-800 bg-zinc-950/70">
            <CardContent className="space-y-3 p-4">
              <Badge className={`rounded-full border ${toneStyles[insight.tone]}`}>
                {insight.tone}
              </Badge>
              <div>
                <h3 className="text-sm font-semibold text-white">{insight.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {insight.description}
                </p>
                {insight.implication ? (
                  <p className="mt-3 text-xs leading-5 text-zinc-500">
                    Implication: {insight.implication}
                  </p>
                ) : null}
              </div>
            </CardContent>
          </Card>
      ))}
    </div>
  );
}
