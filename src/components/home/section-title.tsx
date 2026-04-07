import { ProvenanceBadge } from "@/components/home/provenance-badge";
import type { Provenance } from "@/lib/mla-lens/homepage/types";

interface SectionTitleProps {
  title: string;
  subtitle: string;
  provenance?: Provenance;
}

export function SectionTitle({
  title,
  subtitle,
  provenance,
}: SectionTitleProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-white">
          {title}
        </h2>
        <p className="mt-1 text-sm text-zinc-400">{subtitle}</p>
      </div>
      {provenance ? (
        <div className="flex flex-col items-start gap-2 md:items-end">
          <ProvenanceBadge provenance={provenance} />
          {provenance.sourceLabel ? (
            <p className="text-xs text-zinc-500">
              {provenance.sourceUrl ? (
                <a
                  href={provenance.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-zinc-300 hover:underline"
                >
                  {provenance.sourceLabel}
                </a>
              ) : (
                provenance.sourceLabel
              )}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
