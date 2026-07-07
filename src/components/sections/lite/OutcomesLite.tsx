import { Reveal } from "@/components/motion/Reveal";

export function OutcomesLite() {
  return (
    <section className="relative px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl rounded-3xl border border-line bg-gradient-to-b from-surface/80 to-bg-soft/40 p-8 sm:p-12">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-violet">
              Is it a good fit for me?
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              We are looking to work with companies that want to be ahead of the AI curve and want to
              <span className="text-gradient"> maximize their team&apos;s capabilities</span>.
            </h2>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
