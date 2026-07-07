import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

const cards = [
  {
    title: "Adoption is everywhere",
    body: "Your people are already using AI on their own — different tools, different habits, no shared standard.",
  },
  {
    title: "Skill is invisible",
    body: "One person saves real time; the next gets confident-sounding nonsense. From the outside, they look the same.",
  },
  {
    title: "Nobody can measure it",
    body: "There's no way to see who's actually capable, so training is a guess and results are anyone's opinion.",
  },
];

export function ProblemLite() {
  return (
    <section className="relative px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-violet-300">
            The gap
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            Your team is already using AI.
            <span className="text-muted"> Nobody knows how well.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            The tools are everywhere. The skill is invisible. And you can&apos;t
            improve — or trust — something you have no way to see.
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
