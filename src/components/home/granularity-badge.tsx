import { Badge } from "@/components/ui/badge";
import type { ExtractionGranularity } from "@/lib/mla-lens/homepage/types";
import { cn } from "@/lib/utils";

const granularityTone: Record<ExtractionGranularity, string> = {
  row: "border-emerald-500/20 bg-emerald-500/10 text-emerald-200",
  bundle: "border-amber-500/20 bg-amber-500/10 text-amber-200",
  summary: "border-sky-500/20 bg-sky-500/10 text-sky-200",
};

interface GranularityBadgeProps {
  granularity: ExtractionGranularity;
  className?: string;
}

export function GranularityBadge({
  granularity,
  className,
}: GranularityBadgeProps) {
  const label =
    granularity === "row"
      ? "Row"
      : granularity === "bundle"
        ? "Bundle"
        : "Summary";

  return (
    <Badge className={cn("border", granularityTone[granularity], className)}>
      {label}
    </Badge>
  );
}
