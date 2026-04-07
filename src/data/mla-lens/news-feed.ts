import type { NewsItem } from "@/data/mla-lens/types";

export const newsCategories = ["All", "Roads", "Water", "Health", "Education"] as const;

export const newsFeed: NewsItem[] = [
  {
    id: 1,
    title: "New drinking water upgrade announced for Tirunelveli region",
    tag: "Positive",
    category: "Water",
    date: "Apr 3, 2026",
    summary:
      "Regional reporting suggests fresh pipeline and supply upgrade activity affecting Palayamkottai-adjacent zones.",
  },
  {
    id: 2,
    title: "Residents continue to report drainage overflow in low-lying streets",
    tag: "Negative",
    category: "Water",
    date: "Apr 5, 2026",
    summary:
      "Complaint-heavy coverage points to unresolved drainage stress after recent rains.",
  },
  {
    id: 3,
    title: "Government school facilities receive renovation support",
    tag: "Positive",
    category: "Education",
    date: "Mar 29, 2026",
    summary:
      "Classroom repair and campus improvement activity covered in local civic and education reporting.",
  },
  {
    id: 4,
    title: "Traffic bottlenecks and road patchwork draw criticism from commuters",
    tag: "Negative",
    category: "Roads",
    date: "Apr 1, 2026",
    summary:
      "Road usability is still mixed, with citizens pointing to short-lived repairs and congestion.",
  },
  {
    id: 5,
    title: "Health outreach camp receives positive turnout",
    tag: "Neutral",
    category: "Health",
    date: "Apr 4, 2026",
    summary:
      "A modest positive signal for public-facing health engagement, though infrastructure signal remains incomplete.",
  },
];
