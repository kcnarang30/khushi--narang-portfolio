import Image from "next/image";

/**
 * An actual screenshot, shown at real scale — no window chrome, no fake
 * aspect-ratio box pretending to be UI. The image is the design.
 */
export function RealShot({
  src,
  width,
  height,
  alt,
  caption,
  className,
  sizes = "(max-width: 768px) 100vw, 700px",
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <div className={className}>
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        sizes={sizes}
        className="h-auto w-full rounded-sm border border-line-strong"
      />
      {caption && <p className="mt-2 font-mono text-[10.5px] text-fg-dim">{caption}</p>}
    </div>
  );
}
