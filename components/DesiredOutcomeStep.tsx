import React, { useState, useEffect } from "react";
import { TypographyLead } from "./TypographyLead";
import { TypographyH2 } from "./TypographyH2";
import { TypographyH4 } from "./TypographyH4";
import { Input } from "./ui/input";
import { TypographyBlockquote } from "./TypographyBlockquote";
import type { ClarityFlow, DesiredOutcome } from "@/lib/types";

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
  const handleChange = (
    index: number,
    field: "mainGoal" | "completionCriteria" | "withoutProblem",
    value: string
  ) => {
    const updated = [...answers];
    updated[index][field] = value;

    // Compose sentence
    const { mainGoal, completionCriteria, withoutProblem } = updated[index];
    const sentence = `To address the root cause "${rootCauses[index]}", I aim to "${mainGoal}". I’ll know it's resolved when "${completionCriteria}", and life would look like: "${withoutProblem}".`;

    updated[index].combinedSentence = sentence;
    setAnswers(updated);

    // Update parent state
    setClarityFlow((prev) => {
      const newOutcomes = [...prev.desiredOutcomes];
      newOutcomes[index] = sentence;
      return newOutcomes;
    });

    setClarityFlow((prev) => ({
      ...prev,
      rootCauses: updatedRootCauses,
    }));
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

          {answers[index]?.mainGoal !== undefined && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">Main goal</label>
              <Input
                value={answers[index]?.mainGoal}
                onChange={(e) =>
                  handleChange(index, "mainGoal", e.target.value)
                }
                placeholder="e.g. Prioritize tasks more effectively"
              />
              <p className="text-sm text-muted-foreground">
                What change do you want to achieve to overcome this root cause?
              </p>
            </div>
          )}
          {answers[index]?.completionCriteria !== undefined && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Completion criteria
              </label>
              <Input
                value={answers[index]?.completionCriteria}
                onChange={(e) =>
                  handleChange(index, "completionCriteria", e.target.value)
                }
                placeholder="e.g. I consistently complete my top 3 tasks each day"
              />
              <p className="text-sm text-muted-foreground">
                What outcome will show this issue is resolved?
              </p>
            </div>
          )}
          {answers[index]?.withoutProblem !== undefined && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Life without the problem
              </label>
              <Input
                value={answers[index]?.withoutProblem}
                onChange={(e) =>
                  handleChange(index, "withoutProblem", e.target.value)
                }
                placeholder="e.g. I feel calm and in control of my workload"
              />
              <p className="text-sm text-muted-foreground">
                What would your experience be like if this problem was gone?
              </p>
            </div>
          )}

          <div className="my-12">
            <TypographyBlockquote text={answers[index]?.combinedSentence} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DesiredOutcomeStep;
