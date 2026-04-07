import type { MapPinData } from "@/data/mla-lens/types";

export const mapPins: MapPinData[] = [
  {
    id: 1,
    title: "Drainage stress cluster",
    status: "Problem",
    x: "22%",
    y: "58%",
    detail: "Repeated complaint density around overflow-prone streets.",
  },
  {
    id: 2,
    title: "School renovation signal",
    status: "Good",
    x: "55%",
    y: "36%",
    detail: "Positive education infrastructure mentions.",
  },
  {
    id: 3,
    title: "Water pipeline work",
    status: "Average",
    x: "72%",
    y: "48%",
    detail: "Ongoing project with mixed citizen sentiment.",
  },
  {
    id: 4,
    title: "Road patchwork complaints",
    status: "Problem",
    x: "42%",
    y: "72%",
    detail: "Commuter complaints remain elevated.",
  },
];
