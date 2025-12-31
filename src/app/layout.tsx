import type { Metadata } from 'next';
import './globals.css';
import { playfair, inter, spaceGrotesk, cormorant } from './fonts';

export const metadata: Metadata = {
  title: 'Hari Parthasarathy — Portfolio',
  description: 'A minimalist portfolio where experiences transcribe from a DNA helix.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} ${spaceGrotesk.variable} ${cormorant.variable} font-sans bg-bg-dark-teal text-text-primary antialiased selection:bg-accent-gold selection:text-bg-dark-teal`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
