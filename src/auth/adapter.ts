import { db } from "@/db/client";
import { accounts, sessions, users, verificationTokens } from "@/db/schema";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

export const drizzleAdapter = {
  ...DrizzleAdapter(db, {
    usersTable: users,
    verificationTokensTable: verificationTokens,
    sessionsTable: sessions,
    accountsTable: accounts,
  }),
};
