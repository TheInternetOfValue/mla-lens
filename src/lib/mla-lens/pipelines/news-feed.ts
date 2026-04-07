import { newsCategories, newsFeed } from "@/data/mla-lens/news-feed";
import type { NewsItem } from "@/data/mla-lens/types";

export interface NewsFeedData {
  categories: readonly string[];
  items: NewsItem[];
}

interface ParsedRssItem {
  description: string;
  link: string;
  pubDate: string;
  title: string;
}

interface NormalizedNewsItem {
  category: NewsItem["category"];
  date: string;
  link: string;
  publishedAt: Date | null;
  rawTitle: string;
  relevanceScore: number;
  source: string;
  summary: string;
  tag: NewsItem["tag"];
  title: string;
}

const GOOGLE_NEWS_BASE_URL = "https://news.google.com/rss/search";
const RSS_TIMEOUT_MS = 5000;
const RSS_REVALIDATE_SECONDS = 900;
const MAX_NEWS_ITEMS = 8;
const MIN_RELEVANCE_SCORE = 4;

const rssQueries = [
  "Palayamkottai",
  "Tirunelveli",
  '"M Abdul Wahab"',
  '"Palayamkottai water"',
  '"Palayamkottai roads"',
  '"Palayamkottai schools"',
  '"Palayamkottai health"',
] as const;

const categoryRules = [
  {
    category: "Water" as const,
    keywords: [
      "water",
      "drainage",
      "drain",
      "pipeline",
      "flood",
      "overflow",
      "sewage",
      "drinking water",
      "rainwater",
    ],
  },
  {
    category: "Roads" as const,
    keywords: [
      "road",
      "roads",
      "traffic",
      "street",
      "bridge",
      "commuter",
      "highway",
      "patchwork",
      "congestion",
    ],
  },
  {
    category: "Education" as const,
    keywords: [
      "school",
      "schools",
      "education",
      "college",
      "classroom",
      "student",
      "campus",
      "renovation support",
    ],
  },
  {
    category: "Health" as const,
    keywords: [
      "health",
      "hospital",
      "medical",
      "clinic",
      "phc",
      "doctor",
      "outreach camp",
      "patient",
    ],
  },
];

const positiveKeywords = [
  "upgrade",
  "improve",
  "improved",
  "completed",
  "support",
  "announced",
  "inaugurated",
  "opens",
  "launched",
  "turnout",
  "renovation",
  "boost",
  "relief",
  "award",
  "wins",
];

const negativeKeywords = [
  "complaint",
  "critic",
  "criticism",
  "overflow",
  "delay",
  "issue",
  "issues",
  "problem",
  "bottleneck",
  "unresolved",
  "shortage",
  "protest",
  "stalled",
  "accident",
];

const relevanceKeywords = [
  { keyword: "palayamkottai", score: 5 },
  { keyword: "tirunelveli", score: 4 },
  { keyword: "abdul wahab", score: 6 },
  { keyword: "wahab", score: 3 },
  { keyword: "mla", score: 1 },
  { keyword: "constituency", score: 1 },
  { keyword: "water", score: 1 },
  { keyword: "road", score: 1 },
  { keyword: "school", score: 1 },
  { keyword: "health", score: 1 },
  { keyword: "drainage", score: 2 },
];

const constituencyKeywords = [
  "palayamkottai",
  "m abdul wahab",
  "m. abdul wahab",
  "abdul wahab",
];

const districtKeywords = ["tirunelveli", "nellai"];

const governanceKeywords = [
  "government",
  "corporation",
  "municipal",
  "municipality",
  "district administration",
  "district collector",
  "scheme",
  "project",
  "projects",
  "proposal",
  "proposes",
  "inaugurated",
  "announced",
  "works",
  "renovation",
  "upgrade",
  "improvement",
  "fund",
  "crore",
  "infrastructure",
  "public health",
  "drinking water",
  "service",
  "facility",
  "facilities",
  "camp",
  "outreach",
];

