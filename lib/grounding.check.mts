// Run: npx tsx lib/grounding.check.mts  — the analyst's number check, against the real sample data.
import assert from "node:assert/strict";
import { regionMismatch, ungrounded } from "./grounding.ts";
import { dataAsText, regions } from "./sampleData.ts";

const data = dataAsText();
assert.deepEqual(ungrounded("Mindanao achieved 100.5% of target, sales ₱20.6M.", data), []);
assert.deepEqual(ungrounded("₱146.3M in August, 103% of target.", data), []);
assert.deepEqual(ungrounded("Planned 18,420 visits, made 17,105.", data), []);
assert.deepEqual(ungrounded("Branch 0142 sold ₱1,482K.", data), []);
// Invented or computed figures are caught
assert.deepEqual(ungrounded("Total was ₱812.3M.", data), ["812.3"]);
assert.deepEqual(ungrounded("Sales were ₱150.2M.", data), ["150.2"]);
// Small counts and the year are not checked
assert.deepEqual(ungrounded("2 regions missed target in 2026.", data), []);
// Region answers must use that region's own figures (the real Llama slip: national 103% for Mindanao)
const names = regions.map((r) => r.region);
assert.deepEqual(regionMismatch("How is Mindanao doing?", "103% achievement, sales ₱20.6M", data, names), ["103"]);
assert.deepEqual(regionMismatch("How is Mindanao doing?", "100.5% of target, ₱20.6M sales, OOS 6.7%", data, names), []);
assert.deepEqual(regionMismatch("What were total sales?", "₱146.3M", data, names), []);
console.log("grounding.check: all passed");
