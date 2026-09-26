import { Fragment } from "react";
import type { TileId } from "@/lib/sampleData";
import { renderTile } from "./Tiles";

// Columns of dashboard tiles drifting past each other. Each column renders its tiles twice and
// scrolls by exactly half its height, so the loop has no seam. Hover or keyboard focus pauses it;
// reduced motion leaves it still (globals.css).
const WIDE: TileId[][] = [
  ["kpi-sales", "sales-trend", "osa-class", "top-branches", "kpi-oos"],
  ["region-target", "kpi-achievement", "visit-heat", "share-shelf", "price-watch"],
  ["compliance", "oos-region", "kpi-conversion", "sku-offtake"],
];
// Phones: one column, so every tile keeps a readable width.
const NARROW: TileId[][] = [
  ["kpi-sales", "region-target", "sales-trend", "kpi-achievement", "compliance", "oos-region", "visit-heat", "kpi-oos", "share-shelf", "top-branches", "kpi-conversion", "sku-offtake", "osa-class", "price-watch"],
];
const SPEED = ["70s", "85s", "64s"];
const NARROW_SPEED = "140s"; // one long column: same pace per tile as the wide columns

function Column({ ids, i, highlight, speed }: { ids: TileId[]; i: number; highlight: TileId | null; speed?: string }) {
  return (
    <div className="min-w-0 flex-1 overflow-hidden">
      <div className={`wall-col space-y-4 ${i === 1 ? "wall-down" : ""}`} style={{ ["--dur" as string]: speed ?? SPEED[i] }}>
        {[0, 1].map((copy) => (
          // The second copy only exists for the seamless loop: hidden from assistive tech and focus.
          <div key={copy} className="space-y-4" aria-hidden={copy === 1 || undefined} inert={copy === 1 || undefined}>
            {ids.map((id) => (
              <Fragment key={id}>{renderTile(id, highlight === id)}</Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DataWall({ highlight }: { highlight: TileId | null }) {
  return (
    <div
      className="wall relative h-[560px] min-w-0 md:h-[640px] lg:h-[760px]"
      style={{ maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)" }}
    >
      <div className="flex h-full gap-4 md:hidden">
        {NARROW.map((ids, i) => (
          <Column key={i} ids={ids} i={i} highlight={highlight} speed={NARROW_SPEED} />
        ))}
      </div>
      <div className="hidden h-full gap-4 md:flex">
        {WIDE.map((ids, i) => (
          <Column key={i} ids={ids} i={i} highlight={highlight} />
        ))}
      </div>
    </div>
  );
}
