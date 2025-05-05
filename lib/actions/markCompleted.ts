"use server"

import { db } from "@/db"
import { tasksTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export const markCompleted = async (taskId: string) => {
  try {
    const user = await currentUser()
    if (!user) throw new Error("User not authenticated")

    const task = await db
      .select()
      .from(tasksTable)
      .where(eq(tasksTable.id, taskId))
      .limit(1)

    const taskRecord = task[0]

    if (!taskRecord) {
      return { success: false, error: "Task not found" }
    }

    if (taskRecord.user_id !== user.id) {
      return { success: false, error: "Unauthorized to update this task" }
    }

    await db
      .update(tasksTable)
      .set({
        completed_at: new Date(),
        task_state: "COMPLETED"
      })
      .where(eq(tasksTable.id, taskId))

    revalidatePath("/tasks")

    return { success: true }
  } catch (error) {
    console.error("Mark completed error:", error)
    return { success: false, error: "Error during task update" }
  }
}
