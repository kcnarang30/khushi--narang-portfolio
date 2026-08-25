/**
 * A genuinely missing asset — kept quiet and small on purpose. Never the
 * hero. Once a real file exists, wire it in and this disappears.
 */
export function PendingAsset({ assetKey, caption }: { assetKey: string; caption?: string }) {
  return (
    <p className="mt-4 font-mono text-[10.5px] text-fg-dim">
      [ asset pending — {assetKey} ]{caption ? ` ${caption}` : ""}
    </p>
  );
}
