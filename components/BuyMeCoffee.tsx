"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

export default function BuyMeCoffee() {
  const [isOpen, setIsOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("09760994238");
    toast.success("GCash number copied to clipboard!", {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  return (
    <section className="relative border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="mb-4 font-mono text-[11px] tracking-[0.18em] text-faint">
            SUPPORT MY WORK
          </p>
          <h3 className="font-display text-2xl font-medium text-ink sm:text-3xl">
            Buy me a coffee ☕
          </h3>
          <p className="mt-2 text-sm text-muted">
            Help fuel development with a coffee (₱60 PHP via GCash)
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-deep"
          >
            <span>☕</span>
            Support with GCash
          </motion.button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="rounded-3xl border border-line bg-surface p-8 shadow-xl max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <p className="mb-4 font-mono text-[11px] tracking-[0.18em] text-faint">
                  GCASH PAYMENT
                </p>
                <h3 className="text-2xl font-display font-medium text-ink">
                  ☕ Buy Me A Coffee
                </h3>

                <div className="my-8 p-6 bg-bg rounded-2xl border border-line">
                  <p className="text-sm text-faint mb-3">Amount:</p>
                  <p className="text-3xl font-mono font-bold text-accent">
                    ₱60 PHP
                  </p>
                </div>

                <div className="my-8 p-6 bg-accent-soft rounded-2xl border border-accent/30">
                  <p className="text-xs text-faint mb-2">GCash Number:</p>
                  <p className="font-mono text-lg font-bold text-ink">
                    09760994238
                  </p>
                  <button
                    onClick={handleCopy}
                    className="mt-3 w-full rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-deep"
                  >
                    Copy Number
                  </button>
                </div>

                <p className="text-sm text-muted mb-6">
                  Send ₱60 via GCash to support this work
                </p>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full rounded-xl border border-line px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-bg"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
