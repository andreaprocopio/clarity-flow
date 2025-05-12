"use server";

import { ClarityFlow, Solutions, ChecklistItem, BaseBlock } from "../types";
import { db } from "@/db";
import { tasksTable } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { clarityFlowSchema } from "../zod/baseBlockSchema";

export const createTask = async (clarityFlow: ClarityFlow) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("User not authenticated");

    const validated = clarityFlowSchema.parse(clarityFlow); 
    const task = buildTaskFromClarityFlow(user.id, validated);

    await db.insert(tasksTable).values(task);
    revalidatePath("/tasks");

    return { success: true };
  } catch (error) {
    console.error("Create task error:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unexpected error during task creation",
    };
  }
};


function buildTaskFromClarityFlow(userId: string, flow: ClarityFlow) {
  return {
    user_id: userId,
    title: flow.title,
    description: flow.description,
    icon: flow.iconName,
    start_date: flow.startDate,
    end_date: flow.endDate,
    initial_statement: flow.initialStatement,
    whys: flow.whys,
    solutions: flow.solutions,
    checklist: buildChecklist(flow.solutions),
  };
}

function renderBaseBlock(block: BaseBlock): string {
  const phrase = `${block.subject} ${block.verb} ${block.object}`.trim();
  return block.negation ? `NOT ${phrase}` : phrase;
}

function buildChecklist(solutions: Solutions[]): ChecklistItem[] {
  return [...solutions]
    .reverse()
    .map((solution) => ({
      itemText: renderBaseBlock(solution.if),
      completed: false,
    }));
}
