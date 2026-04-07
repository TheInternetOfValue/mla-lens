"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { NewsItem } from "@/data/mla-lens";

import { StatusBadge } from "@/components/home/status-badge";

interface NewsPanelProps {
  categories: readonly string[];
  items: NewsItem[];
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
                <span className="text-xs text-zinc-500">{item.date}</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-400">{item.summary}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
