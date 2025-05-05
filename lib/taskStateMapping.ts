import { Task } from "@/db/schema";

const taskStateMapping: Record<string, { class: string; label: string }> = {
  TO_DO: { class: "bg-blue-500", label: "To Do" },
  PAST_DUE: { class: "bg-yellow-500", label: "Past Due" },
  FAILED: { class: "bg-red-500", label: "Failed" },
  COMPLETED: { class: "bg-green-500", label: "Completed" },
};

export function taskStateToUI(task: Task): { class: string; label: string } {
  return taskStateMapping[task.task_state] || {
    class: "bg-gray-500",
    label: "Unknown",
  };
}
