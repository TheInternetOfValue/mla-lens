import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Landmark,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { OverviewData } from "@/data/mla-lens";

interface OverviewPanelProps {
  overview: OverviewData;
}

export function OverviewPanel({ overview }: OverviewPanelProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <Card className="overflow-hidden border-zinc-800 bg-gradient-to-br from-zinc-950 via-zinc-950 to-zinc-900">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="border-zinc-700 bg-zinc-900 text-zinc-200">
                  {overview.constituency}
                </Badge>
                <Badge className="border-zinc-800 bg-zinc-950 text-zinc-400">
                  {overview.updatedAt}
                </Badge>
              </div>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
                {overview.score}/100
              </h1>
              <p className="mt-2 text-lg text-zinc-300">{overview.verdict}</p>
              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-zinc-400">
                <span className="inline-flex items-center gap-2">
                  <Landmark className="h-4 w-4" />
                  {overview.constituency}, {overview.district}
                </span>
                <span className="inline-flex items-center gap-2">
                  <UserRound className="h-4 w-4" />
                  {overview.mla}
                </span>
              </div>
            </div>
            <div className="grid min-w-[220px] gap-3">
              {overview.microInsights.map((item) => (
                <div
                  key={item.text}
                  className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4"
                >
                  <div className="flex items-start gap-3">
                    {item.type === "warning" ? (
                      <AlertTriangle className="mt-0.5 h-4 w-4 text-amber-300" />
                    ) : (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
                    )}
                    <p className="text-sm text-zinc-300">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-zinc-800 bg-zinc-950/70">
        <CardHeader>
          <CardTitle className="text-white">Fast read</CardTitle>
          <CardDescription className="text-zinc-400">
            The point is not perfect truth. The point is observable signal.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
            <p className="text-sm font-medium text-zinc-200">Weakest layer</p>
            <p className="mt-2 text-2xl font-semibold text-rose-300">
              Citizen Sentiment
            </p>
            <p className="mt-1 text-sm text-zinc-400">
              Complaint velocity still outweighs praise.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
            <p className="text-sm font-medium text-zinc-200">Strongest layer</p>
            <p className="mt-2 text-2xl font-semibold text-amber-300">
              Funds Signal
            </p>
            <p className="mt-1 text-sm text-zinc-400">
              Visible project progress is better than the public mood suggests.
            </p>
          </div>
          <Button className="w-full rounded-2xl bg-white text-black hover:bg-zinc-200">
            Explore full intelligence
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
