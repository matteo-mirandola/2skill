import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

type Feature = {
  title: string;
  body: string;
  icon: React.ReactNode;
};

const features: Feature[] = [
  {
    title: "The diagnostic is the asset",
    body: "Any course is a commodity. Our defensible edge is a test that measures real, transferable capability — designed so improvement can't be gamed.",
    icon: (
      <path d="M12 3v18M5 8l7-5 7 5M5 16l7 5 7-5" />
    ),
  },
  {
    title: "Real tasks, not trivia",
    body: "Scenarios drawn from your team's actual role. You measure whether someone can get useful output from AI on the work they're paid to do.",
    icon: <path d="M4 6h16M4 12h10M4 18h7" />,
  },
  {
    title: "Per-employee + team view",
    body: "Every person gets a score and a before/after delta. Leadership gets a clean company-level summary — who moved, and by how much.",
    icon: (
      <path d="M3 3v18h18M7 15l3-4 3 3 4-6" />
    ),
  },
  {
    title: "Set up in days, not quarters",
    body: "One simple process, one cohort, a two-week loop. Built to slot into a busy team without a change-management project.",
    icon: <path d="M12 6v6l4 2M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" />,
  },
  {
    title: "Buyer-ready reporting",
    body: "The output is designed to be shown — to a board, a client, or a jury. A concrete delta beats a testimonial every time.",
    icon: <path d="M6 20V10M12 20V4M18 20v-6" />,
  },
  {
    title: "Safety-aware by design",
    body: "Capability today; a safety axis on the roadmap. We measure how your team uses AI without asking them to paste sensitive data anywhere risky.",
    icon: (
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    ),
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

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <StaggerItem key={f.title}>
              <div className="card-glow group h-full rounded-2xl border border-line bg-surface/60 p-7">
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-bg/60">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="url(#featGrad)"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <defs>
                      <linearGradient id="featGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#2C5FE0" />
                        <stop offset="100%" stopColor="#5C8AEE" />
                      </linearGradient>
                    </defs>
                    {f.icon}
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {f.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
