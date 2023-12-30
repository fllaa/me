"use client";

import { useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";

import useWatchTheme from "@me/hooks/use-watch-theme";
import { type AppRouter } from "@me/server/api/root";
import { getUrl, transformer } from "./shared";

export const api = createTRPCReact<AppRouter>();

export function TRPCReactProvider(
  props: Readonly<{
    children: React.ReactNode;
    cookies: string;
  }>,
) {
  const queryClient = useMemo(() => new QueryClient(), []);

  const trpcClient = useMemo(
    () =>
      api.createClient({
        transformer,
        links: [
          loggerLink({
            enabled: (op) =>
              process.env.NODE_ENV === "development" ||
              (op.direction === "down" && op.result instanceof Error),
          }),
          unstable_httpBatchStreamLink({
            url: getUrl(),
            headers() {
              return {
                cookie: props.cookies,
                "x-trpc-source": "react",
              };
            },
          }),
        ],
      }),
    [],
  );

  useWatchTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  );
}
