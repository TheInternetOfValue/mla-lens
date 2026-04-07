import { mapPins } from "@/data/mla-lens/map-pins";
import { overview } from "@/data/mla-lens/overview";
import { scoreCards as fixtureScoreCards } from "@/data/mla-lens/score-cards";
import { signalSummaryCards as fixtureSignalSummaryCards } from "@/data/mla-lens/signal-summary";
import type { CitizenSignal, ScoreCardData, SignalSummaryCard } from "@/data/mla-lens/types";

import type { CitizenSentimentData } from "@/lib/mla-lens/pipelines/citizen-sentiment";
import type { MlaProfileDataSource } from "@/lib/mla-lens/pipelines/mla-profile";
import type { NewsFeedData } from "@/lib/mla-lens/pipelines/news-feed";
import type { ProjectFundsData } from "@/lib/mla-lens/pipelines/project-funds";
import type {
  CitizenPanelSummary,
  MLALensHomepageData,
  OverviewFastRead,
  OverviewFastReadCard,
} from "@/lib/mla-lens/homepage/types";

const toneWeights: Record<string, number> = {
  Complaint: 15,
  Mixed: 55,
  Praise: 100,
};

const fastReadMeta: Record<
  ScoreCardData["key"],
  Omit<OverviewFastReadCard, "label">
> = {
  funds: {
    title: "Funds Signal",
    description:
      "Visible project progress is better than the public mood suggests.",
    titleClassName: "text-amber-300",
  },
  development: {
    title: "Development Signal",
    description:
      "Visible development signals are emerging, but delivery still needs more proof.",
    titleClassName: "text-sky-300",
  },
  sentiment: {
    title: "Citizen Sentiment",
    description: "Complaint velocity still outweighs praise.",
    titleClassName: "text-rose-300",
  },
};

function deriveCitizenPanelSummary(items: CitizenSignal[]): CitizenPanelSummary {
  const weightedTotal = items.reduce((total, item) => total + toneWeights[item.tone], 0);
  const sentimentScore = items.length > 0
    ? Math.round(weightedTotal / items.length)
    : fixtureScoreCards.find((card) => card.key === "sentiment")?.value ?? 48;

  const normalizedTopIssue = inferTopIssue(items);

  return {
    sentimentScore,
    sentimentSummary:
      sentimentScore < 50
        ? "Complaints still dominate the public surface area."
        : "Public sentiment is stabilizing, but trust is still fragile.",
    topIssue: normalizedTopIssue,
  };
}

function inferTopIssue(items: CitizenSignal[]): string {
  const issueScores = new Map<string, number>();
  const weightedItems = items.filter((item) => item.tone !== "Praise");

  for (const item of weightedItems) {
    const normalized = item.text.toLowerCase();

    if (normalized.includes("drainage") || normalized.includes("water")) {
      issueScores.set(
        "Water + drainage reliability",
        (issueScores.get("Water + drainage reliability") ?? 0) + 2,
      );
    }

    if (normalized.includes("road") || normalized.includes("traffic")) {
      issueScores.set(
        "Road quality + traffic bottlenecks",
        (issueScores.get("Road quality + traffic bottlenecks") ?? 0) + 2,
      );
    }

    if (normalized.includes("hospital") || normalized.includes("health")) {
      issueScores.set(
        "Health service consistency",
        (issueScores.get("Health service consistency") ?? 0) + 1,
      );
    }

    if (normalized.includes("garbage")) {
      issueScores.set(
        "Waste collection reliability",
        (issueScores.get("Waste collection reliability") ?? 0) + 1,
      );
    }
  }

  const topIssue = [...issueScores.entries()].sort((left, right) => right[1] - left[1])[0]?.[0];

  return topIssue ?? "Citizen issue clustering still needs categorization";
}

function deriveScoreCards(summary: CitizenPanelSummary): ScoreCardData[] {
  return fixtureScoreCards.map((card) =>
    card.key === "sentiment"
      ? {
          ...card,
          value: summary.sentimentScore,
        }
      : card,
  );
}

function deriveFastRead(cards: ScoreCardData[]): OverviewFastRead {
  const strongest = cards.reduce((best, card) => (card.value > best.value ? card : best));
  const weakest = cards.reduce((worst, card) => (card.value < worst.value ? card : worst));

  return {
    strongest: {
      label: "Strongest layer",
      ...fastReadMeta[strongest.key],
    },
    weakest: {
      label: "Weakest layer",
      ...fastReadMeta[weakest.key],
    },
  };
}

function deriveSignalSummaryCards(
  citizenSummary: CitizenPanelSummary,
  news: NewsFeedData,
  money: ProjectFundsData,
): SignalSummaryCard[] {
  const hasEducationSignal =
    news.items.some(
      (item) => item.category === "Education" && item.tag === "Positive",
    ) ||
    money.projects.some(
      (project) =>
        project.category === "Education" && project.status === "Completed",
    );

  const hasHealthWatchlist = money.projects.some(
    (project) =>
      project.category === "Health" && project.status !== "Completed",
  );

  return fixtureSignalSummaryCards.map((card) => {
    if (card.key === "risk") {
      return {
        ...card,
        value: citizenSummary.topIssue,
      };
    }

    if (card.key === "positive" && hasEducationSignal) {
      return {
        ...card,
        value: "School improvements",
      };
    }

    if (card.key === "watchlist" && hasHealthWatchlist) {
      return {
        ...card,
        value: "Health infra proof",
      };
    }

    return card;
  });
}

interface BuildHomepageViewModelInput {
  citizenSentiment: CitizenSentimentData;
  mlaProfileData: MlaProfileDataSource;
  newsFeed: NewsFeedData;
  projectFunds: ProjectFundsData;
}

export function buildHomepageViewModel({
  citizenSentiment,
  mlaProfileData,
  newsFeed,
  projectFunds,
}: BuildHomepageViewModelInput): MLALensHomepageData {
  const citizenSummary = deriveCitizenPanelSummary(citizenSentiment.items);
  const scoreCards = deriveScoreCards(citizenSummary);

  return {
    overview,
    fastRead: deriveFastRead(scoreCards),
    scoreCards,
    news: {
      categories: newsFeed.categories,
      items: newsFeed.items,
    },
    citizens: {
      tones: citizenSentiment.tones,
      items: citizenSentiment.items,
      summary: citizenSummary,
    },
    money: {
      projects: projectFunds.projects,
    },
    map: {
      pins: mapPins,
    },
    profile: {
      mlaName: overview.mla,
      profile: mlaProfileData.profile,
    },
    signalSummaryCards: deriveSignalSummaryCards(
      citizenSummary,
      newsFeed,
      projectFunds,
    ),
  };
}
