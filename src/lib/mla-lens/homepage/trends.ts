import type { MLALensHomepageData } from "@/lib/mla-lens/homepage/types";
import {
  previousHomepageTrendSnapshot,
  type HomepageTrendSnapshot,
} from "@/data/mla-lens/homepage-trend-snapshot";

export type TrendSignal = {
  key: string;
  label: string;
  direction: "up" | "down" | "flat";
  summary: string;
};

function roundToHundredths(value: number): number {
  return Math.round(value * 100) / 100;
}

function getCurrentSnapshot(data: MLALensHomepageData): HomepageTrendSnapshot {
  const newsVolume = data.news.items.length;
  const negativeSignals = data.citizens.items.filter(
    (item) => item.tone === "Complaint",
  ).length;
  const negativeSentimentShare =
    data.citizens.items.length > 0
      ? negativeSignals / data.citizens.items.length
      : 0;

  const categoryCounts = new Map<string, number>();
  for (const item of data.news.items) {
    categoryCounts.set(item.category, (categoryCounts.get(item.category) ?? 0) + 1);
  }
  const topCategoryCount = [...categoryCounts.values()].sort((a, b) => b - a)[0] ?? 0;
  const categoryConcentration =
    newsVolume > 0 ? topCategoryCount / newsVolume : 0;

  const completedProjects = data.money.projects.filter(
    (project) => project.status === "Completed",
  ).length;

  return {
    capturedAt: new Date().toISOString(),
    newsVolume,
    negativeSentimentShare: roundToHundredths(negativeSentimentShare),
    categoryConcentration: roundToHundredths(categoryConcentration),
    completedProjects,
  };
}

function compareNewsVolume(
  current: HomepageTrendSnapshot,
  previous: HomepageTrendSnapshot,
): TrendSignal {
  if (current.newsVolume > previous.newsVolume) {
    return {
      key: "news-volume",
      label: "Civic visibility",
      direction: "up",
      summary: "More constituency-relevant civic stories are showing up than in the previous snapshot.",
    };
  }

  if (current.newsVolume < previous.newsVolume) {
    return {
      key: "news-volume",
      label: "Civic visibility",
      direction: "down",
      summary: "Fewer constituency-relevant civic stories are appearing than in the previous snapshot.",
    };
  }

  return {
    key: "news-volume",
    label: "Civic visibility",
    direction: "flat",
    summary: "Civic news volume is broadly unchanged from the previous snapshot.",
  };
}

function compareNegativeSentimentShare(
  current: HomepageTrendSnapshot,
  previous: HomepageTrendSnapshot,
): TrendSignal {
  if (current.negativeSentimentShare > previous.negativeSentimentShare) {
    return {
      key: "negative-sentiment",
      label: "Negative sentiment share",
      direction: "up",
      summary: "Complaint-heavy citizen signals make up a larger share of the sample than before.",
    };
  }

  if (current.negativeSentimentShare < previous.negativeSentimentShare) {
    return {
      key: "negative-sentiment",
      label: "Negative sentiment share",
      direction: "down",
      summary: "Complaint-heavy citizen signals are taking up less of the public feedback mix than before.",
    };
  }

  return {
    key: "negative-sentiment",
    label: "Negative sentiment share",
    direction: "flat",
    summary: "The complaint share of citizen feedback is roughly unchanged from the previous snapshot.",
  };
}

function compareCategoryConcentration(
  current: HomepageTrendSnapshot,
  previous: HomepageTrendSnapshot,
): TrendSignal {
  if (current.categoryConcentration > previous.categoryConcentration) {
    return {
      key: "category-concentration",
      label: "Coverage concentration",
      direction: "up",
      summary: "News coverage is becoming more concentrated in a single civic category than before.",
    };
  }

  if (current.categoryConcentration < previous.categoryConcentration) {
    return {
      key: "category-concentration",
      label: "Coverage concentration",
      direction: "down",
      summary: "News coverage is spreading more evenly across civic categories than in the previous snapshot.",
    };
  }

  return {
    key: "category-concentration",
    label: "Coverage concentration",
    direction: "flat",
    summary: "Category concentration is broadly unchanged from the previous snapshot.",
  };
}

function compareProjectVisibility(
  current: HomepageTrendSnapshot,
  previous: HomepageTrendSnapshot,
): TrendSignal {
  if (current.completedProjects > previous.completedProjects) {
    return {
      key: "project-visibility",
      label: "Visible project progress",
      direction: "up",
      summary: "More tracked projects now show completed status than in the previous snapshot.",
    };
  }

  if (current.completedProjects < previous.completedProjects) {
    return {
      key: "project-visibility",
      label: "Visible project progress",
      direction: "down",
      summary: "Fewer tracked projects show completed status than in the previous snapshot.",
    };
  }

  return {
    key: "project-visibility",
    label: "Visible project progress",
    direction: "flat",
    summary: "Completed project visibility is unchanged from the previous snapshot.",
  };
}

export function deriveHomepageTrendSignals(
  data: MLALensHomepageData,
): TrendSignal[] {
  const currentSnapshot = getCurrentSnapshot(data);
  const previousSnapshot = previousHomepageTrendSnapshot;

  return [
    compareNewsVolume(currentSnapshot, previousSnapshot),
    compareNegativeSentimentShare(currentSnapshot, previousSnapshot),
    compareCategoryConcentration(currentSnapshot, previousSnapshot),
    compareProjectVisibility(currentSnapshot, previousSnapshot),
  ];
}
