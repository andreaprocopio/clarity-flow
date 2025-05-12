"use client";

import React, { useState } from "react";
import { ChecklistItem } from "@/lib/types";
import { TypographySmall } from "@/components/TypographySmall";
import { Task } from "@/db/schema";
import { completeChecklistItem } from "@/lib/actions/completeChecklistItem";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner"; // o altro sistema notifiche

interface TaskChecklistProps {
  task: Task;
}

const TaskChecklist = ({ task }: TaskChecklistProps) => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(
    task.checklist as ChecklistItem[]
  );
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  if (checklist.length === 0) return null;

  const handleToggle = async (index: number) => {
    setLoadingIndex(index);

    const updatedChecklist = checklist.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );

    setChecklist(updatedChecklist); // optimistically update UI

    const result = await completeChecklistItem(task.id, updatedChecklist);
    setLoadingIndex(null);

    if (result.success) {
      toast.success("Checklist updated");
    } else {
      toast.error("Failed to update checklist");
    }
  };

  return (
    <div className="space-y-3 py-6">
      <TypographySmall text="Checklist: " className="mb-4 block" />
      <ul className="space-y-4 pl-2">
        {checklist.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <Checkbox
              checked={item.completed}
              disabled={loadingIndex === index}
              onCheckedChange={() => handleToggle(index)}
              className="cursor-pointer"
            />
            <span
              className={`text-sm ${
                item.completed ? "line-through text-muted-foreground" : ""
              }`}
            >
              {item.itemText}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskChecklist;
