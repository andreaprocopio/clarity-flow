import React from "react";
import TaskInfoCollapsibleSection from "@/components/TaskInfoCollapsibleSection";
import { Task } from "@/db/schema";

interface TaskContextProps {
  task: Task;
}

const TaskContext = ({ task }: TaskContextProps) => {
  return (
    <div className="py-4">
      <TaskInfoCollapsibleSection title="Gap" content={task.gap} />
      <TaskInfoCollapsibleSection
        title="Root Cause"
        content={task.root_cause}
      />
      {task.what_has_worked_before && (
        <TaskInfoCollapsibleSection
          title="What has worked before?"
          content={task.what_has_worked_before}
        />
      )}
      {task.what_could_go_wrong && (
        <TaskInfoCollapsibleSection
          title="What could go wrong?"
          content={task.what_could_go_wrong}
        />
      )}
      {task.without_problem && (
        <TaskInfoCollapsibleSection
          title="Without problem scenario"
          content={task.without_problem}
        />
      )}
      {task.external_resources && (
        <TaskInfoCollapsibleSection
          title="External resources"
          content={task.external_resources}
        />
      )}
      {task.simplest_step && (
        <TaskInfoCollapsibleSection
          title="Simple first step"
          content={task.simplest_step}
        />
      )}
    </div>
  );
};

export default TaskContext;
