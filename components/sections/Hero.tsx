"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import AssistantHeader from "@/components/assistant/AssistantHeader";
import ChatThread from "@/components/assistant/ChatThread";
import { useChat } from "@/components/assistant/ChatProvider";
import { Download, GitHub, LinkedIn, Mail } from "@/components/ui/icons";
import { profile } from "@/lib/content";

// The entrance runs in CSS (.rise in globals.css), so the hero shows before JavaScript loads.

export default function Hero() {
  const { setConsoleVisible } = useChat();
  const consoleRef = useRef<HTMLDivElement>(null);

  // The floating chat button only appears once this console has scrolled away.
  useEffect(() => {
    const el = consoleRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setConsoleVisible(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, [setConsoleVisible]);

  return (
    <section id="top" aria-labelledby="hero-name" className="pb-16 pt-14 sm:pt-20 lg:pb-28 lg:pt-24">
      <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
        <div>
          <div className="rise flex items-center gap-3">
            <Image
              src="/justin-avatar.webp"
              alt="Justin Masiga"
              width={120}
              height={120}
              priority
              className="h-14 w-14 rounded-full object-cover ring-1 ring-line/15"
            />
            <p className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px]">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-positive opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-positive" />
              </span>
              Available now for full-time and contract work
            </p>
          </div>

          <h1
            id="hero-name"
            style={{ animationDelay: "80ms" }}
            className="rise mt-8 text-[clamp(3.25rem,2.2rem+5vw,6.75rem)] font-semibold leading-[0.92] tracking-[-0.05em]"
          >
            {profile.name}
          </h1>
          <p
            style={{ animationDelay: "160ms" }}
            className="rise mt-5 text-[clamp(1.25rem,1rem+1vw,1.75rem)] font-medium tracking-[-0.02em] text-muted"
          >
            {profile.role}
          </p>
          <p style={{ animationDelay: "240ms" }} className="rise mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {profile.lede}
          </p>

          <div style={{ animationDelay: "320ms" }} className="rise mt-9 flex flex-wrap items-center gap-3">
            <a
              href={profile.cv}
              download
              className="focus-ring inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[15px] font-medium text-canvas transition-opacity hover:opacity-85"
            >
              <Download className="h-4 w-4" />
              Download CV
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="focus-ring glass inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-medium transition-colors hover:border-accent/50"
            >
              <Mail className="h-4 w-4" />
              Email me
            </a>
            <span className="ml-1 flex items-center gap-1">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener"
                aria-label="LinkedIn"
                className="focus-ring grid h-11 w-11 place-items-center rounded-full text-muted transition-colors hover:text-ink"
              >
                <LinkedIn className="h-[18px] w-[18px]" />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener"
                aria-label="GitHub"
                className="focus-ring grid h-11 w-11 place-items-center rounded-full text-muted transition-colors hover:text-ink"
              >
                <GitHub className="h-[18px] w-[18px]" />
              </a>
            </span>
          </div>
          <p style={{ animationDelay: "400ms" }} className="rise mt-6 text-sm text-muted">
            Remote from the Philippines (GMT+8). Open to relocating.
          </p>
        </div>

        {/* The assistant, live: the one thing on this page that shows the AI work instead of describing it */}
        <div style={{ animationDelay: "240ms" }} id="assistant" className="rise scroll-mt-28">
          <div ref={consoleRef} className="glass flex h-[520px] flex-col overflow-hidden rounded-[32px]">
            <AssistantHeader />
            <ChatThread inputId="chat-hero-input" />
          </div>
          <p className="mt-4 px-2 text-sm leading-relaxed text-muted">{profile.assistantIntro}</p>
        </div>
      </div>
    </section>
  );
}
