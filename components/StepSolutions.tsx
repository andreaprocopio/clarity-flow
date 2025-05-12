import React from "react";
import BaseBlockComponent from "./BaseBlock";
import type { BaseBlock, ClarityFlow } from "@/lib/types";
import { TypographyMuted } from "@/components/TypographyMuted";
import { baseBlockInitialValue } from "@/lib/types";
import { Button } from "@/components/ui/button";
import BaseBlockRawPhrase from "./BaseBlockRawPhrase";
import SolutionStatement from "./SolutionStatement";

type StepSolutionsProps = {
  clarityFlow: ClarityFlow;
  setClarityFlow: React.Dispatch<React.SetStateAction<ClarityFlow>>;
};

const invertNegation = (block: BaseBlock): BaseBlock => ({
  ...block,
  negation: !block.negation,
});

export default function StepSolutions({
  clarityFlow,
  setClarityFlow,
}: StepSolutionsProps) {
  const rootCause = clarityFlow.whys[clarityFlow.whys.length - 1]?.because;

  const addSolution = () => {
    const isFirst = clarityFlow.solutions.length === 0;

    const thenBlock = isFirst
      ? rootCause
        ? invertNegation(rootCause)
        : baseBlockInitialValue
      : clarityFlow.solutions[clarityFlow.solutions.length - 1].if;

    setClarityFlow((prev) => ({
      ...prev,
      solutions: [
        ...prev.solutions,
        { if: baseBlockInitialValue, then: thenBlock },
      ],
    }));
  };

  const removeLastSolution = () => {
    setClarityFlow((prev) => ({
      ...prev,
      solutions: prev.solutions.slice(0, -1),
    }));
  };

  const updateIfBlock = (index: number, updated: BaseBlock) => {
    setClarityFlow((prev) => {
      const newSolutions = [...prev.solutions];
      newSolutions[index] = {
        ...newSolutions[index],
        if: updated,
      };
      return { ...prev, solutions: newSolutions };
    });
  };

  return (
    <div className="space-y-8">
      <SolutionStatement
        initialStatement={clarityFlow.initialStatement}
        rootCause={rootCause}
      />

      {clarityFlow?.solutions?.map((entry, index) => {
        const thenBlock =
          index === 0
            ? rootCause
              ? invertNegation(rootCause)
              : baseBlockInitialValue
            : clarityFlow.solutions[index - 1].if;

        return (
          <div key={index} className="space-y-2">
            <TypographyMuted text="If:" />
            <BaseBlockComponent
              value={entry.if}
              onChange={(val) => updateIfBlock(index, val)}
            />
            <div className="flex gap-2 items-center">
              <TypographyMuted text="Then:" />

              <BaseBlockRawPhrase baseBlock={thenBlock} showCheckbox checked />
            </div>
          </div>
        );
      })}

      {/* Buttons row */}
      <div className="flex gap-4">
        <Button variant="outline" onClick={addSolution}>
          +
        </Button>
        <Button
          variant="outline"
          onClick={removeLastSolution}
          disabled={clarityFlow.solutions.length === 0}
        >
          −
        </Button>
      </div>
    </div>
  );
}
