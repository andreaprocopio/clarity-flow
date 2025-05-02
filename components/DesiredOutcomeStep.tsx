import React from "react";
import { TypographyLead } from "./TypographyLead";
import { TypographyH2 } from "./TypographyH2";
import { TypographyH4 } from "./TypographyH4";
import { Input } from "./ui/input";
import type { ClarityFlow, DesiredOutcome } from "@/lib/types";
import { desiredOutcomeDefaultValue } from "@/lib/types";

interface DesiredOutcomeStepProps {
  desiredOutcomes: DesiredOutcome[];
  rootCauses: string[];
  setClarityFlow: React.Dispatch<React.SetStateAction<ClarityFlow>>;
}

const DesiredOutcomeStep = ({
  desiredOutcomes,
  rootCauses,
  setClarityFlow,
}: DesiredOutcomeStepProps) => {
  const handleDesiredOutcomeChange = (
    index: number,
    key: keyof DesiredOutcome,
    value: string,
    setClarityFlow: React.Dispatch<React.SetStateAction<ClarityFlow>>
  ) => {
    setClarityFlow((prev) => {
      const newDesiredOutcomes = [...prev.desiredOutcomes];

      if (!newDesiredOutcomes[index]) {
        newDesiredOutcomes[index] = { ...desiredOutcomeDefaultValue };
      }

      newDesiredOutcomes[index] = {
        ...newDesiredOutcomes[index],
        [key]: value,
      };

      return {
        ...prev,
        desiredOutcomes: newDesiredOutcomes,
      };
    });
  };

  return (
    <div className="space-y-12 max-h-[calc(100vh-200px)] overflow-y-auto">
      <div className="space-y-4">
        <TypographyLead text="Define your desired change" />
        <TypographyH2 text="Desired Outcomes" />
      </div>
      {rootCauses.map((rootCause, index) => (
        <div key={index} className="space-y-4 border p-4 rounded-xl">
          <p className="text-sm text-muted-foreground mb-2">
            Root Cause #{index + 1}
          </p>
          <TypographyH4 text={rootCause} />

          <div className="space-y-2">
            <label className="block text-sm font-medium">Main goal</label>
            <Input
              value={desiredOutcomes[index]?.mainGoal || ""}
              onChange={(e) =>
                handleDesiredOutcomeChange(
                  index,
                  "mainGoal",
                  e.target.value,
                  setClarityFlow
                )
              }
              placeholder="e.g. Prioritize tasks more effectively"
            />

            <p className="text-sm text-muted-foreground">
              What change do you want to achieve to overcome this root cause?
            </p>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Completion criteria
            </label>
            <Input
              value={desiredOutcomes[index]?.completionCriteria || ""}
              onChange={(e) =>
                handleDesiredOutcomeChange(
                  index,
                  "completionCriteria",
                  e.target.value,
                  setClarityFlow
                )
              }
              placeholder="e.g. I consistently complete my top 3 tasks each day"
            />
            <p className="text-sm text-muted-foreground">
              What outcome will show this issue is resolved?
            </p>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Life without the problem
            </label>
            <Input
              value={desiredOutcomes[index]?.withoutProblem || ""}
              onChange={(e) =>
                handleDesiredOutcomeChange(
                  index,
                  "withoutProblem",
                  e.target.value,
                  setClarityFlow
                )
              }
              placeholder="e.g. I feel calm and in control of my workload"
            />
            <p className="text-sm text-muted-foreground">
              What would your experience be like if this problem was gone?
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DesiredOutcomeStep;
