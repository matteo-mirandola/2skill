import { getTranslations } from "next-intl/server";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

const images = [
  "/platform-responsible-safe-use-of-ai.svg",
  "/platform-data-analysis-visualization.svg",
  "/platform-workflow-automation.svg",
];

export async function Features() {
  const t = await getTranslations("platform");
  const courses = t.raw("courses") as { title: string; body: string }[];

  return (
    <section id="platform" className="relative px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-violet">
            {t("eyebrow")}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-muted">{t("subtitle")}</p>
        </Reveal>

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-3">
          {courses.map((c, i) => (
            <StaggerItem key={c.title}>
              <div className="card-glow h-full overflow-hidden rounded-2xl border border-line bg-white/60">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={images[i]}
                  alt={c.title}
                  className="h-[200px] w-full object-cover"
                />
                <div className="p-7 text-center">
                  <h3 className="text-lg font-bold text-ink">{c.title}</h3>
                  <p className="mt-2 text-sm leading-[1.55] text-muted">
                    {c.body}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
