"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      toast.success("Message sent! I'll reply within one business day.", {
        position: "bottom-right",
        autoClose: 5000,
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error(
        "Something went wrong. Please email me directly at justin.masiga.94@gmail.com",
        {
          position: "bottom-right",
          autoClose: 5000,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-12 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-faint">
              <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
              contact.info
            </div>
            <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
              Let's talk about your project.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
              Shift-ready, reliable, and comfortable working across timezones.
              I read every message myself.
            </p>

            <div className="mt-8 space-y-3">
              <a
                href="mailto:justin.masiga.94@gmail.com"
                className="flex cursor-pointer items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3.5 text-sm text-ink transition-colors hover:border-accent/40 hover:bg-accent-soft"
              >
                <span className="font-mono text-[11px] text-faint">EMAIL</span>
                justin.masiga.94@gmail.com
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-line bg-surface"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
              <span className="font-mono text-[11px] text-faint">
                contact.form
              </span>
              <span className="font-mono text-[10px] tracking-[0.1em] text-muted">
                1 MIN
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 px-5 py-6">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-xs font-medium text-muted"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-line bg-bg px-3.5 py-2.5 text-sm text-ink placeholder:text-faint transition-colors focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-xs font-medium text-muted"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-line bg-bg px-3.5 py-2.5 text-sm text-ink placeholder:text-faint transition-colors focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-xs font-medium text-muted"
                >
                  What do you need built?
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about the project: a dashboard, a site, a workflow to automate."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full resize-none rounded-xl border border-line bg-bg px-3.5 py-2.5 text-sm text-ink placeholder:text-faint transition-colors focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-deep disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending…" : "Send message"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
