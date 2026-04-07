import { projects } from "@/data/mla-lens/projects";
import type { HomepageProjectItem, Provenance } from "@/lib/mla-lens/homepage/types";

export interface ProjectFundsData {
  projects: HomepageProjectItem[];
  provenance: Provenance;
}

async function loadProjectFundsFromSource(): Promise<ProjectFundsData | null> {
  // Placeholder for a future tenders/budgets/projects data source.
  return null;
}

export async function getProjectFundsData(): Promise<ProjectFundsData> {
  try {
    const sourceData = await loadProjectFundsFromSource();

    if (sourceData) {
      return sourceData;
    }

    console.warn(
      "MLA Lens project pipeline: no live project source is configured. Using fixture-backed tentative data.",
    );
  } catch (error) {
    console.error(
      "Failed to load project and funds data, using fixtures instead.",
      error,
    );
  }

  return {
    projects: projects.map((project) => ({
      ...project,
      provenance: {
        status: "fixture",
        label: "Fixture",
        sourceLabel: project.source,
      },
    })),
    provenance: {
      status: "tentative",
      label: "Tentative",
      sourceLabel: "Fixture-backed project tracker",
    },
  };
}
