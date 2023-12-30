"use client";

import React from "react";
import { motion } from "framer-motion";
import { useShallow } from "zustand/react/shallow";
import { BsFillCloudyFill, BsStarFill } from "react-icons/bs";

import useThemeStore from "@me/stores/theme";

export default function DarkModeToggle() {
  const [theme, toggleTheme] = useThemeStore(
    useShallow((state) => [state.theme, state.toggleTheme]),
  );
  return (
    <button
      onClick={toggleTheme}
      className={`relative flex w-16 rounded-full bg-gradient-to-b p-2 shadow-lg ${
        theme === "light"
          ? "justify-end from-secondary-light to-secondary-dark"
          : "justify-start from-primary-dark to-primary-light"
      }`}
    >
      <Thumb theme={theme} />
      {theme === "light" && <Clouds />}
      {theme === "dark" && <Stars />}
    </button>
  );
}

const Thumb = ({ theme }: { theme: "light" | "dark" }) => {
  return (
    <motion.div
      layout
      transition={{
        duration: 0.75,
        type: "spring",
      }}
      className="relative h-5 w-5 overflow-hidden rounded-full shadow-lg"
    >
      <div
        className={`absolute inset-0 ${
          theme === "dark"
            ? "bg-slate-100"
            : "animate-pulse rounded-full bg-gradient-to-tr from-amber-300 to-yellow-500"
        }`}
      />
      {theme === "light" && <SunCenter />}
      {theme === "dark" && <MoonSpots />}
    </motion.div>
  );
};

const SunCenter = () => (
  <div className="absolute inset-1.5 rounded-full bg-amber-300" />
);

const MoonSpots = () => (
  <>
    <motion.div
      initial={{ x: -4, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.15, duration: 0.35 }}
      className="absolute bottom-1 right-2.5 h-3 w-3 rounded-full bg-slate-300"
    />
    <motion.div
      initial={{ x: -4, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.35 }}
      className="absolute bottom-4 left-1 h-3 w-3 rounded-full bg-slate-300"
    />
    <motion.div
      initial={{ x: -4, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.25, duration: 0.35 }}
      className="absolute right-2 top-2 h-2 w-2 rounded-full bg-slate-300"
    />
  </>
);

const Stars = () => {
  return (
    <>
      <motion.span
        animate={{
          scale: [0.75, 1, 0.75],
          opacity: [0.75, 1, 0.75],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeIn",
        }}
        className="absolute right-6 top-1 text-[0.5rem] text-slate-300"
      >
        <BsStarFill />
      </motion.span>
      <motion.span
        animate={{
          scale: [1, 0.75, 1],
          opacity: [0.5, 0.25, 0.5],
        }}
        transition={{
          repeat: Infinity,
          duration: 3.5,
          ease: "easeIn",
        }}
        style={{ rotate: "-45deg" }}
        className="absolute right-2 top-2 text-xs text-slate-300"
      >
        <BsStarFill />
      </motion.span>
      <motion.span
        animate={{
          scale: [1, 0.5, 1],
          opacity: [1, 0.5, 1],
        }}
        style={{ rotate: "45deg" }}
        transition={{
          repeat: Infinity,
          duration: 2.5,
          ease: "easeIn",
        }}
        className="absolute right-6 top-4 text-sm text-slate-300"
      >
        <BsStarFill />
      </motion.span>
    </>
  );
};

const Clouds = () => {
  return (
    <>
      <motion.span
        animate={{ x: [-20, -15, -10, -5, 0], opacity: [0, 1, 0.75, 1, 0] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          delay: 0.25,
        }}
        className="absolute left-6 top-1 text-[0.5rem] text-white"
      >
        <BsFillCloudyFill />
      </motion.span>
      <motion.span
        animate={{ x: [-10, 0, 10, 20, 30], opacity: [0, 1, 0.75, 1, 0] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          delay: 0.5,
        }}
        className="text-ss absolute left-2 top-3 text-sm text-white"
      >
        <BsFillCloudyFill />
      </motion.span>
      <motion.span
        animate={{ x: [-7, 0, 7, 14, 21], opacity: [0, 1, 0.75, 1, 0] }}
        transition={{
          duration: 12.5,
          repeat: Infinity,
        }}
        className="absolute left-3 top-3 text-white"
      >
        <BsFillCloudyFill />
      </motion.span>
      <motion.span
        animate={{ x: [-15, 0, 15, 30, 45], opacity: [0, 1, 0.75, 1, 0] }}
        transition={{
          duration: 25,
          repeat: Infinity,
          delay: 0.75,
        }}
        className="absolute left-2 top-4 text-[0.5rem] text-white"
      >
        <BsFillCloudyFill />
      </motion.span>
    </>
  );
};
