"use client";

import * as React from "react";

import { Progress } from "@/components/ui/progress";

interface TaskProgressProps {
  progressNumber: number;
}

export function TaskProgress({ progressNumber }: TaskProgressProps) {
  const [progress, setProgress] = React.useState(15);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(progressNumber), 250);
    return () => clearTimeout(timer);
  }, [progressNumber]);

  return <Progress value={progress} className="min-w-[150px]" />;
}
