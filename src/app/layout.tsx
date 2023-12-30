import "@me/styles/globals.css";

import { Inter, Poppins } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "@me/trpc/react";
import TopNavbar from "@me/components/navbar/top-navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-serif",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
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
        className={`dark:bg-background-dark dark:text-copy-dark bg-backgroundtext-copy font-sans transition-colors duration-300 ${inter.variable} ${poppins.variable}`}
      >
        <TRPCReactProvider cookies={cookies().toString()}>
          <TopNavbar />
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
