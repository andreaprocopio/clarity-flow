import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { Task, tasksTable } from "@/db/schema";
import TaskComponent from "./TaskComponent";
import { TypographyMuted } from "./TypographyMuted";

const containerClassnames = "flex flex-col gap-4";

export const TasksList = async () => {
  const user = await currentUser();
  if (!user) throw new Error("User not authenticated");

  const tasks: Task[] = await db
    .select()
    .from(tasksTable)
    .where(eq(tasksTable.user_id, user.id));

  if (tasks.length === 0) {
    return (
      <div>
        <TypographyMuted text="Nothing to do right now. Enjoy the break!" />
      </div>
    );
  }

  return (
    <div className={containerClassnames}>
      {tasks.map((task) => (
        <TaskComponent task={task} key={task.id} />
      ))}
    </div>
  );
};

export const TasksListSkeleton = () => {
  return (
    <div className={containerClassnames}>
      <Skeleton className="w-full h-[210px] md:h-[220px] rounded-2" />
      <Skeleton className="w-full h-[210px] md:h-[220px] rounded-2" />
      <Skeleton className="w-full h-[210px] md:h-[220px] rounded-2" />
    </div>
  );
};
