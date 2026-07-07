import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

const report = [
  {
    title: "Where each person starts",
    body: "A clear read on every employee's current ability to use AI on their real tasks.",
  },
  {
    title: "Where they land after training",
    body: "The same capability, re-assessed — so growth is something you observe, not assume.",
  },
  {
    title: "How much they moved",
    body: "The change between the two, per person: the honest signal that the training actually landed.",
  },
  {
    title: "A view for the whole team",
    body: "A simple company-level summary you can take to a board, a client, or a jury.",
  },
];

export function ProofLite() {
  return (
    <section id="approach" className="relative overflow-hidden px-4 py-24 sm:px-6">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia/10 blur-[140px]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-start gap-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-violet-300">
                Why it works
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
                Improvement you can see.
                <br />
                <span className="text-gradient">Not a vibe you hope for.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-lg text-lg text-muted">
                A generic AI course is a commodity — plenty of free ones exist.
                What&apos;s hard, and what we build, is the assessment: a way to
                measure real capability before and after, so the improvement is
                visible instead of promised.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-4 max-w-lg text-muted">
                Because we re-assess on fresh, on-the-job tasks, the result
                reflects skill that transfers to the actual work — the most
                persuasive thing you can put in front of a decision-maker.
              </p>
            </Reveal>
          </div>

          <Stagger className="space-y-4">
            {report.map((r) => (
              <StaggerItem key={r.title}>
                <div className="card-glow flex gap-5 rounded-2xl border border-line bg-surface/60 p-6">
                  <span className="mt-1 h-8 w-1 flex-shrink-0 rounded-full bg-gradient-to-b from-violet to-cyan" />
                  <div>
                    <h3 className="text-base font-semibold">{r.title}</h3>
                    <p className="mt-1 text-sm text-muted">{r.body}</p>
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
