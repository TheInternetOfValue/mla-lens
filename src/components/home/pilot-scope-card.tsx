import { Landmark, MapPinned, UserRound } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { HomepageScopeInfo } from "@/lib/mla-lens/homepage/types";

interface PilotScopeCardProps {
  scope: HomepageScopeInfo;
}

export function PilotScopeCard({ scope }: PilotScopeCardProps) {
  return (
    <Card className="mb-8 border-zinc-800 bg-zinc-950/70">
      <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="border-zinc-700 bg-zinc-900 text-zinc-200">
              {scope.scopeLabel}
            </Badge>
            <Badge className="border-zinc-800 bg-zinc-950 text-zinc-400">
              Starting with {scope.constituencyName}
            </Badge>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-white">
              Starting with {scope.constituencyName}
            </p>
            <p className="text-sm text-zinc-400">
              {scope.representativeRole} · {scope.representativeName}
            </p>
          </div>
        </div>
        <div className="grid gap-2 text-sm text-zinc-400">
          <span className="inline-flex items-center gap-2">
            <MapPinned className="h-4 w-4" />
            {scope.constituencyName}, {scope.districtName}, {scope.stateName}
          </span>
          <span className="inline-flex items-center gap-2">
            <UserRound className="h-4 w-4" />
            Tracking the current MLA
          </span>
          <span className="inline-flex items-center gap-2">
            <Landmark className="h-4 w-4" />
            {scope.rolloutNote}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
