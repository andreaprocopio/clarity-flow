"use client";

import { Calendar } from "@/components/ui/calendar";
import { Task } from "@/db/schema";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { isSameDay } from "date-fns";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface UpcomingDeadlinesCalendarProps {
  tasks: Task[];
  initialMonth: Date;
}

export default function UpcomingDeadlinesCalendar({
  tasks,
  initialMonth,
}: UpcomingDeadlinesCalendarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [month, setMonth] = useState(initialMonth);

  const handleMonthChange = (newMonth: Date) => {
    setMonth(newMonth);
    const params = new URLSearchParams(searchParams);
    const year = newMonth.getFullYear();
    const month = String(newMonth.getMonth() + 1).padStart(2, "0");
    params.set("monthParam", `${year}-${month}`);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const CustomDay = ({ date }: { date: Date }) => {
    const dayTasks = tasks.filter((t) => isSameDay(new Date(t.end_date), date));

    if (dayTasks.length > 0) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center cursor-pointer">
              {date.getDate()}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <ul className="text-sm">
              {dayTasks.map((task, idx) => (
                <li key={idx}>- {task.title}</li>
              ))}
            </ul>
          </TooltipContent>
        </Tooltip>
      );
    }

    return (
      <div className="w-8 h-8 flex items-center justify-center">
        {date.getDate()}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold">Next Deadlines</CardTitle>
        <CardDescription>
          Stay on top of your upcoming deadlines
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Calendar
          classNames={{
            months:
              "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
            month: "space-y-4 w-full",
            caption: "flex justify-center pt-1 relative items-center",
            caption_label: "text-sm font-medium",
            nav: "space-x-1 flex items-center",
            nav_button:
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
            table: "w-full border-collapse space-y-1",
            head_row: "flex justify-around",
            head_cell:
              "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
            row: "flex justify-around w-full mt-2",
            cell: "text-center text-sm p-0 relative",
            day: "h-9 w-9 p-0 font-normal",
          }}
          mode="single"
          selected={undefined}
          onSelect={() => {}}
          month={month}
          onMonthChange={handleMonthChange}
          modifiers={{
            highlighted: (date) =>
              tasks.some((task) => isSameDay(new Date(task.end_date), date)),
          }}
          modifiersClassNames={{
            highlighted: "bg-primary text-primary-foreground",
          }}
          components={{
            Day: CustomDay,
          }}
          className="rounded-md border w-full h-full"
        />
      </CardContent>
    </Card>
  );
}
