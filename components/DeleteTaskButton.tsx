"use client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { deleteTask } from "@/lib/actions/deleteTask";
import React, { useState } from "react";
import { Task } from "@/db/schema";

interface DeleteTaskButtonProps {
  task: Task;
}

const DeleteTaskButton = ({ task }: DeleteTaskButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const result = await deleteTask(task.id);
    setLoading(false);

    if (result.success) {
      toast.success("Task deleted.");
    } else {
      toast.error("Failed to delete task.");
    }
  };

  return (
    <Button
      className="cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        handleClick();
      }}
      variant="destructive"
      disabled={loading}
    >
      {loading ? "Deleting..." : "Delete tasks"}
    </Button>
  );
};

export default DeleteTaskButton;
