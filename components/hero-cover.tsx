import { PhysicalButton } from "./physical-button";
import { Tape } from "./tape";
import { PaperClip } from "./paper-clip";
import { Stamp } from "./stamp";
import { Sticker } from "./sticker";
import { Polaroid } from "./polaroid";
import { DeskScene } from "./desk-scene";
import { SettleIn } from "./settle-in";

const LABELS = ["Product", "Events", "Web", "Systems", "Experiments"];

/**
 * The homepage as a physical scene: a dark green desk environment holding
 * one large paper sheet (a second sheet visible behind it), clipped and
 * taped down, with real objects — a real photo, a status stamp — overlapping
 * its edges at genuine translateZ depth inside
 * DeskScene's perspective stage. Everything printed on the sheet reads as
 * print, not web UI: huge condensed poster type, small mono metadata top
 * and bottom, category labels as archival tags.
 */
export function HeroCover() {
  return (
    <section className="desk-environment relative overflow-hidden py-40 sm:py-64">
      <span className="desk-crosshair" style={{ top: 22, left: 22 }} aria-hidden />
      <span className="desk-crosshair" style={{ top: 22, right: 22 }} aria-hidden />
      <span className="desk-crosshair" style={{ bottom: 22, left: 22 }} aria-hidden />
      <span className="desk-crosshair" style={{ bottom: 22, right: 22 }} aria-hidden />

      <DeskScene className="mx-auto max-w-4xl px-5 sm:px-8">
        <div className="relative mt-6 sm:mt-4">
          {/* second sheet, peeking out behind at real depth */}
          <SettleIn delay={0} y={10} rotate={0} scale={0.98} className="absolute inset-0">
            <div
              aria-hidden
              className="grain-paper h-full w-full bg-paper-dark"
              style={{ transform: "translateZ(-60px) rotate(2.4deg) translate(10px, 16px)" }}
            />
          </SettleIn>

          {/* the main sheet */}
          <SettleIn delay={0.1} y={28} rotate={-6} scale={0.95}>
          <div
            className="grain-paper shadow-physical-lg relative bg-paper p-8 sm:p-14 md:p-20"
            style={{ transform: "rotate(-1.2deg)" }}
          >
            <PaperClip rotate={-16} className="-left-4 -top-5 h-11 w-11 sm:-left-6 sm:-top-6 sm:h-12 sm:w-12" />
            <Tape rotate={4} className="-top-3 right-12 w-16 sm:right-16" />

            <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[10.5px] uppercase tracking-widest text-bg/55">
              <span>Khushi Narang</span>
              <span>Product Designer</span>
            </div>

            <h1 className="mt-16 font-poster uppercase leading-[0.82] text-bg [font-size:clamp(2.5rem,8vw,6rem)] sm:mt-20">
              Give me a
              <br />
              messy problem.
            </h1>
            <p className="mt-2 font-poster uppercase leading-[0.82] text-hot-pink [font-size:clamp(1.7rem,5.4vw,4rem)]">
              I&rsquo;ll probably ask
              <br />
              too many questions.
            </p>

            <div className="mt-14 flex flex-wrap gap-2">
              {LABELS.map((label) => (
                <span
                  key={label}
                  className="border border-bg/25 px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-wide text-bg/70"
                >
                  {label}
                </span>
              ))}
            </div>

            <p className="mt-8 max-w-sm font-serif text-[14.5px] leading-relaxed text-bg/65">
              Currently at <span className="font-semibold text-bg">YourStory</span>. TechSparks 2026 is
              live now — 10,000+ people, this October.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <PhysicalButton href="/work">See the work</PhysicalButton>
              <PhysicalButton href="/about" variant="ink">
                More about me
              </PhysicalButton>
            </div>

            <div className="mt-16 flex flex-wrap justify-between gap-2 border-t border-bg/15 pt-4 font-mono text-[9.5px] uppercase tracking-wide text-bg/40">
              <span>Bengaluru / India</span>
              <span>Currently @ YourStory</span>
            </div>
          </div>
          </SettleIn>

          {/* status stamp, overlapping the top edge */}
          <SettleIn delay={0.32} y={-14} rotate={30} scale={0.5} className="absolute -top-9 left-10 sm:-top-11 sm:left-14">
            <Stamp tone="green" rotate={-9} size="5.25rem">
              Status
              <br />
              Open to work
            </Stamp>
          </SettleIn>

          <SettleIn delay={0.42} y={-10} rotate={40} scale={0.4} className="absolute -top-5 right-24 sm:right-32">
            <Sticker variant="star" color="var(--bright-blue)" rotate={14} size="2.5rem" className="static" />
          </SettleIn>
          <SettleIn delay={0.48} y={10} rotate={-30} scale={0.4} className="absolute bottom-6 -left-6 hidden sm:block">
            <Sticker variant="smiley" color="var(--live-signal)" rotate={-10} size="2.25rem" className="static" />
          </SettleIn>

          {/* real photo, pinned, hidden on the smallest screens to avoid clutter */}
          <SettleIn
            delay={0.58}
            y={-24}
            rotate={-14}
            scale={0.8}
            className="absolute -top-7 right-2 hidden w-20 sm:block sm:-right-6"
          >
            <div style={{ transform: "translateZ(90px) rotate(-8deg)" }}>
              <Polaroid src="/about/ribbon-night.jpg" alt="Out and about, Bengaluru" rotate={-8} sizes="80px" />
            </div>
          </SettleIn>

          <SettleIn delay={0.68} y={6} rotate={0} scale={1} className="absolute -bottom-8 left-3 sm:left-5">
            <span className="font-mono text-[9.5px] text-fg/35">IDX — 01</span>
          </SettleIn>
        </div>
      </DeskScene>
    </section>
  );
}
