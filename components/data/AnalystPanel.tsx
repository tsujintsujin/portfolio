"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Send } from "@/components/ui/icons";
import type { TileId } from "@/lib/sampleData";
import { renderTile } from "./Tiles";

type Msg = { id: string; role: "user" | "assistant"; content: string; tile?: TileId | null };

const CHIPS = [
  "What were total sales last month?",
  "Which regions missed target?",
  "Where is out of stock worst?",
  "How did merchandisers do on schedule?",
];
const GREETING: Msg = {
  id: "hello",
  role: "assistant",
  content: "I'm the analyst for this wall. Ask me about sales, targets, stock, shelf share or store visits, and I'll show you the chart.",
};
const uid = () => Math.random().toString(36).slice(2, 10);

// Its own conversation (separate from the site assistant): questions about the sample data only.
export default function AnalystPanel({ onTile }: { onTile: (id: TileId | null) => void }) {
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState("");
  const list = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = list.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  function ask(text: string) {
    const content = text.trim().slice(0, 400);
    if (!content || busy) return;
    const next = [...messages, { id: uid(), role: "user" as const, content }];
    setMessages(next);
    setBusy(true);
    fetch("/api/analyst", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: next.filter((m) => m.id !== "hello").map(({ role, content }) => ({ role, content })) }),
    })
      .then((r) => r.json())
      .then((d: { reply?: string; tile?: TileId | null }) => {
        setMessages((m) => [...m, { id: uid(), role: "assistant", content: d.reply || "No answer came back. Try again.", tile: d.tile }]);
        onTile(d.tile ?? null);
      })
      .catch(() => setMessages((m) => [...m, { id: uid(), role: "assistant", content: "I couldn't reach the server. Try again in a moment." }]))
      .finally(() => setBusy(false));
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    ask(draft);
    setDraft("");
  }

  return (
    <div className="glass flex h-[600px] min-w-0 flex-col overflow-hidden rounded-[32px] lg:h-[760px]">
      <div className="border-b border-line/10 px-5 py-4">
        <p className="text-[15px] font-semibold">Ask the analyst</p>
        <p className="text-[13px] text-muted">AI agent over the sample data on this wall</p>
      </div>

      <div ref={list} role="log" aria-live="polite" aria-label="Conversation with the data analyst" className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-5 py-4">
        {messages.map((m) =>
          m.role === "user" ? (
            <p key={m.id} className="ml-auto w-fit max-w-[85%] rounded-[20px] rounded-br-md bg-[#0066cc] px-4 py-2.5 text-[15px] leading-snug text-white">
              {m.content}
            </p>
          ) : (
            <div key={m.id} className="space-y-2.5">
              <p className="w-fit max-w-[92%] rounded-[20px] rounded-bl-md bg-ink/[0.07] px-4 py-2.5 text-[15px] leading-snug">{m.content}</p>
              {m.tile && <div className="max-w-[340px]">{renderTile(m.tile)}</div>}
            </div>
          ),
        )}
        {busy && (
          <p className="flex w-fit items-center gap-1 rounded-[20px] rounded-bl-md bg-ink/[0.07] px-4 py-3.5" aria-label="Analyst is typing">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted" style={{ animationDelay: `${i * 140}ms` }} />
            ))}
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-2 px-5 pb-3">
        {CHIPS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => ask(c)}
            disabled={busy}
            className="focus-ring rounded-full border border-line/15 px-3 py-1.5 text-[13px] transition-colors hover:border-accent/60 hover:text-accent-text disabled:opacity-50"
          >
            {c}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="flex items-center gap-2 border-t border-line/10 p-3 sm:px-4">
        <label htmlFor="analyst-input" className="sr-only">
          Ask about the sample data
        </label>
        <input
          id="analyst-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          maxLength={400}
          autoComplete="off"
          placeholder="e.g. How is Mindanao doing?"
          className="focus-ring min-w-0 flex-1 rounded-full border border-line/10 bg-canvas/40 px-4 py-2.5 text-[15px] placeholder:text-muted"
        />
        <button type="submit" disabled={busy || !draft.trim()} aria-label="Ask" className="focus-ring grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0066cc] text-white disabled:opacity-40">
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
