import { createTRPCRouter, publicProcedure } from "@me/server/api/trpc";
import apiClient from "@me/server/api/api-client";

export const wakatimeRouter = createTRPCRouter({
  getAllTime: publicProcedure.query(async () => {
    const response =
      await apiClient.get<WakatimeAllTimeResponse>("/wakatime/all-time");

    if (!response.ok) return null;
    return response.data;
  }),
});
