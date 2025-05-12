import React from "react";
import BaseBlockComponent from "./BaseBlock";
import type { BaseBlock, ClarityFlow } from "@/lib/types";
import { TypographyMuted } from "@/components/TypographyMuted";
import { Button } from "@/components/ui/button";
import { baseBlockInitialValue } from "@/lib/types";
import BaseBlockRawPhrase from "./BaseBlockRawPhrase";

type StepWhysProps = {
  clarityFlow: ClarityFlow;
  setClarityFlow: React.Dispatch<React.SetStateAction<ClarityFlow>>;
};

export default function StepWhys({
  clarityFlow,
  setClarityFlow,
}: StepWhysProps) {
  const addWhy = () => {
    const previousBlock =
      clarityFlow.whys.length > 0
        ? clarityFlow.whys[clarityFlow.whys.length - 1].because
        : clarityFlow.initialStatement;

    setClarityFlow((prev) => ({
      ...prev,
      whys: [
        ...prev.whys,
        { why: previousBlock, because: baseBlockInitialValue },
      ],
    }));
  };

  const removeLastWhy = () => {
    setClarityFlow((prev) => ({
      ...prev,
      whys: prev.whys.slice(0, -1),
    }));
  };

  const updateBecauseBlock = (index: number, updated: BaseBlock) => {
    setClarityFlow((prev) => {
      const newWhys = [...prev.whys];
      newWhys[index] = {
        ...newWhys[index],
        because: updated,
      };
      return { ...prev, whys: newWhys };
    });
  };

  return (
    <div className="space-y-8">
      <TypographyMuted
        text="Ask 'Why?' to uncover the root cause of your problem. 
        Keep digging deeper with each answer."
      />
      {clarityFlow?.whys?.map((entry, index) => (
        <div key={index} className="space-y-2">
          <div className="flex gap-2">
            <TypographyMuted text="Why: " />
            <div className="flex">
              <BaseBlockRawPhrase
                baseBlock={
                  index === 0 ? clarityFlow.initialStatement : entry.why
                }
              />
              <TypographyMuted text="?" />
            </div>
          </div>
          <TypographyMuted text="Because: " />
          <BaseBlockComponent
            value={entry.because}
            onChange={(val) => updateBecauseBlock(index, val)}
          />
        </div>
      ))}

      {/* Buttons row */}
      <div className="flex gap-4">
        <Button variant="outline" onClick={addWhy}>
          +
        </Button>
        <Button
          variant="outline"
          onClick={removeLastWhy}
          disabled={clarityFlow.whys.length === 0}
        >
          −
        </Button>
      </div>
    </div>
  );
}
