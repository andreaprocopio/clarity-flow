import React from "react";
import { Suspense } from "react";
import { TypographyH2 } from "@/components/TypographyH2";
import { TypographyMuted } from "@/components/TypographyMuted";
import { TaskTable } from "./TaskTable";
import { TaskTableSkeleton } from "./TaskTable";

const TasksPage = async () => {
  return (
    <div className="flex flex-col gap-8 md:gap-12 sm:max-w-lg lg:max-w-3xl xl:max-w-5xl xl:min-w-5xl 2xl:max-w-6xl 2xl:min-w-6xl mx-auto overflow-x-auto">
      <div className="space-y-2">
        <TypographyH2 text="Your tasks" />
        <TypographyMuted
          className="md:text-base"
          text="View and manage all of your ongoing activities"
        />
      </div>
      <Suspense fallback={<TaskTableSkeleton />}>
        <TaskTable />
      </Suspense>
    </div>
  );
};

export default TasksPage;
