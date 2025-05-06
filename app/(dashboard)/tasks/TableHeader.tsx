// components/TableHeader.tsx
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TableHeaderProps {
  children: ReactNode;
  className?: string;
}

export function TableHeader({ children, className }: TableHeaderProps) {
  return (
    <div
      className={cn("text-sm font-semibold text-neutral-400 mr-8", className)}
    >
      {children}
    </div>
  );
}
