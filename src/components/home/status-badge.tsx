import { Badge } from "@/components/ui/badge";

export const statusTone: Record<string, string> = {
  Completed: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
  Ongoing: "bg-amber-500/15 text-amber-300 border-amber-500/20",
  Unclear: "bg-zinc-500/15 text-zinc-300 border-zinc-500/20",
  Positive: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
  Negative: "bg-rose-500/15 text-rose-300 border-rose-500/20",
  Neutral: "bg-sky-500/15 text-sky-300 border-sky-500/20",
  Praise: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
  Complaint: "bg-rose-500/15 text-rose-300 border-rose-500/20",
  Mixed: "bg-amber-500/15 text-amber-300 border-amber-500/20",
  Good: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
  Average: "bg-amber-500/15 text-amber-300 border-amber-500/20",
  Problem: "bg-rose-500/15 text-rose-300 border-rose-500/20",
};

interface StatusBadgeProps {
  value: string;
}

export function StatusBadge({ value }: StatusBadgeProps) {
  return (
    <Badge
      className={`border ${
        statusTone[value] ?? "border-zinc-700 bg-zinc-800 text-zinc-200"
      }`}
    >
      {value}
    </Badge>
  );
}
