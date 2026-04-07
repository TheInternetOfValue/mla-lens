import { buildHomepageViewModel } from "@/lib/mla-lens/homepage/build-homepage-view-model";
import type { MLALensHomepageData } from "@/lib/mla-lens/homepage/types";
import { getCitizenSentimentData } from "@/lib/mla-lens/pipelines/citizen-sentiment";
import { getMlaProfileData } from "@/lib/mla-lens/pipelines/mla-profile";
import { getNewsFeedData } from "@/lib/mla-lens/pipelines/news-feed";
import { getProjectFundsData } from "@/lib/mla-lens/pipelines/project-funds";

export async function getHomepageData(): Promise<MLALensHomepageData> {
  const [newsFeed, citizenSentiment, projectFunds, mlaProfileData] =
    await Promise.all([
      getNewsFeedData(),
      getCitizenSentimentData(),
      getProjectFundsData(),
      getMlaProfileData(),
    ]);

  return buildHomepageViewModel({
    citizenSentiment,
    mlaProfileData,
    newsFeed,
    projectFunds,
  });
}
