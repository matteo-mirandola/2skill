import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Render metadata as blocking (in <head>) for every user agent instead of
  // streaming it inside a Suspense boundary. This removes the Next 16
  // "Next.Metadata" streaming-metadata hydration mismatch and puts SEO tags in
  // the initial HTML — better for a landing page.
  htmlLimitedBots: /.*/,
};

export default nextConfig;
