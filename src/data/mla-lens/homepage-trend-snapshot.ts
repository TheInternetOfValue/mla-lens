export interface HomepageTrendSnapshot {
  capturedAt: string;
  newsVolume: number;
  negativeSentimentShare: number;
  categoryConcentration: number;
  completedProjects: number;
}

export const previousHomepageTrendSnapshot: HomepageTrendSnapshot = {
  capturedAt: "2026-03-31T00:00:00.000Z",
  newsVolume: 5,
  negativeSentimentShare: 0.5,
  categoryConcentration: 0.6,
  completedProjects: 1,
};
