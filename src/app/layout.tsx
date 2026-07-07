import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://2Skill.ai";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "2Skill — Understand and grow your team's real AI skill",
  description:
    "2Skill helps companies see how well their employees use AI on real work, trains them on the fundamentals, and shows the improvement. Book a pilot.",
  keywords: [
    "AI skills assessment",
    "AI training for teams",
    "measure AI capability",
    "employee AI upskilling",
    "AI readiness diagnostic",
  ],
  authors: [{ name: "2Skill" }],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "2Skill",
    title: "2Skill — Understand and grow your team's real AI skill",
    description:
      "See how well your team uses AI on real work, train them on the fundamentals, and watch the improvement.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "2Skill" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "2Skill — Understand and grow your team's real AI skill",
    description:
      "The assessment that makes your team's AI capability visible — and shows it improve.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FBFCFE",
  width: "device-width",
  initialScale: 1,
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "2Skill",
  url: SITE_URL,
  description:
    "2Skill measures how well a company's employees can use AI on real work, trains them, and re-measures to prove a concrete capability uplift.",
  sameAs: [] as string[],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
