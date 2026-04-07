import { citizenPulse, citizenTones } from "@/data/mla-lens/citizen-pulse";
import type { CitizenSignal } from "@/data/mla-lens/types";

export interface CitizenSentimentData {
  tones: readonly string[];
  items: CitizenSignal[];
}

async function loadCitizenSentimentFromSource(): Promise<CitizenSentimentData | null> {
  // Placeholder for a future citizen-sentiment ingestion source.
  return null;
}

export async function getCitizenSentimentData(): Promise<CitizenSentimentData> {
  try {
    const sourceData = await loadCitizenSentimentFromSource();

    if (sourceData) {
      return sourceData;
    }
  } catch (error) {
    console.error(
      "Failed to load citizen sentiment data, using fixtures instead.",
      error,
    );
  }

  return {
    tones: citizenTones,
    items: citizenPulse,
  };
}
