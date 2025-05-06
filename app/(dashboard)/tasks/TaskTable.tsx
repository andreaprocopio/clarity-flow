import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { Task } from "@/db/schema";
import { tasksTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Skeleton } from "@/components/ui/skeleton";

export const TaskTable = async () => {
  const user = await currentUser();
  if (!user) throw new Error("User not authenticated");

  const tasks: Task[] = await db
    .select()
    .from(tasksTable)
    .where(eq(tasksTable.user_id, user.id));
  return <DataTable columns={columns} data={tasks} />;
};

export const TaskTableSkeleton = () => {
  return (
    <div className="w-6xl">
      <Skeleton className="w-full h-[450px] md:-[500px] rounded-2" />
    </div>
  );
};
