import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { Features } from "@/components/sections/Features";
import { Occasions } from "@/components/sections/Occasions";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pricing } from "@/components/sections/Pricing";
import { Partners } from "@/components/sections/Partners";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Work />
      <Features />
      <Occasions />
      <HowItWorks />
      <Pricing />
      <Partners />
      <div id="contact">
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
