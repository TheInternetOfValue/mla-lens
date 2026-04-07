import { Badge } from "@/components/ui/badge";
import type { Provenance, ProvenanceStatus } from "@/lib/mla-lens/homepage/types";
import { cn } from "@/lib/utils";

const provenanceTone: Record<ProvenanceStatus, string> = {
  live: "border-emerald-500/30 bg-emerald-500/15 text-emerald-300",
  derived: "border-sky-500/30 bg-sky-500/15 text-sky-300",
  tentative: "border-amber-500/30 bg-amber-500/15 text-amber-300",
  fixture: "border-zinc-700 bg-zinc-800/80 text-zinc-300",
};

interface ProvenanceBadgeProps {
  provenance: Provenance;
  className?: string;
}

export function ProvenanceBadge({
  provenance,
  className,
}: ProvenanceBadgeProps) {
  return (
    <Badge
      className={cn("border", provenanceTone[provenance.status], className)}
    >
      {provenance.label}
    </Badge>
  );
}
