"use client";

import React from "react";
import { InView } from "react-intersection-observer";
import { type Variants, motion } from "framer-motion";
import { SiGithub, SiWakatime } from "react-icons/si";
import { useShallow } from "zustand/react/shallow";

import useSectionStore, { Section } from "@me/stores/section";
import SquishyCard from "@me/components/card/squishy-card";

export interface StatsSectionProps {
  ghStatsData?: GithubStatsResponse | null;
  wakaAllTimeData?: WakatimeAllTimeResponse | null;
}

export default function StatsSection({
  ghStatsData,
  wakaAllTimeData,
}: Readonly<StatsSectionProps>) {
  const { setSection } = useSectionStore(
    useShallow((state) => ({
      setSection: state.setSection,
    })),
  );
  return (
    <InView
      as="section"
      id="stats"
      rootMargin="-256px"
      onChange={(inView) => inView && setSection(Section.Stats)}
    >
      <motion.div
        initial="initial"
        whileInView="animate"
        exit="exit"
        transition={{
          staggerChildren: 0.15,
          type: "spring",
          delayChildren: 0.5,
        }}
        viewport={{ margin: "-256px" }}
        className="relative mx-auto flex h-screen snap-center flex-col items-center justify-center gap-8 overflow-x-hidden overflow-y-clip p-4 text-center text-lg lg:flex-row"
      >
        {ghStatsData && (
          <motion.div variants={fromLeft}>
            <SquishyCard
              icon={SiGithub}
              title="Github Stats"
              value={
                ghStatsData.user.contributionsCollection
                  .totalCommitContributions
              }
              description="Total Commit Contributions"
              bg="A"
            />
          </motion.div>
        )}
        {wakaAllTimeData && (
          <motion.div variants={fromRight}>
            <SquishyCard
              icon={SiWakatime}
              title="Wakatime Stats"
              value={`${Math.round(parseFloat(wakaAllTimeData.data.decimal))}`}
              description={`Coding Hours since ${wakaAllTimeData.data.range.start_text}`}
              bg="C"
            />
          </motion.div>
        )}
      </motion.div>
    </InView>
  );
}

const fromLeft: Variants = {
  initial: {
    x: -1000,
  },
  animate: {
    x: 0,
  },
  exit: {
    x: -1000,
  },
};

const fromRight: Variants = {
  initial: {
    x: 1000,
  },
  animate: {
    x: 0,
  },
  exit: {
    x: 1000,
  },
};
