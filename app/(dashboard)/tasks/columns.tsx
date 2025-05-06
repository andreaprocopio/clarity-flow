"use client";

import { ColumnDef } from "@tanstack/react-table";
import MarkCompletedButton from "@/components/MarkCompletedButton";
import DeleteTaskButton from "@/components/DeleteTaskButton";
import { Task } from "@/db/schema";
import { taskStateToUI } from "@/lib/taskStateMapping";
import { Badge } from "@/components/ui/badge";
import { TableHeader } from "./TableHeader";
import { TaskProgress } from "./TaskProgress";
import { TypographyMuted } from "@/components/TypographyMuted";
import { MoreHorizontal, ArrowUpDown, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from "date-fns";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import TaskDetails from "./TaskDetails";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: () => <TableHeader>Title</TableHeader>,
  },
  {
    accessorKey: "task_state",
    header: () => <TableHeader>Status</TableHeader>,
    cell: ({ row }) => {
      const task = row.original;

      const { label, style } = taskStateToUI(task);

      return <Badge style={style}>{label}</Badge>;
    },
    enableColumnFilter: true,
  },
  {
    accessorKey: "start_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.original.start_date;
      if (!date) return "-";

      const parsedDate = new Date(date);
      const formatted = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(parsedDate);

      const relative = formatDistanceToNow(parsedDate, { addSuffix: true });

      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="outline" className="flex items-center gap-1">
              <CalendarDays className="w-4 h-4 text-muted-foreground" />
              {formatted}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>Started {relative}</TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    accessorKey: "end_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          End date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.original.end_date;
      if (!date) return "-";

      const parsedDate = new Date(date);
      const formatted = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(parsedDate);

      const relative = formatDistanceToNow(parsedDate, { addSuffix: true });

      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="secondary" className="flex items-center gap-1">
              <CalendarDays className="w-4 h-4 text-muted-foreground" />
              {formatted}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>Ends {relative}</TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    accessorFn: (row) => row.id, // just return a stable field like `id`, since you're not using this value directly
    id: "progress", // give it a unique ID for internal use
    header: () => <TableHeader>Progress</TableHeader>,
    cell: ({ row }) => {
      const task = row.original;
      const startDate = task.start_date ? new Date(task.start_date) : null;
      const endDate = task.end_date ? new Date(task.end_date) : null;
      const now = new Date();

      if (!startDate || !endDate || now < startDate) {
        return <TypographyMuted text="Not started yet" />;
      }

      const totalDuration = endDate.getTime() - startDate.getTime();
      const elapsed = now.getTime() - startDate.getTime();
      const progress = Math.min(
        100,
        Math.max(0, Math.floor((elapsed / totalDuration) * 100))
      );

      return <TaskProgress progressNumber={progress} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const task = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="px-2 py-1 space-y-2">
              {task.task_state !== "COMPLETED" && (
                <div>
                  <MarkCompletedButton task={task} />
                </div>
              )}
              <div>
                <DeleteTaskButton task={task} />
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    id: "view_details",
    cell: ({ row }) => {
      const task = row.original;

      return <TaskDetails task={task} />;
    },
  },
];
