import Link from "next/link";
import Image from "next/image";
import { Project } from "@/data/types";
import { HandUnderline } from "./hand-underline";

/**
 * The transition out of one case study into the next — a real preview of
 * where you're headed, not just a "back to Work" link. Keeps the reader
 * moving through the archive instead of dead-ending at a reflection.
 */
export function NextCaseFile({ project }: { project: Project }) {
  if (!project.coverImageSrc || !project.coverImageWidth || !project.coverImageHeight) return null;

  return (
    <div className="border-t border-mg-line">
      <Link href={`/work/${project.slug}`} className="focus-ring group block">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="font-marginalia-sans text-[12px] uppercase tracking-wide text-mg-ink-faint">Next case file</p>
          <div className="mt-6 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <div className="w-full shrink-0 sm:w-56">
              <Image
                src={project.coverImageSrc}
                alt={project.name}
                width={project.coverImageWidth}
                height={project.coverImageHeight}
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "160px",
                  objectFit: "cover",
                  filter: "drop-shadow(0 14px 24px rgba(36,31,24,0.25))",
                }}
              />
            </div>
            <div>
              <span className="relative inline-block font-marginalia-serif text-[26px] text-mg-ink sm:text-[32px]">
                {project.name}
                <HandUnderline />
              </span>
              <p className="mt-2 max-w-sm font-marginalia-sans text-[14.5px] leading-relaxed text-mg-ink-muted">
                {project.oneLiner}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
