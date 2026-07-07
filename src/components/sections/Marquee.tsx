const tasks = [
  "Customer emails",
  "Spreadsheet analysis",
  "Sales proposals",
  "Meeting notes",
  "Support tickets",
  "Reports & summaries",
  "Data cleanup",
  "Job descriptions",
  "Marketing copy",
  "Research briefs",
];

export function Marquee() {
  const row = [...tasks, ...tasks];
  return (
    <section className="relative border-y border-line/60 bg-bg-soft/60 py-8">
      <p className="mb-6 text-center text-xs uppercase tracking-[0.25em] text-muted">
        Targeted on the real work your team already does
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee gap-4">
          {row.map((t, i) => (
            <span
              key={i}
              className="flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-surface/60 px-5 py-2 text-sm text-muted"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet to-cyan" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
