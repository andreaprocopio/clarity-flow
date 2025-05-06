import React from "react";
import { Suspense } from "react";

import { TypographyH2 } from "@/components/TypographyH2";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TasksList, TasksListSkeleton } from "@/components/TasksList";

const TasksPage = async () => {
  return (
    <div className="max-w-4xl w-full mx-auto flex flex-col gap-10">
      <TypographyH2 text="Your tasks" />
      <Suspense fallback={<TasksListSkeleton />}>
        <TasksList />
      </Suspense>
      <Link href="/clarity" className="!w-fit">
        <Button className="cursor-pointer">New Task +</Button>
      </Link>
    </div>
  );
};

export default TasksPage;
