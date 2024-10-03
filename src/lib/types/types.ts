import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import {
  users,
  accounts,
  sessions,
  verificationTokens,
  socialLinks,
  dropLinks,
} from "@/db/schema";

// SocialLink types
export const insertSocialLinkSchema = createInsertSchema(socialLinks);
export const selectSocialLinkSchema = createSelectSchema(socialLinks);
export type NewSocialLink = z.infer<typeof insertSocialLinkSchema>;
export type SocialLink = z.infer<typeof selectSocialLinkSchema>;

// DropLink types
export const insertDropLinkSchema = createInsertSchema(dropLinks);
export const selectDropLinkSchema = createSelectSchema(dropLinks).extend({
  urls: z.array(z.string()), // Update this to be an array of strings
});
export type NewDropLink = z.infer<typeof insertDropLinkSchema>;
export type DropLink = z.infer<typeof selectDropLinkSchema>;

// User types
export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users).extend({
  socialLinks: z.array(selectSocialLinkSchema),
  dropLinks: z.array(selectDropLinkSchema),
});
export type NewUser = z.infer<typeof insertUserSchema>;
export type User = z.infer<typeof selectUserSchema>;

// Account types
export const insertAccountSchema = createInsertSchema(accounts);
export const selectAccountSchema = createSelectSchema(accounts);
export type NewAccount = z.infer<typeof insertAccountSchema>;
export type Account = z.infer<typeof selectAccountSchema>;

// Session types
export const insertSessionSchema = createInsertSchema(sessions);
export const selectSessionSchema = createSelectSchema(sessions);
export type NewSession = z.infer<typeof insertSessionSchema>;
export type Session = z.infer<typeof selectSessionSchema>;

// VerificationToken types
export const insertVerificationTokenSchema =
  createInsertSchema(verificationTokens);
export const selectVerificationTokenSchema =
  createSelectSchema(verificationTokens);
export type NewVerificationToken = z.infer<
  typeof insertVerificationTokenSchema
>;
export type VerificationToken = z.infer<typeof selectVerificationTokenSchema>;

export interface HeatMapDataPoint {
  date: string;
  count: number;
}

export type HeatMapDataObject = {
  [date: string]: number;
};

export type ExtendedDropLink = DropLink & { user: User };

const urlsSchema = z.object({
  id: z.string(),
  value: z.string().min(1, { message: "Link is required" }),
});

export const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  urls: z.array(urlsSchema),
});

export type DropData = z.infer<typeof formSchema>;
