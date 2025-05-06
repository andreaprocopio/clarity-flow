"use client";

import { Task } from "@/db/schema";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { taskStateToUI } from "@/lib/taskStateMapping";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
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
import TaskInfoCollapsibleSection from "./TaskInfoCollapsibleSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TypographyH3 } from "./TypographyH3";
import { TypographyH4 } from "./TypographyH4";

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

      <DialogContent className="p-12">
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-center md:justify-between">
              <TypographyH3 text={task.title} />
              <Badge className={cn("text-white", taskStateBadge.class)}>
                {taskStateBadge.label}
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Separator />

        <ScrollArea className="h-[300px] w-full">
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
        </ScrollArea>
        <Separator />
      </DialogContent>
    </Dialog>
  );
};

export default TaskComponent;
