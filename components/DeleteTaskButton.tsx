"use client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { deleteTask } from "@/lib/actions/deleteTask";
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

interface DeleteTaskButtonProps {
  task: Task;
}

const DeleteTaskButton = ({ task }: DeleteTaskButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const result = await deleteTask(task.id);
    setLoading(false);

    if (result.success) {
      toast.success("Task deleted.");
      setOpen(false);
    } else {
      toast.error("Failed to delete task.");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          disabled={loading}
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="cursor-pointer text-white hover:bg-red-500"
        >
          {loading ? "Deleting..." : "Delete task"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            task.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              disabled={loading}
              onClick={handleClick}
              className="cursor-pointer text-white hover:bg-red-500"
            >
              {loading ? "Deleting..." : "Delete task"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTaskButton;
