// SAMPLE DATA. A made-up FMCG supplier ("the sample client"), shaped like the field-sales reporting
// Justin built at Trade Dynamics: sales vs target, out of stock, on-shelf availability, share of shelf,
// merchandiser schedule compliance, offtake and competitor pricing. No real client figures, names,
// branches or brands. Derived figures (variance, achievement, growth) are computed here once, so the
// AI analyst quotes them instead of doing arithmetic.
// "Today" for this data is 25 Sep 2026: August is the last full month, September is month to date.

export const asOf = "25 Sep 2026";

const pct = (a: number, b: number) => Math.round((a / b) * 1000) / 10;

// Monthly net sales and target, in millions of pesos.
const monthsRaw = [
  { month: "Apr 2026", sales: 128.4, target: 132.0 },
  { month: "May 2026", sales: 134.9, target: 134.0 },
  { month: "Jun 2026", sales: 131.2, target: 136.0 },
  { month: "Jul 2026", sales: 139.7, target: 138.0 },
  { month: "Aug 2026", sales: 146.3, target: 142.0 },
  { month: "Sep 2026 (to 25 Sep)", sales: 118.6, target: 145.0 },
];
export const months = monthsRaw.map((m, i) => ({
  ...m,
  achievement: pct(m.sales, m.target),
  vsPrevMonth: i === 0 || i === monthsRaw.length - 1 ? null : pct(m.sales - monthsRaw[i - 1].sales, monthsRaw[i - 1].sales),
}));

// August by region (sums to the August total). Millions of pesos.
const regionsRaw = [
  { region: "NCR", sales: 52.8, target: 50.0, branches: 612, oos: 3.1 },
  { region: "North Luzon", sales: 21.4, target: 22.5, branches: 318, oos: 5.8 },
  { region: "South Luzon", sales: 27.9, target: 27.0, branches: 401, oos: 4.2 },
  { region: "Visayas", sales: 23.6, target: 22.0, branches: 356, oos: 4.9 },
  { region: "Mindanao", sales: 20.6, target: 20.5, branches: 341, oos: 6.7 },
];
export const regions = regionsRaw.map((r) => ({
  ...r,
  achievement: pct(r.sales, r.target),
  variance: Math.round((r.sales - r.target) * 10) / 10,
}));
export const totalBranches = regionsRaw.reduce((s, r) => s + r.branches, 0); // 2,028

// On-shelf availability by store classification, August (% of audited SKU checks found on shelf).
export const osaByClass = [
  { cls: "Class A", osa: 96.2 },
  { cls: "Class B", osa: 93.5 },
  { cls: "Class C", osa: 89.8 },
  { cls: "Class D", osa: 84.1 },
];

// Share of shelf in the category, August (% of shelf facings).
export const shareOfShelf = [
  { brand: "Sample client", share: 34 },
  { brand: "Competitor A", share: 27 },
  { brand: "Competitor B", share: 18 },
  { brand: "Others", share: 21 },
];

// Merchandiser schedule compliance, August.
const planned = 18420;
const actual = 17105;
const late = 1284;
const unscheduled = 312;
const withSale = 11870;
export const compliance = {
  planned,
  actual,
  late,
  unscheduled,
  withSale,
  compliance: pct(actual, planned), // visits made / visits planned
  lateRate: pct(late, actual),
  conversion: pct(withSale, actual), // visits that turned into a sale
};

// Visits by weekday and time band, August (count of actual visits).
export const visitHeat = {
  days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  bands: ["8-10", "10-12", "12-2", "2-4", "4-6"],
  // rows = days, cols = bands
  values: [
    [820, 910, 540, 700, 330],
    [790, 880, 520, 690, 310],
    [760, 860, 400, 660, 300],
    [800, 900, 530, 680, 320],
    [740, 820, 380, 610, 280],
    [420, 480, 300, 260, 115],
  ],
};

// Top five branches by August sales (thousands of pesos). Branch codes, not store names.
export const topBranches = [
  { branch: "Branch 0142, Quezon City", sales: 1482, achievement: 118.6 },
  { branch: "Branch 0087, Makati", sales: 1391, achievement: 111.3 },
  { branch: "Branch 0355, Cebu City", sales: 1276, achievement: 109.8 },
  { branch: "Branch 0019, Pasig", sales: 1208, achievement: 104.1 },
  { branch: "Branch 0521, Davao City", sales: 1164, achievement: 112.7 },
];

// Offtake (units sold to shoppers) for the top SKUs, weekly, last 8 weeks (thousands of units).
export const skuOfftake = [
  { sku: "Powder detergent 1kg", weekly: [41, 43, 42, 45, 47, 46, 49, 51] },
  { sku: "Liquid detergent 800ml", weekly: [28, 27, 29, 30, 29, 31, 33, 32] },
  { sku: "Fabric conditioner 1L", weekly: [22, 23, 21, 20, 22, 21, 19, 18] },
  { sku: "Dishwashing liquid 500ml", weekly: [35, 36, 38, 37, 39, 40, 41, 43] },
];

// Shelf price vs the main competitor's comparable SKU, August average (pesos).
export const priceWatch = [
  { sku: "Powder detergent 1kg", ours: 189, competitor: 199 },
  { sku: "Liquid detergent 800ml", ours: 245, competitor: 239 },
  { sku: "Fabric conditioner 1L", ours: 159, competitor: 149 },
  { sku: "Dishwashing liquid 500ml", ours: 98, competitor: 104 },
];

export const aug = months[4];
export const sepMtd = months[5];

