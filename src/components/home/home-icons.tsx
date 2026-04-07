import {
  Droplets,
  GraduationCap,
  HeartPulse,
  ShieldAlert,
  TrendingUp,
  Wallet,
  Waves,
  Wrench,
} from "lucide-react";

export const scoreCardIcons = {
  funds: Wallet,
  development: Wrench,
  sentiment: ShieldAlert,
} as const;

export const signalSummaryIcons = {
  risk: Droplets,
  positive: GraduationCap,
  watchlist: HeartPulse,
  narrative: Waves,
} as const;

export { TrendingUp };
