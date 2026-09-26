// Run: npx tsx lib/lead.check.mts  — checks extractLead against real model outputs (incl. its slips).
import assert from "node:assert/strict";
import { extractLead } from "./lead.ts";

const good = `I'll pass this on to Justin. He'll reply by email.\n<<LEAD {"name":"Mark","email":"mark@acme.example","company":"Acme Retail","need":"BI developer","timeline":"","budget":"","summary":"Wants to talk about a role."}>>`;
let r = extractLead(good);
assert.equal(r.lead?.name, "Mark");
assert.equal(r.rest, "I'll pass this on to Justin. He'll reply by email.");

// Seen from Llama: "}}>" closer instead of "}>>"
const slip = `Passing this on now.\n<<LEAD {"name":"Dana Cruz","email":"dana.cruz@example.com","company":"","need":"booking site","timeline":"","budget":"","summary":"Clinic site."}}>`;
r = extractLead(slip);
assert.equal(r.lead?.email, "dana.cruz@example.com");
assert.equal(r.rest, "Passing this on now.");

// Text after the tag is kept; a brace inside a string doesn't end the JSON early.
r = extractLead(`Done.\n<<LEAD {"name":"A {B}","email":"a@b.co","company":"","need":"x","timeline":"","budget":"","summary":""}>>\nTalk soon.`);
assert.equal(r.lead?.name, "A {B}");
assert.equal(r.rest, "Done. Talk soon.");

// Invalid email or missing need: no lead, tag still stripped.
r = extractLead(`Ok.\n<<LEAD {"name":"A","email":"not-an-email","need":"x"}>>`);
assert.equal(r.lead, null);
assert.equal(r.rest, "Ok.");
assert.equal(extractLead("No tag here.").rest, "No tag here.");
console.log("lead.check: all passed");
