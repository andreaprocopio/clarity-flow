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
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import TaskContext from "./TaskContext";
import TaskContent from "./TaskContent";
import { ScrollArea } from "@/components/ui/scroll-area";
import TaskChecklist from "./TaskChecklist";

interface TaskDetailsProps {
  task: Task;
}

const TaskDetails = ({ task }: TaskDetailsProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
          <span className="sr-only">Open task details</span>
          <Edit className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-full w-full">
          <SheetHeader>
            <SheetTitle>Task Details</SheetTitle>
            <SheetDescription>Inspect and edit task details</SheetDescription>
          </SheetHeader>
          <Separator />
          <div className="p-4">
            <TaskContent task={task} />
          </div>
          <Separator />
          <div className="p-4">
            <TaskChecklist task={task} />
          </div>
          <Separator />
          <div className="p-4">
            <TaskContext task={task} />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default TaskDetails;
