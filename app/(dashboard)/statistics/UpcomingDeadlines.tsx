import { tasksTable } from "@/db/schema";
import React from "react";
import { db } from "@/db";
import { and, gte, lte, eq } from "drizzle-orm";
import UpcomingDeadlinesCalendar from "./UpcomingDeadlinesCalendar";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { currentUser } from "@clerk/nextjs/server";

interface UpcomingDeadlinesProps {
  start: Date;
  end: Date;
}

export const UpcomingDeadlines = async ({
  start,
  end,
}: UpcomingDeadlinesProps) => {
  const user = await currentUser();
  if (!user) throw new Error("User not authenticated");

  const tasks = await db
    .select()
    .from(tasksTable)
    .where(
      and(
        eq(tasksTable.user_id, user.id),
        eq(tasksTable.task_state, "TO_DO"),
        gte(tasksTable.end_date, start),
        lte(tasksTable.end_date, end)
      )
    );

  return <UpcomingDeadlinesCalendar initialMonth={start} tasks={tasks} />;
};

export const UpcomingDeadlinesSkeleton = () => {
  return (
    <Card className="py-0 min-h-[320px] md:min-h-[410px] flex items-center justify-center">
      <div className="grid grid-rows-[2rem_1fr] w-[300px] items-center gap-2">
        <div className="flex justify-between items-center w-full px-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-8 rounded-md" />
          </div>
          <Skeleton className="h-6 w-6 rounded-md" />
        </div>
        <div className="grid grid-cols-7 items-start p-2 gap-2">
          <Skeleton className="h-6 w-6 rounded-md" />
          <Skeleton className="h-6 w-6 rounded-md" />
          <Skeleton className="h-6 w-6 rounded-md" />
          <Skeleton className="h-6 w-6 rounded-md" />
          <Skeleton className="h-6 w-6 rounded-md" />
          <Skeleton className="h-6 w-6 rounded-md" />
          <Skeleton className="h-6 w-6 rounded-md" />
          <Skeleton className="h-6 w-6 rounded-md" />
          <Skeleton className="h-6 w-6 rounded-md" />
          <Skeleton className="h-6 w-6 rounded-md" />
          <Skeleton className="h-6 w-6 rounded-md bg-transparent opacity-40" />
          <Skeleton className="h-6 w-6 rounded-md bg-transparent opacity-40" />
          <Skeleton className="h-6 w-6 rounded-md bg-transparent opacity-40" />
          <Skeleton className="h-6 w-6 rounded-md bg-transparent opacity-40" />
        </div>
      </div>
    </Card>
  );
};
