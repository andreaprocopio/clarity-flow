import { cn } from "@/lib/utils";

interface TypographySmallProps {
  text: string;
  className?: string;
}

export function TypographySmall({ text, className }: TypographySmallProps) {
  return (
    <small className={cn("text-sm font-medium leading-none", className)}>
      {text}
    </small>
  );
}