// The tiles on the wall. The analyst can point at any of these by id.
export const TILE_IDS = [
  "kpi-sales",
  "kpi-achievement",
  "kpi-oos",
  "kpi-conversion",
  "sales-trend",
  "region-target",
  "oos-region",
  "osa-class",
  "share-shelf",
  "compliance",
  "visit-heat",
  "top-branches",
  "sku-offtake",
  "price-watch",
] as const;
export type TileId = (typeof TILE_IDS)[number];

// Signed pesos the way people write them: "+₱1.2M", "-₱10".
const peso = (n: number, unit = "") => `${n > 0 ? "+" : n < 0 ? "-" : ""}₱${Math.abs(n)}${unit}`;

function heatSummary() {
  const cells = visitHeat.values.flatMap((row, d) => row.map((v, b) => ({ v, at: `${visitHeat.days[d]} ${visitHeat.bands[b]}` })));
  const sorted = [...cells].sort((a, b) => b.v - a.v);
  const total = cells.reduce((sum, c) => sum + c.v, 0);
  return `Total ${total.toLocaleString("en-US")} visits. Busiest slots: ${sorted.slice(0, 3).map((c) => `${c.at} (${c.v})`).join(", ")}. Quietest: ${sorted.slice(-2).map((c) => `${c.at} (${c.v})`).join(", ")}. Saturdays run at about half the weekday volume.`;
}

// The same data as plain tables, for the analyst's prompt.
export function dataAsText() {
  const oosNational = Math.round((regions.reduce((s, r) => s + r.oos * r.branches, 0) / totalBranches) * 10) / 10;
  return `ALL DATA IS SAMPLE DATA for a fictional FMCG supplier ("the sample client"). Data as of ${asOf}. "Last month" means August 2026. "This month" means September 2026 to date (25 Sep).

MONTHLY NET SALES VS TARGET (millions of pesos) [tile: sales-trend]
${months.map((m) => `${m.month}: sales ₱${m.sales}M, target ₱${m.target}M, achievement ${m.achievement}%${m.vsPrevMonth === null ? "" : `, vs previous month ${m.vsPrevMonth > 0 ? "+" : ""}${m.vsPrevMonth}%`}`).join("\n")}
Five-month total, April to August (the full months): ₱${Math.round(months.slice(0, 5).reduce((s, m) => s + m.sales, 0) * 10) / 10}M.

AUGUST 2026 BY REGION [tile: region-target] (sales and target in millions of pesos; OOS = out-of-stock rate) [tile: oos-region]
${regions
  .map(
    (r) =>
      `${r.region} in August: ${r.region} achieved ${r.achievement}% of its target (${r.region} sales ₱${r.sales}M vs ${r.region} target ₱${r.target}M, variance ${peso(r.variance, "M")}). ${r.region} has ${r.branches} branches and an out-of-stock rate of ${r.oos}%.`,
  )
  .join("\n")}
Regions below target in August: ${regions.filter((r) => r.achievement < 100).map((r) => r.region).join(", ")}.
Total branches: ${totalBranches.toLocaleString("en-US")}. National out-of-stock rate (branch-weighted), August: ${oosNational}% [tile: kpi-oos].

ON-SHELF AVAILABILITY BY STORE CLASS, AUGUST [tile: osa-class]
${osaByClass.map((o) => `${o.cls}: ${o.osa}%`).join("\n")}

SHARE OF SHELF IN THE CATEGORY, AUGUST [tile: share-shelf]
${shareOfShelf.map((s) => `${s.brand}: ${s.share}%`).join("\n")}

MERCHANDISER SCHEDULE COMPLIANCE, AUGUST [tile: compliance]
Planned visits ${planned.toLocaleString("en-US")}, actual visits ${actual.toLocaleString("en-US")}, compliance ${compliance.compliance}%. Late arrivals ${late.toLocaleString("en-US")} (${compliance.lateRate}% of actual visits). Unscheduled visits ${unscheduled}. Visits that turned into a sale ${withSale.toLocaleString("en-US")} (${compliance.conversion}% of actual visits) [tile: kpi-conversion].

VISITS BY WEEKDAY AND TIME BAND, AUGUST [tile: visit-heat]
${heatSummary()}

TOP FIVE BRANCHES BY AUGUST SALES (thousands of pesos) [tile: top-branches]
${topBranches.map((b, i) => `${i + 1}. ${b.branch}: ₱${b.sales.toLocaleString("en-US")}K, achievement ${b.achievement}%`).join("\n")}

WEEKLY OFFTAKE, LAST 8 WEEKS (thousands of units, oldest to newest) [tile: sku-offtake]
${skuOfftake.map((s) => `${s.sku}: ${s.weekly.join(", ")} (week 1 to week 8 change ${Math.round(((s.weekly[7] - s.weekly[0]) / s.weekly[0]) * 1000) / 10}%)`).join("\n")}

SHELF PRICE VS MAIN COMPETITOR, AUGUST AVERAGE (pesos) [tile: price-watch]
${priceWatch.map((p) => `${p.sku}: ours ₱${p.ours}, competitor ₱${p.competitor}, gap ${peso(p.ours - p.competitor)} (ours ${p.ours < p.competitor ? "cheaper" : "dearer"})`).join("\n")}

NATIONAL HEADLINE FIGURES (all regions together): national August sales ₱${aug.sales}M [tile: kpi-sales], national August achievement ${aug.achievement}% [tile: kpi-achievement]. These are national totals, not any single region's.`;
}
