"use server";

import { db } from "@/db/client";
import { socialLinks, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const updateArtistProfile = async (profileData: any) => {
  try {
    await db
      .update(users)
      .set(profileData)
      .where(eq(users.id, profileData.userId));

    if (profileData.socialLinks && Array.isArray(profileData.socialLinks)) {
      await db
        .delete(socialLinks)
        .where(eq(socialLinks.userId, profileData.userId));

      await db.insert(socialLinks).values(
        profileData.socialLinks.map((link: string) => ({
          userId: profileData.userId,
          link: link,
        }))
      );
    }

    revalidatePath(`/dashboard/${profileData.userId}`);
    return { success: "Profile updated successfully" };
  } catch (error) {
    if (error instanceof Error) {
      // Handle database-specific errors
      return { error: error.message, code: (error as any).code };
    } else {
      // Handle other types of errors
      return { error: "An unexpected error occurred" };
    }
  }
};

export const getArtistProfile = async (userId: string | undefined) => {
  try {
    if (!userId) {
      return { error: "Artist not found" };
    }

    const result = await db.query.users.findFirst({
      where: eq(users.id, userId),
      with: {
        socialLinks: true,
      },
    });

    if (!result) {
      return { error: "Artist not found" };
    }

    return { success: "Artist Profile Found", user: result };
  } catch (error) {
    if (error instanceof Error) {
      // Handle database-specific errors
      return { error: error.message, code: (error as any).code };
    } else {
      // Handle other types of errors
      return { error: "An unexpected error occurred" };
    }
  }
};

export const getAllArtistProfiles = async () => {
  try {
    const result = await db.query.users.findMany({
      with: {
        socialLinks: true,
        dropLinks: true,
      },
    });

    if (!result) {
      return { error: "Artist Profiles not found" };
    }
    return { success: "Artist Profiles Found", users: result };
  } catch (error) {
    if (error instanceof Error) {
      // Handle database-specific errors
      return { error: error.message, code: (error as any).code };
    } else {
      // Handle other types of errors
      return { error: "An unexpected error occurred" };
    }
  }
};
