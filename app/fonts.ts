import { Geist, Geist_Mono } from "next/font/google";

// One family for everything; the mono cut is only for figures in the data visuals.
export const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
