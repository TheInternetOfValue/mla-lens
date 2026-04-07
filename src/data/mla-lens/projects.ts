import type { ProjectData } from "@/data/mla-lens/types";

export const projects: ProjectData[] = [
  {
    id: 1,
    name: "Ward 14 Road Upgrade",
    budget: "₹50L",
    status: "Completed",
    area: "Ward 14",
    source: "District infrastructure note",
    category: "Roads",
  },
  {
    id: 2,
    name: "Underground Drainage Expansion",
    budget: "₹1.2Cr",
    status: "Ongoing",
    area: "Melapalayam border stretch",
    source: "Tender portal + news mention",
    category: "Water",
  },
  {
    id: 3,
    name: "Government School Renovation",
    budget: "₹22L",
    status: "Completed",
    area: "Palayamkottai central",
    source: "Education dept release",
    category: "Education",
  },
  {
    id: 4,
    name: "Primary Health Centre Equipment Upgrade",
    budget: "₹35L",
    status: "Unclear",
    area: "KTC Nagar zone",
    source: "Health procurement note",
    category: "Health",
  },
  {
    id: 5,
    name: "Water Pipeline Improvement",
    budget: "₹90L",
    status: "Ongoing",
    area: "Perumalpuram side",
    source: "Local news + civic complaint mentions",
    category: "Water",
  },
];
