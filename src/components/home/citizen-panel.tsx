"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { CitizenSignal } from "@/data/mla-lens";

import { StatusBadge } from "@/components/home/status-badge";

interface CitizenPanelProps {
  items: CitizenSignal[];
  tones: readonly string[];
}

export function CitizenPanel({ items, tones }: CitizenPanelProps) {
  const [query, setQuery] = useState("");
  const [toneFilter, setToneFilter] = useState("All");

  const filteredItems = items.filter((item) => {
    const matchesTone = toneFilter === "All" || item.tone === toneFilter;
    const haystack = `${item.text} ${item.area} ${item.source}`.toLowerCase();
    const matchesQuery = haystack.includes(query.toLowerCase());

    return matchesTone && matchesQuery;
  });

  return (
    <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
      <Card className="border-zinc-800 bg-zinc-950/70">
        <CardHeader>
          <CardTitle className="text-white">People are saying</CardTitle>
          <CardDescription className="text-zinc-400">
            This is where PR starts sweating.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
            <p className="text-sm text-zinc-400">Sentiment score</p>
            <p className="mt-2 text-3xl font-bold text-white">48 / 100</p>
            <p className="mt-2 text-sm text-zinc-400">
              Complaints still dominate the public surface area.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
            <p className="text-sm text-zinc-400">Top issue</p>
            <p className="mt-2 text-lg font-semibold text-rose-300">
              Water + drainage reliability
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-zinc-800 bg-zinc-950/70">
        <CardHeader>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-white">Signal stream</CardTitle>
              <CardDescription className="text-zinc-400">
                Complaint, praise, mixed. Humans are messy. Good.
              </CardDescription>
            </div>
            <div className="relative w-full max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <Input
                placeholder="Search area or issue"
                className="rounded-2xl border-zinc-800 bg-zinc-900 pl-9 text-zinc-100 placeholder:text-zinc-500"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {tones.map((tone) => (
              <Button
                key={tone}
                variant={toneFilter === tone ? "default" : "outline"}
                className={
                  toneFilter === tone
                    ? "rounded-2xl bg-white text-black hover:bg-zinc-200"
                    : "rounded-2xl border-zinc-800 bg-zinc-950 text-zinc-300 hover:bg-zinc-900"
                }
                onClick={() => setToneFilter(tone)}
              >
                {tone}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[360px] pr-4">
            <div className="space-y-3">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge value={item.tone} />
                    <span className="text-xs text-zinc-500">{item.area}</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-zinc-200">
                    “{item.text}”
                  </p>
                  <p className="mt-2 text-xs text-zinc-500">
                    Source: {item.source}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
