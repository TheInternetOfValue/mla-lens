interface SectionTitleProps {
  title: string;
  subtitle: string;
}

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-white">
          {title}
        </h2>
        <p className="mt-1 text-sm text-zinc-400">{subtitle}</p>
      </div>
    </div>
  );
}
