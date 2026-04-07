"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type {
  CitizenSignal,
  MapPinData,
  MLAProfileData,
  NewsItem,
  ProjectData,
} from "@/data/mla-lens";

import { CitizenPanel } from "@/components/home/citizen-panel";
import { MapPanel } from "@/components/home/map-panel";
import { MoneyPanel } from "@/components/home/money-panel";
import { NewsPanel } from "@/components/home/news-panel";
import { ProfilePanel } from "@/components/home/profile-panel";
import { SectionTitle } from "@/components/home/section-title";

interface PageTabsProps {
  citizenItems: CitizenSignal[];
  citizenTones: readonly string[];
  mapPins: MapPinData[];
  mlaName: string;
  newsCategories: readonly string[];
  newsItems: NewsItem[];
  profile: MLAProfileData;
  projects: ProjectData[];
}

export function PageTabs({
  citizenItems,
  citizenTones,
  mapPins,
  mlaName,
  newsCategories,
  newsItems,
  profile,
  projects,
}: PageTabsProps) {
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
          <MoneyPanel projects={projects} />
        </div>
      </TabsContent>

      <TabsContent value="news" className="mt-6">
        <SectionTitle
          title="News intelligence"
          subtitle="Signal extraction from public reporting."
        />
        <div className="mt-4">
          <NewsPanel categories={newsCategories} items={newsItems} />
        </div>
      </TabsContent>

      <TabsContent value="citizens" className="mt-6">
        <SectionTitle
          title="Citizen pulse"
          subtitle="This is the part that hurts more than a press release."
        />
        <div className="mt-4">
          <CitizenPanel items={citizenItems} tones={citizenTones} />
        </div>
      </TabsContent>

      <TabsContent value="map" className="mt-6">
        <SectionTitle
          title="Geographic signal layer"
          subtitle="Soon real pins. For now, the UX spine."
        />
        <div className="mt-4">
          <MapPanel pins={mapPins} />
        </div>
      </TabsContent>

      <TabsContent value="profile" className="mt-6">
        <SectionTitle
          title="MLA profile and trust layer"
          subtitle="Structured transparency beats vibes."
        />
        <div className="mt-4">
          <ProfilePanel mlaName={mlaName} profile={profile} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
