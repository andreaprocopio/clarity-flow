import { Task } from "@/db/schema";

export function taskStateToUI(task: Task): {
  label: string;
  style: React.CSSProperties;
} {
  const now = new Date();

  const isPastDue =
    task.task_state === "TO_DO" &&
    task.end_date &&
    new Date(task.end_date) < now;

  if (isPastDue) {
    return {
      label: "Past Due",
      style: {
        backgroundColor: "var(--destructive)",
        color: "var(--foreground)", // testo ben contrastato
      },
    };
  }

  const mapping: Record<
    string,
    { bg: string; fg: string; label: string }
  > = {
    TO_DO: {
      bg: "var(--primary)",
      fg: "var(--primary-foreground)",
      label: "To Do",
    },
    COMPLETED: {
      bg: "var(--accent)",
      fg: "var(--accent-foreground)",
      label: "Completed",
    },
  };

  const match = mapping[task.task_state];

  if (match) {
    return {
      label: match.label,
      style: {
        backgroundColor: match.bg,
        color: match.fg,
      },
    };
  }

  return {
    label: "Unknown",
    style: {
      backgroundColor: "var(--muted)",
      color: "var(--muted-foreground)",
    },
  };
}
