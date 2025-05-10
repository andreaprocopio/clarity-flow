"use client";

import {
  HelpCircle,
  ListStart,
  CheckCircle,
  CalendarClock,
  BarChart3,
} from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { TypographyMuted } from "@/components/TypographyMuted";
import { TypographyH2 } from "@/components/TypographyH2";

export function Features() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-6 scroll-mt-24" id="features">
      <div className="space-y-2 mb-12">
        <TypographyH2 text="Alright... So what’s the deal here?" />
        <TypographyMuted
          className="md:text-base"
          text="Curious minds, open the box — surprises await."
        />
      </div>
      <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
        <GridItem
          area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
          icon={
            <HelpCircle className="h-4 w-4 text-black dark:text-neutral-400" />
          }
          title="Define the Problem"
          description="Start by describing what’s bothering you — a challenge, a blocker, or an idea you can’t move forward on."
        />

        <GridItem
          area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
          icon={
            <ListStart className="h-4 w-4 text-black dark:text-neutral-400" />
          }
          title="Guided Reflection"
          description="ClarityFlow asks you the right questions to uncover root causes and clarify what really needs to change."
        />

        <GridItem
          area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
          icon={
            <CheckCircle className="h-4 w-4 text-black dark:text-neutral-400" />
          }
          title="Generate Clear Tasks"
          description="At the end of the process, ClarityFlow produces one or more well-defined tasks based on your answers — no suggestions, just logical outcomes."
        />

        <GridItem
          area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
          icon={
            <CalendarClock className="h-4 w-4 text-black dark:text-neutral-400" />
          }
          title="See What Matters Now"
          description="Your tasks are listed with due dates and statuses, so you can easily track deadlines, progress, and what's overdue — all based on thoughtful reflection."
        />

        <GridItem
          area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
          icon={
            <BarChart3 className="h-4 w-4 text-black dark:text-neutral-400" />
          }
          title="Track Your Progress"
          description="Access a dedicated statistics page where you can monitor trends, completed tasks, overdue items, and more — helping you improve over time."
        />
      </ul>
    </div>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          colors={["#48daf1", "#41c4d9", "#3299a9", "#246d79"]}
        />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-black md:text-2xl/[1.875rem] dark:text-white">
                {title}
              </h3>
              <h2 className="font-sans text-sm/[1.125rem] text-black md:text-base/[1.375rem] dark:text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
