import type { SignalStrength } from "@/lib/mla-lens/homepage/types";
import { cn } from "@/lib/utils";

const signalStrengthTone: Record<SignalStrength, string> = {
  low: "bg-zinc-500 text-zinc-500",
  medium: "bg-amber-400 text-amber-300",
  high: "bg-emerald-400 text-emerald-300",
};

interface SignalStrengthIndicatorProps {
  signalStrength?: SignalStrength;
  className?: string;
}

export function SignalStrengthIndicator({
  signalStrength,
  className,
}: SignalStrengthIndicatorProps) {
  if (!signalStrength) {
    return null;
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs text-zinc-500",
        className,
      )}
    >
      <span
        className={cn(
          "h-2 w-2 rounded-full shadow-[0_0_10px_currentColor]",
          signalStrengthTone[signalStrength],
        )}
      />
      {signalStrength} signal
    </span>
  );
}
