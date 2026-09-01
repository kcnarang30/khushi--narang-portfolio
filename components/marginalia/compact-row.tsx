import Link from "next/link";
import { Project } from "@/data/types";
import { HandUnderline } from "./hand-underline";
import { Reveal } from "./reveal";
import { STAGGER } from "@/lib/motion";

/**
 * The quiet counterweight to the lavish feature rows above it — a plain
 * index, not more images. Pacing comes from the contrast: full spreads,
 * then a dense list. No thumbnail reveal here; that trick is already spent
 * above and repeating it would flatten the hierarchy it's meant to create.
 */
export function CompactRow({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal delay={index * STAGGER}>
      <Link
        href={`/work/${project.slug}`}
        className="focus-ring group relative flex items-baseline justify-between gap-6 border-b border-mg-line py-4 transition-colors duration-300 hover:border-mg-ink/25"
      >
        <span className="absolute inset-y-0 left-0 -z-10 w-0 bg-mg-bg-raised transition-[width] duration-300 ease-out group-hover:w-full" />
        <span className="flex min-w-0 items-baseline gap-4">
          <span className="shrink-0 font-marginalia-sans text-[12px] text-mg-ink-faint">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="relative truncate font-marginalia-serif text-[18px] text-mg-ink">
            {project.name}
            <HandUnderline className="!-bottom-0.5" />
          </span>
        </span>
        <span className="shrink-0 whitespace-nowrap font-marginalia-sans text-[12.5px] text-mg-ink-faint">
          {project.category.replace("-", " ")}
        </span>
      </Link>
    </Reveal>
  );
}
