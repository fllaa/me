"use client";

import React, { useRef } from "react";
import { useAnimate } from "framer-motion";
import type { MouseEventHandler, PropsWithChildren } from "react";

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
import { FiFramer } from "react-icons/fi";
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

const RENDER_IMAGE_BUFFER = 50;
const ROTATION_RANGE = 25;

const Icons = [
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
];

export default function MouseImageTrail({ children }: PropsWithChildren) {
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

    if (distance >= RENDER_IMAGE_BUFFER) {
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
    const imageIndex = imageRenderCount.current % Icons.length;
    const selector = `[data-mouse-move-index="${imageIndex}"]`;

    const el: HTMLElement = document.querySelector(selector)!;

    el.style.top = `${lastRenderPosition.current.y}px`;
    el.style.left = `${lastRenderPosition.current.x}px`;
    el.style.zIndex = imageRenderCount.current.toString();

    const rotation = Math.random() * ROTATION_RANGE;

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
    <div ref={scope} className="relative" onMouseMove={handleMouseMove}>
      {children}

      {Icons.map((Icon, index) => (
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
}
