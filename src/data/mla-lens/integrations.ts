import { citizenPulse } from "@/data/mla-lens/citizen-pulse";
import { mlaProfile } from "@/data/mla-lens/mla-profile";
import { newsFeed } from "@/data/mla-lens/news-feed";
import { overview } from "@/data/mla-lens/overview";
import { projects } from "@/data/mla-lens/projects";
import type { PipelineIntegration } from "@/data/mla-lens/types";

export const newsFeedPipeline: PipelineIntegration<typeof newsFeed> = {
  key: "news-feed",
  label: "News feed pipeline",
  description:
    "Swap the mock feed for extracted and ranked public reporting without changing the homepage panel contract.",
  ownership: "news intelligence",
  status: "mock-ready",
  initialData: newsFeed,
};

export const citizenSentimentPipeline: PipelineIntegration<typeof citizenPulse> =
  {
    key: "citizen-sentiment",
    label: "Citizen sentiment pipeline",
    description:
      "Replace static citizen signals with normalized complaints, praise, and mixed mentions from public feedback sources.",
    ownership: "citizen pulse",
    status: "mock-ready",
    initialData: citizenPulse,
  };

export const projectFundsPipeline: PipelineIntegration<typeof projects> = {
  key: "project-funds",
  label: "Project and funds pipeline",
  description:
    "Prepared for tender, budget, and completion-status ingestion while preserving the current project card UI.",
  ownership: "funds visibility",
  status: "mock-ready",
  initialData: projects,
};

export const mlaProfilePipeline: PipelineIntegration<
  typeof mlaProfile & { overviewName: string }
> = {
  key: "mla-profile",
  label: "MLA profile pipeline",
  description:
    "Reserved for affidavit, election, assembly, and public-record enrichment without changing the profile panel API.",
  ownership: "profile layer",
  status: "mock-ready",
  initialData: {
    ...mlaProfile,
    overviewName: overview.mla,
  },
};
