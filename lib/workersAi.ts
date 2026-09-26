// Server-only helper: one call to the portfolio-chat Cloudflare Worker (Workers AI, Llama 3.3 70B).
// Env (Vercel project settings, never the repo; copy in Credentials/Portfolio/chat.env):
// PORTFOLIO_CHAT_URL, PORTFOLIO_CHAT_KEY.

export type ChatMsg = { role: "system" | "user" | "assistant"; content: string };

export async function runModel(messages: ChatMsg[], maxTokens = 350, temperature?: number): Promise<string | null> {
  const url = process.env.PORTFOLIO_CHAT_URL;
  const key = process.env.PORTFOLIO_CHAT_KEY;
  if (!url || !key) return null;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "x-portfolio-key": key, "Content-Type": "application/json" },
      body: JSON.stringify({ messages, max_tokens: maxTokens, temperature }),
      signal: AbortSignal.timeout(25000),
    });
    if (!res.ok) return null;
    const data = (await res.json().catch(() => null)) as { response?: string } | null;
    return data?.response?.trim() || null;
  } catch {
    return null;
  }
}

// Visitor messages as the model should see them: only user/assistant turns, trimmed and capped.
export function cleanTurns(raw: unknown, keep = 12): { role: "user" | "assistant"; content: string }[] {
  return (Array.isArray(raw) ? raw : [])
    .filter(
      (m): m is { role: "user" | "assistant"; content: string } =>
        !!m &&
        typeof m === "object" &&
        ((m as { role?: unknown }).role === "user" || (m as { role?: unknown }).role === "assistant") &&
        typeof (m as { content?: unknown }).content === "string" &&
        (m as { content: string }).content.trim() !== "",
    )
    .slice(-keep)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 800) }));
}

// Model output uses plain hyphens; long dashes read as machine-written.
export const tidy = (s: string) => s.replace(/[–—]/g, "-").trim();
