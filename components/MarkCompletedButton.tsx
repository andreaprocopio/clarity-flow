"use client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { markCompleted } from "@/lib/actions/markCompleted";
import React, { useState } from "react";
import { Task } from "@/db/schema";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface MarkCompletedButtonProps {
  task: Task;
}

const MarkCompletedButton = ({ task }: MarkCompletedButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const result = await markCompleted(task.id);
    setLoading(false);

    if (result.success) {
      toast.success("Task completed.");
      setOpen(false);
    } else {
      toast.error("Failed to complete task.");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="secondary"
          disabled={loading}
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="cursor-pointer"
        >
          {loading ? "Loading..." : "Complete task ✅"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Mark this task as completed?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will mark the task as completed. You can undo this later
            if needed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="secondary"
              disabled={loading}
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
              className="cursor-pointer"
            >
              {loading ? "Loading..." : "Complete task"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MarkCompletedButton;
