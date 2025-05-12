"use client";

import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface TaskDatePickerProps {
  propsDate: Date;
  onDateChange: (date: Date) => void;
}

export function TaskDatePicker({
  propsDate,
  onDateChange,
}: TaskDatePickerProps) {
  const [date, setDate] = useState<Date>(propsDate);

  useEffect(() => {
    setDate(propsDate);
  }, [propsDate]);

  useEffect(() => {
    onDateChange(date);
  }, [date]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "!w-full max-w-xs justify-start !flex text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          required={true}
          onSelect={(day) => {
            if (day) setDate(day);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
