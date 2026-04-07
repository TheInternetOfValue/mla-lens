"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { MLALensHomepageData } from "@/lib/mla-lens/homepage/types";

import { CitizenPanel } from "@/components/home/citizen-panel";
import { MapPanel } from "@/components/home/map-panel";
import { MoneyPanel } from "@/components/home/money-panel";
import { NewsPanel } from "@/components/home/news-panel";
import { ProfilePanel } from "@/components/home/profile-panel";
import { SectionTitle } from "@/components/home/section-title";

interface PageTabsProps {
  data: Pick<
    MLALensHomepageData,
    "citizens" | "map" | "money" | "news" | "profile"
  >;
}

export function PageTabs({ data }: PageTabsProps) {
  return (
    <Tabs defaultValue="money" className="w-full">
      <TabsList className="grid w-full grid-cols-5 rounded-2xl bg-zinc-950 p-1">
        <TabsTrigger
          value="money"
          className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-black"
        >
          Money
        </TabsTrigger>
        <TabsTrigger
          value="news"
          className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-black"
        >
          News
        </TabsTrigger>
        <TabsTrigger
          value="citizens"
          className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-black"
        >
          Citizens
        </TabsTrigger>
        <TabsTrigger
          value="map"
          className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-black"
        >
          Map
        </TabsTrigger>
        <TabsTrigger
          value="profile"
          className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-black"
        >
          Profile
        </TabsTrigger>
      </TabsList>

      <TabsContent value="money" className="mt-6">
        <SectionTitle
          title="Funds and project visibility"
          subtitle="A blunt proxy for where the money seems to be going."
        />
        <div className="mt-4">
          <MoneyPanel projects={data.money.projects} />
        </div>
      </TabsContent>

      <TabsContent value="news" className="mt-6">
        <SectionTitle
          title="News intelligence"
          subtitle="Signal extraction from public reporting."
        />
        <div className="mt-4">
          <NewsPanel categories={data.news.categories} items={data.news.items} />
        </div>
      </TabsContent>

      <TabsContent value="citizens" className="mt-6">
        <SectionTitle
          title="Citizen pulse"
          subtitle="This is the part that hurts more than a press release."
        />
        <div className="mt-4">
          <CitizenPanel
            items={data.citizens.items}
            summary={data.citizens.summary}
            tones={data.citizens.tones}
          />
        </div>
      </TabsContent>

      <TabsContent value="map" className="mt-6">
        <SectionTitle
          title="Geographic signal layer"
          subtitle="Soon real pins. For now, the UX spine."
        />
        <div className="mt-4">
          <MapPanel pins={data.map.pins} />
        </div>
      </TabsContent>

      <TabsContent value="profile" className="mt-6">
        <SectionTitle
          title="MLA profile and trust layer"
          subtitle="Structured transparency beats vibes."
        />
        <div className="mt-4">
          <ProfilePanel
            mlaName={data.profile.mlaName}
            profile={data.profile.profile}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
}
