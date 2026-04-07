import type { MLALensHomepageData } from "@/lib/mla-lens/homepage/types";

export type Insight = {
  id: string;
  title: string;
  description: string;
  implication?: string;
  tone: "positive" | "negative" | "neutral";
};

const keyCoverageCategories = ["Water", "Roads", "Education", "Health"] as const;

function deriveNewsVolumeInsight(data: MLALensHomepageData): Insight {
  const volume = data.news.items.length;

  if (volume === 0) {
    return {
      id: "news-volume",
      title: "No recent civic coverage",
      description:
        "The current feed has no recent civic stories for this pilot constituency, so visibility is low.",
      implication:
        "Lower visibility may reduce public accountability and limit awareness of local delivery issues.",
      tone: "negative",
    };
  }

  if (volume < 5) {
    return {
      id: "news-volume",
      title: "Low civic visibility in media",
      description:
        "Only a small number of constituency-relevant civic stories are showing up in the current news window.",
      implication:
        "Lower visibility may reduce public accountability and awareness of what is or is not changing on the ground.",
      tone: "neutral",
    };
  }

  return {
    id: "news-volume",
    title: "Active media coverage",
    description:
      "The current feed shows steady civic coverage tied to Palayamkottai or Tirunelveli public issues.",
    implication:
      "Higher visibility makes it easier to track public narratives, progress signals, and emerging problem areas.",
    tone: "positive",
  };
}

function deriveSentimentInsight(data: MLALensHomepageData): Insight {
  const counts = data.citizens.items.reduce(
    (accumulator, item) => {
      accumulator[item.tone] += 1;
      return accumulator;
    },
    { Complaint: 0, Mixed: 0, Praise: 0 },
  );

  if (counts.Complaint > counts.Praise && counts.Complaint >= counts.Mixed) {
    return {
      id: "citizen-sentiment",
      title: "Public sentiment trending negative",
      description:
        "Complaint-heavy citizen signals still outweigh praise across the current public feedback sample.",
      implication:
        "This may indicate dissatisfaction that requires attention from local governance or clearer visible delivery.",
      tone: "negative",
    };
  }

  if (counts.Praise > counts.Complaint && counts.Praise >= counts.Mixed) {
    return {
      id: "citizen-sentiment",
      title: "Public sentiment improving",
      description:
        "Positive citizen mentions are outpacing complaints in the current signal mix.",
      implication:
        "Improving public mood may reflect better service experience or stronger visible delivery in the constituency.",
      tone: "positive",
    };
  }

  return {
    id: "citizen-sentiment",
    title: "Public sentiment remains mixed",
    description:
      "Citizen feedback is split between praise, complaints, and unresolved service friction.",
    implication:
      "Mixed signals suggest uneven delivery, where some services are improving while other frustrations remain unresolved.",
    tone: "neutral",
  };
}

function deriveCategorySkewInsight(data: MLALensHomepageData): Insight {
  const counts = new Map<string, number>();

  for (const item of data.news.items) {
    counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
  }

  const topCategory = [...counts.entries()].sort((left, right) => right[1] - left[1])[0];

  if (!topCategory || topCategory[1] < 2 || topCategory[1] < Math.ceil(data.news.items.length / 2)) {
    return {
      id: "category-skew",
      title: "Coverage spread across civic categories",
      description:
        "The current media mix is not dominated by a single issue area, which gives a broader view of constituency conditions.",
      implication:
        "Broader coverage makes the current signal layer more balanced and reduces the risk of over-reading one issue area.",
      tone: "positive",
    };
  }

  return {
    id: "category-skew",
    title: `Coverage skewed toward ${topCategory[0]}`,
    description:
      "Most of the current news attention is concentrated in one civic area, so other issues may be underrepresented.",
    implication:
      "Other civic areas may be underreported, which can distort how the constituency’s overall delivery picture is perceived.",
    tone: "neutral",
  };
}

function deriveMissingCoverageInsight(data: MLALensHomepageData): Insight {
  const presentCategories = new Set(data.news.items.map((item) => item.category));
  const missingCategories = keyCoverageCategories.filter(
    (category) => !presentCategories.has(category),
  );

  if (missingCategories.length === 0) {
    return {
      id: "missing-categories",
      title: "Coverage touches all key civic areas",
      description:
        "Recent items include water, roads, education, and health, giving the pilot a balanced baseline signal.",
      implication:
        "Balanced category coverage gives the homepage a stronger base for cross-sector interpretation.",
      tone: "positive",
    };
  }

  if (missingCategories.length === 1) {
    return {
      id: "missing-categories",
      title: `Limited coverage on ${missingCategories[0]}`,
      description:
        "One key civic area is missing from the current news window, so that part of the picture is still thin.",
      implication:
        "A single blind spot can hide service stress or missed progress in that category.",
      tone: "neutral",
    };
  }

  return {
    id: "missing-categories",
    title: "No recent coverage on key civic areas",
    description: `Recent coverage is thin on ${missingCategories.join(", ").toLowerCase()}.`,
    implication:
      "Gaps in coverage may hide important issues or progress in these sectors, weakening the current evidence picture.",
    tone: "negative",
  };
}

function deriveProjectProgressInsight(data: MLALensHomepageData): Insight {
  const totalProjects = data.money.projects.length;
  const completedProjects = data.money.projects.filter(
    (project) => project.status === "Completed",
  ).length;
  const ongoingProjects = data.money.projects.filter(
    (project) => project.status === "Ongoing",
  ).length;

  if (totalProjects === 0 || completedProjects === 0) {
    return {
      id: "project-progress",
      title: "Limited visible project progress",
      description:
        "Tracked project data is not yet showing clear completion signals for the current constituency.",
      implication:
        "This may point to delays, poor visibility, or weak public evidence of delivery on tracked work.",
      tone: "negative",
    };
  }

  if (completedProjects >= ongoingProjects) {
    return {
      id: "project-progress",
      title: "Visible project completion signals",
      description:
        "Completed tracked projects are keeping pace with or exceeding the current ongoing work list.",
      implication:
        "Visible completions strengthen the case that at least some public spending is converting into observable delivery.",
      tone: "positive",
    };
  }

  return {
    id: "project-progress",
    title: "Most tracked work is still in progress",
    description:
      "There are visible project signals, but more work is ongoing than clearly completed right now.",
    implication:
      "This may indicate that delivery is still maturing, with outcomes not yet visible enough to build public confidence.",
    tone: "neutral",
  };
}

export function deriveHomepageInsights(data: MLALensHomepageData): Insight[] {
  return [
    deriveNewsVolumeInsight(data),
    deriveSentimentInsight(data),
    deriveCategorySkewInsight(data),
    deriveMissingCoverageInsight(data),
    deriveProjectProgressInsight(data),
  ].slice(0, 5);
}
