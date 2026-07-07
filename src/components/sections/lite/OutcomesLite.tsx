import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

const angles = [
  {
    kicker: "Efficiency",
    title: "Get real time back",
    body: "When people know how to delegate the right work to AI, the same tasks get done faster and with less friction.",
  },
  {
    kicker: "Clarity",
    title: "See where you stand",
    body: "Replace a gut feeling about your team's AI readiness with something you can actually look at and act on.",
  },
  {
    kicker: "Readiness",
    title: "Future-proof your people",
    body: "Find the skills your team is missing before AI fluency becomes table stakes — and close them while it's still easy.",
  },
];

export function OutcomesLite() {
  return (
    <section className="relative px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl rounded-3xl border border-line bg-gradient-to-b from-surface/80 to-bg-soft/40 p-8 sm:p-12">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Reveal>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-violet-300">
                Who it&apos;s for
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Small and mid-sized teams that suspect AI could help — and want
                to <span className="text-gradient">know for sure</span>.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-muted">
                The company buys it as training for its people. Employees take
                the assessment and course for free. You keep the picture of
                where your team really is.
              </p>
            </Reveal>
          </div>

          <Stagger className="space-y-4">
            {angles.map((a) => (
              <StaggerItem key={a.kicker}>
                <div className="card-glow flex gap-5 rounded-2xl border border-line bg-bg/40 p-6">
                  <span className="mt-1 rounded-lg bg-gradient-to-br from-violet to-cyan px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-bg">
                    {a.kicker}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">{a.title}</h3>
                    <p className="mt-1 text-sm text-muted">{a.body}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
