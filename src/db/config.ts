import { env } from "@/env";
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url:
      env.NODE_ENV === "production" ? env.DATABASE_URL : env.DEV_DATABASE_URL,
  },
  out: "./src/db/",
} satisfies Config;
