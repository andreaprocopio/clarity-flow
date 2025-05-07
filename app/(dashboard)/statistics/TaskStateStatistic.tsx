import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { tasksTable } from "@/db/schema";
import { eq, and, lt, gt, isNotNull, sql } from "drizzle-orm";
import { startOfMonth, endOfMonth, subMonths } from "date-fns";
import { KpiCard } from "@/components/ui/kpi-card";
import { ListTodo, ClockAlert, ListChecks } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Trend } from "@/components/ui/kpi-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

interface TaskStateStatisticProps {
  type: "TO_DO" | "PAST_DUE" | "COMPLETED";
}

const getToDoTasks = async (userId: string) => {
  const now = new Date();
  return db
    .select()
    .from(tasksTable)
    .where(
      and(
        eq(tasksTable.user_id, userId),
        eq(tasksTable.task_state, "TO_DO"),
        gt(tasksTable.end_date, now)
      )
    );
};

const getPastDueTasks = async (userId: string) => {
  const now = new Date();
  const current = await db
    .select()
    .from(tasksTable)
    .where(
      and(
        eq(tasksTable.user_id, userId),
        eq(tasksTable.task_state, "TO_DO"),
        lt(tasksTable.end_date, now)
      )
    );

  const lastMonth = subMonths(now, 1);
  const pastMonthTasks = await db
    .select()
    .from(tasksTable)
    .where(
      and(
        eq(tasksTable.user_id, userId),
        eq(tasksTable.task_state, "COMPLETED"),
        gt(tasksTable.completed_at, startOfMonth(lastMonth)),
        lt(tasksTable.completed_at, endOfMonth(lastMonth)),
        sql`${tasksTable.completed_at} > ${tasksTable.end_date}`
      )
    );

  return { current, pastMonthTasks };
};

const getCompletedTasks = async (userId: string) => {
  const now = new Date();
  const current = await db
    .select()
    .from(tasksTable)
    .where(
      and(
        eq(tasksTable.user_id, userId),
        eq(tasksTable.task_state, "COMPLETED"),
        isNotNull(tasksTable.completed_at)
      )
    );

  const lastMonth = subMonths(now, 1);
  const pastMonthTasks = await db
    .select()
    .from(tasksTable)
    .where(
      and(
        eq(tasksTable.user_id, userId),
        eq(tasksTable.task_state, "COMPLETED"),
        gt(tasksTable.completed_at, startOfMonth(lastMonth)),
        lt(tasksTable.completed_at, endOfMonth(lastMonth))
      )
    );

  return { current, pastMonthTasks };
};

const calculateDelta = (current: number, previous: number) => {
  if (previous === 0) return 100;
  return ((current - previous) / previous) * 100;
};

const deltaToTrend = (delta: number): Trend => {
  return {
    value: delta,
    isPositive: delta > 0,
  };
};

export const TaskStateStatistic = async ({ type }: TaskStateStatisticProps) => {
  const user = await currentUser();
  if (!user) throw new Error("User not authenticated");

  let count = 0;
  let delta: number | null = null;
  let trend: Trend | undefined = undefined;
  let title: string = "";
  let icon: LucideIcon = ListTodo;

  if (type === "TO_DO") {
    const tasks = await getToDoTasks(user.id);
    count = tasks.length;
    title = "TO DO";
    icon = ListTodo;
  } else if (type === "PAST_DUE") {
    const { current, pastMonthTasks } = await getPastDueTasks(user.id);
    count = current.length;
    delta = calculateDelta(count, pastMonthTasks.length);
    title = "PAST DUE";
    icon = ClockAlert;
  } else if (type === "COMPLETED") {
    const { current, pastMonthTasks } = await getCompletedTasks(user.id);
    count = current.length;
    delta = calculateDelta(count, pastMonthTasks.length);
    title = "COMPLETED";
    icon = ListChecks;
  }

  if (delta) {
    trend = deltaToTrend(delta);
  }

  return <KpiCard title={title} value={count} icon={icon} trend={trend} />;
};

export const KpiCardSkeleton = () => {
  return (
    <Card className="py-0 min-h-[160px]">
      <Skeleton className="w-full h-full" />
    </Card>
  );
};
