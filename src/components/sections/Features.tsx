import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

const courses = [
  {
    title: "Prompt Engineering",
    body: "Prompt engineering is the art of crafting precise instructions for AI models to produce accurate and high-quality outputs.",
  },
  {
    title: "Data Analysis & Visualization",
    body: "An AI data analysis and visualization skill is a set of programmable AI capabilities that automates the process of extracting, interpreting, and graphically representing data",
  },
  {
    title: "Workflow Automation",
    body: "AI workflow automation is the use of Artificial Intelligence to build repeatable systems that can reason, adapt, and make decisions mid-execution",
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
