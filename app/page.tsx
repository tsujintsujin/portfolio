import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import Data from "@/components/sections/Data";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import { ChatProvider } from "@/components/assistant/ChatProvider";
import ChatFab from "@/components/assistant/ChatFab";

export default function Home() {
  return (
    <ChatProvider>
      <Header />
      <main>
        <Hero />
        <Work />
        <Data />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <ChatFab />
    </ChatProvider>
  );
}
