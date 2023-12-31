"use client";

import React from "react";
import { InView } from "react-intersection-observer";
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
      className="mx-auto flex h-screen max-w-5xl snap-center items-center justify-center p-4 text-center text-lg"
      rootMargin="-256px"
      onChange={(inView) => inView && setSection(Section.About)}
    >
      <BubbleText text={quote} />
    </InView>
  );
}
