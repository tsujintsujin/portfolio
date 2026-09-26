import type { ReactNode } from "react";
import {
  aug,
  compliance,
  months,
  osaByClass,
  priceWatch,
  regions,
  sepMtd,
  shareOfShelf,
  skuOfftake,
  topBranches,
  totalBranches,
  visitHeat,
  type TileId,
} from "@/lib/sampleData";

// Dashboard tiles drawn in SVG from lib/sampleData.ts. Colours come from the theme tokens,
// so every chart works in dark and light. Figures use the mono cut with tabular numbers.

const A = "rgb(var(--accent))";
const MUTED = "rgb(var(--muted) / 0.35)";
const POS = "rgb(var(--positive))";
const NEG = "rgb(var(--negative))";

function Tile({ id, title, note, highlight, children }: { id: TileId; title: string; note?: string; highlight?: boolean; children: ReactNode }) {
  return (
    <figure
      data-tile={id}
      className={`glass rounded-[24px] p-5 transition-shadow duration-500 ${highlight ? "ring-2 ring-accent shadow-[0_0_40px_-6px_rgb(var(--accent)/0.6)]" : ""}`}
    >
      <figcaption className="flex items-baseline justify-between gap-3">
        <span className="text-[13px] font-medium">{title}</span>
        {note && <span className="text-[11px] text-muted">{note}</span>}
      </figcaption>
      <div className="mt-4">{children}</div>
    </figure>
  );
}

const num = "font-mono tabular";

function Kpi({ id, title, value, sub, good, highlight }: { id: TileId; title: string; value: string; sub: string; good?: boolean; highlight?: boolean }) {
  return (
    <Tile id={id} title={title} note="Aug 2026" highlight={highlight}>
      <p className={`${num} text-[2rem] font-semibold leading-none tracking-[-0.03em]`}>{value}</p>
      <p className="mt-2 text-xs" style={{ color: good === undefined ? undefined : good ? POS : NEG }}>
        {sub}
      </p>
    </Tile>
  );
}

