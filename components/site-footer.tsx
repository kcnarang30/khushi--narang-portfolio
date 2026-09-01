import Link from "next/link";
import { links } from "@/data/links";
import { EmailDispatchLink } from "./email-dispatch-link";

export function SiteFooter() {
  return (
    <footer className="border-t border-mg-line">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-marginalia-serif text-2xl italic text-mg-ink">Say hi.</p>
            <EmailDispatchLink className="focus-ring mt-2 inline-block rounded font-marginalia-sans text-sm text-mg-accent underline decoration-mg-accent/40 underline-offset-4 hover:decoration-mg-accent" />
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 font-marginalia-sans text-[13px] text-mg-ink-muted">
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="focus-ring rounded hover:text-mg-ink">
              LinkedIn
            </a>
            <a href={links.behance} target="_blank" rel="noopener noreferrer" className="focus-ring rounded hover:text-mg-ink">
              Behance
            </a>
            <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="focus-ring rounded hover:text-mg-ink">
              Instagram
            </a>
            <a href={links.github} target="_blank" rel="noopener noreferrer" className="focus-ring rounded hover:text-mg-ink">
              GitHub
            </a>
          </div>
        </div>
        <div className="mt-10 flex flex-col-reverse items-start justify-between gap-3 border-t border-mg-line pt-6 sm:flex-row sm:items-center">
          <p className="font-marginalia-sans text-[12px] text-mg-ink-faint">
            &copy; {new Date().getFullYear()} Khushi Narang. Built by hand, one project at a time.
          </p>
          <div className="flex gap-4 font-marginalia-sans text-[12px] text-mg-ink-faint">
            <Link href="/work" className="focus-ring rounded hover:text-mg-ink-muted">
              Work
            </Link>
            <Link href="/archive" className="focus-ring rounded hover:text-mg-ink-muted">
              Archive
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
