import { Resend } from "resend";
import { ASSISTANT_RULES } from "@/lib/assistant";
import { extractLead, type Lead } from "@/lib/lead";
import { cleanTurns, runModel, tidy } from "@/lib/workersAi";

// The portfolio assistant. Browser -> this route (same origin) -> Cloudflare Worker portfolio-chat.
// The model marks two actions with tags that never reach the visitor:
//   <<CV>>          the UI shows a download card for the CV
//   <<LEAD {...}>>  the visitor asked for a quote and gave name + email: email Justin the details,
//                   a summary and the whole conversation, with Reply-To set to the visitor.
// ponytail: rate limits are per server instance (in memory); good enough to stop a loop, not a botnet.

const TO = "justin.masiga.94@gmail.com";
const FALLBACK =
  "Sorry, I can't answer right now. You can email Justin at justin.masiga.94@gmail.com, or use the contact form below.";

const hits = new Map<string, number[]>();
function limited(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > max;
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

async function emailLead(lead: Lead, transcript: { role: string; content: string }[]) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const row = (k: string, v: string) =>
    v ? `<tr><td style="padding:4px 12px 4px 0;color:#6e6e73">${k}</td><td style="padding:4px 0">${esc(v)}</td></tr>` : "";
  const convo = transcript
    .map(
      (m) =>
        `<p style="margin:0 0 10px"><strong style="color:${m.role === "user" ? "#0066cc" : "#1d1d1f"}">${
          m.role === "user" ? esc(lead.name || "Visitor") : "Assistant"
        }:</strong> ${esc(m.content).replace(/\n/g, "<br>")}</p>`,
    )
    .join("");
  const html = `<div style="font-family:-apple-system,Segoe UI,sans-serif;font-size:15px;color:#1d1d1f;max-width:640px">
<h2 style="margin:0 0 6px">New quote request from your portfolio</h2>
<p style="margin:0 0 16px;color:#6e6e73">Your assistant on justin94.space collected this. Reply to this email to answer ${esc(lead.name)} directly.</p>
<p style="margin:0 0 16px;padding:12px 14px;background:#f5f5f7;border-radius:10px">${esc(lead.summary || lead.need)}</p>
<table style="border-collapse:collapse;margin:0 0 20px">${row("Name", lead.name)}${row("Email", lead.email)}${row("Company", lead.company)}${row("Needs", lead.need)}${row("Timeline", lead.timeline)}${row("Budget", lead.budget)}</table>
<h3 style="margin:0 0 10px">The whole conversation</h3>${convo}</div>`;
  try {
    const { error } = await new Resend(key).emails.send({
      from: "Portfolio Assistant <onboarding@resend.dev>",
      to: TO,
      reply_to: lead.email,
      subject: `Quote request from ${lead.name}${lead.company ? ` (${lead.company})` : ""}`,
      html,
    });
    return !error;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(`chat:${ip}`, 40, 10 * 60_000)) {
    return Response.json({ reply: "That's a lot of questions in a short time. Give it a few minutes, or email Justin directly." }, { status: 429 });
  }

  let body: { messages?: unknown; leadSent?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }
  const turns = cleanTurns(body.messages, 14);
  if (!turns.length || turns[turns.length - 1].role !== "user") {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }
  const leadSent = body.leadSent === true;

  const system = leadSent
    ? `${ASSISTANT_RULES}\n\nNOTE: this visitor's details have already been passed to Justin. Don't collect them again or output another LEAD line.`
    : ASSISTANT_RULES;
  const out = await runModel([{ role: "system", content: system }, ...turns], 400);
  if (!out) return Response.json({ reply: FALLBACK }, { status: 502 });

  let text = tidy(out);
  const lastUser = turns[turns.length - 1].content;
  const cv = text.includes("<<CV>>") || /\b(cv|resume|résumé|curriculum vitae)\b/i.test(lastUser);
  text = text.replace(/<<CV>>/g, "").trim();

  const { lead, rest } = extractLead(text);
  text = rest;
  let leadDelivered = false;
  if (lead && !leadSent && !limited(`lead:${ip}`, 3, 60 * 60_000)) {
    leadDelivered = await emailLead(lead, [...turns, { role: "assistant", content: text }]);
    if (!leadDelivered) {
      text = `${text}\n\nI couldn't get that through to Justin just now. Please email him at ${TO} so it doesn't get lost.`.trim();
    }
  }

  return Response.json({ reply: text || FALLBACK, cv, lead: leadDelivered });
}
