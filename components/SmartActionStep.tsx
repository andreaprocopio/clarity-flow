import React from "react";
import { TypographyLead } from "./TypographyLead";
import { TypographyH2 } from "./TypographyH2";
import { TypographyH4 } from "./TypographyH4";
import { Input } from "./ui/input";
import { BrainstormedAction, SmartAction, ClarityFlow } from "@/lib/types";
import { smartActionDefaultValue } from "@/lib/types";

interface SmartActionStepProps {
  smartActions: SmartAction[];
  brainstormedActions: BrainstormedAction[];
  setClarityFlow: React.Dispatch<React.SetStateAction<ClarityFlow>>;
}

const SmartActionStep = ({
  smartActions,
  brainstormedActions,
  setClarityFlow,
}: SmartActionStepProps) => {
  const handleSmartActionChange = (
    index: number,
    key: keyof SmartAction,
    value: string,
    setClarityFlow: React.Dispatch<React.SetStateAction<ClarityFlow>>
  ) => {
    setClarityFlow((prev) => {
      const newSmartActions = [...prev.smartActions];

      if (!newSmartActions[index]) {
        newSmartActions[index] = { ...smartActionDefaultValue };
      }

      newSmartActions[index] = {
        ...newSmartActions[index],
        [key]: value,
      };

      return {
        ...prev,
        smartActions: newSmartActions,
      };
    });
  };

  return (
    <div className="space-y-12 max-h-[calc(100vh-200px)] overflow-y-auto">
      <div className="space-y-4">
        <TypographyLead text="Let's get specific" />
        <TypographyH2 text="Smart Actions" />
      </div>
      {brainstormedActions.map((brainstormedAction, index) => (
        <div key={index} className="space-y-4 border p-4 rounded-xl">
          <p className="text-sm text-muted-foreground mb-2">
            Brainstormed Action #{index + 1}
          </p>
          <TypographyH4 text={brainstormedAction.actions} />
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              What exactly needs to be done?
            </label>
            <Input
              value={smartActions[index]?.isTaskSpecific || ""}
              onChange={(e) =>
                handleSmartActionChange(
                  index,
                  "isTaskSpecific",
                  e.target.value,
                  setClarityFlow
                )
              }
              placeholder="e.g. Write tomorrow’s task list before bed"
            />
            <p className="text-sm text-muted-foreground">
              Is the task Specific? Describe the exact action you’ll take.
            </p>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              How will you know it’s done?
            </label>
            <Input
              value={smartActions[index]?.isTaskMeasurable || ""}
              onChange={(e) =>
                handleSmartActionChange(
                  index,
                  "isTaskMeasurable",
                  e.target.value,
                  setClarityFlow
                )
              }
              placeholder="e.g. Complete 3 top-priority tasks"
            />
            <p className="text-sm text-muted-foreground">
              Is it Measurable? Define a clear result you can check off.
            </p>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Why is this action realistic for you right now?
            </label>
            <Input
              value={smartActions[index]?.isTaskAchievable || ""}
              onChange={(e) =>
                handleSmartActionChange(
                  index,
                  "isTaskAchievable",
                  e.target.value,
                  setClarityFlow
                )
              }
              placeholder="e.g. I can do this during my lunch break because it only takes 10 minutes"
            />
            <p className="text-sm text-muted-foreground">
              Reflect on your current situation. Explain how is this action
              realistic and doable in this moment.
            </p>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              How does this task help address the root problem?
            </label>
            <Input
              value={smartActions[index]?.isTaskRelevant || ""}
              onChange={(e) =>
                handleSmartActionChange(
                  index,
                  "isTaskRelevant",
                  e.target.value,
                  setClarityFlow
                )
              }
              placeholder="e.g. This helps me stop procrastinating by breaking work into smaller, manageable steps"
            />
            <p className="text-sm text-muted-foreground">
              Think about the core issue you&apos;re trying to solve. How does
              this specific task move you closer to a solution?
            </p>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              When will this be done?
            </label>
            <Input
              value={smartActions[index]?.isTaskTimeBound || ""}
              onChange={(e) =>
                handleSmartActionChange(
                  index,
                  "isTaskTimeBound",
                  e.target.value,
                  setClarityFlow
                )
              }
              placeholder="e.g. Finish by 6 PM today"
            />
            <p className="text-sm text-muted-foreground">
              Is it Time-bound? Set a clear deadline or timeframe.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SmartActionStep;
