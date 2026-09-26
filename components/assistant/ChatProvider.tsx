"use client";

import { MotionConfig } from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { ASSISTANT_GREETING } from "@/lib/assistantUi";

// One conversation for the whole page: the hero console and the floating chat window show the same
// thread. Kept in sessionStorage so a reload doesn't lose it.

export type Msg = { id: string; role: "user" | "assistant"; content: string; cv?: boolean; lead?: boolean };

type Chat = {
  messages: Msg[];
  busy: boolean;
  send: (text: string) => void;
  panelOpen: boolean;
  setPanelOpen: (open: boolean) => void;
  consoleVisible: boolean;
  setConsoleVisible: (visible: boolean) => void;
};

const ChatContext = createContext<Chat | null>(null);
const KEY = "assistant-thread";
const greeting: Msg = { id: "greeting", role: "assistant", content: ASSISTANT_GREETING };
const uid = () => Math.random().toString(36).slice(2, 10);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Msg[]>([greeting]);
  const [busy, setBusy] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [consoleVisible, setConsoleVisible] = useState(true);
  const leadSent = useRef(false);
  const loaded = useRef(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(KEY) ?? "null") as Msg[] | null;
      if (Array.isArray(saved) && saved.length) {
        setMessages(saved);
        leadSent.current = saved.some((m) => m.lead);
      }
    } catch {
      // Storage blocked: start fresh.
    }
    loaded.current = true;
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    try {
      sessionStorage.setItem(KEY, JSON.stringify(messages.slice(-40)));
    } catch {
      // Storage blocked: the thread still works for this page view.
    }
  }, [messages]);

  const send = useCallback(
    (text: string) => {
      const content = text.trim().slice(0, 800);
      if (!content || busy) return;
      const next = [...messages, { id: uid(), role: "user" as const, content }];
      setMessages(next);
      setBusy(true);
      fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.filter((m) => m.id !== "greeting").map(({ role, content }) => ({ role, content })),
          leadSent: leadSent.current,
        }),
      })
        .then((r) => r.json())
        .then((d: { reply?: string; cv?: boolean; lead?: boolean }) => {
          if (d.lead) leadSent.current = true;
          setMessages((m) => [
            ...m,
            {
              id: uid(),
              role: "assistant",
              content: d.reply || "Sorry, that didn't go through. Try again in a moment.",
              cv: d.cv,
              lead: d.lead,
            },
          ]);
        })
        .catch(() =>
          setMessages((m) => [
            ...m,
            {
              id: uid(),
              role: "assistant",
              content: "I couldn't reach the server. Check your connection, or email Justin at justin.masiga.94@gmail.com.",
            },
          ]),
        )
        .finally(() => setBusy(false));
    },
    [busy, messages],
  );

  return (
    <ChatContext.Provider value={{ messages, busy, send, panelOpen, setPanelOpen, consoleVisible, setConsoleVisible }}>
      {/* The page-level client boundary, so Framer's animations also follow the OS reduced-motion setting here. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ChatContext.Provider>
  );
}

export function useChat() {
  const chat = useContext(ChatContext);
  if (!chat) throw new Error("useChat must be used inside ChatProvider");
  return chat;
}
