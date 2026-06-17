import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Ignore src/pages to avoid Pages Router conflict with App Router
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  images: {
    // Allow SVG placeholders (will be replaced with actual JPG images)
    formats: ['image/avif', 'image/webp'],
  },
  /** Avoid long-lived CDN/browser HTML cache on the landing page so UI deploys show up quickly. */
  async headers() {
    return [
      {
        source: '/',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
        ],
      },
    ];
  },
  /** Serve the résumé PDF at the clean URL /resume (the public/resume.pdf file). */
  async rewrites() {
    return [{ source: '/resume', destination: '/resume.pdf' }];
  },
  async redirects() {
    return [
      { source: '/brainfood', destination: '/musings', permanent: true },
      // Past résumé URLs → the canonical /resume.
      { source: '/hari-parthasarathy-resume-spring-2026.pdf', destination: '/resume', permanent: true },
      { source: '/resume.pdf', destination: '/resume', permanent: true },
    ];
  },
};

export default nextConfig;
