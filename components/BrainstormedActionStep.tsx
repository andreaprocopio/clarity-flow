import React from "react";
import { TypographyLead } from "./TypographyLead";
import { TypographyH2 } from "./TypographyH2";
import { TypographyH4 } from "./TypographyH4";
import { Input } from "./ui/input";
import type {
  BrainstormedAction,
  ClarityFlow,
  DesiredOutcome,
} from "@/lib/types";
import { brainstormedActionDefaultValue } from "@/lib/types";

interface BrainstormedActionStepProps {
  desiredOutcomes: DesiredOutcome[];
  brainstormedActions: BrainstormedAction[];
  setClarityFlow: React.Dispatch<React.SetStateAction<ClarityFlow>>;
}

const BrainstormedActionStep = ({
  desiredOutcomes,
  brainstormedActions,
  setClarityFlow,
}: BrainstormedActionStepProps) => {
  const handleBrainstormedActionChange = (
    index: number,
    key: keyof BrainstormedAction,
    value: string,
    setClarityFlow: React.Dispatch<React.SetStateAction<ClarityFlow>>
  ) => {
    setClarityFlow((prev) => {
      const newBrainstormedActions = [...prev.brainstormedActions];

      if (!newBrainstormedActions[index]) {
        newBrainstormedActions[index] = { ...brainstormedActionDefaultValue };
      }

      newBrainstormedActions[index] = {
        ...newBrainstormedActions[index],
        [key]: value,
      };

      return {
        ...prev,
        brainstormedActions: newBrainstormedActions,
      };
    });
  };

  return (
    <div className="space-y-12 max-h-[calc(100vh-200px)] overflow-y-auto">
      <div className="space-y-4">
        <TypographyLead text="Explore possible actions to reach your outcome" />
        <TypographyH2 text="Brainstormed Actions" />
      </div>
      {desiredOutcomes.map((desiredOutcome, index) => (
        <div key={index} className="space-y-4 border p-4 rounded-xl">
          <p className="text-sm text-muted-foreground mb-2">
            Desired Outcome #{index + 1}
          </p>
          <TypographyH4 text={desiredOutcome?.mainGoal || ""} />

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              What actions could you take?
            </label>
            <Input
              value={brainstormedActions[index]?.actions || ""}
              onChange={(e) =>
                handleBrainstormedActionChange(
                  index,
                  "actions",
                  e.target.value,
                  setClarityFlow
                )
              }
              placeholder="e.g. Create a daily task plan"
            />
            <p className="text-sm text-muted-foreground">
              List concrete actions you could try to move toward your goal.
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              What has worked before?
            </label>
            <Input
              value={brainstormedActions[index]?.whatHasWorked || ""}
              onChange={(e) =>
                handleBrainstormedActionChange(
                  index,
                  "whatHasWorked",
                  e.target.value,
                  setClarityFlow
                )
              }
              placeholder="e.g. Setting clear priorities each morning"
            />
            <p className="text-sm text-muted-foreground">
              Reflect on what has helped you or others in similar situations.
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              What could go wrong?
            </label>
            <Input
              value={brainstormedActions[index]?.whatCouldGoWrong || ""}
              onChange={(e) =>
                handleBrainstormedActionChange(
                  index,
                  "whatCouldGoWrong",
                  e.target.value,
                  setClarityFlow
                )
              }
              placeholder="e.g. Getting distracted by emails or meetings"
            />
            <p className="text-sm text-muted-foreground">
              Consider potential obstacles or risks that might get in the way.
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Helpful resources or people
            </label>
            <Input
              value={brainstormedActions[index]?.externalResources || ""}
              onChange={(e) =>
                handleBrainstormedActionChange(
                  index,
                  "externalResources",
                  e.target.value,
                  setClarityFlow
                )
              }
              placeholder="e.g. My mentor, a time management app"
            />
            <p className="text-sm text-muted-foreground">
              Who or what could support you in taking action?
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Simplest first step
            </label>
            <Input
              value={brainstormedActions[index]?.simplestStep || ""}
              onChange={(e) =>
                handleBrainstormedActionChange(
                  index,
                  "simplestStep",
                  e.target.value,
                  setClarityFlow
                )
              }
              placeholder="e.g. Write down tomorrow's top 3 tasks"
            />
            <p className="text-sm text-muted-foreground">
              What&apos;s the smallest, easiest thing you could do to get
              started?
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BrainstormedActionStep;
