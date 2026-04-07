import { HomeHero } from "@/components/home/home-hero";
import { OverviewPanel } from "@/components/home/overview-panel";
import { PageTabs } from "@/components/home/page-tabs";
import { ScoresPanel } from "@/components/home/scores-panel";
import { SignalSummaryGrid } from "@/components/home/signal-summary-grid";
import type { MLALensHomepageData } from "@/lib/mla-lens/homepage/types";

interface MLALensHomepageProps {
  data: MLALensHomepageData;
}

export function MLALensHomepage({ data }: MLALensHomepageProps) {
  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <HomeHero />

        <OverviewPanel fastRead={data.fastRead} overview={data.overview} />

        <div className="mt-8">
          <ScoresPanel cards={data.scoreCards} />
        </div>

        <div className="mt-8">
          <PageTabs data={data} />
        </div>

        <SignalSummaryGrid cards={data.signalSummaryCards} />
      </div>
    </div>
  );
}
