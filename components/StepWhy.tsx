import React from "react";
import BaseBlockComponent from "./BaseBlock";
import type { BaseBlock, ClarityFlow } from "@/lib/types";
import { TypographyMuted } from "@/components/TypographyMuted";
import { TypographyH2 } from "@/components/TypographyH2";
import { Button } from "./ui/button";

type StepWhyProps = {
  clarityFlow: ClarityFlow;
  setClarityFlow: React.Dispatch<React.SetStateAction<ClarityFlow>>;
  onNext: () => void;
  stepIndex: number;
};

export default function StepWhy({
  clarityFlow,
  setClarityFlow,
  onNext,
  stepIndex,
}: StepWhyProps) {
  const handleChange = (block: BaseBlock) => {
    setClarityFlow((prev) => ({
      ...prev,
      initialStatement: block,
    }));
  };

  return (
    <div className="space-y-6">
      <TypographyH2 text="1. Define your problem" />
      <TypographyMuted
        text="Write a sentence that clearly describes what you are currently not doing or achieving.
        Keep it specific and action-oriented."
      />
      <BaseBlockComponent
        value={clarityFlow.initialStatement}
        onChange={handleChange}
      />
      {stepIndex === 0 && <Button onClick={onNext}>Continue</Button>}
    </div>
  );
}
