"use server";
import { signIn } from "@/auth";

export async function handleSignIn(email: string) {
  try {
    // Attempt to sign in the user
    await signIn("resend", {
      email,
      redirect: false,
    });

    return { success: true, message: "Access link sent to your email" };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Access link request failed, dm @street__crisis on Instagram",
    };
  }
}
