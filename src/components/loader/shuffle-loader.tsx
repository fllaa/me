"use client";

import React, { useEffect, useState } from "react";
import {
  type AnimationProps,
  type DynamicAnimationOptions,
  motion,
  useAnimate,
} from "framer-motion";

const NUM_BLOCKS = 5;
const BLOCK_SIZE = 32;

const DURATION_IN_MS = 175;
const DURATION_IN_SECS = DURATION_IN_MS * 0.001;

const TRANSITION: DynamicAnimationOptions = {
  ease: "easeInOut",
  duration: DURATION_IN_SECS,
};

export default function ShuffleLoader() {
  const [blocks, setBlocks] = useState(
    Array.from(Array(NUM_BLOCKS).keys()).map((n) => ({ id: n })),
  );
  const [scope, animate] = useAnimate();

  useEffect(() => {
    void shuffle();
  }, []);

  const shuffle = async () => {
    while (true) {
      const [first, second] = pickTwoRandom();

      void animate(
        `[data-block-id="${first!.id}"]`,
        { y: -BLOCK_SIZE },
        TRANSITION,
      );

      void animate(
        `[data-block-id="${second!.id}"]`,
        { y: BLOCK_SIZE },
        TRANSITION,
      );

      void delay(DURATION_IN_MS);

      setBlocks((pv) => {
        const copy = [...pv];

        const indexForFirst = copy.indexOf(first!);
        const indexForSecond = copy.indexOf(second!);

        copy[indexForFirst] = second!;
        copy[indexForSecond] = first!;

        return copy;
      });

      void delay(DURATION_IN_MS * 2);

      void animate(`[data-block-id="${first!.id}"]`, { y: 0 }, TRANSITION);

      void animate(`[data-block-id="${second!.id}"]`, { y: 0 }, TRANSITION);

      void delay(DURATION_IN_MS);
    }
  };

  const pickTwoRandom = () => {
    const index1 = Math.floor(Math.random() * blocks.length);
    let index2 = Math.floor(Math.random() * blocks.length);

    while (index2 === index1) {
      index2 = Math.floor(Math.random() * blocks.length);
    }

    return [blocks[index1], blocks[index2]];
  };

  const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  return (
    <div ref={scope} className="flex divide-x divide-neutral-950">
      {blocks.map((b) => {
        return (
          <motion.div
            layout
            data-block-id={b.id}
            key={b.id}
            transition={TRANSITION as AnimationProps["transition"]}
            style={{
              width: BLOCK_SIZE,
              height: BLOCK_SIZE,
            }}
            className="bg-white"
          />
        );
      })}
    </div>
  );
}
