import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type {
  HomepageProjectItem,
  MoneySchemeMetadata,
} from "@/lib/mla-lens/homepage/types";

import { GranularityBadge } from "@/components/home/granularity-badge";
import { ProvenanceBadge } from "@/components/home/provenance-badge";
import { SignalStrengthIndicator } from "@/components/home/signal-strength-indicator";
import { StatusBadge } from "@/components/home/status-badge";

interface MoneyPanelProps {
  projects: HomepageProjectItem[];
  scheme?: MoneySchemeMetadata;
}

export function MoneyPanel({ projects, scheme }: MoneyPanelProps) {
  const completed = projects.filter((project) => project.status === "Completed");
  const ongoing = projects.filter((project) => project.status === "Ongoing");
  const unclear = projects.filter((project) => project.status === "Unclear");

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <Card className="border-zinc-800 bg-zinc-950/70">
        <CardHeader>
          <CardTitle className="text-white">Follow the money</CardTitle>
          <CardDescription className="text-zinc-400">
            Official sources first. Row-level parsing is still in progress.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
              <p className="text-sm text-zinc-400">Tracked projects</p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {projects.length}
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
              <p className="text-sm text-zinc-400">Completed</p>
              <p className="mt-2 text-2xl font-semibold text-emerald-300">
                {completed.length}
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
              <p className="text-sm text-zinc-400">Ongoing</p>
              <p className="mt-2 text-2xl font-semibold text-amber-300">
                {ongoing.length}
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
              <p className="text-sm text-zinc-400">Unclear</p>
              <p className="mt-2 text-2xl font-semibold text-zinc-300">
                {unclear.length}
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
            <p className="text-sm text-zinc-400">Official scheme baseline</p>
            {scheme ? (
              <>
                <p className="mt-2 text-sm text-zinc-200">
                  {scheme.schemeYear} allocation: {scheme.annualAllocation}
                </p>
                <p className="mt-2 text-sm text-zinc-400">{scheme.note}</p>
                <p className="mt-2 text-xs text-zinc-500">
                  Current money records are officially sourced, but most project
                  entries are still bundle- or summary-level references rather
                  than fully parsed row-level work items.
                </p>
                <p className="mt-3 text-sm text-zinc-500">
                  Source:{" "}
                  <a
                    href={scheme.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="transition hover:text-zinc-300 hover:underline"
                  >
                    {scheme.sourceLabel}
                  </a>
                </p>
              </>
            ) : (
              <p className="mt-2 text-sm text-zinc-300">
                Official scheme metadata is not available right now, so the
                section is using the current fallback tracker.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border-zinc-800 bg-zinc-950/70">
        <CardHeader>
          <CardTitle className="text-white">Project tracker</CardTitle>
          <CardDescription className="text-zinc-400">
            Tap-level cards. Less manifesto, more evidence.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 transition hover:border-zinc-700"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium text-white">{project.name}</p>
                      <StatusBadge value={project.status} />
                      <ProvenanceBadge provenance={project.provenance} />
                      <GranularityBadge
                        granularity={project.extractionGranularity}
                      />
                      <SignalStrengthIndicator
                        signalStrength={project.signalStrength}
                      />
                    </div>
                    <p className="mt-2 text-sm text-zinc-400">
                      {project.area} · {project.category}
                    </p>
                    {project.implementingAgency ? (
                      <p className="mt-2 text-sm text-zinc-500">
                        Implementing agency: {project.implementingAgency}
                      </p>
                    ) : null}
                    <p className="mt-2 text-sm text-zinc-500">
                      Source:{" "}
                      {project.sourceUrl ? (
                        <a
                          href={project.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="transition hover:text-zinc-300 hover:underline"
                        >
                          {project.source}
                        </a>
                      ) : (
                        project.source
                      )}
                    </p>
                    {project.evidenceLinks && project.evidenceLinks.length > 0 ? (
                      <p className="mt-2 text-xs text-zinc-500">
                        {project.evidenceLinks.length} official reference
                        {project.evidenceLinks.length === 1 ? "" : "s"}
                      </p>
                    ) : null}
                  </div>
                  <div className="rounded-2xl border border-zinc-800 px-3 py-2 text-sm text-zinc-200">
                    {project.amountDisplay ?? project.budget}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
