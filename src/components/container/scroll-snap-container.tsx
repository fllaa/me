import React, { type PropsWithChildren } from "react";

export default function ScrollSnapContainer({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <main
      id="container"
      className="absolute h-screen w-full snap-y snap-mandatory snap-always overflow-y-scroll"
    >
      {children}
    </main>
  );
}
