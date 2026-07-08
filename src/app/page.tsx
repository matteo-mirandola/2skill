import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { HeroLite } from "@/components/sections/lite/HeroLite";
import { Marquee } from "@/components/sections/Marquee";
import { ProblemLite } from "@/components/sections/lite/ProblemLite";
import { HowItWorksLite } from "@/components/sections/lite/HowItWorksLite";
import { ProofLite } from "@/components/sections/lite/ProofLite";
import { Features } from "@/components/sections/Features";
import { OutcomesLite } from "@/components/sections/lite/OutcomesLite";
import { FAQLite } from "@/components/sections/lite/FAQLite";
import { BookPilot } from "@/components/sections/BookPilot";
import { Footer } from "@/components/sections/Footer";

const navLinks = [
  { label: "Our approach", href: "#how" },
  { label: "Why it works", href: "#approach" },
  { label: "Platform", href: "#platform" },
  { label: "FAQ", href: "#faq" },
];

export const metadata: Metadata = {
  title: "twoskill",
  description:
    "2Skill helps companies see how well their employees use AI on real work, trains them on the fundamentals, and shows the improvement. Book a pilot.",
  alternates: { canonical: "https://2Skill.ai" },
};

export default function Home() {
  return (
    <>
      <Nav links={navLinks} />
      <main>
        <HeroLite />
        <Marquee />
        <ProblemLite />
        <HowItWorksLite />
        <ProofLite />
        <Features />
        <OutcomesLite />
        <FAQLite />
        <BookPilot />
      </main>
      <Footer />
    </>
  );
}
