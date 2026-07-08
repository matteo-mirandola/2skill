import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

const courses = [
  {
    title: "Choose and set up AI tools that keep data in-house",
    body: "How to tell whether a tool trains on your data, where it's hosted, turning off training/history, and picking the business tier that comes with the right contractual terms.",
    image: "/platform-responsible-safe-use-of-ai.svg",
  },
  {
    title: "Ship the recurring report without dreading it",
    body: "Pull a dataset into a narrative, draft the exec summary, turn a pivot table into three sentences a director will actually read. This is where the felt pain is loudest.",
    image: "/platform-data-analysis-visualization.svg",
  },
  {
    title: "Record invoices and expenses in half the time.",
    body: "Data extraction from PDF/invoice photos, categorization, and VAT validation integrated into the management software they already use",
    image: "/platform-workflow-automation.svg",
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
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
            The AI skills we test and teach.
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            Three focused courses covering the skills that matter most for getting real value out of AI.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-3">
          {courses.map((c) => (
            <StaggerItem key={c.title}>
              <div className="card-glow h-full overflow-hidden rounded-2xl border border-line bg-white/60">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.image}
                  alt={c.title}
                  className="h-[200px] w-full object-cover"
                />
                <div className="p-7 text-center">
                  <h3 className="text-lg font-bold text-ink">{c.title}</h3>
                  <p className="mt-2 text-sm leading-[1.55] text-muted">
                    {c.body}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
