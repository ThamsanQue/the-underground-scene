import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  server: {
    NEXTAUTH_SECRET: z.string(),
    DATABASE_URL: z.string().url(),
    AUTH_RESEND_KEY: z.string(),
  },
  experimental__runtimeEnv: {},
  emptyStringAsUndefined: true,
});
