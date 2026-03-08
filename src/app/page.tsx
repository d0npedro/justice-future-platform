import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { WhyMatters } from "@/components/sections/WhyMatters";
import { BetterPath } from "@/components/sections/BetterPath";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Principles } from "@/components/sections/Principles";
import { HonestFraming } from "@/components/sections/HonestFraming";
import { Closing } from "@/components/sections/Closing";
import { Footer } from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WhyMatters />
        <BetterPath />
        <HowItWorks />
        <Principles />
        <HonestFraming />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
