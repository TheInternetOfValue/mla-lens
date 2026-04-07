import {
  citizenPulse,
  citizenTones,
  mapPins,
  mlaProfile,
  newsCategories,
  newsFeed,
  overview,
  projects,
  scoreCards,
  signalSummaryCards,
} from "@/data/mla-lens";

import { HomeHero } from "@/components/home/home-hero";
import { OverviewPanel } from "@/components/home/overview-panel";
import { PageTabs } from "@/components/home/page-tabs";
import { ScoresPanel } from "@/components/home/scores-panel";
import { SignalSummaryGrid } from "@/components/home/signal-summary-grid";

export function MLALensHomepage() {
  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <HomeHero />

        <OverviewPanel overview={overview} />

        <div className="mt-8">
          <ScoresPanel cards={scoreCards} />
        </div>

        <div className="mt-8">
          <PageTabs
            citizenItems={citizenPulse}
            citizenTones={citizenTones}
            mapPins={mapPins}
            mlaName={overview.mla}
            newsCategories={newsCategories}
            newsItems={newsFeed}
            profile={mlaProfile}
            projects={projects}
          />
        </div>

        <SignalSummaryGrid cards={signalSummaryCards} />
      </div>
    </div>
  );
}
