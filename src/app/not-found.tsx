import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center gap-6 bg-bg-dark-teal px-6 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent-gold/70">
        Error 404 · Sequence not found
      </p>
      <h1 className="font-serif text-[clamp(2.5rem,10vw,5rem)] leading-none text-white">404</h1>
      <p className="max-w-md font-sans text-sm leading-relaxed text-white/60">
        This strand doesn&apos;t exist. The page you&apos;re looking for may have moved, or was never
        transcribed.
      </p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-full border border-accent-gold/45 bg-black/30 px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-white/95 transition-colors hover:border-accent-gold hover:text-accent-gold"
        >
          Back to the Genome
        </Link>
        <Link
          href="/musings"
          className="inline-flex min-h-11 items-center rounded-full border border-white/20 px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-white/50 hover:text-white"
        >
          Musings
        </Link>
      </div>
    </main>
  );
}
