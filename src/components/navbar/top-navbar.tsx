"use client";

import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import dynamic from "next/dynamic";
import { type AnimationScope, useAnimate, motion } from "framer-motion";
import { FiMenu, FiArrowUpRight } from "react-icons/fi";

const DarkModeToggle = dynamic(
  () => import("@me/components/toggle/dark-mode-toggle"),
  { ssr: false },
);

export default function TopNavbar() {
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [scope, animate] = useAnimate<HTMLDivElement>();
  const navRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = ({ offsetX, offsetY, target }: MouseEvent) => {
    // @ts-expect-error - target can be null
    const isNavElement = [...target!.classList].includes("glass-nav");

    if (isNavElement) {
      setHovered(true);

      const top = offsetY + "px";
      const left = offsetX + "px";

      void animate(scope.current, { top, left }, { duration: 0 });
    } else {
      setHovered(false);
    }
  };

  useEffect(() => {
    navRef.current?.addEventListener("mousemove", handleMouseMove);

    return () =>
      navRef.current?.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <nav
      ref={navRef}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: hovered ? "none" : "auto",
      }}
      className="glass-nav fixed left-0 right-0 top-0 z-10 mx-auto max-w-6xl overflow-hidden border-[1px] border-black/10 bg-gradient-to-br from-white/5 via-white/5 to-black/5 backdrop-blur md:left-6 md:right-6 md:top-6 md:rounded-2xl dark:border-white/10 dark:from-white/20 dark:to-white/5"
    >
      <div className="glass-nav flex items-center justify-between px-5 py-5">
        <Cursor hovered={hovered} scope={scope} />

        <Links />

        <Logo />

        <Buttons setMenuOpen={setMenuOpen} />
      </div>

      <MobileMenu menuOpen={menuOpen} />
    </nav>
  );
}

const Cursor = ({
  hovered,
  scope,
}: {
  hovered: boolean;
  scope: AnimationScope<HTMLSpanElement>;
}) => {
  return (
    <motion.span
      initial={false}
      animate={{
        opacity: hovered ? 1 : 0,
        transform: `scale(${
          hovered ? 1 : 0
        }) translateX(-50%) translateY(-50%)`,
      }}
      transition={{ duration: 0.15 }}
      ref={scope}
      className="pointer-events-none absolute z-0 grid h-[50px] w-[50px] origin-[0px_0px] place-content-center rounded-full bg-gradient-to-br from-primary-dark from-40% to-primary-light text-2xl"
    >
      <FiArrowUpRight className="text-white" />
    </motion.span>
  );
};

const Logo = () => (
  <span className="dark:text-copy-dark pointer-events-none relative left-0 top-[50%] z-10 text-4xl font-black text-copy mix-blend-overlay md:absolute md:left-[50%] md:-translate-x-[50%] md:-translate-y-[50%]">
    flla.
  </span>
);

const Links = () => (
  <div className="hidden items-center gap-2 md:flex">
    <GlassLink text="About" />
    <GlassLink text="Experiences" />
    <GlassLink text="Projects" />
  </div>
);

const GlassLink = ({ text }: { text: string }) => {
  return (
    <button className="group relative scale-100 overflow-hidden rounded-lg px-4 py-2 transition-transform hover:scale-105 active:scale-95">
      <span className="dark:text-copy-dark/90 relative z-10 text-copy/90 transition-colors group-hover:text-black dark:group-hover:text-white">
        {text}
      </span>
      <span className="absolute inset-0 z-0 bg-gradient-to-br from-white/5 via-white/5 to-black/5 opacity-0 transition-opacity group-hover:opacity-100 dark:from-white/20 dark:to-white/5" />
    </button>
  );
};

const TextLink = ({ text }: { text: string }) => {
  return (
    <button className="text-black/90 transition-colors hover:text-black dark:text-white/90 dark:hover:text-white">
      {text}
    </button>
  );
};

const Buttons = ({
  setMenuOpen,
}: {
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}) => (
  <div className="flex items-center gap-4">
    <div className="hidden md:block">
      <DarkModeToggle />
    </div>

    <button
      onClick={() => setMenuOpen((pv) => !pv)}
      className="ml-2 block scale-100 text-3xl text-black/90 transition-all hover:scale-105 hover:text-black active:scale-95 md:hidden dark:text-white/90 dark:hover:text-white"
    >
      <FiMenu />
    </button>
  </div>
);

const MobileMenu = ({ menuOpen }: { menuOpen: boolean }) => {
  return (
    <motion.div
      initial={false}
      animate={{
        height: menuOpen ? "fit-content" : "0px",
      }}
      className="block overflow-hidden md:hidden"
    >
      <div className="flex items-center justify-between px-4 pb-4">
        <div className="flex items-center gap-4">
          <TextLink text="About" />
          <TextLink text="Experiences" />
          <TextLink text="Projects" />
        </div>
        <DarkModeToggle />
      </div>
    </motion.div>
  );
};