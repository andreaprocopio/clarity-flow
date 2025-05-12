"use client";

import React from "react";
import { motion } from "framer-motion";
import { Input } from "./ui/input";
import { TaskDatePicker } from "./TaskDatePicker";
import { IconPicker, IconName } from "@/components/ui/icon-picker";
import { ClarityFlow } from "@/lib/types";
import ChecklistPreview from "./TaskChecklistPreview";

interface StepTaskProps {
  clarityFlow: ClarityFlow;
  setClarityFlow: React.Dispatch<React.SetStateAction<ClarityFlow>>;
}

const StepTask = ({ clarityFlow, setClarityFlow }: StepTaskProps) => {
  const handleChange = <K extends keyof ClarityFlow>(
    key: K,
    value: ClarityFlow[K]
  ) => {
    setClarityFlow((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-8"
    >
      {/* Icon Picker */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Task icon</label>
        <IconPicker
          value={(clarityFlow.iconName as IconName) || "list-todo"}
          onValueChange={(icon) => handleChange("iconName", icon)}
          className="w-fit"
        />
      </div>

      {/* Title */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Task title</label>
        <Input
          value={clarityFlow.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="e.g. Prioritize tasks"
        />
        <p className="text-sm text-muted-foreground">
          Give this task a clear and concise title
        </p>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Task description</label>
        <Input
          value={clarityFlow.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="e.g. I will write tomorrow’s task list before bed"
        />
        <p className="text-sm text-muted-foreground">
          Add a short and specific description of what this task involves.
        </p>
      </div>

      {/* Dates */}
      <div className="flex flex-col gap-2 sm:gap-8 sm:flex-row w-full">
        <div className="space-y-2 basis-1/2">
          <label className="block text-sm font-medium">Start date</label>
          <TaskDatePicker
            propsDate={clarityFlow.startDate}
            onDateChange={(date) => handleChange("startDate", date)}
          />
        </div>
        <div className="space-y-2 basis-1/2">
          <label className="block text-sm font-medium">End date</label>
          <TaskDatePicker
            propsDate={clarityFlow.endDate}
            onDateChange={(date) => handleChange("endDate", date)}
          />
        </div>
      </div>
      <ChecklistPreview clarityFlow={clarityFlow} />
    </motion.div>
  );
};

export default StepTask;
