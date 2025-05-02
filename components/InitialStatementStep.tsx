"use client";
import React from "react";
import { TypographyLead } from "./TypographyLead";
import { Input } from "./ui/input";
import { TypographyBlockquote } from "./TypographyBlockquote";
import { TypographyH2 } from "./TypographyH2";
import { ClarityFlow } from "@/lib/types";

interface InitialStatementStepProps {
  initialStatement: string;
  setClarityFlow: React.Dispatch<React.SetStateAction<ClarityFlow>>;
}

const InitialStatementStep = ({
  initialStatement,
  setClarityFlow,
}: InitialStatementStepProps) => {
  return (
    <div className="space-y-12 max-h-[calc(100vh-200px)] overflow-y-auto">
      <div className="space-y-4">
        <TypographyLead text="Let's begin" />
        <TypographyH2 text="Your problem statement" />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Describe your main challenge
        </label>
        <Input
          placeholder="e.g. I'm unsure how to prioritize tasks at work"
          value={initialStatement}
          onChange={(e) =>
            setClarityFlow((prev) => ({
              ...prev,
              initialStatement: e.target.value,
            }))
          }
        />
        <p className="text-sm text-muted-foreground">
          What do you want clarity on today?
        </p>
      </div>
      <TypographyBlockquote text={initialStatement} />
    </div>
  );
};

export default InitialStatementStep;
