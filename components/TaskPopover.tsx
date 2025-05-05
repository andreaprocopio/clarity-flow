import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { IconDots } from "@tabler/icons-react";
import DeleteTaskButton from "./DeleteTaskButton";
import { Task } from "@/db/schema";
import MarkCompletedButton from "./MarkCompletedButton";

interface TaskPopoverProps {
  task: Task;
}

const TaskPopover = ({ task }: TaskPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <IconDots stroke={2} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-4">
        {task.task_state !== "COMPLETED" && <MarkCompletedButton task={task} />}
        <DeleteTaskButton task={task} />
      </PopoverContent>
    </Popover>
  );
};

export default TaskPopover;
