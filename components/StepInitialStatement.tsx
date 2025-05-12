import React from "react";
import BaseBlockComponent from "./BaseBlock";
import type { BaseBlock, ClarityFlow } from "@/lib/types";
import { TypographyMuted } from "@/components/TypographyMuted";

type StepInitialStatementProps = {
  clarityFlow: ClarityFlow;
  setClarityFlow: React.Dispatch<React.SetStateAction<ClarityFlow>>;
};

export default function StepInitialStatement({
  clarityFlow,
  setClarityFlow,
}: StepInitialStatementProps) {
  const handleChange = (block: BaseBlock) => {
    setClarityFlow((prev) => ({
      ...prev,
      initialStatement: block,
    }));
  };

  return (
    <div className="space-y-6">
      <TypographyMuted
        text="Write a sentence that clearly describes what you are currently not doing or achieving.
        Keep it specific and problem-oriented."
      />
      <BaseBlockComponent
        value={clarityFlow.initialStatement}
        onChange={handleChange}
      />
    </div>
  );
}
