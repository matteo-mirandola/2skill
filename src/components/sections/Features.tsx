import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

const courses = [
  {
    title: "Choose and set up AI tools that keep data in-house",
    body: "How to tell whether a tool trains on your data, where it's hosted, turning off training/history, and picking the business tier that comes with the right contractual terms.",
  },
  {
    title: "Ship the recurring report without dreading it",
    body: "Pull a dataset into a narrative, draft the exec summary, turn a pivot table into three sentences a director will actually read. This is where the felt pain is loudest.",
  },
  {
    title: "Record invoices and expenses in half the time.",
    body: "Data extraction from PDF/invoice photos, categorization, and VAT validation integrated into the management software they already use",
  },
];

export function Features() {
  return (
    <section id="platform" className="relative px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-violet">
            The platform
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            Built like a measurement tool,
            <span className="text-muted"> not a course library.</span>
          </h2>
        </Reveal>

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-3">
          {courses.map((c) => (
            <StaggerItem key={c.title}>
              <div className="card-glow h-full rounded-2xl border border-line bg-surface/60 p-7">
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {c.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
