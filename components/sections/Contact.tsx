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
    <section id="contact" className="relative overflow-hidden border-t border-line">
      <div className="texture-dots-faint pointer-events-none absolute inset-0"></div>
      <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-12 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 font-body text-[0.8125rem] font-semibold uppercase tracking-[0.02em] text-faint">
              <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
              Contact
            </div>
            <h2 className="mt-4 font-display text-[clamp(2rem,1.6rem+1.8vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.01em] text-ink">
              Let&apos;s talk about your project.
            </h2>
            <p className="mt-3 max-w-md text-[0.9375rem] leading-[1.65] text-muted">
              Shift-ready, reliable, and comfortable working across timezones.
              I read every message myself.
            </p>

            <div className="mt-8 space-y-3">
              <a
                href="mailto:justin.masiga.94@gmail.com"
                className="focus-ring flex cursor-pointer items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3.5 text-sm text-ink transition-colors duration-[180ms] ease-out hover:border-accent-deep/40 hover:bg-accent-soft"
              >
                <span className="font-mono text-xs tracking-[0.04em] text-faint">
                  EMAIL
                </span>
                justin.masiga.94@gmail.com
              </a>
            </div>

            <dl className="mt-8 flex gap-8 border-t border-line pt-6">
              <div>
                <dd className="font-mono text-lg font-bold text-ink">GMT+8</dd>
                <dt className="mt-1 text-[11px] leading-tight text-faint">
                  Based / timezone
                </dt>
              </div>
            </dl>

            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/justin-m-992772236/"
                target="_blank"
                rel="noopener"
                aria-label="LinkedIn"
                className="focus-ring cursor-pointer rounded-full text-muted transition-colors duration-[180ms] ease-out hover:text-accent-deep"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.75h4V23h-4V8.75zM8.5 8.75h3.83v1.95h.05c.53-1 1.84-2.05 3.78-2.05 4.04 0 4.79 2.66 4.79 6.12V23h-4v-6.36c0-1.52-.03-3.47-2.12-3.47-2.12 0-2.45 1.66-2.45 3.36V23h-4V8.75z" />
                </svg>
              </a>
              <a
                href="https://github.com/tsujintsujin"
                target="_blank"
                rel="noopener"
                aria-label="GitHub"
                className="focus-ring cursor-pointer rounded-full text-muted transition-colors duration-[180ms] ease-out hover:text-accent-deep"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.14c-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 015.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.08.78 2.18v3.23c0 .3.21.66.79.55A10.51 10.51 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
                </svg>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-line bg-surface"
          >
            <div className="border-b border-line px-5 py-4">
              <h3 className="font-body text-[1.25rem] font-bold text-ink">
                Drop me a line
              </h3>
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
                    className="focus-ring w-full rounded-xl border border-line bg-bg px-3.5 py-2.5 text-sm text-ink placeholder:text-faint transition-colors duration-[180ms] ease-out focus:border-accent-deep/60"
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
                    className="focus-ring w-full rounded-xl border border-line bg-bg px-3.5 py-2.5 text-sm text-ink placeholder:text-faint transition-colors duration-[180ms] ease-out focus:border-accent-deep/60"
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
                  className="focus-ring w-full resize-none rounded-xl border border-line bg-bg px-3.5 py-2.5 text-sm text-ink placeholder:text-faint transition-colors duration-[180ms] ease-out focus:border-accent-deep/60"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="focus-ring w-full cursor-pointer rounded-xl bg-accent-deep px-6 py-3 text-sm font-semibold text-white transition-opacity duration-[180ms] ease-out hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <span className="inline-flex items-center justify-center gap-2">
                    <svg
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <circle cx="12" cy="12" r="9" opacity="0.25" />
                      <path d="M21 12a9 9 0 00-9-9" />
                    </svg>
                    Sending…
                  </span>
                ) : (
                  "Send message"
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
