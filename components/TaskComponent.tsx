"use client";

import { Task } from "@/db/schema";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { taskStateToUI } from "@/lib/taskStateMapping";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import TaskPopover from "./TaskPopover";
import { TypographyInlineCode } from "./TypographyInlineCode";

interface TaskProps {
  task: Task;
}

const formatDate = (date: Date) => {
  const d = new Date(date);
  return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
};

const TaskComponent = ({ task }: TaskProps) => {
  const [open, setOpen] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;
    setOpen(true);
  };

  const taskStateBadge = taskStateToUI(task);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Card
        onClick={handleCardClick}
        className="cursor-pointer hover:bg-muted transition"
      >
        <CardHeader>
          <div className="flex justify-between items-start mb-2 md:mb-4">
            <CardTitle>{task.title}</CardTitle>
            <TaskPopover task={task} />
          </div>
          <CardDescription className="line-clamp-3">
            {task.specific_description}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex gap-2 flex-wrap">
          <Badge className={cn("text-white", taskStateBadge.class)}>
            {taskStateBadge.label}
          </Badge>
          <TypographyInlineCode text={formatDate(task.start_date)} />
          {"-"}
          <TypographyInlineCode text={formatDate(task.end_date)} />
        </CardFooter>
      </Card>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Task details</DialogTitle>
          <DialogDescription>
            Qui puoi visualizzare e modificare i dettagli della task.
          </DialogDescription>
          {/* Inserisci altri contenuti del dialog */}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default TaskComponent;
