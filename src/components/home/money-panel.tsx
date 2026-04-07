import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProjectData } from "@/lib/mla-lens/homepage/types";

import { StatusBadge } from "@/components/home/status-badge";

interface MoneyPanelProps {
  projects: ProjectData[];
}

export function MoneyPanel({ projects }: MoneyPanelProps) {
  const completed = projects.filter((project) => project.status === "Completed");
  const ongoing = projects.filter((project) => project.status === "Ongoing");
  const unclear = projects.filter((project) => project.status === "Unclear");

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <Card className="border-zinc-800 bg-zinc-950/70">
        <CardHeader>
          <CardTitle className="text-white">Follow the money</CardTitle>
          <CardDescription className="text-zinc-400">
            A simple proxy first. Fancy governance theater can come later.
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
            <p className="text-sm text-zinc-400">Takeaway</p>
            <p className="mt-2 text-sm text-zinc-300">
              This section is designed for later hookup to automated tender,
              PDF, and news extraction. Right now it gives you the product
              spine.
            </p>
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
                    </div>
                    <p className="mt-2 text-sm text-zinc-400">
                      {project.area} · {project.category}
                    </p>
                    <p className="mt-2 text-sm text-zinc-500">
                      Source: {project.source}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-zinc-800 px-3 py-2 text-sm text-zinc-200">
                    {project.budget}
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
