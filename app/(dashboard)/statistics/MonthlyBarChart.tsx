"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartData } from "./CompletedTasksStatistic";

const chartConfig = {
  count: {
    label: "Tasks",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

interface TasksCompletedChartProps {
  chartData: ChartData;
}

export function MonthlyBarChart({ chartData }: TasksCompletedChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold">Completed Tasks</CardTitle>
        <CardDescription>
          {chartData[0]?.month} - {chartData[chartData.length - 1]?.month}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="value" fill={chartConfig.count.color} radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing the total completed tasks for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
