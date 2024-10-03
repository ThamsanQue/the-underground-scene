import { DefaultSession, NextAuthConfig } from "next-auth";
import Resend from "next-auth/providers/resend";
import { JWT } from "next-auth/jwt";
import { html, text } from "@/lib/authSendRequest";
import { env } from "@/env";

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
  providers: [
    Resend({
      apiKey: env.AUTH_RESEND_KEY,
      from: `"The Underground Scene" <${env.RESEND_EMAIL}>`,
      server: env.RESEND_SERVER,
      sendVerificationRequest: async ({ identifier, url, provider, theme }) => {
        const { host } = new URL(url);
        const result = await fetch(`${env.RESEND_SERVER}/emails`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${provider.apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: provider.from,
            to: identifier,
            subject: `Your Access to The Underground Scene Awaits🔥🔥`,
            html: html({
              url,
              host,
              theme: theme as Partial<{
                primaryColor: string;
                secondaryColor: string;
                accentColor: string;
              }>,
            }),
            text: text({ url, host }),
          }),
        });

        const body = await result.json();
        if (!result.ok) {
          throw new Error(`Resend error: ${JSON.stringify(body)}`);
        }
      },
    }),
  ],
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
