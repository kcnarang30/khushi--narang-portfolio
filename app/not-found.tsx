import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-start justify-center px-5 sm:px-8">
      <p className="font-mono text-[11px] uppercase tracking-widest text-fg-dim">Error 404</p>
      <h1 className="mt-3 font-display text-5xl font-bold sm:text-7xl">
        404<span className="text-accent">.</span>
      </h1>
      <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg-muted">
        This page isn&rsquo;t saved to disk. Might&rsquo;ve been archived, might&rsquo;ve
        never existed — either way, nothing to read here.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="focus-ring rounded-sm bg-accent px-5 py-2.5 font-mono text-[12px] uppercase tracking-widest text-black hover:opacity-90"
        >
          Home
        </Link>
        <Link
          href="/work"
          className="focus-ring rounded-sm border border-line-strong px-5 py-2.5 font-mono text-[12px] uppercase tracking-widest text-fg-muted hover:text-fg"
        >
          Work
        </Link>
      </div>
    </div>
  );
}
