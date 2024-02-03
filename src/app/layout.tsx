import "@me/styles/globals.css";

import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "@me/trpc/react";
import TopNavbar from "@me/components/navbar/top-navbar";
import MouseImageTrail from "@me/components/misc/mouse-image-trail";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-serif",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "flla.",
  description: "flla.",
  icons: [{ rel: "icon", url: "/logo.svg" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`overflow-x-hidden bg-background font-sans text-copy transition-colors duration-300 dark:bg-background-dark dark:text-copy-dark ${inter.variable} ${plusJakartaSans.variable}`}
      >
        <TRPCReactProvider cookies={cookies().toString()}>
          <TopNavbar />
          <MouseImageTrail>{children}</MouseImageTrail>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
