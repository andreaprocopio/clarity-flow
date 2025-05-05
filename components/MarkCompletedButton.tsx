"use client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { markCompleted } from "@/lib/actions/markCompleted";
import React, { useState } from "react";
import { Task } from "@/db/schema";

interface MarkCompletedButtonProps {
  task: Task;
}

const MarkCompletedButton = ({ task }: MarkCompletedButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const result = await markCompleted(task.id);
    setLoading(false);

    if (result.success) {
      toast.success("Task completed.");
    } else {
      toast.error("Failed complete task.");
    }
  };

  return (
    <Button
      className="cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        handleClick();
      }}
      disabled={loading}
    >
      {loading ? "Loading..." : "Complete tasks ✅"}
    </Button>
  );
};

export default MarkCompletedButton;
