// The <<LEAD {...}>> tag the chat model appends once it has a visitor's need, name and email.

export type Lead = { name: string; email: string; company: string; need: string; timeline: string; budget: string; summary: string };

// Pull the LEAD JSON out of the reply, tolerating the small format slips a model makes
// (seen: "}}>" instead of "}>>"). The JSON ends at its matching brace, found by counting
// braces outside strings; any stray "}" and ">" right after it belong to the tag.
export function extractLead(text: string): { lead: Lead | null; rest: string } {
  const at = text.indexOf("<<LEAD");
  if (at === -1) return { lead: null, rest: text };
  const open = text.indexOf("{", at);
  let close = -1;
  if (open !== -1) {
    let depth = 0;
    let inString = false;
    for (let i = open; i < text.length; i++) {
      const ch = text[i];
      if (inString) {
        if (ch === "\\") i++;
        else if (ch === '"') inString = false;
      } else if (ch === '"') inString = true;
      else if (ch === "{") depth++;
      else if (ch === "}" && --depth === 0) {
        close = i;
        break;
      }
    }
  }
  let tagEnd = close === -1 ? text.length : close + 1;
  while (tagEnd < text.length && (text[tagEnd] === "}" || text[tagEnd] === ">")) tagEnd++;
  const rest = `${text.slice(0, at).trim()} ${text.slice(tagEnd).trim()}`.trim();
  if (close === -1) return { lead: null, rest };
  try {
    const raw = JSON.parse(text.slice(open, close + 1)) as Partial<Lead>;
    const s = (v: unknown) => (typeof v === "string" ? v.trim().slice(0, 500) : "");
    const lead: Lead = {
      name: s(raw.name),
      email: s(raw.email),
      company: s(raw.company),
      need: s(raw.need),
      timeline: s(raw.timeline),
      budget: s(raw.budget),
      summary: s(raw.summary),
    };
    const valid = lead.name && lead.need && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email);
    return { lead: valid ? lead : null, rest };
  } catch {
    return { lead: null, rest };
  }
}
