"use client";

import { useState } from "react";
import AnalystPanel from "@/components/data/AnalystPanel";
import DataWall from "@/components/data/DataWall";
import { dataLede } from "@/lib/content";
import type { TileId } from "@/lib/sampleData";

export default function Data() {
  const [highlight, setHighlight] = useState<TileId | null>(null);

  return (
    <section id="data" aria-labelledby="data-title" className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <h2 id="data-title" className="max-w-3xl text-[clamp(2.25rem,1.6rem+2.4vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
          Reporting that field sales ran on
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{dataLede}</p>

        <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <DataWall highlight={highlight} />
          <AnalystPanel onTile={setHighlight} />
        </div>
        <p className="mt-5 text-sm text-muted">
          Sample data for a made-up supplier. The real work lived in Amazon QuickSight, fed by daily MySQL stored procedures over sales force
          automation data.
        </p>
      </div>
    </section>
  );
}
