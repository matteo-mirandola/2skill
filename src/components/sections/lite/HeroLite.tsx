"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const pillars = [
  {
    tag: "Measure",
    text: "We test how your employees actually use AI on tasks from their real work.",
    accent: "from-violet to-fuchsia",
  },
  {
    tag: "Reskill",
    text: "Each employee gets training matched to their gaps and their role.",
    accent: "from-fuchsia to-violet",
  },
  {
    tag: "Prove",
    text: "We retest them, ensuring the improvement is measured, not assumed.",
    accent: "from-violet to-violet",
  },
];

export function HeroLite() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden px-4 pt-28 pb-16 sm:px-6"
    >
      {/* animated backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-grid animate-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,black,transparent)]" />
      <div className="pointer-events-none absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-violet/30 blur-[120px] animate-drift" />
      <div className="pointer-events-none absolute -right-32 top-40 h-[460px] w-[460px] rounded-full bg-cyan/45 blur-[120px] animate-drift [animation-delay:-6s]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-[380px] w-[380px] rounded-full bg-fuchsia/25 blur-[120px] animate-pulse-slow" />

      {/* floating particles */}
      {[
        { top: "18%", left: "12%", d: 0 },
        { top: "30%", left: "82%", d: 1.2 },
        { top: "68%", left: "20%", d: 0.6 },
        { top: "76%", left: "70%", d: 1.8 },
        { top: "44%", left: "50%", d: 2.4 },
      ].map((p, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-ink/20"
          style={{ top: p.top, left: p.left }}
          animate={{ y: [0, -18, 0], opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: 5 + i, repeat: Infinity, delay: p.d }}
        />
      ))}

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* left: copy */}
        <div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.05 }}
            className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl"
          >
            <span className="text-gradient">AI</span> has the potential.
            <br />
            Your people unlock it.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
            className="mt-6 max-w-xl text-lg text-muted"
          >
            We at 
            <span className="font-semibold text-ink"> twoskill </span>
            test how well your employees actually use AI, 
            then reskill them with 
            <span className="font-semibold text-ink"> specific training
            </span> built for their sector 
            and role. {" "}
            
            
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.25 }}
            className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <a
              href="#book"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-violet to-fuchsia px-7 py-3.5 text-base font-semibold text-white shadow-[0_10px_30px_-8px_rgba(44,95,224,0.35)] transition duration-200 ease-out hover:shadow-[0_14px_36px_-8px_rgba(92,138,238,0.45)] active:scale-[0.97]"
            >
              <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
              Send us a message
            </a>
            <a
              href="#how"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-surface/60 px-7 py-3.5 text-base font-medium text-ink backdrop-blur transition duration-200 ease-out hover:border-violet/40 hover:bg-surface active:scale-[0.97]"
            >
              See how it works
            </a>
          </motion.div>

        </div>

        {/* right: qualitative pillars card (no numbers) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.3 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="animate-float rounded-3xl border border-line bg-surface/70 p-7 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(10,30,63,0.15)]">
            <p className="mb-6 text-xs uppercase tracking-widest text-muted">
              How it works
            </p>
            <div className="space-y-5">
              {pillars.map((p, i) => (
                <div key={p.tag} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span
                      className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${p.accent} text-xs font-black text-bg`}
                    >
                      {i + 1}
                    </span>
                    {i < pillars.length - 1 && (
                      <span className="mt-1 h-8 w-px bg-line" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{p.tag}</p>
                    <p className="mt-0.5 text-sm text-muted">{p.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="flex h-9 w-6 items-start justify-center rounded-full border border-line p-1.5"
        >
          <span className="h-2 w-1 rounded-full bg-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
