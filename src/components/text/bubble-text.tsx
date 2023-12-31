"use client";

import React from "react";
import { type Variants, motion } from "framer-motion";

import styles from "./bubble-text.module.css";

export enum AliasElements {
  h1 = "h1",
  h2 = "h2",
  h3 = "h3",
  h4 = "h4",
  h5 = "h5",
  h6 = "h6",
  p = "p",
}

export interface BubbleTextProps {
  text: string;
  as?: AliasElements;
}

export default function BubbleText({ text }: Readonly<BubbleTextProps>) {
  return (
    <motion.h2
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.03, type: "spring" }}
      className="text-center text-xl font-thin text-copy md:text-2xl dark:text-copy-dark"
    >
      {text.split("").map((child, idx) => (
        <motion.span
          variants={spanVariants}
          className={styles.hoverText}
          key={idx}
        >
          {child}
        </motion.span>
      ))}
    </motion.h2>
  );
}

const spanVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};
