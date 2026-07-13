import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion/Reveal";
import { NormalCurveBackdrop } from "./NormalCurveBackdrop";

export async function OutcomesLite() {
  const t = await getTranslations("outcomes");

  return (
    <section className="relative px-4 py-24 sm:px-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-line bg-gradient-to-b from-surface/80 to-bg-soft/40 p-8 sm:p-12">
        <NormalCurveBackdrop />

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-violet">
              {t("eyebrow")}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t("titlePrefix")}
              <span className="text-gradient">{t("titleHighlight")}</span>
              {t("titleSuffix")}
            </h2>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
