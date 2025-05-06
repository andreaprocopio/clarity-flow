import { Task } from "@/db/schema";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react"; // Import Loader2 for spinner
import { updateTask } from "@/lib/actions/updateTask";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface TaskContentProps {
  task: Task;
}

const TaskContent = ({ task }: TaskContentProps) => {
  const [specificDescription, setSpecificDescription] = useState(
    task.specific_description || ""
  );

  const [title, setTitle] = useState(task.title || "");
  const [startDate, setStartDate] = useState<Date>(task.start_date);
  const [endDate, setEndDate] = useState<Date>(task.end_date);
  const [loading, setLoading] = useState(false); // loading state

  const handleSave = async () => {
    setLoading(true);
    const updatedTask = {
      ...task,
      title: title,
      specific_description: specificDescription,
      start_date: startDate,
      end_date: endDate,
    };

    await updateTask(updatedTask);
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          value={specificDescription}
          onChange={(e) => setSpecificDescription(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Start Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !startDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate ? format(startDate, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="z-[9999] border pointer-events-auto">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={(day) => {
                if (day) setStartDate(day);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label>End Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !endDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {endDate ? format(endDate, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="z-[9999] border pointer-events-auto">
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={(day) => {
                if (day) setEndDate(day);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <Button onClick={handleSave} disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          "Save"
        )}
      </Button>
    </div>
  );
};

export default TaskContent;
