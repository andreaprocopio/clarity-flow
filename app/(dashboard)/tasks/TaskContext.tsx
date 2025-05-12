import React from "react";
import TaskInfoCollapsibleSection from "@/components/TaskInfoCollapsibleSection";
import { Task } from "@/db/schema";
import { Why } from "@/lib/types";
import BaseBlockRawPhrase from "@/components/BaseBlockRawPhrase";

interface TaskContextProps {
  task: Task;
}

const TaskContext = ({ task }: TaskContextProps) => {
  const whys = task.whys as Why[];
  const content = (
    <BaseBlockRawPhrase baseBlock={whys[whys.length - 1]?.because} />
  );
  return (
    <div className="space-y-3 py-6">
      <TaskInfoCollapsibleSection title="Root Cause" content={content} />
    </div>
  );
};

export default TaskContext;
