"use server";

import { db } from "@/db/client";
import { dropLinks } from "@/db/schema";
import { currentUser } from "@/lib/auth";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const addDrop = async (dropData: any) => {
  try {
    await db.insert(dropLinks).values(dropData);
    revalidatePath(`/dashboard/${dropData.userId}`);
    return { success: "Drop added successfully!" };
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

export const getTotalDrops = async (
  userIdFromQuery: string | undefined | null
) => {
  const user = await currentUser();
  const dropsToGet = user?.id === userIdFromQuery ? user?.id : userIdFromQuery;

  if (!dropsToGet) {
    return { error: "User is not logged in or has no ID" };
  }

  const drops = await db.query.dropLinks.findMany({
    orderBy: (dropLinks, { desc }) => [desc(dropLinks.likes)],
    where: eq(dropLinks.userId, dropsToGet),
  });

  if (!drops) {
    return { error: "User has no drops" };
  }

  return { success: true, totalDrops: drops };
};

export const getAllDrops = async () => {
  const result = await db.query.dropLinks.findMany({
    orderBy: (dropLinks, { desc }) => [desc(dropLinks.likes)],
    with: {
      user: {
        with: {
          socialLinks: true,
        },
      },
    },
  });
  if (!result) {
    return { error: "Drops not found" };
  }

  return { success: "Drops Found", drops: result };
};

export const incrementLike = async (dropId: string) => {
  try {
    await db
      .update(dropLinks)
      .set({ likes: sql`likes + 1` })
      .where(eq(dropLinks.id, dropId));

    revalidatePath("/leaderboard/redFlames");

    return { success: "Drop liked successfully!" };
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

export const decrementLike = async (dropId: string) => {
  try {
    await db
      .update(dropLinks)
      .set({ likes: sql`likes - 1` })
      .where(eq(dropLinks.id, dropId));

    revalidatePath("/leaderboard/redFlames");

    return { success: "Drop unliked successfully!" };
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