function SalesTrend({ highlight }: { highlight?: boolean }) {
  const max = 150;
  const w = 260;
  const h = 120;
  const bw = 28;
  const gap = (w - bw * months.length) / (months.length - 1);
  return (
    <Tile id="sales-trend" title="Net sales vs target" note="₱M, monthly" highlight={highlight}>
      <svg viewBox={`0 0 ${w} ${h + 18}`} className="w-full" role="img" aria-label="Monthly net sales against target, April to September 2026">
        {months.map((m, i) => {
          const x = i * (bw + gap);
          const bh = (m.sales / max) * h;
          const ty = h - (m.target / max) * h;
          const mtd = i === months.length - 1;
          return (
            <g key={m.month}>
              <rect x={x} y={h - bh} width={bw} height={bh} rx={5} fill={A} opacity={mtd ? 0.35 : 0.9} />
              <line x1={x - 3} x2={x + bw + 3} y1={ty} y2={ty} stroke="rgb(var(--ink))" strokeWidth={2} strokeLinecap="round" />
              <text x={x + bw / 2} y={h + 14} textAnchor="middle" fontSize="9" fill="rgb(var(--muted))">
                {m.month.slice(0, 3)}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="mt-2 text-[11px] text-muted">Bars: sales. Lines: target. September is month to date.</p>
    </Tile>
  );
}

function HBars({
  id,
  title,
  note,
  rows,
  max,
  marker,
  fmt,
  color,
  highlight,
}: {
  id: TileId;
  title: string;
  note: string;
  rows: { label: string; value: number }[];
  max: number;
  marker?: number;
  fmt: (v: number) => string;
  color: (v: number) => string;
  highlight?: boolean;
}) {
  return (
    <Tile id={id} title={title} note={note} highlight={highlight}>
      <ul className="space-y-2.5">
        {rows.map((r) => (
          <li key={r.label} className="grid grid-cols-[88px_1fr_48px] items-center gap-2 text-xs">
            <span className="truncate text-muted">{r.label}</span>
            <span className="relative h-2 rounded-full bg-ink/10">
              <span className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${Math.min(100, (r.value / max) * 100)}%`, background: color(r.value) }} />
              {marker !== undefined && (
                <span className="absolute -inset-y-1 w-px bg-ink/60" style={{ left: `${(marker / max) * 100}%` }} aria-hidden="true" />
              )}
            </span>
            <span className={`${num} text-right`}>{fmt(r.value)}</span>
          </li>
        ))}
      </ul>
    </Tile>
  );
}

function ShareShelf({ highlight }: { highlight?: boolean }) {
  const r = 38;
  const c = 2 * Math.PI * r;
  const colors = [A, "rgb(var(--ink) / 0.55)", "rgb(var(--ink) / 0.3)", "rgb(var(--ink) / 0.14)"];
  let acc = 0;
  return (
    <Tile id="share-shelf" title="Share of shelf" note="Aug, % of facings" highlight={highlight}>
      <div className="flex items-center gap-4">
        <svg viewBox="0 0 100 100" className="h-24 w-24 shrink-0 -rotate-90" role="img" aria-label="Share of shelf by brand">
          {shareOfShelf.map((s, i) => {
            const len = (s.share / 100) * c;
            const el = (
              <circle key={s.brand} cx="50" cy="50" r={r} fill="none" stroke={colors[i]} strokeWidth="14" strokeDasharray={`${len - 1.5} ${c - len + 1.5}`} strokeDashoffset={-acc} />
            );
            acc += len;
            return el;
          })}
        </svg>
        <ul className="space-y-1.5 text-xs">
          {shareOfShelf.map((s, i) => (
            <li key={s.brand} className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: colors[i] }} />
              <span className="text-muted">{s.brand}</span>
              <span className={`${num} ml-auto pl-2`}>{s.share}%</span>
            </li>
          ))}
        </ul>
      </div>
    </Tile>
  );
}

function Compliance({ highlight }: { highlight?: boolean }) {
  const v = compliance.compliance;
  const r = 44;
  const half = Math.PI * r;
  return (
    <Tile id="compliance" title="Schedule compliance" note="Aug, merchandisers" highlight={highlight}>
      <div className="relative mx-auto w-44">
        <svg viewBox="0 0 110 62" className="w-full" role="img" aria-label={`Schedule compliance ${v}%`}>
          <path d="M11 55 A44 44 0 0 1 99 55" fill="none" stroke={MUTED} strokeWidth="10" strokeLinecap="round" />
          <path d="M11 55 A44 44 0 0 1 99 55" fill="none" stroke={A} strokeWidth="10" strokeLinecap="round" strokeDasharray={`${(v / 100) * half} ${half}`} />
        </svg>
        <p className={`${num} absolute inset-x-0 bottom-0 text-center text-2xl font-semibold`}>{v}%</p>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
        {[
          ["Planned", compliance.planned],
          ["Made", compliance.actual],
          ["Late arrivals", compliance.late],
          ["Unscheduled", compliance.unscheduled],
        ].map(([k, n]) => (
          <div key={k} className="flex justify-between">
            <dt className="text-muted">{k}</dt>
            <dd className={num}>{Number(n).toLocaleString("en-US")}</dd>
          </div>
        ))}
      </dl>
    </Tile>
  );
}

function VisitHeat({ highlight }: { highlight?: boolean }) {
  const max = Math.max(...visitHeat.values.flat());
  return (
    <Tile id="visit-heat" title="Store visits by day and hour" note="Aug" highlight={highlight}>
      <div className="grid grid-cols-[32px_repeat(5,1fr)] gap-1 text-[10px]">
        <span />
        {visitHeat.bands.map((b) => (
          <span key={b} className="text-center text-muted">
            {b}
          </span>
        ))}
        {visitHeat.values.map((row, d) => (
          <div key={visitHeat.days[d]} className="contents">
            <span className="self-center text-muted">{visitHeat.days[d]}</span>
            {row.map((v, b) => (
              <span
                key={b}
                title={`${visitHeat.days[d]} ${visitHeat.bands[b]}: ${v} visits`}
                className="h-5 rounded-[5px]"
                style={{ background: `rgb(var(--accent) / ${0.12 + (v / max) * 0.85})` }}
              />
            ))}
          </div>
        ))}
      </div>
    </Tile>
  );
}

function TopBranches({ highlight }: { highlight?: boolean }) {
  return (
    <Tile id="top-branches" title="Top branches" note="Aug, ₱K" highlight={highlight}>
      <table className="w-full text-xs">
        <tbody>
          {topBranches.map((b) => (
            <tr key={b.branch} className="border-b border-line/10 last:border-0">
              <td className="py-1.5 text-muted">{b.branch}</td>
              <td className={`${num} py-1.5 text-right`}>{b.sales.toLocaleString("en-US")}</td>
              <td className={`${num} py-1.5 pl-3 text-right`} style={{ color: POS }}>
                {b.achievement}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Tile>
  );
}

function Spark({ values }: { values: number[] }) {
  const w = 90;
  const h = 26;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pts = values.map((v, i) => `${(i / (values.length - 1)) * w},${h - ((v - min) / (max - min || 1)) * h}`).join(" ");
  const up = values[values.length - 1] >= values[0];
  return (
    <svg viewBox={`0 -2 ${w} ${h + 4}`} className="h-7 w-24" aria-hidden="true">
      <polyline points={pts} fill="none" stroke={up ? A : NEG} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SkuOfftake({ highlight }: { highlight?: boolean }) {
  return (
    <Tile id="sku-offtake" title="Offtake, top SKUs" note="8 weeks, K units" highlight={highlight}>
      <ul className="space-y-2">
        {skuOfftake.map((s) => (
          <li key={s.sku} className="flex items-center justify-between gap-2 text-xs">
            <span className="truncate text-muted">{s.sku}</span>
            <span className="flex items-center gap-2">
              <Spark values={s.weekly} />
              <span className={`${num} w-6 text-right`}>{s.weekly[s.weekly.length - 1]}</span>
            </span>
          </li>
        ))}
      </ul>
    </Tile>
  );
}

function PriceWatch({ highlight }: { highlight?: boolean }) {
  return (
    <Tile id="price-watch" title="Shelf price vs competitor" note="Aug avg, ₱" highlight={highlight}>
      <ul className="space-y-2 text-xs">
        {priceWatch.map((p) => {
          const gap = p.ours - p.competitor;
          return (
            <li key={p.sku} className="grid grid-cols-[1fr_auto_auto] items-center gap-3">
              <span className="truncate text-muted">{p.sku}</span>
              <span className={num}>
                {p.ours} <span className="text-muted">vs {p.competitor}</span>
              </span>
              <span className={`${num} w-9 text-right`} style={{ color: gap > 0 ? NEG : POS }}>
                {gap > 0 ? "+" : ""}
                {gap}
              </span>
            </li>
          );
        })}
      </ul>
    </Tile>
  );
}

const oosNational = Math.round((regions.reduce((s, r) => s + r.oos * r.branches, 0) / totalBranches) * 10) / 10;

// Every tile, by id. `highlight` rings the tile the analyst is talking about.
export function renderTile(id: TileId, highlight = false): ReactNode {
  switch (id) {
    case "kpi-sales":
      return <Kpi id={id} title="Net sales" value={`₱${aug.sales}M`} sub={`+${aug.vsPrevMonth}% vs July`} good highlight={highlight} />;
    case "kpi-achievement":
      return <Kpi id={id} title="Target achievement" value={`${aug.achievement}%`} sub={`Sep to date: ${sepMtd.achievement}% (month not over)`} highlight={highlight} />;
    case "kpi-oos":
      return <Kpi id={id} title="Out of stock" value={`${oosNational}%`} sub="Branch-weighted, national" good={false} highlight={highlight} />;
    case "kpi-conversion":
      return <Kpi id={id} title="Visits that sold" value={`${compliance.conversion}%`} sub={`${compliance.withSale.toLocaleString("en-US")} of ${compliance.actual.toLocaleString("en-US")} visits`} good highlight={highlight} />;
    case "sales-trend":
      return <SalesTrend highlight={highlight} />;
    case "region-target":
      return (
        <HBars
          id={id}
          title="Sales vs target by region"
          note="Aug, % achieved"
          rows={regions.map((r) => ({ label: r.region, value: r.achievement }))}
          max={115}
          marker={100}
          fmt={(v) => `${v}%`}
          color={(v) => (v >= 100 ? A : NEG)}
          highlight={highlight}
        />
      );
    case "oos-region":
      return (
        <HBars
          id={id}
          title="Out of stock by region"
          note="Aug, % of checks"
          rows={regions.map((r) => ({ label: r.region, value: r.oos }))}
          max={8}
          fmt={(v) => `${v}%`}
          color={(v) => (v > 5 ? NEG : A)}
          highlight={highlight}
        />
      );
    case "osa-class":
      return (
        <HBars
          id={id}
          title="On-shelf availability"
          note="Aug, by store class"
          rows={osaByClass.map((o) => ({ label: o.cls, value: o.osa }))}
          max={100}
          fmt={(v) => `${v}%`}
          color={(v) => (v >= 90 ? A : NEG)}
          highlight={highlight}
        />
      );
    case "share-shelf":
      return <ShareShelf highlight={highlight} />;
    case "compliance":
      return <Compliance highlight={highlight} />;
    case "visit-heat":
      return <VisitHeat highlight={highlight} />;
    case "top-branches":
      return <TopBranches highlight={highlight} />;
    case "sku-offtake":
      return <SkuOfftake highlight={highlight} />;
    case "price-watch":
      return <PriceWatch highlight={highlight} />;
  }
}
