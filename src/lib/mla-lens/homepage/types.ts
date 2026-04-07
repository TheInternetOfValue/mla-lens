import type { Insight } from "@/lib/mla-lens/homepage/insights";
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

export interface HomepageScopeInfo {
  constituencySlug: string;
  constituencyName: string;
  districtName: string;
  stateName: string;
  representativeName: string;
  representativeRole: string;
  scopeLabel: string;
  rolloutNote: string;
}

export interface MLALensHomepageData {
  scope: HomepageScopeInfo;
  insights: Insight[];
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
