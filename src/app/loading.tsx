import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-20 flex h-screen w-screen flex-col items-center justify-center gap-4 bg-background transition-colors duration-300 dark:bg-background-dark">
      <div className="shuriken-loader" />
      <div className="text-loader" />
    </div>
  );
}
