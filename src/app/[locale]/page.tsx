import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Nav } from "@/components/sections/Nav";
import { HeroLite } from "@/components/sections/lite/HeroLite";
import { Marquee } from "@/components/sections/Marquee";
import { ProblemLite } from "@/components/sections/lite/ProblemLite";
import { HowItWorksLite } from "@/components/sections/lite/HowItWorksLite";
import { ProofLite } from "@/components/sections/lite/ProofLite";
import { Features } from "@/components/sections/Features";
import { OutcomesLite } from "@/components/sections/lite/OutcomesLite";
import { BookPilot } from "@/components/sections/BookPilot";
import { Footer } from "@/components/sections/Footer";
import { routing } from "@/i18n/routing";

const SITE_URL = "https://2Skill.ai";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const path = locale === routing.defaultLocale ? "" : `/${locale}`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${SITE_URL}${path}`,
      languages: {
        en: SITE_URL,
        es: `${SITE_URL}/es`,
        "x-default": SITE_URL,
      },
    },
    openGraph: {
      type: "website",
      url: `${SITE_URL}${path}`,
      siteName: "twoskill",
      title: t("title"),
      description: t("ogDescription"),
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "twoskill" }],
      locale: locale === "es" ? "es_ES" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("twitterDescription"),
      images: ["/opengraph-image"],
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Nav />
      <main>
        <HeroLite />
        <Marquee />
        <ProblemLite />
        <HowItWorksLite />
        <ProofLite />
        <Features />
        <OutcomesLite />
        <BookPilot />
      </main>
      <Footer />
    </>
  );
}
