import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { Counter } from "./counter";

export type Trend = {
  value: number;
  isPositive: boolean;
};

interface KpiCardProps {
  title: string;
  value: number;
  description?: string;
  icon: LucideIcon;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  trend?: Trend;
}

export function KpiCard({
  title,
  value,
  description,
  icon: Icon,
  prefix = "",
  suffix = "",
  decimals = 0,
  trend,
}: KpiCardProps) {
  return (
    <Card className="min-h-[160px]">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-bold">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          <Counter
            value={value}
            prefix={prefix}
            suffix={suffix}
            decimals={decimals}
          />
        </div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {trend && (
          <div className="mt-2 flex items-center text-xs">
            <span
              className={trend.isPositive ? "text-primary" : "text-destructive"}
            >
              {trend.isPositive ? "↑" : "↓"} {trend.value}%
            </span>
            <span className="ml-1 text-muted-foreground">from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
