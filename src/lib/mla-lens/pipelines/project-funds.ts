import { projects } from "@/data/mla-lens/projects";
import type { ProjectData } from "@/data/mla-lens/types";

export interface ProjectFundsData {
  projects: ProjectData[];
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
  } catch (error) {
    console.error(
      "Failed to load project and funds data, using fixtures instead.",
      error,
    );
  }

  return { projects };
}
