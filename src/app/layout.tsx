import type { Metadata, Viewport } from 'next';
import './globals.css';
import { inter, spaceGrotesk, cormorant } from './fonts';

export const metadata: Metadata = {
  title: 'Hari Parthasarathy — Portfolio',
  description: 'A minimalist portfolio where experiences transcribe from a DNA helix.',
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
        {children}
      </body>
    </html>
  );
}
