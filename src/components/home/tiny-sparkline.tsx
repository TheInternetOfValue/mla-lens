interface TinySparklineProps {
  data: number[];
  colorClassName?: string;
}

export function TinySparkline({
  data,
  colorClassName = "bg-sky-400",
}: TinySparklineProps) {
  const max = Math.max(...data);

  return (
    <div className="flex h-16 items-end gap-2">
      {data.map((value, index) => (
        <div
          key={`${value}-${index}`}
          className={`w-full rounded-t-md ${colorClassName}`}
          style={{
            height: `${(value / max) * 100}%`,
            opacity: Math.max(0.4, value / max),
          }}
        />
      ))}
    </div>
  );
}
