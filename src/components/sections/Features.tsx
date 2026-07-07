import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

const courses = [
  "Prompt Engineering",
  "Data Analysis & Visualization",
  "Workflow Automation",
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

        <Stagger className="mt-14 grid gap-10 sm:grid-cols-3">
          {courses.map((name, i) => (
            <StaggerItem key={name}>
              <div className="flex flex-col items-center gap-5 text-center">
                <svg viewBox="0 0 100 90" className="h-20 w-20">
                  <defs>
                    <linearGradient id={`courseGrad-${i}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#2C5FE0" />
                      <stop offset="100%" stopColor="#0F2A5E" />
                    </linearGradient>
                  </defs>
                  <polygon points="50,5 95,85 5,85" fill={`url(#courseGrad-${i})`} />
                </svg>
                <h3 className="text-lg font-semibold">{name}</h3>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
