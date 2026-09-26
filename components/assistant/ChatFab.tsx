"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { Chat, Close } from "@/components/ui/icons";
import AssistantHeader from "./AssistantHeader";
import ChatThread from "./ChatThread";
import { useChat } from "./ChatProvider";

// Floating chat button. Hidden while the hero console (the same conversation) is on screen,
// so there are never two inputs visible at once.
export default function ChatFab() {
  const { panelOpen, setPanelOpen, consoleVisible } = useChat();
  const showButton = !consoleVisible || panelOpen;

  useEffect(() => {
    if (!panelOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPanelOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [panelOpen, setPanelOpen]);

  return (
    <>
      <AnimatePresence>
        {panelOpen && (
          <motion.div
            role="dialog"
            aria-label="Chat with Justin's assistant"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            // More solid than the other glass: it floats over busy content and is read closely.
            style={{ background: "rgb(var(--surface) / 0.92)" }}
            className="glass fixed inset-x-3 bottom-24 top-20 z-[60] flex flex-col overflow-hidden rounded-[28px] sm:inset-x-auto sm:right-5 sm:top-auto sm:h-[min(600px,calc(100vh-8rem))] sm:w-[390px]"
          >
            <AssistantHeader onClose={() => setPanelOpen(false)} />
            <ChatThread inputId="chat-panel-input" autoFocus inPanel />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showButton && (
          <motion.button
            type="button"
            onClick={() => setPanelOpen(!panelOpen)}
            aria-label={panelOpen ? "Close chat" : "Chat with Justin's assistant"}
            aria-expanded={panelOpen}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="focus-ring fixed bottom-5 right-5 z-[60] grid h-14 w-14 place-items-center rounded-full bg-[#0066cc] text-white shadow-[0_16px_40px_-12px_rgb(0_102_204/0.7)] transition-transform hover:scale-105 active:scale-95"
          >
            {panelOpen ? <Close className="h-6 w-6" /> : <Chat className="h-6 w-6" />}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
