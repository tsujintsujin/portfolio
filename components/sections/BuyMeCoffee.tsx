"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

function CoffeeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 8h13v6a5 5 0 01-5 5H9a5 5 0 01-5-5V8z" />
      <path d="M17 9h1.5a2.5 2.5 0 010 5H17" />
      <path d="M8 3c-.5 1 .5 1.5 0 3M12 3c-.5 1 .5 1.5 0 3" />
    </svg>
  );
}

export default function BuyMeCoffee() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const hasOpenedRef = useRef(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;

    const modalNode = modalRef.current;
    const focusableElements = modalNode
      ? Array.from(modalNode.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
      : [];
    focusableElements[0]?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeModal();
        return;
      }

      if (e.key === "Tab" && focusableElements.length > 0) {
        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      hasOpenedRef.current = true;
    } else if (hasOpenedRef.current) {
      triggerRef.current?.focus();
    }
  }, [isOpen]);

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
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="mb-4 font-body text-[0.8125rem] font-semibold uppercase tracking-[0.02em] text-faint">
            Support my work
          </p>
          <h3 className="inline-flex items-center gap-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
            <CoffeeIcon className="text-accent-deep" />
            Buy me a coffee
          </h3>
          <p className="mt-2 text-sm text-muted">
            Help fuel development with a coffee (₱60 PHP via GCash)
          </p>

          <motion.button
            ref={triggerRef}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onClick={() => setIsOpen(true)}
            className="focus-ring mt-6 inline-flex items-center gap-2 rounded-full bg-accent-deep px-6 py-3 text-sm font-semibold text-white transition-opacity duration-[180ms] ease-out hover:opacity-90"
          >
            <CoffeeIcon className="text-white" />
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 px-4"
            onClick={closeModal}
          >
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="coffee-modal-title"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="w-full max-w-sm rounded-3xl border border-line bg-surface p-8 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <p className="mb-4 font-body text-[0.8125rem] font-semibold uppercase tracking-[0.02em] text-faint">
                  GCash payment
                </p>
                <h3
                  id="coffee-modal-title"
                  className="inline-flex items-center gap-2 font-display text-2xl font-semibold text-ink"
                >
                  <CoffeeIcon className="text-accent-deep" />
                  Buy Me A Coffee
                </h3>

                <div className="my-8 rounded-2xl border border-line bg-bg p-6">
                  <p className="mb-3 text-sm text-faint">Amount:</p>
                  <p className="font-mono text-3xl font-bold text-accent-deep">
                    ₱60 PHP
                  </p>
                </div>

                <div className="my-8 rounded-2xl border border-accent-deep/30 bg-accent-soft p-6">
                  <p className="mb-2 text-xs text-faint">GCash Number:</p>
                  <p className="font-mono text-lg font-bold text-ink">
                    09760994238
                  </p>
                  <button
                    onClick={handleCopy}
                    className="focus-ring mt-3 w-full cursor-pointer rounded-xl bg-accent-deep px-4 py-2 text-sm font-semibold text-white transition-opacity duration-[180ms] ease-out hover:opacity-90"
                  >
                    Copy Number
                  </button>
                </div>

                <p className="mb-6 text-sm text-muted">
                  Thanks for keeping this project running.
                </p>

                <button
                  onClick={closeModal}
                  className="focus-ring w-full cursor-pointer rounded-xl border border-line px-4 py-2.5 text-sm font-medium text-ink transition-colors duration-[180ms] ease-out hover:bg-bg"
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
