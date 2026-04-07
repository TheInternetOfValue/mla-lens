import { Badge } from "@/components/ui/badge";
import type { HomepageScopeInfo } from "@/lib/mla-lens/homepage/types";

import { TrendingUp } from "@/components/home/home-icons";

interface HomeHeroProps {
  scope: HomepageScopeInfo;
}

export function HomeHero({ scope }: HomeHeroProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1 text-xs text-zinc-400">
          <TrendingUp className="h-3.5 w-3.5" />
          MLA Lens · Constituency Intelligence System
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
          See what your MLA actually does
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400 md:text-base">
          A live, evidence-first civic intelligence layer for{" "}
          {scope.constituencyName}. Because campaign slogans are cheap and
          drainage is not.
        </p>
      </div>
      <div className="flex flex-wrap gap-2 md:max-w-xs md:justify-end">
        <Badge className="h-auto rounded-2xl border-zinc-700 bg-white px-3 py-2 text-black">
          Starting with {scope.constituencyName}
        </Badge>
        <Badge className="h-auto rounded-2xl border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-300">
          {scope.rolloutNote}
        </Badge>
      </div>
    </div>
  );
}
