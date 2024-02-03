import React from "react";

import AboutSection from "@me/components/section/about-section";
import HeroSection from "@me/components/section/hero-section";
import ScrollSnapContainer from "@me/components/container/scroll-snap-container";
import StatsSection from "@me/components/section/stats-section";
import { getRandomQuote } from "@me/utils/string";
import { api } from "@me/trpc/server";

export default async function HomePage() {
  const quote = getRandomQuote();

  const githubStats = await api.github.getStats.query();
  const wakatimeAllTime = await api.wakatime.getAllTime.query();
  return (
    <ScrollSnapContainer>
      <HeroSection />
      <AboutSection quote={quote} />
      <StatsSection
        ghStatsData={githubStats}
        wakaAllTimeData={wakatimeAllTime}
      />
    </ScrollSnapContainer>
  );
}
