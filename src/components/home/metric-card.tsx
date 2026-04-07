"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface MetricCardProps {
  description: string;
  icon: LucideIcon;
  label: string;
  tone: string;
  value: number;
}

export function MetricCard({
  description,
  icon: Icon,
  label,
  tone,
  value,
}: MetricCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="border-zinc-800 bg-zinc-950/70 shadow-2xl shadow-black/20">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-zinc-400">{label}</p>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-3xl font-bold text-white">{value}</span>
                <span className="pb-1 text-xs text-zinc-500">/ 100</span>
              </div>
              <p className="mt-2 max-w-xs text-sm text-zinc-400">
                {description}
              </p>
            </div>
            <div className={`rounded-2xl border p-3 ${tone}`}>
              <Icon className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-900">
            <div
              className="h-full rounded-full bg-white transition-[width] duration-500"
              style={{ width: `${value}%` }}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
