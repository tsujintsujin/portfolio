"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ASSISTANT_CHIPS } from "@/lib/assistantUi";
import { profile } from "@/lib/content";
import { Download, FileText, Send } from "@/components/ui/icons";
import { useChat } from "./ChatProvider";

// The conversation itself: messages, the CV card, a typing indicator, starter questions and the input.
// Used by the hero console and the floating chat window (same thread in both).
export default function ChatThread({ inputId, autoFocus, inPanel }: { inputId: string; autoFocus?: boolean; inPanel?: boolean }) {
  const { messages, busy, send, panelOpen } = useChat();
  // Both copies of the thread can be on the page at once; only one should announce new replies.
  const live = inPanel || !panelOpen ? "polite" : "off";
  const [draft, setDraft] = useState("");
  const list = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  // Keep the newest message in view by scrolling the thread, never the page.
  useEffect(() => {
    const el = list.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  useEffect(() => {
    if (autoFocus) input.current?.focus({ preventScroll: true });
  }, [autoFocus]);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!draft.trim() || busy) return;
    send(draft);
    setDraft("");
  }

  const fresh = messages.length === 1;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div
        ref={list}
        role="log"
        aria-live={live}
        aria-label="Conversation with Justin's assistant"
        className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5"
      >
        {messages.map((m) =>
          m.role === "user" ? (
            <p key={m.id} className="ml-auto w-fit max-w-[85%] rounded-[20px] rounded-br-md bg-[#0066cc] px-4 py-2.5 text-[15px] leading-snug text-white">
              {m.content}
            </p>
          ) : (
            <div key={m.id} className="max-w-[90%] space-y-2">
              <p className="w-fit whitespace-pre-line rounded-[20px] rounded-bl-md bg-ink/[0.07] px-4 py-2.5 text-[15px] leading-snug">
                {m.content}
              </p>
              {m.cv && (
                <a
                  href={profile.cv}
                  download
                  className="focus-ring flex w-fit items-center gap-3 rounded-2xl border border-line/10 bg-surface/70 py-2.5 pl-3 pr-4 transition-colors hover:border-accent/50"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent-text">
                    <FileText className="h-5 w-5" />
                  </span>
                  <span className="text-sm">
                    <span className="block font-medium">Justin_Masiga_CV.pdf</span>
                    <span className="text-muted">PDF, 2 pages</span>
                  </span>
                  <Download className="ml-2 h-4 w-4 text-muted" />
                </a>
              )}
              {m.lead && (
                <p className="flex items-center gap-2 text-[13px] text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-positive" aria-hidden="true" />
                  Sent to Justin&apos;s inbox
                </p>
              )}
            </div>
          ),
        )}
        {busy && (
          <p className="flex w-fit items-center gap-1 rounded-[20px] rounded-bl-md bg-ink/[0.07] px-4 py-3.5" aria-label="Assistant is typing">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted"
                style={{ animationDelay: `${i * 140}ms` }}
              />
            ))}
          </p>
        )}
      </div>

      {fresh && (
        <div className="flex flex-wrap gap-2 px-4 pb-3 sm:px-5">
          {ASSISTANT_CHIPS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => send(c)}
              className="focus-ring rounded-full border border-line/15 px-3 py-1.5 text-[13px] text-ink transition-colors hover:border-accent/60 hover:text-accent-text"
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={submit} className="flex items-center gap-2 border-t border-line/10 p-3 sm:px-4">
        <label htmlFor={inputId} className="sr-only">
          Message Justin&apos;s assistant
        </label>
        <input
          ref={input}
          id={inputId}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          maxLength={800}
          autoComplete="off"
          placeholder="Ask about Justin's work"
          className="focus-ring min-w-0 flex-1 rounded-full border border-line/10 bg-canvas/40 px-4 py-2.5 text-[15px] text-ink placeholder:text-muted"
        />
        <button
          type="submit"
          disabled={busy || !draft.trim()}
          aria-label="Send"
          className="focus-ring grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0066cc] text-white transition-opacity disabled:opacity-40"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
