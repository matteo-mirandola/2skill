"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

const steps = [
  {
    n: "01",
    tag: "Test",
    title: "Baseline the real skill",
    body: "Employees work through tasks drawn from their actual role. We assess whether they can get useful output from AI on their work.",
    accent: "from-violet to-fuchsia",
  },
  {
    n: "02",
    tag: "Reskill",
    title: "Teach new capabilities",
    body: "A specific course teaches the techniques that are effective for prompting, verifying output, critical thinking, workflow and much more.",
    accent: "from-fuchsia to-violet",
  },
  {
    n: "03",
    tag: "Verify",
    title: "See the improvement",
    body: "The second assessment uses new tasks, so the result measures transferable skill, not memory of the course content.",
    accent: "from-violet to-violet",
  },
];

export function HowItWorksLite() {
  return (
    <section id="how" className="relative px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 text-center text-sm font-semibold uppercase tracking-widest text-violet">
            Our approach
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mx-auto max-w-3xl text-center text-3xl font-bold tracking-tight sm:text-5xl">
            Test &rarr; Reskill &rarr; Verify
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-3xl text-center text-lg text-muted">
            One simple loop. Test what's missing, reskill the employee, verify the improvement.
          </p>
        </Reveal>

        <div className="relative mt-16">
          {/* connecting line (desktop) — decorative */}
          <div className="absolute left-0 right-0 top-16 hidden h-px md:block">
            <div className="h-full w-full bg-line" />
            <motion.div
              className="absolute inset-0 h-px origin-left bg-gradient-to-r from-violet via-fuchsia to-cyan"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="relative z-10 mx-auto mb-6 flex h-16 w-16 items-center justify-center">
                  <span
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${s.accent} opacity-90 blur-[14px]`}
                  />
                  <span
                    className={`relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${s.accent} text-base font-black text-bg`}
                  >
                    {s.n}
                  </span>
                </div>
                <div className="card-glow h-full rounded-2xl border border-line bg-surface/60 p-7">
                  <span className="inline-block rounded-full border border-line bg-bg/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted">
                    {s.tag}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {s.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}