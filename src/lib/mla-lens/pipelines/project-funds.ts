import { projects } from "@/data/mla-lens/projects";
import type {
  HomepageProjectItem,
  MoneySchemeMetadata,
  Provenance,
} from "@/lib/mla-lens/homepage/types";

export interface ProjectFundsData {
  projects: HomepageProjectItem[];
  scheme?: MoneySchemeMetadata;
  provenance: Provenance;
}

const OFFICIAL_FETCH_TIMEOUT_MS = 8000;
const OFFICIAL_REVALIDATE_SECONDS = 24 * 60 * 60;
const MLACDS_SCHEME_PAGE_URL = "https://tnrd.tn.gov.in/schemes/st_mlacds.html";
const MLACDS_2023_GO_INDEX_URL =
  "https://tnrd.tn.gov.in/dyn_json_schemes_name_details.php?go_type=MQ%3D%3D&sch_id=OTk5OTk%3D&scheme_type=Mw%3D%3D&y=MjAyMw%3D%3D";
const TIRUNELVELI_ADMIN_ORDERS_URL =
  "https://tirunelveli.nic.in/15th-cfc-administrative-sanction-orders-vp-bp-dp/";

const currentMlacdsBaseline = {
  annualAllocation: "₹3.00Cr",
  schemeYear: "2023-24",
};

type SanctionOrderSection =
  | "Block Panchayat"
  | "Village Panchayat"
  | "District Panchayat";

interface SanctionOrderBundle {
  section: SanctionOrderSection;
  pdfUrls: string[];
}

async function fetchOfficialHtml(url: string): Promise<string> {
  const response = await fetch(url, {
    next: { revalidate: OFFICIAL_REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(OFFICIAL_FETCH_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`Official source request failed for ${url} with ${response.status}`);
  }

  return response.text();
}

function buildSchemeMetadata(goIndexHtml: string): MoneySchemeMetadata | null {
  const goRowMatch = goIndexHtml.match(
    /<div class="cell" style="text-align:center">98<\/div>\s*<div class="cell" style="text-align:center">19-07-2023<\/div>\s*<div class="cell" style="text-align:center"><a href="([^"]+)"/i,
  );

  if (!goRowMatch) {
    return null;
  }

  return {
    schemeName: "MLACDS annual constituency allocation",
    schemeYear: currentMlacdsBaseline.schemeYear,
    annualAllocation: currentMlacdsBaseline.annualAllocation,
    sourceLabel: "TNRD MLACDS G.O.(Ms) No.98",
    sourceUrl: goRowMatch[1],
    note:
      "Official 2023-24 administrative sanction and fund-release order for the MLA Constituency Development Scheme.",
    evidenceLinks: [
      {
        label: "MLACDS scheme page",
        url: MLACDS_SCHEME_PAGE_URL,
      },
      {
        label: "MLACDS 2023 GO index",
        url: MLACDS_2023_GO_INDEX_URL,
      },
    ],
  };
}

function extractSectionHtml(
  html: string,
  sectionHeading: SanctionOrderSection,
  nextHeading?: string,
): string {
  const start = html.indexOf(sectionHeading);

  if (start === -1) {
    return "";
  }

  const end = nextHeading ? html.indexOf(nextHeading, start) : html.length;

  return html.slice(start, end === -1 ? html.length : end);
}

function extractPalayamkottaiBundle(
  html: string,
  section: SanctionOrderSection,
  nextHeading?: string,
): SanctionOrderBundle | null {
  const sectionHtml = extractSectionHtml(html, section, nextHeading);
  const rowMatch = sectionHtml.match(
    /<tr>\s*<td>\d+<\/td>\s*<td>Palayamkottai<\/td>\s*<td><a href="([^"]+)"/i,
  );

  if (!rowMatch) {
    return null;
  }

  const rowHtmlMatch = sectionHtml.match(
    /<tr>\s*<td>\d+<\/td>\s*<td>Palayamkottai<\/td>([\s\S]*?)<\/tr>/i,
  );

  if (!rowHtmlMatch) {
    return null;
  }

  const rowPdfUrls = [...rowHtmlMatch[1].matchAll(/<a href="([^"]+)"/gi)].map(
    (match) => match[1],
  );

  if (rowPdfUrls.length === 0) {
    return null;
  }

  return {
    section,
    pdfUrls: rowPdfUrls,
  };
}

