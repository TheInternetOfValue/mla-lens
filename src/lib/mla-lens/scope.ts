export interface ActiveScopeConfig {
  constituencySlug: string;
  constituencyName: string;
  districtName: string;
  stateName: string;
  representativeName: string;
  representativeRole: string;
  scopeLabel: string;
  rolloutNote: string;
}

export const activeScope: ActiveScopeConfig = {
  constituencySlug: "palayamkottai",
  constituencyName: "Palayamkottai",
  districtName: "Tirunelveli",
  stateName: "Tamil Nadu",
  representativeName: "M. Abdul Wahab",
  representativeRole: "Current MLA",
  scopeLabel: "Pilot constituency",
  rolloutNote: "More constituencies coming soon",
};
