import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

const cards = [
  {
    title: "Too many tools without a clear map",
    body: "Your team already has access to dozens of AI products but many don't know which tool actually fits which task. Burning efficiency and effort by using the wrong tools for the job.",
  },
  {
    title: "You can't invest in skills you can't see",
    body: "Deciding which AI capabilities are worth training on is pure guesswork for many companies. Without knowing where your team really stands, budget goes to generic AI tools that underperform.",
  },
  {
    title: "Testing turns guesswork into a plan",
    body: "By testing and measuring your employees’ real skills on real tasks, you see exactly which products and which skills are worth investing in. Leveraging AI to its fullest potential.",
  },
];

export function ProblemLite() {
  return (
    <section className="relative px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-violet">
            The problem
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            Does your team already use AI?
            <span className="text-muted"> Do you know how well?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            You can't tell which AI tools fit which tasks, or which skills are actually worth paying to build.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-6 md:grid-cols-3" gap={0.15}>
          {cards.map((c) => (
            <StaggerItem key={c.title}>
              <div className="card-glow h-full rounded-2xl border border-line bg-surface/60 p-7">
                <div className="mb-5 h-1 w-12 rounded-full bg-gradient-to-r from-violet to-cyan" />
                <h3 className="text-lg font-semibold text-ink">{c.title}</h3>
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