const excludedKeywords = [
  "on road price",
  "rto",
  "insurance",
  "emi",
  "bikewale",
  "zigwheels",
  "carwale",
  "91wheels",
  "autocar",
  "yamaha",
  "renault",
  "tunwal",
  "motovolt",
  "gobike",
  "price in palayamkottai",
  "price in tirunelveli",
  "road accident",
  "accident",
  "bike riders violating traffic rules",
  "campus connect",
  "murder",
  "killed",
  "dies",
  "death",
  "sexual harassment",
  "sexually harassing",
  "police",
  "crime",
  "arrested",
  "held for",
  "awareness programme",
  "world cancer day",
  "hacked by",
  "machete",
  "classmate",
  "number plates",
  "creating fear",
  "attacks friend",
  "sickle",
  "tiff over pencil",
];

function buildGoogleNewsUrl(query: string): string {
  const params = new URLSearchParams({
    q: query,
    hl: "en-IN",
    gl: "IN",
    ceid: "IN:en",
  });

  return `${GOOGLE_NEWS_BASE_URL}?${params.toString()}`;
}

async function fetchRssFeed(query: string): Promise<string> {
  const response = await fetch(buildGoogleNewsUrl(query), {
    next: { revalidate: RSS_REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(RSS_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`RSS request failed for "${query}" with ${response.status}`);
  }

  return response.text();
}

function extractTagContent(xml: string, tagName: string): string {
  const match = xml.match(new RegExp(`<${tagName}>([\\s\\S]*?)</${tagName}>`, "i"));
  return decodeHtmlEntities(stripCdata(match?.[1] ?? "")).trim();
}

function stripCdata(value: string): string {
  return value.replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "");
}

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function stripHtml(value: string): string {
  return decodeHtmlEntities(value)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function hasAnyKeyword(text: string, keywords: readonly string[]): boolean {
  const haystack = text.toLowerCase();
  return keywords.some((keyword) => haystack.includes(keyword));
}

function parseGoogleNewsSource(description: string): string {
  const sourceMatch = description.match(/<font[^>]*>(.*?)<\/font>/i);
  const source = stripHtml(sourceMatch?.[1] ?? "");
  return source || "Google News";
}

function parseRssItems(xml: string): ParsedRssItem[] {
  const itemMatches = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)];

  return itemMatches.map((match) => {
    const itemXml = match[1];

    return {
      title: extractTagContent(itemXml, "title"),
      link: extractTagContent(itemXml, "link"),
      pubDate: extractTagContent(itemXml, "pubDate"),
      description: stripCdata(extractTagContent(itemXml, "description")),
    };
  });
}

function classifyCategory(text: string): NewsItem["category"] | null {
  const haystack = text.toLowerCase();

  for (const rule of categoryRules) {
    if (rule.keywords.some((keyword) => haystack.includes(keyword))) {
      return rule.category;
    }
  }

  return null;
}

function classifySentiment(text: string): NewsItem["tag"] {
  const haystack = text.toLowerCase();
  const positiveMatches = positiveKeywords.filter((keyword) =>
    haystack.includes(keyword),
  ).length;
  const negativeMatches = negativeKeywords.filter((keyword) =>
    haystack.includes(keyword),
  ).length;

  if (negativeMatches > positiveMatches) {
    return "Negative";
  }

  if (positiveMatches > negativeMatches) {
    return "Positive";
  }

  return "Neutral";
}

function scoreConstituencyRelevance(text: string): number {
  const haystack = text.toLowerCase();

  return relevanceKeywords.reduce((score, rule) => {
    return haystack.includes(rule.keyword) ? score + rule.score : score;
  }, 0);
}

function shouldExcludeItem(text: string): boolean {
  return hasAnyKeyword(text, excludedKeywords);
}

function hasGovernanceSignal(text: string): boolean {
  return hasAnyKeyword(text, governanceKeywords);
}

function isRelevantCivicStory(
  text: string,
  relevanceScore: number,
  category: NewsItem["category"],
): boolean {
  const hasDirectConstituencyMatch = hasAnyKeyword(text, constituencyKeywords);
  const hasDistrictMatch = hasAnyKeyword(text, districtKeywords);
  const governanceSignal = hasGovernanceSignal(text);

  if (hasDirectConstituencyMatch) {
    return relevanceScore >= MIN_RELEVANCE_SCORE;
  }

  if (!hasDistrictMatch) {
    return false;
  }

  if (!governanceSignal) {
    return false;
  }

  if (category === "Roads" && relevanceScore < MIN_RELEVANCE_SCORE + 2) {
    return false;
  }

  return relevanceScore >= MIN_RELEVANCE_SCORE + 1;
}

