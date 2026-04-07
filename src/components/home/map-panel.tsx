"use client";

import { useState } from "react";
import { MapPinned } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { MapPinData } from "@/lib/mla-lens/homepage/types";

import { StatusBadge, statusTone } from "@/components/home/status-badge";

interface MapPanelProps {
  pins: MapPinData[];
}

export function MapPanel({ pins }: MapPanelProps) {
  const [selected, setSelected] = useState(pins[0]);

  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <Card className="border-zinc-800 bg-zinc-950/70">
        <CardHeader>
          <CardTitle className="text-white">Map view</CardTitle>
          <CardDescription className="text-zinc-400">
            Fake map for now. Real map later. No need to marry the API on day
            one.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative h-[420px] overflow-hidden rounded-3xl border border-zinc-800 bg-[radial-gradient(circle_at_top,_rgba(39,39,42,0.8),_rgba(9,9,11,1))]">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
            <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-black/50 px-3 py-2 text-xs text-zinc-300 backdrop-blur">
              <MapPinned className="h-4 w-4" />
              Palayamkottai signal map
            </div>
            {pins.map((pin) => (
              <button
                key={pin.id}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur transition hover:scale-105 ${statusTone[pin.status]}`}
                style={{ left: pin.x, top: pin.y }}
                onClick={() => setSelected(pin)}
                type="button"
              >
                {pin.title}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-zinc-800 bg-zinc-950/70">
        <CardHeader>
          <CardTitle className="text-white">Selected signal</CardTitle>
          <CardDescription className="text-zinc-400">
            Click a pin. Judge the story yourself.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
            <div className="flex items-center gap-2">
              <StatusBadge value={selected.status} />
            </div>
            <h3 className="mt-3 text-xl font-semibold text-white">
              {selected.title}
            </h3>
            <p className="mt-2 text-sm text-zinc-400">{selected.detail}</p>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-1">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 text-sm text-zinc-300">
              🔴 Problem = complaint-heavy cluster
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 text-sm text-zinc-300">
              🟡 Average = work visible, outcome unclear
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 text-sm text-zinc-300">
              🟢 Good = positive project or service signal
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
