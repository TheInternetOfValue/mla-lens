export type InsightType = "warning" | "success";

export interface OverviewInsight {
  type: InsightType;
  text: string;
}

export interface OverviewData {
  constituency: string;
  district: string;
  mla: string;
  party: string;
  electedYear: number;
  score: number;
  verdict: string;
  updatedAt: string;
  microInsights: OverviewInsight[];
}

export interface ScoreCardData {
  key: "funds" | "development" | "sentiment";
  label: string;
  value: number;
  tone: string;
  description: string;
}

export type ProjectStatus = "Completed" | "Ongoing" | "Unclear";

export interface ProjectData {
  id: number;
  name: string;
  budget: string;
  status: ProjectStatus;
  area: string;
  source: string;
  category: string;
}

export type NewsTag = "Positive" | "Negative" | "Neutral";

export interface NewsItem {
  id: number;
  title: string;
  tag: NewsTag;
  category: string;
  date: string;
  summary: string;
}

export type CitizenTone = "Complaint" | "Mixed" | "Praise";

export interface CitizenSignal {
  id: number;
  text: string;
  tone: CitizenTone;
  area: string;
  source: string;
}

export type MapPinStatus = "Problem" | "Good" | "Average";

export interface MapPinData {
  id: number;
  title: string;
  status: MapPinStatus;
  x: string;
  y: string;
  detail: string;
}

export interface MLAProfileData {
  party: string;
  ageBand: string;
  winYear: number;
  incumbency: string;
  assetsTrend: number[];
  publicActivity: number[];
  trustFlags: string[];
}

export interface SignalSummaryCard {
  key: "risk" | "positive" | "watchlist" | "narrative";
  label: string;
  value: string;
  toneClassName: string;
}

export interface PipelineIntegration<TData> {
  key: string;
  label: string;
  description: string;
  ownership: string;
  status: "mock-ready";
  initialData: TData;
}
