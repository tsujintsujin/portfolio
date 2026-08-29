"use client";

import { MotionConfig } from "framer-motion";
import Header from "@/components/layout/Header";
import SideNav from "@/components/layout/SideNav";
import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Stack from "@/components/sections/Stack";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import BuyMeCoffee from "@/components/sections/BuyMeCoffee";

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="overflow-hidden">
        <Header />
        <SideNav />
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
