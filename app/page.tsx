"use client";

import { MotionConfig } from "framer-motion";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Stack from "@/components/Stack";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BuyMeCoffee from "@/components/BuyMeCoffee";

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="overflow-hidden">
        <Header />
        <Hero />
        <Experience />
        <Projects />
        <Stack />
        <Contact />
        <BuyMeCoffee />
        <Footer />
      </main>
    </MotionConfig>
  );
}
