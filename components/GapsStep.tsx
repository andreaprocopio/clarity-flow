import React, { useState } from "react";
import { TypographyBlockquote } from "./TypographyBlockquote";
import { Input } from "./ui/input";
import { TypographyLead } from "./TypographyLead";
import { TypographyH2 } from "./TypographyH2";
import type { ClarityFlow } from "@/lib/types";

interface GapsStepProps {
  idealSituation: string;
  whQuestionsResult: string;
  setClarityFlow: React.Dispatch<React.SetStateAction<ClarityFlow>>;
}

const GapsStep = ({
  idealSituation,
  whQuestionsResult,
  setClarityFlow,
}: GapsStepProps) => {
  const [gapsInput, setGapsInput] = useState<string>("");

  return (
    <div className="space-y-12 max-h-[calc(100vh-200px)] overflow-y-auto">
      <div className="space-y-4">
        <TypographyLead text="Use your imagination" />
        <TypographyH2 text="Ideal vs. Current situation" />
      </div>
      <label className="block text-sm font-medium">
        Your current situation
      </label>
      <TypographyBlockquote text={whQuestionsResult} />
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Describe the ideal situation
        </label>
        <Input
          placeholder="e.g. I can easily prioritize tasks and stay focused at work"
          value={idealSituation}
          onChange={(e) =>
            setClarityFlow((prev) => ({
              ...prev,
              idealSituation: e.target.value,
            }))
          }
        />
        <p className="text-sm text-muted-foreground">
          Imagine what things would be like if this problem no longer existed
        </p>
      </div>
      <div className="space-y-4">
        <TypographyLead text="Identify the gaps" />
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            List the gaps between the ideal and current situation
          </label>
          <Input
            placeholder="e.g. slow process, lack of tools, unclear goals"
            value={gapsInput}
            onChange={(e) => {
              const value = e.target.value;
              setGapsInput(value);

              setClarityFlow((prev) => ({
                ...prev,
                gaps: value
                  .split(",")
                  .map((item) => item.trim())
                  .filter((item) => item),
              }));
            }}
          />
          <p className="text-sm text-muted-foreground">
            List all the differences between the ideal and the current
            situation. Separate each item with a comma.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GapsStep;
