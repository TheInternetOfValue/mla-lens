import { Button } from "@/components/ui/button";

import { TrendingUp } from "@/components/home/home-icons";

export function HomeHero() {
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
          A live, evidence-first civic intelligence layer for Palayamkottai.
          Because campaign slogans are cheap and drainage is not.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button className="rounded-2xl bg-white text-black hover:bg-zinc-200">
          Compare constituencies
        </Button>
        <Button
          variant="outline"
          className="rounded-2xl border-zinc-800 bg-zinc-950 text-zinc-200 hover:bg-zinc-900"
        >
          Download brief
        </Button>
      </div>
    </div>
  );
}
