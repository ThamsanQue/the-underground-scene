import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/env";
import * as schema from "./schema";

export const db = drizzle(
  postgres(
    env.NODE_ENV === "production" ? env.DATABASE_URL : env.DEV_DATABASE_URL
  ),
  { schema }
);
