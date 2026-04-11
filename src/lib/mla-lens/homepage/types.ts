import type { Insight } from "@/lib/mla-lens/homepage/insights";
import type { TrendSignal } from "@/lib/mla-lens/homepage/trends";
import type {
  CitizenSignal,
  MapPinData,
  MLAProfileData,
  NewsItem,
  OverviewData,
  ProjectData,
  ScoreCardData,
  SignalStrength,
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
  SignalStrength,
  SignalSummaryCard,
};

export type ProvenanceStatus =
  | "live"
  | "derived"
  | "official"
  | "corroborated"
  | "tentative"
  | "fixture";

export interface Provenance {
  status: ProvenanceStatus;
  label: string;
  sourceLabel?: string;
  sourceUrl?: string;
  updatedAt?: string;
}

export interface EvidenceLink {
  label: string;
  url: string;
}

export type ExtractionGranularity = "row" | "bundle" | "summary";

export interface HomepageNewsItem extends NewsItem {
  sourceLabel?: string;
  sourceUrl?: string;
  publishedAt?: string;
  provenance: Provenance;
}

export interface HomepageProjectItem extends ProjectData {
  amount?: number;
  amountDisplay?: string;
  implementingAgency?: string;
  sourceLabel?: string;
  sourceUrl?: string;
  evidenceLinks?: EvidenceLink[];
  extractionGranularity: ExtractionGranularity;
  provenance: Provenance;
}

export interface MoneySchemeMetadata {
  schemeName: string;
  schemeYear: string;
  annualAllocation: string;
  sourceLabel: string;
  sourceUrl: string;
  note?: string;
  evidenceLinks?: EvidenceLink[];
}

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
  trends: TrendSignal[];
  overview: OverviewData;
  fastRead: OverviewFastRead;
  scoreCards: ScoreCardData[];
  news: {
    categories: readonly string[];
    items: HomepageNewsItem[];
    provenance: Provenance;
  };
  citizens: {
    tones: readonly string[];
    items: CitizenSignal[];
    summary: CitizenPanelSummary;
    provenance: Provenance;
  };
  money: {
    projects: HomepageProjectItem[];
    scheme?: MoneySchemeMetadata;
    provenance: Provenance;
  };
  map: {
    pins: MapPinData[];
  };
  profile: {
    mlaName: string;
    profile: MLAProfileData;
    provenance: Provenance;
  };
  signalSummaryCards: SignalSummaryCard[];
}
