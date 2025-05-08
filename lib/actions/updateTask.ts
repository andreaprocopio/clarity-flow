"use server"

import { db } from "@/db"
import { tasksTable } from "@/db/schema"
import { currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from "next/cache"
import { eq, and } from "drizzle-orm"
import { Task } from "@/db/schema"

export const updateTask = async (updatedTask: Task) => {
  try {
    const user = await currentUser()
    if (!user) throw new Error("User not authenticated")

    await db
      .update(tasksTable)
      .set({
        title: updatedTask.title,
        icon: updatedTask.icon,
        specific_description: updatedTask.specific_description,
        start_date: updatedTask.start_date,
        end_date: updatedTask.end_date,
      })
      .where(
        and(
          eq(tasksTable.id, updatedTask.id),
          eq(tasksTable.user_id, user.id)
        )
      )

    revalidatePath("/tasks")

    return { success: true }
  } catch (error) {
    console.error("Update task error:", error)
    return { success: false, error: "Error during task update" }
  }
}
