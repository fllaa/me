import { create } from "apisauce";

import { env } from "@me/env";

const apiClient = create({
  baseURL: env.MY_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
