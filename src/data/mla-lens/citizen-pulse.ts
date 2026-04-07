import type { CitizenSignal } from "@/data/mla-lens/types";

export const citizenTones = ["All", "Complaint", "Mixed", "Praise"] as const;

export const citizenPulse: CitizenSignal[] = [
  {
    id: 1,
    text: "Drainage issue still unresolved for months near our street.",
    tone: "Complaint",
    area: "Low-lying residential pocket",
    source: "Public post",
  },
  {
    id: 2,
    text: "Hospital service has improved, but waiting time is still messy.",
    tone: "Mixed",
    area: "PHC catchment",
    source: "Public review",
  },
  {
    id: 3,
    text: "Water supply is better than last year, but not reliable every week.",
    tone: "Mixed",
    area: "Perumalpuram",
    source: "Citizen mention",
  },
  {
    id: 4,
    text: "School compound looks much better now after repairs.",
    tone: "Praise",
    area: "Palayamkottai central",
    source: "Local comment",
  },
  {
    id: 5,
    text: "Garbage pickup is inconsistent and no one seems accountable.",
    tone: "Complaint",
    area: "Mixed wards",
    source: "Public complaint",
  },
];
