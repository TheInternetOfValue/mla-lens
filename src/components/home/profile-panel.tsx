import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { MLAProfileData } from "@/lib/mla-lens/homepage/types";

import { TinySparkline } from "@/components/home/tiny-sparkline";

interface ProfilePanelProps {
  mlaName: string;
  profile: MLAProfileData;
}

export function ProfilePanel({ mlaName, profile }: ProfilePanelProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
      <Card className="border-zinc-800 bg-zinc-950/70">
        <CardHeader>
          <CardTitle className="text-white">MLA profile</CardTitle>
          <CardDescription className="text-zinc-400">
            Keep it sharp, not gossipy.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
            <p className="text-sm text-zinc-400">Name</p>
            <p className="mt-1 text-lg font-semibold text-white">{mlaName}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
              <p className="text-sm text-zinc-400">Party</p>
              <p className="mt-1 text-lg font-semibold text-white">
                {profile.party}
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
              <p className="text-sm text-zinc-400">Elected</p>
              <p className="mt-1 text-lg font-semibold text-white">
                {profile.winYear}
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
            <p className="text-sm text-zinc-400">Incumbency</p>
            <p className="mt-1 text-sm text-zinc-200">{profile.incumbency}</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-zinc-800 bg-zinc-950/70">
          <CardHeader>
            <CardTitle className="text-white">
              Assets trend placeholder
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Hook to affidavit data later.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TinySparkline
              data={profile.assetsTrend}
              colorClassName="bg-amber-400"
            />
            <p className="mt-4 text-sm text-zinc-400">
              A simple chart placeholder so the UI is ready before the data
              grows a spine.
            </p>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-950/70">
          <CardHeader>
            <CardTitle className="text-white">
              Public activity placeholder
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Assembly and public record layer later.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TinySparkline
              data={profile.publicActivity}
              colorClassName="bg-sky-400"
            />
            <p className="mt-4 text-sm text-zinc-400">
              This is where questions asked, debates, attendance, and media
              activity can land.
            </p>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-950/70 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Trust flags</CardTitle>
            <CardDescription className="text-zinc-400">
              Not judgment. Just structured suspicion.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {profile.trustFlags.map((flag) => (
              <div
                key={flag}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 text-sm text-zinc-300"
              >
                {flag}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
