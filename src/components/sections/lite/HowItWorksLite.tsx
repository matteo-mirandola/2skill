"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

const steps = [
  {
    n: "01",
    tag: "Assess",
    title: "Baseline the real skill",
    body: "Employees work through tasks drawn from their actual role — not trivia. We assess whether they can get useful output from AI on the work they're paid to do.",
    outcome: "A clear starting point",
    accent: "from-violet to-fuchsia",
  },
  {
    n: "02",
    tag: "Train",
    title: "Close the fundamentals",
    body: "A short, focused course teaches the techniques that matter for those exact task types — prompting, verifying output, and workflow. Practical, not theory.",
    outcome: "Skills that transfer",
    accent: "from-fuchsia to-violet",
  },
  {
    n: "03",
    tag: "Re-assess",
    title: "See the improvement",
    body: "We re-assess on fresh tasks the course never covered. Because it's new work, the result reflects real capability — not memory of our material.",
    outcome: "Proof it worked",
    accent: "from-violet to-violet",
  },
];

export function HowItWorksLite() {
  return (
    <section id="how" className="relative px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 text-center text-sm font-semibold uppercase tracking-widest text-violet">
            The approach
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mx-auto max-w-3xl text-center text-3xl font-bold tracking-tight sm:text-5xl">
            Assess. Train. Re-assess.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-2xl text-center text-lg text-muted">
            One simple loop that turns &quot;we think AI helps&quot; into
            something you can actually see.
          </p>
        </Reveal>

        <div className="relative mt-16">
          {/* connecting line (desktop) — decorative */}
          <div className="absolute left-0 right-0 top-[52px] hidden h-px md:block">
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
            {steps.map((s, i) => {
              const isFeatured = s.n === "02";
              return (
                <motion.div
                  key={s.n}
                  initial={isFeatured ? { opacity: 0, y: 30 } : false}
                  whileInView={isFeatured ? { opacity: 1, y: 0 } : undefined}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative ${isFeatured ? "md:-translate-y-2" : ""}`}
                >
                  <div
                    className={`relative z-10 mx-auto mb-6 flex items-center justify-center ${
                      isFeatured ? "h-16 w-16" : "h-[52px] w-[52px]"
                    }`}
                  >
                    <span
                      className={`absolute inset-0 rounded-full bg-gradient-to-br ${s.accent} opacity-90 ${
                        isFeatured ? "blur-[14px]" : "blur-[8px]"
                      }`}
                    />
                    <span
                      className={`relative flex items-center justify-center rounded-full bg-gradient-to-br ${s.accent} font-black text-bg ${
                        isFeatured ? "h-16 w-16 text-base" : "h-[52px] w-[52px] text-sm"
                      }`}
                    >
                      {s.n}
                    </span>
                  </div>
                  <div
                    className={`card-glow h-full rounded-2xl border p-7 ${
                      isFeatured
                        ? "border-fuchsia/40 bg-surface/80 ring-1 ring-fuchsia/20"
                        : "border-line bg-surface/60"
                    }`}
                  >
                    <span className="inline-block rounded-full border border-line bg-bg/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted">
                      {s.tag}
                    </span>
                    <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {s.body}
                    </p>
                    <div
                      className={`mt-5 inline-flex items-center gap-2 bg-gradient-to-r ${s.accent} bg-clip-text text-sm font-semibold text-transparent`}
                    >
                      → {s.outcome}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-violet/25 bg-violet/5 p-6 text-center">
            <p className="text-sm text-muted">
              <span className="font-semibold text-ink">
                We never teach to the test.
              </span>{" "}
              The re-assessment uses fresh tasks, so what you see is
              transferable, on-the-job capability — the kind a buyer, or a jury,
              will trust.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}