function buildOfficialProjectItems(
  scheme: MoneySchemeMetadata | null,
  bundles: SanctionOrderBundle[],
): HomepageProjectItem[] {
  const officialProjects: HomepageProjectItem[] = [];

  if (scheme) {
    officialProjects.push({
      id: 1,
      name: "MLACDS annual constituency allocation",
      budget: scheme.annualAllocation,
      amountDisplay: scheme.annualAllocation,
      status: "Ongoing",
      area: "Palayamkottai constituency",
      source: scheme.sourceLabel,
      sourceLabel: scheme.sourceLabel,
      sourceUrl: scheme.sourceUrl,
      category: "Funds",
      implementingAgency: "District Collector",
      evidenceLinks: scheme.evidenceLinks,
      extractionGranularity: "summary",
      provenance: {
        status: "official",
        label: "Official",
        sourceLabel: scheme.sourceLabel,
        sourceUrl: scheme.sourceUrl,
      },
      signalStrength: scheme.evidenceLinks && scheme.evidenceLinks.length >= 2
        ? "high"
        : "medium",
    });
  }

  bundles.forEach((bundle, index) => {
    const mostRecentOrderUrl = bundle.pdfUrls[bundle.pdfUrls.length - 1];

    officialProjects.push({
      id: 100 + index,
      name: `Palayamkottai ${bundle.section} sanction orders`,
      budget: "Order PDFs",
      amountDisplay: "Amount not extracted",
      status: "Unclear",
      area: "Palayamkottai",
      source: `15th CFC ${bundle.section} orders`,
      sourceLabel: `15th CFC ${bundle.section} order PDF`,
      sourceUrl: mostRecentOrderUrl,
      category: "Civic works",
      implementingAgency: bundle.section,
      evidenceLinks: [
        {
          label: "Tirunelveli 15th CFC order index",
          url: TIRUNELVELI_ADMIN_ORDERS_URL,
        },
        ...bundle.pdfUrls.map((url, pdfIndex) => ({
          label: `${bundle.section} ${2020 + pdfIndex}-${String(2021 + pdfIndex).slice(-2)} order PDF`,
          url,
        })),
      ],
      extractionGranularity: "bundle",
      provenance: {
        status: "official",
        label: "Official",
        sourceLabel: "Tirunelveli district sanction orders",
        sourceUrl: TIRUNELVELI_ADMIN_ORDERS_URL,
      },
      signalStrength: bundle.pdfUrls.length >= 2 ? "high" : "medium",
    });
  });

  return officialProjects;
}

async function loadProjectFundsFromSource(): Promise<ProjectFundsData | null> {
  const [goIndexHtml, adminOrdersHtml] = await Promise.all([
    fetchOfficialHtml(MLACDS_2023_GO_INDEX_URL),
    fetchOfficialHtml(TIRUNELVELI_ADMIN_ORDERS_URL),
  ]);

  const scheme = buildSchemeMetadata(goIndexHtml);
  const sanctionOrderBundles = [
    extractPalayamkottaiBundle(
      adminOrdersHtml,
      "Block Panchayat",
      "Village Panchayat",
    ),
    extractPalayamkottaiBundle(
      adminOrdersHtml,
      "Village Panchayat",
      "District Panchayat",
    ),
    extractPalayamkottaiBundle(adminOrdersHtml, "District Panchayat"),
  ].filter((bundle): bundle is SanctionOrderBundle => bundle !== null);

  const officialProjects = buildOfficialProjectItems(scheme, sanctionOrderBundles);

  if (!scheme && officialProjects.length === 0) {
    return null;
  }

  return {
    projects: officialProjects,
    scheme: scheme ?? undefined,
    provenance: {
      status: "official",
      label: "Official",
      sourceLabel: "TNRD + Tirunelveli district public records",
      sourceUrl: TIRUNELVELI_ADMIN_ORDERS_URL,
    },
  };
}

function deriveProjectSignalStrength(source: string): HomepageProjectItem["signalStrength"] {
  const normalizedSource = source.toLowerCase();

  if (
    normalizedSource.includes("inferred") ||
    normalizedSource.includes("weak") ||
    normalizedSource.includes("unverified") ||
    normalizedSource.includes("proxy")
  ) {
    return "low";
  }

  if (
    normalizedSource.includes("+") ||
    normalizedSource.includes(" and ") ||
    normalizedSource.includes("/") ||
    normalizedSource.includes(",")
  ) {
    return "high";
  }

  return "medium";
}

export async function getProjectFundsData(): Promise<ProjectFundsData> {
  try {
    const sourceData = await loadProjectFundsFromSource();

    if (sourceData) {
      return sourceData;
    }

    console.warn(
      "MLA Lens project pipeline: no live project source is configured. Using fixture-backed tentative data.",
    );
  } catch (error) {
    console.error(
      "Failed to load project and funds data, using fixtures instead.",
      error,
    );
  }

  return {
    projects: projects.map((project) => ({
      ...project,
      signalStrength: deriveProjectSignalStrength(project.source),
      sourceLabel: project.source,
      extractionGranularity: "row",
      provenance: {
        status: "fixture",
        label: "Fixture",
        sourceLabel: project.source,
      },
    })),
    provenance: {
      status: "tentative",
      label: "Tentative",
      sourceLabel: "Fixture-backed project tracker",
    },
  };
}
