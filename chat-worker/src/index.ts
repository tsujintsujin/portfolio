// POST { messages: [{ role, content }], max_tokens?, temperature? } with header "x-portfolio-key" -> { response }.
// Prompts, knowledge and limits live in the site's routes; this only runs the model.
interface Env {
  AI: { run(model: string, input: unknown): Promise<{ response?: string }> };
  PORTFOLIO_KEY: string;
}

const MODEL = "@cf/meta/llama-3.3-70b-instruct-fp8-fast";

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
    if (!env.PORTFOLIO_KEY || req.headers.get("x-portfolio-key") !== env.PORTFOLIO_KEY) {
      return new Response("Forbidden", { status: 403 });
    }
    let body: { messages?: unknown; max_tokens?: unknown; temperature?: unknown };
    try {
      body = await req.json();
    } catch {
      return new Response("Bad request", { status: 400 });
    }
    if (!Array.isArray(body.messages) || body.messages.length === 0 || body.messages.length > 20) {
      return new Response("Bad request", { status: 400 });
    }
    const maxTokens = typeof body.max_tokens === "number" ? Math.min(Math.max(body.max_tokens, 50), 600) : 350;
    const temperature = typeof body.temperature === "number" ? Math.min(Math.max(body.temperature, 0), 1) : 0.3;
    try {
      const out = await env.AI.run(MODEL, { messages: body.messages, max_tokens: maxTokens, temperature });
      return Response.json({ response: out.response ?? "" });
    } catch (e) {
      return Response.json({ error: String(e) }, { status: 502 });
    }
  },
};
