import Link from "next/link";
import { links } from "@/data/links";
import { PhysicalButton } from "./physical-button";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-2xl font-bold">Say hi.</p>
            <a
              href={`mailto:${links.email}`}
              className="focus-ring mt-2 inline-block rounded font-mono text-sm text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
            >
              {links.email}
            </a>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <PhysicalButton href={links.linkedin} external variant="paper" className="px-3 py-1.5 text-[11px]">
              LinkedIn
            </PhysicalButton>
            <PhysicalButton href={links.behance} external variant="paper" className="px-3 py-1.5 text-[11px]">
              Behance
            </PhysicalButton>
            <PhysicalButton href={links.instagram} external variant="paper" className="px-3 py-1.5 text-[11px]">
              Instagram
            </PhysicalButton>
            <PhysicalButton href={links.github} external variant="paper" className="px-3 py-1.5 text-[11px]">
              GitHub
            </PhysicalButton>
            <PhysicalButton href={links.resumeHref} external variant="paper" className="px-3 py-1.5 text-[11px]">
              Resume
            </PhysicalButton>
          </div>
        </div>
        <div className="mt-10 flex flex-col-reverse items-start justify-between gap-3 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[11px] text-fg-dim">
            © {new Date().getFullYear()} Khushi Narang. Built by hand, one project at a time.
          </p>
          <div className="flex gap-4 font-mono text-[11px] text-fg-dim">
            <Link href="/work" className="focus-ring rounded hover:text-fg-muted">
              Work
            </Link>
            <Link href="/archive" className="focus-ring rounded hover:text-fg-muted">
              Archive
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
