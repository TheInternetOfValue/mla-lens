import type { TrendSignal } from "@/lib/mla-lens/homepage/trends";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface TrendStripProps {
  trends: TrendSignal[];
}

const directionStyles: Record<TrendSignal["direction"], string> = {
  up: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
  down: "border-rose-500/20 bg-rose-500/10 text-rose-300",
  flat: "border-zinc-700 bg-zinc-900 text-zinc-300",
};

export function TrendStrip({ trends }: TrendStripProps) {
  return (
    <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {trends.map((trend) => (
        <Card key={trend.key} className="border-zinc-800 bg-zinc-950/70">
          <CardContent className="space-y-3 p-4">
            <Badge className={`rounded-full border ${directionStyles[trend.direction]}`}>
              {trend.direction}
            </Badge>
            <div>
              <h3 className="text-sm font-semibold text-white">{trend.label}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                {trend.summary}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
