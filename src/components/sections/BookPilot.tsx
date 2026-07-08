"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

const teamSizes = ["1–10", "11–50", "51–200", "200+"];

export function BookPilot() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError(null);

    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="book" className="relative overflow-hidden px-4 py-28 sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_50%_60%_at_50%_50%,black,transparent)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-violet/25 blur-[130px]" />

      <div className="relative mx-auto max-w-5xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-violet">
                Get started
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Future-prove your employees 
                <span className="text-gradient"> now.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-md text-lg text-muted">
              We will test how well your employee actually use AI and reskill them with specific 
              training built for their sector and role.
              </p>
            </Reveal>
          </div>

          <Reveal direction="left" delay={0.1}>
            <div className="rounded-3xl border border-line bg-surface/70 p-7 backdrop-blur-xl sm:p-8">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex min-h-[380px] flex-col items-center justify-center text-center"
                  >
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", duration: 0.5, bounce: 0.35, delay: 0.1 }}
                      className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet to-fuchsia text-2xl text-bg"
                    >
                      ✓
                    </motion.div>
                    <h3 className="text-2xl font-bold">You&apos;re on the list</h3>
                    <p className="mt-2 max-w-xs text-sm text-muted">
                      Thanks — we&apos;ll be in touch to scope your pilot cohort
                      and process. Check your inbox.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Full name" name="name" placeholder="Jane Doe" />
                      <Field
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="jane@company.com"
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Company" name="company" placeholder="Acme Inc." />
                      <Field
                        label="Phone number"
                        name="phone"
                        type="tel"
                        placeholder="+1 555 000 0000"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-muted">
                        Team size
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {teamSizes.map((s, i) => (
                          <label key={s} className="cursor-pointer">
                            <input
                              type="radio"
                              name="teamSize"
                              value={s}
                              defaultChecked={i === 1}
                              className="peer sr-only"
                            />
                            <span className="flex items-center justify-center rounded-lg border border-line bg-bg/50 py-2 text-sm text-muted transition peer-checked:border-violet peer-checked:bg-violet/15 peer-checked:text-ink">
                              {s}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-muted">
                        Additional info{" "}
                        <span className="text-muted/60">(optional)</span>
                      </label>
                      <textarea
                        name="message"
                        rows={3}
                        className="w-full resize-none rounded-lg border border-line bg-bg/50 px-4 py-3 text-sm outline-none transition placeholder:text-muted/50 focus:border-violet focus:ring-2 focus:ring-violet/30"
                      />
                    </div>

                    {error && (
                      <p className="text-center text-sm text-red-500">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={sending}
                      className="group relative mt-2 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-violet to-fuchsia px-7 py-3.5 text-base font-semibold text-white shadow-[0_10px_30px_-8px_rgba(44,95,224,0.35)] transition duration-200 ease-out hover:shadow-[0_14px_36px_-8px_rgba(92,138,238,0.45)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
                      {sending ? "Sending…" : "Send us a message"}
                    </button>
                    <p className="text-center text-xs text-muted">
                      We&apos;ll be back to you soon. Your time is valuable to us.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-muted">
        {label}
      </label>
      <input
        required
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border border-line bg-bg/50 px-4 py-3 text-sm outline-none transition placeholder:text-muted/50 focus:border-violet focus:ring-2 focus:ring-violet/30"
      />
    </div>
  );
}
