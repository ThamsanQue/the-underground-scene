import { DefaultSession, NextAuthConfig } from "next-auth";
import Resend from "next-auth/providers/resend";
import { env } from "@/env";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}

export const authConfig = {
  session: {
    strategy: "jwt",
  },
  providers: [Resend({ from: "security@trustmarkt.online" })],
  secret: env.NEXTAUTH_SECRET,
  pages: {
    // signIn: "/auth/signin", // Custom sign-in page
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user && user.id) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && token.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
