"use client";

import React, { type MouseEventHandler, type ReactNode, useRef } from "react";
import { InView } from "react-intersection-observer";
import { useAnimate, motion } from "framer-motion";
import { useShallow } from "zustand/react/shallow";

import {
  FaAws,
  FaDigitalOcean,
  FaGolang,
  FaNodeJs,
  FaPython,
  FaSquareGithub,
  FaSquareGitlab,
  FaUbuntu,
} from "react-icons/fa6";
import { FiArrowDownCircle, FiFramer } from "react-icons/fi";
import {
  SiBun,
  SiElasticsearch,
  SiExpress,
  SiGit,
  SiGooglecloud,
  SiGraphql,
  SiHeroku,
  SiJavascript,
  SiJenkins,
  SiKubernetes,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiPostgresql,
  SiPrisma,
  SiRailway,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
  SiVisualstudiocode,
} from "react-icons/si";
import type { IconType } from "react-icons";

import useSectionStore, { Section } from "@me/stores/section";

export default function HeroSection() {
  const { setSection } = useSectionStore(
    useShallow((state) => ({ setSection: state.setSection })),
  );
  return (
    <MouseImageTrail
      renderImageBuffer={50}
      rotationRange={25}
      icons={[
        FaAws,
        FaDigitalOcean,
        FaGolang,
        FaNodeJs,
        FaPython,
        FaSquareGithub,
        FaSquareGitlab,
        FaUbuntu,
        FiFramer,
        SiBun,
        SiElasticsearch,
        SiExpress,
        SiGit,
        SiGooglecloud,
        SiGraphql,
        SiHeroku,
        SiJavascript,
        SiJenkins,
        SiKubernetes,
        SiMongodb,
        SiMysql,
        SiNestjs,
        SiNextdotjs,
        SiPostgresql,
        SiPrisma,
        SiRailway,
        SiReact,
        SiRedis,
        SiTailwindcss,
        SiTypescript,
        SiVisualstudiocode,
      ]}
    >
      <InView
        as="section"
        id="hero"
        className="h-screen bg-background dark:bg-background-dark"
        rootMargin="-256px"
        onChange={(inView) => inView && setSection(Section.Hero)}
      >
        <Copy />
        <WatermarkWrapper />
      </InView>
    </MouseImageTrail>
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
      <span className="w-fit whitespace-nowrap text-[20vmax] font-black uppercase leading-[0.75] text-copy-dark-light dark:text-copy">
        {text}
      </span>
    </TranslateWrapper>
    <TranslateWrapper reverse={reverse}>
      <span className="ml-48 w-fit whitespace-nowrap text-[20vmax] font-black uppercase leading-[0.75] text-copy-dark-light dark:text-copy">
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

const MouseImageTrail = ({
  children,
  // List of icons
  icons,
  // Will render a new image every X pixels between mouse moves
  renderImageBuffer,
  // images will be rotated at a random number between zero and rotationRange,
  // alternating between a positive and negative rotation
  rotationRange,
}: {
  children: ReactNode;
  icons: IconType[];
  renderImageBuffer: number;
  rotationRange: number;
}) => {
  const [scope, animate] = useAnimate();

  const lastRenderPosition = useRef({ x: 0, y: 0 });
  const imageRenderCount = useRef(0);

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    const { clientX, clientY } = e;

    const distance = calculateDistance(
      clientX,
      clientY,
      lastRenderPosition.current.x,
      lastRenderPosition.current.y,
    );

    if (distance >= renderImageBuffer) {
      lastRenderPosition.current.x = clientX;
      lastRenderPosition.current.y = clientY;

      renderNextImage();
    }
  };

  const calculateDistance = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
  ) => {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;

    // Using the Pythagorean theorem to calculate the distance
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    return distance;
  };

  const renderNextImage = () => {
    const imageIndex = imageRenderCount.current % icons.length;
    const selector = `[data-mouse-move-index="${imageIndex}"]`;

    const el: HTMLElement = document.querySelector(selector)!;

    el.style.top = `${lastRenderPosition.current.y}px`;
    el.style.left = `${lastRenderPosition.current.x}px`;
    el.style.zIndex = imageRenderCount.current.toString();

    const rotation = Math.random() * rotationRange;

    void animate(
      selector,
      {
        opacity: [0, 0.6],
        transform: [
          `translate(-50%, -25%) scale(0.5) ${
            imageIndex % 2
              ? `rotate(${rotation}deg)`
              : `rotate(-${rotation}deg)`
          }`,
          `translate(-50%, -50%) scale(1) ${
            imageIndex % 2
              ? `rotate(-${rotation}deg)`
              : `rotate(${rotation}deg)`
          }`,
        ],
      },
      { type: "spring", damping: 15, stiffness: 200 },
    );

    void animate(
      selector,
      {
        opacity: [0.6, 0],
      },
      { ease: "linear", duration: 0.5, delay: 1 },
    );

    imageRenderCount.current = imageRenderCount.current + 1;
  };

  return (
    <div
      ref={scope}
      className="relative snap-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {children}

      {icons.map((Icon, index) => (
        <div
          key={Icon.name}
          className="pointer-events-none absolute left-0 top-0 opacity-0"
          data-mouse-move-index={index}
        >
          <Icon size={30} />
        </div>
      ))}
    </div>
  );
};
