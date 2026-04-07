import { newsCategories, newsFeed } from "@/data/mla-lens/news-feed";
import type { NewsItem } from "@/data/mla-lens/types";

export interface NewsFeedData {
  categories: readonly string[];
  items: NewsItem[];
}

async function loadNewsFeedFromSource(): Promise<NewsFeedData | null> {
  // Placeholder for a future pipeline or database read.
  return null;
}

export async function getNewsFeedData(): Promise<NewsFeedData> {
  try {
    const sourceData = await loadNewsFeedFromSource();

    if (sourceData) {
      return sourceData;
    }
  } catch (error) {
    console.error("Failed to load news feed data, using fixtures instead.", error);
  }

  return {
    categories: newsCategories,
    items: newsFeed,
  };
}
