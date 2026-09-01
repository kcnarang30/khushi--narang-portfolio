import { Reveal } from "./reveal";

/**
 * The closing note — set apart from the section grid as a single wide
 * pull-quote, the one place per case study allowed to read as a personal
 * aside rather than documentation.
 */
export function CaseReflection({ text }: { text: string }) {
  return (
    <Reveal className="mx-auto max-w-2xl border-t border-mg-line pt-12">
      <p className="font-marginalia-serif text-[22px] italic leading-relaxed text-mg-ink sm:text-[25px]">
        &ldquo;{text}&rdquo;
      </p>
    </Reveal>
  );
}
