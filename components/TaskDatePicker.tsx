"use client";

import React, { useEffect } from "react";
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
import type { ClarityFlow, SmartAction } from "@/lib/types";

interface TaskDatePickerProps {
  index: number;
  propsDate: Date;
  type: "startDate" | "endDate";
  setClarityFlow: React.Dispatch<React.SetStateAction<ClarityFlow>>;
  handleSmartActionChange: (
    index: number,
    key: keyof SmartAction,
    value: string | Date,
    setClarityFlow: React.Dispatch<React.SetStateAction<ClarityFlow>>
  ) => void;
}

export function TaskDatePicker({
  index,
  propsDate,
  type,
  handleSmartActionChange,
  setClarityFlow,
}: TaskDatePickerProps) {
  const [date, setDate] = React.useState<Date>(propsDate);

  useEffect(() => {
    setDate(propsDate);
  }, [propsDate]);

  useEffect(() => {
    handleSmartActionChange(index, type, date, setClarityFlow);
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
