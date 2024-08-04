import NextAuth from "next-auth";
import { drizzleAdapter } from "./adapter";
import { authConfig } from "./config";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  adapter: drizzleAdapter,
  ...authConfig,
});
