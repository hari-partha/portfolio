import type { Metadata, Viewport } from 'next';
import './globals.css';
import { inter, spaceGrotesk, cormorant } from './fonts';
import { Providers } from './providers';

const SITE_URL = 'https://hariparthasarathy.com';
const SITE_TITLE = 'Hari Parthasarathy — Portfolio';
const SITE_DESC =
  'Mapping the intersection of biotechnology, venture capital, and design through the lens of genetic transcription.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESC,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESC,
    url: SITE_URL,
    siteName: 'Hari Parthasarathy',
    type: 'website',
    images: [{ url: '/images/hari.jpg', alt: 'Hari Parthasarathy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESC,
    images: ['/images/hari.jpg'],
  },
};

// viewport-fit: cover unlocks env(safe-area-inset-*) on notched phones; no
// maximumScale/userScalable lock so pinch-zoom stays available (WCAG 1.4.4).
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#020617',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${cormorant.variable} font-sans bg-bg-dark-teal text-text-primary antialiased selection:bg-accent-gold selection:text-bg-dark-teal`}
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
