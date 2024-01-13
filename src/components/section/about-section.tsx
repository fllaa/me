"use client";

import React from "react";
import { InView } from "react-intersection-observer";
import { type Variants, motion } from "framer-motion";
import { useShallow } from "zustand/react/shallow";

import BubbleText from "@me/components/text/bubble-text";
import useSectionStore, { Section } from "@me/stores/section";

export interface AboutSectionProps {
  quote: string;
}

export default function AboutSection({ quote }: Readonly<AboutSectionProps>) {
  const { setSection } = useSectionStore(
    useShallow((state) => ({
      setSection: state.setSection,
    })),
  );
  return (
    <InView
      as="section"
      id="about"
      rootMargin="-256px"
      onChange={(inView) => inView && setSection(Section.About)}
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
        className="relative mx-auto flex h-screen snap-center items-center justify-center overflow-x-hidden overflow-y-clip p-4 text-center text-lg"
      >
        <div className="max-w-5xl">
          <BubbleText text={quote} />
        </div>
        <motion.div
          variants={halfCircleVariants1}
          className="absolute -left-8 top-32 aspect-[2] h-24 rotate-[252deg] rounded-t-full bg-primary shadow-2xl shadow-primary sm:h-32 xl:top-0 xl:h-60"
        />
        <motion.div
          variants={halfCircleVariants2}
          className="absolute right-0 top-32 aspect-[2] h-24 rotate-[168deg] rounded-t-full bg-primary shadow-2xl shadow-primary sm:h-32 xl:top-0 xl:h-60"
        />
        <motion.div
          variants={halfCircleVariants3}
          className="absolute bottom-0 left-0 aspect-[2] h-24 rotate-[348deg] rounded-t-full bg-primary shadow-2xl shadow-primary sm:h-32 xl:h-60"
        />
        <motion.div
          variants={halfCircleVariants4}
          className="absolute -right-8 bottom-0 aspect-[2] h-24 rotate-[60deg] rounded-t-full bg-primary shadow-2xl shadow-primary sm:h-32 xl:h-60"
        />
      </motion.div>
    </InView>
  );
}

const halfCircleVariants1: Variants = {
  initial: {
    x: -400,
    rotate: 180,
  },
  animate: {
    x: 0,
    rotate: 252,
  },
  exit: {
    x: -400,
    rotate: 180,
  },
};

const halfCircleVariants2: Variants = {
  initial: {
    x: 400,
    rotate: 180,
  },
  animate: {
    x: 0,
    rotate: 168,
  },
  exit: {
    x: 400,
    rotate: 180,
  },
};

const halfCircleVariants3: Variants = {
  initial: {
    x: -400,
    rotate: 0,
  },
  animate: {
    x: 0,
    rotate: -12,
  },
  exit: {
    x: -400,
    rotate: 0,
  },
};

const halfCircleVariants4: Variants = {
  initial: {
    x: 400,
    rotate: 0,
  },
  animate: {
    x: 0,
    rotate: 60,
  },
  exit: {
    x: 400,
    rotate: 0,
  },
};
