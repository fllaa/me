"use client";

import React, { type ReactNode } from "react";
import { InView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { useShallow } from "zustand/react/shallow";
import { FiArrowDownCircle } from "react-icons/fi";

import useSectionStore, { Section } from "@me/stores/section";

export default function HeroSection() {
  const { setSection } = useSectionStore(
    useShallow((state) => ({ setSection: state.setSection })),
  );
  return (
    <InView
      as="section"
      id="hero"
      className="relative h-screen snap-center overflow-hidden"
      rootMargin="-256px"
      onChange={(inView) => inView && setSection(Section.Hero)}
    >
      <Copy />
      <WatermarkWrapper />
    </InView>
  );
}

const Copy = () => {
  const scrollIntoAbout = () => {
    const el: HTMLElement = document.querySelector("#about")!;
    el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 z-[999999]">
      <div className="mx-auto flex max-w-7xl items-end justify-between p-4 md:p-8">
        <div>
          <h1 className="mb-6 max-w-4xl text-6xl font-extrabold leading-[1.1] text-copy md:text-8xl dark:text-copy-dark/60">
            Crafting{" "}
            <span className="text-primary dark:text-foreground">
              Elegant Code
            </span>{" "}
            with Passion
          </h1>
          <p className="max-w-xl text-copy md:text-lg dark:text-copy-dark/60">
            Hi 👋, My name is Fallah Andy Prakasa. I'm a Software Engineer who
            loves to build things with code.
          </p>
        </div>
        <button onClick={scrollIntoAbout}>
          <FiArrowDownCircle className="hidden text-8xl text-secondary md:block dark:text-secondary-content" />
        </button>
      </div>
    </div>
  );
};

const WatermarkWrapper = () => {
  return (
    <>
      <Watermark text="Crafting code clarity first" />
      <Watermark text="Building beauty one byte at a time" reverse />
      <Watermark text="Simplifying complexity my code's mantra" />
      <Watermark text="Every line matters Craft with care" reverse />
      <Watermark text="Readability matters Write clean" />
      <Watermark text="Clean code clear mind" reverse />
      <Watermark text="Code is poetry I'm a writer" />
      <Watermark text="Elegant code efficient solutions" reverse />
    </>
  );
};

const Watermark = ({ reverse, text }: { reverse?: boolean; text: string }) => (
  <div className="flex -translate-y-12 select-none overflow-hidden">
    <TranslateWrapper reverse={reverse}>
      <span className="w-fit whitespace-nowrap text-[20vmax] font-black uppercase leading-[0.75] text-copy-dark-light transition-colors duration-300 dark:text-copy">
        {text}
      </span>
    </TranslateWrapper>
    <TranslateWrapper reverse={reverse}>
      <span className="ml-48 w-fit whitespace-nowrap text-[20vmax] font-black uppercase leading-[0.75] text-copy-dark-light transition-colors duration-300 dark:text-copy">
        {text}
      </span>
    </TranslateWrapper>
  </div>
);

const TranslateWrapper = ({
  children,
  reverse,
}: {
  children: ReactNode;
  reverse?: boolean;
}) => {
  return (
    <motion.div
      initial={{ translateX: reverse ? "-100%" : "0%" }}
      animate={{ translateX: reverse ? "0%" : "-100%" }}
      transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
      className="flex"
    >
      {children}
    </motion.div>
  );
};
