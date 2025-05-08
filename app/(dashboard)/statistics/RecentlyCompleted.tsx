import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { Task, tasksTable } from "@/db/schema";
import { and, eq, gt, isNotNull } from "drizzle-orm";
import { subDays, startOfMonth, formatDistanceToNow } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TypographySmall } from "@/components/TypographySmall";
import { TypographyMuted } from "@/components/TypographyMuted";
import { Separator } from "@/components/ui/separator";
import TaskIcon from "@/components/TaskIcon";
import { IconName } from "lucide-react/dynamic";

const getRecentlyCompleted = async (userId: string): Promise<Task[]> => {
  const now = new Date();
  const tasks = await db
    .select()
    .from(tasksTable)
    .where(
      and(
        eq(tasksTable.user_id, userId),
        eq(tasksTable.task_state, "COMPLETED"),
        isNotNull(tasksTable.completed_at),
        gt(tasksTable.completed_at, startOfMonth(subDays(now, 7)))
      )
    );

  return tasks;
};

export const RecentlyCompleted = async () => {
  const user = await currentUser();
  if (!user) return <div>Non autorizzato</div>;

  const recentlyCompleted = await getRecentlyCompleted(user.id);

  return (
    <Card className="h-[320px] md:h-[410px] flex flex-col">
      <CardHeader>
        <CardTitle className="font-bold">Recently Completed</CardTitle>
        <CardDescription>Task completed in the last 7 days</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 px-0 overflow-hidden">
        <ScrollArea className="h-full px-6">
          {recentlyCompleted.length === 0 ? (
            <div className="py-4">
              <TypographyMuted text="No recently completed tasks yet ✅" />
            </div>
          ) : (
            recentlyCompleted.map((task) => {
              if (!task.completed_at) return null;
              const parsedDate = new Date(task.completed_at as Date);
              const relative = formatDistanceToNow(parsedDate, {
                addSuffix: true,
              });

              return (
                <div key={task.id}>
                  <Separator className="my-4" />
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-4">
                      <TaskIcon iconName={task.icon as IconName} />
                      <TypographySmall text={task.title} />
                    </div>
                    <TypographyMuted text={relative} className="shrink-0" />
                  </div>
                </div>
              );
            })
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export const RecentlyCompletedSkeleton = () => {
  return (
    <Card className="py-0 min-h-[320px] md:min-h-[410px]">
      <Skeleton className="h-full" />
    </Card>
  );
};
