import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { tasksTable } from "@/db/schema";
import { and, eq, gt, isNotNull } from "drizzle-orm";
import { subMonths, startOfMonth, format } from "date-fns";
import { MonthlyBarChart } from "./MonthlyBarChart";
import { Card } from "@/components/ui/card";

export type ChartEntry = {
  month: string;
  value: number;
};

export type ChartData = ChartEntry[];

const getCompletedTasksLastSixMonths = async (
  userId: string
): Promise<ChartData> => {
  const now = new Date();
  const tasks = await db
    .select({
      completedAt: tasksTable.completed_at,
    })
    .from(tasksTable)
    .where(
      and(
        eq(tasksTable.user_id, userId),
        eq(tasksTable.task_state, "COMPLETED"),
        isNotNull(tasksTable.completed_at),
        gt(tasksTable.completed_at, startOfMonth(subMonths(now, 5)))
      )
    );

  const monthsMap = new Map<string, number>();
  for (let i = 5; i >= 0; i--) {
    const date = subMonths(now, i);
    const key = format(date, "MMMM");
    monthsMap.set(key, 0);
  }

  for (const task of tasks) {
    if (!task.completedAt) continue;
    const key = format(task.completedAt, "MMMM");
    if (monthsMap.has(key)) {
      monthsMap.set(key, monthsMap.get(key)! + 1);
    }
  }

  const chartData: ChartData = Array.from(monthsMap.entries()).map(
    ([month, value]) => ({
      month,
      value,
    })
  );

  return chartData;
};

export const CompletedTasksStatistic = async () => {
  const user = await currentUser();
  if (!user) return <div>Non autorizzato</div>;

  const chartData = await getCompletedTasksLastSixMonths(user.id);

  return <MonthlyBarChart chartData={chartData} />;
};

export const CompletedTasksSkeleton = () => {
  return (
    <Card className="py-0 min-h-[320px] md:min-h-[400px]">
      <div className="flex items-center justify-center gap-2 h-full">
        <div className="flex items-end justify-center gap-2">
          <div className="bg-muted rounded-md w-10 h-16 animate-pulse" />
          <div className="bg-muted rounded-md w-10 h-24 animate-pulse" />
          <div className="bg-muted rounded-md w-10 h-32 animate-pulse" />
          <div className="bg-muted rounded-md w-10 h-20 animate-pulse" />
          <div className="bg-muted rounded-md w-10 h-28 animate-pulse" />
        </div>
      </div>
    </Card>
  );
};
