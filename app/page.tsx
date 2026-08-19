"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { toast } from "react-toastify";
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
  );
}
