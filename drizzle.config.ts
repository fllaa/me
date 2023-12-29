import { type Config } from "drizzle-kit";

import { env } from "@me/env";

export default {
  schema: "./src/server/db/schema.ts",
  driver: "mysql2",
  dbCredentials: {
    uri: env.DATABASE_URL,
  },
  tablesFilter: ["me-t3_*"],
} satisfies Config;
