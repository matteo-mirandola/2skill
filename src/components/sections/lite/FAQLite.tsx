"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

const faqs = [
  {
    q: "How is this different from a generic AI course?",
    a: "A course on its own is a commodity. What we build is the assessment around it — a way to understand how capable your team actually is before and after training. The course helps them improve; the assessment is what makes that improvement visible and trustworthy.",
  },
  {
    q: "Is our data safe?",
    a: "Yes. We assess capability using representative task scenarios — employees don't need to paste sensitive company data into any tool to take part. A dedicated safety dimension is on our roadmap.",
  },
  {
    q: "What do we actually get at the end?",
    a: "A clear read on where each person started, where they landed after training, how much they grew, and a simple team-level overview you can share with leadership.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export function FAQLite() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative px-4 py-24 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="mb-3 text-center text-sm font-semibold uppercase tracking-widest text-violet">
            FAQ
          </p>
        </Reveal>


        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.04}>
                <div className="overflow-hidden rounded-2xl border border-line bg-surface/50">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-surface"
                  >
                    <span className="text-base font-semibold">{f.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-line text-lg text-violet"
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="px-6 pb-5 text-sm leading-relaxed text-muted">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
