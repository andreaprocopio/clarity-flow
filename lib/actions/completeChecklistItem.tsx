"use server";

import { db } from "@/db";
import { tasksTable } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { eq, and } from "drizzle-orm";
import { ChecklistItem } from "../types";

export const completeChecklistItem = async (
  taskId: string,
  updatedChecklist: ChecklistItem[]
) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("User not authenticated");

    await db
      .update(tasksTable)
      .set({
        checklist: updatedChecklist,
      })
      .where(and(eq(tasksTable.id, taskId), eq(tasksTable.user_id, user.id)));

    revalidatePath("/tasks");

    return { success: true };
  } catch (error) {
    console.error("Update checklist error:", error);
    return { success: false, error: "Error during checklist update" };
  }
};
