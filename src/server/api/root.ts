import { githubRouter } from "@me/server/api/routers/github";
import { postRouter } from "@me/server/api/routers/post";
import { wakatimeRouter } from "@me/server/api/routers/wakatime";
import { createTRPCRouter } from "@me/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  github: githubRouter,
  post: postRouter,
  wakatime: wakatimeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
