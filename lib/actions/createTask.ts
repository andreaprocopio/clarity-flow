"use server"

import { ClarityFlow } from "../types"
import { db } from "@/db"
import { tasksTable } from "@/db/schema"
import { currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from "next/cache"

export const createTask = async (clarityFlow: ClarityFlow) => {
  try {
    const user = await currentUser()
    if (!user) throw new Error("User not authenticated")

    const tasks = buildTasksFromClarityFlow(user.id, clarityFlow)
    await db.insert(tasksTable).values(tasks)
    revalidatePath("/tasks")

    return { success: true }
  } catch (error) {
    console.error("Create task error:", error)
    return { success: false, error: "Error during task creation" }
  }
}

function buildTasksFromClarityFlow(userId: string, flow: ClarityFlow) {
  const {
    smartActions,
    gaps,
    rootCauses,
    desiredOutcomes,
    brainstormedActions,
  } = flow

  return smartActions.map((action, index) => {
    const {
      taskTitle,
      specificDescription,
      measurableCriteria,
      whyIsAchievable,
      whyIsRelevant,
      startDate,
      endDate,
      iconName
    } = action

    const {
      whatHasWorked,
      whatCouldGoWrong,
      externalResources,
      simplestStep,
    } = brainstormedActions[index]

    return {
      user_id: userId,
      title: taskTitle,
      gap: gaps[index],
      root_cause: rootCauses[index],
      without_problem: desiredOutcomes[index]?.withoutProblem,
      what_has_worked_before: whatHasWorked,
      what_could_go_wrong: whatCouldGoWrong,
      external_resources: externalResources,
      simplest_step: simplestStep,
      specific_description: specificDescription,
      measurable_completion_criteria: measurableCriteria,
      achievable_description: whyIsAchievable,
      relevance_description: whyIsRelevant,
      start_date: startDate,
      end_date: endDate,
      icon: iconName
    }
  })
}
