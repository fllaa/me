import React from "react";

import AboutSection from "@me/components/section/about-section";
import HeroSection from "@me/components/section/hero-section";
import ScrollSnapContainer from "@me/components/container/scroll-snap-container";
import { getRandomQuote } from "@me/utils/string";

export default function HomePage() {
  const quote = getRandomQuote();
  return (
    <ScrollSnapContainer>
      <HeroSection />
      <AboutSection quote={quote} />
      <div className="h-screen" />
    </ScrollSnapContainer>
  );
}
