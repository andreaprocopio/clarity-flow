import { Task } from "@/db/schema";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import TaskContext from "./TaskContext";
import TaskContent from "./TaskContent";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TaskDetailsProps {
  task: Task;
}

const TaskDetails = ({ task }: TaskDetailsProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open task details</span>
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Task Details</SheetTitle>
          <SheetDescription>Inspect and edit task details</SheetDescription>
        </SheetHeader>
        <Separator />
        <div className="p-4">
          <TaskContent task={task} />
        </div>

        <div className="flex-1 overflow-hidden p-4">
          <ScrollArea className="h-full w-full">
            <TaskContext task={task} />
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TaskDetails;
