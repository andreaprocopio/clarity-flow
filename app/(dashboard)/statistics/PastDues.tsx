import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { Task, tasksTable } from "@/db/schema";
import { and, eq, lt, isNull } from "drizzle-orm";
import { formatDistanceToNow } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconName } from "lucide-react/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import TaskIcon from "@/components/TaskIcon";
import { TypographySmall } from "@/components/TypographySmall";
import { TypographyMuted } from "@/components/TypographyMuted";
import { Separator } from "@/components/ui/separator";

const getPastDues = async (userId: string): Promise<Task[]> => {
  const now = new Date();
  const tasks = await db
    .select()
    .from(tasksTable)
    .where(
      and(
        eq(tasksTable.user_id, userId),
        eq(tasksTable.task_state, "TO_DO"),
        isNull(tasksTable.completed_at),
        lt(tasksTable.end_date, now)
      )
    );

  return tasks;
};

export const PastDues = async () => {
  const user = await currentUser();
  if (!user) return <div>Non autorizzato</div>;

  const pastDues = await getPastDues(user.id);

  return (
    <Card className="h-[320px] md:h-[410px] flex flex-col">
      <CardHeader>
        <CardTitle className="font-bold">Past due Tasks</CardTitle>
        <CardDescription>Tasks that are past their due dates</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 px-0 overflow-hidden">
        <ScrollArea className="h-full px-6">
          {pastDues.length === 0 ? (
            <div className="py-4">
              <TypographyMuted text="No past due tasks! 🎉" />
            </div>
          ) : (
            pastDues.map((task) => {
              if (!task.end_date) return null;
              const parsedDate = new Date(task.end_date as Date);
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
                    <TypographyMuted
                      text={`Expected due date: ${relative}`}
                      className="shrink-0"
                    />
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

export const PastDuesSkeleton = () => {
  return (
    <Card className="py-0 min-h-[320px] md:min-h-[410px]">
      <Skeleton className="h-full" />
    </Card>
  );
};
