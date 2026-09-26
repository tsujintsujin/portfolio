"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useChat } from "@/components/assistant/ChatProvider";
import { Chat, Download, GitHub, LinkedIn, Mail } from "@/components/ui/icons";
import { contactLede, profile } from "@/lib/content";

type Status = { kind: "idle" | "sending" | "sent" | "error"; text?: string };

const field =
  "focus-ring w-full rounded-2xl border border-line/10 bg-canvas/40 px-4 py-3 text-[15px] text-ink placeholder:text-muted transition-colors focus:border-accent/60";

export default function Contact() {
  const { setPanelOpen } = useChat();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setForm({ name: "", email: "", message: "" });
      setStatus({ kind: "sent", text: "Sent. You'll hear back within one business day." });
    } catch {
      setStatus({ kind: "error", text: `That didn't send. Email ${profile.email} directly and it'll reach the same inbox.` });
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <h2 id="contact-title" className="text-[clamp(2.25rem,1.6rem+2.4vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
            Hiring, or have something to build?
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">{contactLede}</p>

          <ul className="mt-9 space-y-2">
            <li>
              <a href={`mailto:${profile.email}`} className="focus-ring group inline-flex items-center gap-3 rounded-full py-1.5 text-[17px]">
                <Mail className="h-5 w-5 text-muted" />
                <span className="group-hover:text-accent-text">{profile.email}</span>
              </a>
            </li>
            <li>
              <button type="button" onClick={() => setPanelOpen(true)} className="focus-ring group inline-flex items-center gap-3 rounded-full py-1.5 text-[17px]">
                <Chat className="h-5 w-5 text-muted" />
                <span className="group-hover:text-accent-text">Leave it with the assistant</span>
              </button>
            </li>
            <li>
              <a href={profile.cv} download className="focus-ring group inline-flex items-center gap-3 rounded-full py-1.5 text-[17px]">
                <Download className="h-5 w-5 text-muted" />
                <span className="group-hover:text-accent-text">Download my CV (PDF)</span>
              </a>
            </li>
          </ul>

          <div className="mt-8 flex gap-1">
            <a href={profile.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn" className="focus-ring glass grid h-11 w-11 place-items-center rounded-full text-muted hover:text-ink">
              <LinkedIn className="h-[18px] w-[18px]" />
            </a>
            <a href={profile.github} target="_blank" rel="noopener" aria-label="GitHub" className="focus-ring glass grid h-11 w-11 place-items-center rounded-full text-muted hover:text-ink">
              <GitHub className="h-[18px] w-[18px]" />
            </a>
          </div>
        </div>

        <form onSubmit={onSubmit} className="glass space-y-5 rounded-[32px] p-6 sm:p-9" noValidate={false}>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                Name
              </label>
              <input id="name" name="name" required autoComplete="name" value={form.name} onChange={onChange} className={field} />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Email
              </label>
              <input id="email" name="email" type="email" required autoComplete="email" value={form.email} onChange={onChange} className={field} />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium">
              What do you need?
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              value={form.message}
              onChange={onChange}
              placeholder="A role you're hiring for, a dashboard, a site, a workflow to automate"
              className={`${field} resize-none`}
            />
          </div>
          <button
            type="submit"
            disabled={status.kind === "sending"}
            className="focus-ring w-full rounded-full bg-ink px-6 py-3.5 text-[15px] font-medium text-canvas transition-opacity hover:opacity-85 disabled:opacity-50"
          >
            {status.kind === "sending" ? "Sending..." : "Send message"}
          </button>
          <p role="status" className={`min-h-[1.5rem] text-sm ${status.kind === "error" ? "text-negative" : "text-muted"}`}>
            {status.text}
          </p>
        </form>
      </div>
    </section>
  );
}
