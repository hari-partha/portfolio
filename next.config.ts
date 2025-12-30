import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Ignore src/pages to avoid Pages Router conflict with App Router
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  images: {
    // Allow SVG placeholders (will be replaced with actual JPG images)
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
