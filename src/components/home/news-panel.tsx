"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { HomepageNewsItem } from "@/lib/mla-lens/homepage/types";

import { ProvenanceBadge } from "@/components/home/provenance-badge";
import { StatusBadge } from "@/components/home/status-badge";

interface NewsPanelProps {
  categories: readonly string[];
  items: HomepageNewsItem[];
}

export function NewsPanel({ categories, items }: NewsPanelProps) {
  const [filter, setFilter] = useState("All");

  const filteredItems =
    filter === "All"
      ? items
      : items.filter((item) => item.category === filter);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={filter === category ? "default" : "outline"}
            className={
              filter === category
                ? "rounded-2xl bg-white text-black hover:bg-zinc-200"
                : "rounded-2xl border-zinc-800 bg-zinc-950 text-zinc-300 hover:bg-zinc-900"
            }
            onClick={() => setFilter(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {filteredItems.map((item) => (
          <Card key={item.id} className="border-zinc-800 bg-zinc-950/70">
            <CardContent className="p-5">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge value={item.tag} />
                <Badge className="border-zinc-800 bg-zinc-900 text-zinc-300">
                  {item.category}
                </Badge>
                <ProvenanceBadge provenance={item.provenance} />
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500">
                {item.sourceLabel ? (
                  item.sourceUrl ? (
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="transition hover:text-zinc-300 hover:underline"
                    >
                      {item.sourceLabel}
                    </a>
                  ) : (
                    <span>{item.sourceLabel}</span>
                  )
                ) : null}
                <span className="text-xs text-zinc-500">{item.date}</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-white">
                {item.sourceUrl ? (
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="transition hover:text-zinc-200 hover:underline"
                  >
                    {item.title}
                  </a>
                ) : (
                  item.title
                )}
              </h3>
              <p className="mt-2 text-sm text-zinc-400">{item.summary}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
