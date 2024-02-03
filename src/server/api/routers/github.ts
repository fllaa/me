import { createTRPCRouter, publicProcedure } from "@me/server/api/trpc";
import apiClient from "@me/server/api/api-client";

export const githubRouter = createTRPCRouter({
  getStats: publicProcedure.query(async () => {
    const response = await apiClient.get<GithubStatsResponse>("/github/stats");

    if (!response.ok) return null;
    return response.data;
  }),
});
