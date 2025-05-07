import React, { Suspense } from "react";
import { TypographyH2 } from "@/components/TypographyH2";
import { TypographyMuted } from "@/components/TypographyMuted";
import { TaskStateStatistic, KpiCardSkeleton } from "./TaskStateStatistic";
import {
  CompletedTasksStatistic,
  CompletedTasksSkeleton,
} from "./CompletedTasksStatistic";
import { PastDues, PastDuesSkeleton } from "./PastDues";
import {
  RecentlyCompleted,
  RecentlyCompletedSkeleton,
} from "./RecentlyCompleted";
import { startOfMonth, endOfMonth } from "date-fns";
import {
  UpcomingDeadlines,
  UpcomingDeadlinesSkeleton,
} from "./UpcomingDeadlines";

const StatisticsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const monthParam = (await searchParams).monthParam;
  const now = new Date();
  const selectedMonth = monthParam ? new Date(`${monthParam}-01`) : now;
  const start = startOfMonth(selectedMonth);
  const end = endOfMonth(selectedMonth);

  return (
    <div className="max-w-5xl w-full mx-auto flex flex-col gap-8">
      <div className="space-y-2">
        <TypographyH2 text="Statistics" />
        <TypographyMuted
          className="md:text-base"
          text="Monitor trends and track performance over time"
        />
      </div>
      <div className="flex flex-col gap-8">
        <div className="grid-cols-1 grid md:grid-cols-3 gap-4">
          <Suspense fallback={<KpiCardSkeleton />}>
            <TaskStateStatistic type="TO_DO" />
          </Suspense>
          <Suspense fallback={<KpiCardSkeleton />}>
            <TaskStateStatistic type="PAST_DUE" />
          </Suspense>
          <Suspense fallback={<KpiCardSkeleton />}>
            <TaskStateStatistic type="COMPLETED" />
          </Suspense>
        </div>
        <div className="grid-cols-1 grid md:grid-cols-2 gap-4">
          <Suspense fallback={<CompletedTasksSkeleton />}>
            <CompletedTasksStatistic />
          </Suspense>
          <Suspense fallback={<RecentlyCompletedSkeleton />}>
            <RecentlyCompleted />
          </Suspense>
        </div>
        <div className="grid-cols-1 grid md:grid-cols-2 gap-4">
          <Suspense fallback={<UpcomingDeadlinesSkeleton />}>
            <UpcomingDeadlines start={start} end={end} />
          </Suspense>
          <Suspense fallback={<PastDuesSkeleton />}>
            <PastDues />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
