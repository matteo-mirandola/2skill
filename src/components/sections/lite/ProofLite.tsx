import { Reveal } from "@/components/motion/Reveal";

export function ProofLite() {
  return (
    <section id="approach" className="relative overflow-hidden px-4 py-24 sm:px-6">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia/15 blur-[140px]" />
      <div className="relative mx-auto max-w-2xl">
        <Reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-violet">
            Why it works
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Improvement you can see.
            <br />
            <span className="text-gradient">Result you can measure.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-lg text-lg text-muted">
            Most AI courses are generic.
            We build training around your employees&apos;s actual roles and tasks, so people learn exactly what their
            job requires. Then we test before and after, in order to verify the improvement.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
