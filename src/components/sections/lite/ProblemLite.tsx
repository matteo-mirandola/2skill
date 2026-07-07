import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

const cards = [
  {
    title: "AI adoption is fragmented",
    body: "People are already using AI on their own, but with different tools, different habits and no shared standard.",
  },
  {
    title: "Skill is invisible",
    body: "It's not being tested. People just assume they're using AI well, without reaching the full potential.",
  },
  {
    title: "Measurement is ambiguous",
    body: "You can see that people use AI, but not how well. So training is a guess and becomes generic.",
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
            It's difficult to know which AI skills your company needs and if your employees have them.
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