function formatPublishedDate(pubDate: string): { date: string; publishedAt: Date | null } {
  const publishedAt = new Date(pubDate);

  if (Number.isNaN(publishedAt.getTime())) {
    return {
      date: "Recent",
      publishedAt: null,
    };
  }

  return {
    date: new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(publishedAt),
    publishedAt,
  };
}

function normalizeTitle(title: string): string {
  return title.replace(/\s+-\s+[^-]+$/, "").trim();
}

function summarizeDescription(description: string, title: string): string {
  const text = stripHtml(description);

  if (!text) {
    return title;
  }

  return text.length > 180 ? `${text.slice(0, 177).trimEnd()}...` : text;
}

function normalizeRssItem(item: ParsedRssItem): NormalizedNewsItem | null {
  const title = normalizeTitle(item.title);
  const summary = summarizeDescription(item.description, title);
  const source = parseGoogleNewsSource(item.description);
  const combinedText = `${title} ${summary} ${source}`;

  if (shouldExcludeItem(combinedText)) {
    return null;
  }

  const category = classifyCategory(combinedText);

  if (!category) {
    return null;
  }

  const relevanceScore = scoreConstituencyRelevance(combinedText);

  if (!isRelevantCivicStory(combinedText, relevanceScore, category)) {
    return null;
  }

  const { date, publishedAt } = formatPublishedDate(item.pubDate);

  return {
    rawTitle: item.title,
    title,
    summary,
    source,
    link: item.link,
    category,
    tag: classifySentiment(combinedText),
    relevanceScore,
    date,
    publishedAt,
  };
}

function dedupeAndRankItems(items: NormalizedNewsItem[]): NewsItem[] {
  const deduped = new Map<string, NormalizedNewsItem>();

  for (const item of items) {
    const key = item.title.toLowerCase();
    const existing = deduped.get(key);

    if (!existing) {
      deduped.set(key, item);
      continue;
    }

    const existingTime = existing.publishedAt?.getTime() ?? 0;
    const nextTime = item.publishedAt?.getTime() ?? 0;

    if (
      item.relevanceScore > existing.relevanceScore ||
      (item.relevanceScore === existing.relevanceScore && nextTime > existingTime)
    ) {
      deduped.set(key, item);
    }
  }

  return [...deduped.values()]
    .sort((left, right) => {
      const timeDifference =
        (right.publishedAt?.getTime() ?? 0) - (left.publishedAt?.getTime() ?? 0);

      if (timeDifference !== 0) {
        return timeDifference;
      }

      return right.relevanceScore - left.relevanceScore;
    })
    .slice(0, MAX_NEWS_ITEMS)
    .map((item, index) => ({
      id: index + 1,
      title: item.title,
      tag: item.tag,
      category: item.category,
      date: item.date,
      summary: item.summary,
    }));
}

async function loadNewsFeedFromSource(): Promise<NewsFeedData | null> {
  const fetchResults = await Promise.allSettled(
    rssQueries.map(async (query) => parseRssItems(await fetchRssFeed(query))),
  );

  const normalizedItems = fetchResults.flatMap((result, index) => {
    if (result.status === "rejected") {
      console.warn(
        `MLA Lens news pipeline: RSS fetch failed for query "${rssQueries[index]}".`,
        result.reason,
      );
      return [];
    }

    return result.value
      .map(normalizeRssItem)
      .filter((item): item is NormalizedNewsItem => item !== null);
  });

  const items = dedupeAndRankItems(normalizedItems);

  if (items.length === 0) {
    return null;
  }

  return {
    categories: newsCategories,
    items,
  };
}

function logNewsFallback(reason: string) {
  console.warn(`MLA Lens news pipeline: ${reason}. Using fixture news feed fallback.`);
}

export async function getNewsFeedData(): Promise<NewsFeedData> {
  try {
    const sourceData = await loadNewsFeedFromSource();

    if (sourceData) {
      return sourceData;
    }

    logNewsFallback("no relevant live RSS items were found");
  } catch (error) {
    console.error("MLA Lens news pipeline: live RSS fetch failed.", error);
    logNewsFallback("live RSS fetch threw an error");
  }

  return {
    categories: newsCategories,
    items: newsFeed,
  };
}
