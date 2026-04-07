import type {
  CitizenSignal,
  MapPinData,
  MLAProfileData,
  NewsItem,
  OverviewData,
  ProjectData,
  ScoreCardData,
  SignalSummaryCard,
} from "@/data/mla-lens/types";

export type {
  CitizenSignal,
  MapPinData,
  MLAProfileData,
  NewsItem,
  OverviewData,
  ProjectData,
  ScoreCardData,
  SignalSummaryCard,
};

export interface OverviewFastReadCard {
  label: string;
  title: string;
  description: string;
  titleClassName: string;
}

export interface OverviewFastRead {
  strongest: OverviewFastReadCard;
  weakest: OverviewFastReadCard;
}

export interface CitizenPanelSummary {
  sentimentScore: number;
  sentimentSummary: string;
  topIssue: string;
}

export interface MLALensHomepageData {
  overview: OverviewData;
  fastRead: OverviewFastRead;
  scoreCards: ScoreCardData[];
  news: {
    categories: readonly string[];
    items: NewsItem[];
  };
  citizens: {
    tones: readonly string[];
    items: CitizenSignal[];
    summary: CitizenPanelSummary;
  };
  money: {
    projects: ProjectData[];
  };
  map: {
    pins: MapPinData[];
  };
  profile: {
    mlaName: string;
    profile: MLAProfileData;
  };
  signalSummaryCards: SignalSummaryCard[];
}
