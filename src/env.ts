import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    NEXTAUTH_SECRET: z.string().min(1),
    NEXTAUTH_URL: z.string().url(),
    DATABASE_URL: z.string().url().startsWith("postgresql://"),
    DEV_DATABASE_URL: z.string().url().startsWith("postgresql://"),
    AUTH_RESEND_KEY: z.string().min(1),
    RESEND_EMAIL: z.string().email(),
    RESEND_SERVER: z.string().url(),
    MINIO_ENDPOINT: z.string(),
    MINIO_ACCESS_KEY: z.string().min(1),
    MINIO_SECRET_KEY: z.string().min(1),
    MINIO_BUCKET_NAME: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    DEV_DATABASE_URL: process.env.DEV_DATABASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    AUTH_RESEND_KEY: process.env.AUTH_RESEND_KEY,
  },
  emptyStringAsUndefined: true,
});
