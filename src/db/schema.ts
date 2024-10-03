import {
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import type { AdapterAccountType } from "next-auth/adapters";
import { genId } from "@/lib/utils";

// Define the users table
export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => genId("usr")),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  title: text("title"),
  country: text("country"),
  image: text("image"),
  artcover: text("artcover"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);
// Define the sessions table
export const sessions = pgTable("sessions", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

// Define the verificationTokens table
export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
);

export const socialLinks = pgTable("socialLinks", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => genId("usr")),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  link: text("link").notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  socialLinks: many(socialLinks),
  dropLinks: many(dropLinks),
}));

export const socialLinksRelations = relations(socialLinks, ({ one }) => ({
  user: one(users, {
    fields: [socialLinks.userId],
    references: [users.id],
  }),
}));

export const dropLinks = pgTable("dropLinks", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => genId("usr")),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  urls: text("urls").array().notNull(),
  title: text("title").notNull(),
  description: text("description"),
  likes: integer("likes").notNull().default(0),
  postedAt: timestamp("posted_at").notNull().defaultNow(),
});

export const dropLinksRelations = relations(dropLinks, ({ one }) => ({
  user: one(users, {
    fields: [dropLinks.userId],
    references: [users.id],
  }),
}));
