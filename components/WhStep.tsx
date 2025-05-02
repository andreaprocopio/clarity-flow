"use client";
import React from "react";
import { TypographyList } from "./TypographyList";
import { TypographyBlockquote } from "./TypographyBlockquote";
import { TypographyMuted } from "./TypographyMuted";
import { Input } from "./ui/input";
import { whQuestionsType } from "@/lib/types";
import { ClarityFlow } from "@/lib/types";
import { useEffect } from "react";

interface WhStepProps {
  initialStatement: string;
  whQuestions: whQuestionsType;
  setClarityFlow: React.Dispatch<React.SetStateAction<ClarityFlow>>;
  whQuestionsResult: string;
}

const WhStep = ({
  initialStatement,
  whQuestions,
  setClarityFlow,
  whQuestionsResult,
}: WhStepProps) => {
  useEffect(() => {
    const { when, what, who, how } = whQuestions;
    const result = `${when}, ${what}, ${who}, ${how}`;
    setClarityFlow((prev) => ({
      ...prev,
      whQuestionsResult: result,
    }));
  }, [whQuestions, setClarityFlow]);

  return (
    <div className="space-y-12 max-h-[calc(100vh-200px)] overflow-y-auto">
      <TypographyBlockquote text={initialStatement} />
      <TypographyList
        listItems={[
          <div className="space-y-2" key={"what"}>
            <label className="block text-sm font-medium">What?</label>
            <Input
              placeholder="e.g. I need help figuring out task priorities"
              value={whQuestions.what}
              onChange={(e) =>
                setClarityFlow((prev) => ({
                  ...prev,
                  whQuestions: {
                    ...prev.whQuestions,
                    what: e.target.value,
                  },
                }))
              }
            />
            <p className="text-sm text-muted-foreground">
              What exactly are you trying to understand or solve?
            </p>
          </div>,
          <div className="space-y-2" key={"who"}>
            <label className="block text-sm font-medium">Who?</label>
            <Input
              placeholder="e.g. My manager and my team are involved"
              value={whQuestions.who}
              onChange={(e) =>
                setClarityFlow((prev) => ({
                  ...prev,
                  whQuestions: {
                    ...prev.whQuestions,
                    who: e.target.value,
                  },
                }))
              }
            />
            <p className="text-sm text-muted-foreground">
              Who is involved or affected by this situation?
            </p>
          </div>,
          <div className="space-y-2" key={"when"}>
            <label className="block text-sm font-medium">When?</label>
            <Input
              placeholder="e.g. This has been ongoing since last month"
              value={whQuestions.when}
              onChange={(e) =>
                setClarityFlow((prev) => ({
                  ...prev,
                  whQuestions: {
                    ...prev.whQuestions,
                    when: e.target.value,
                  },
                }))
              }
            />
            <p className="text-sm text-muted-foreground">
              When does this challenge usually occur or become noticeable?
            </p>
          </div>,
          <div className="space-y-2" key={"how"}>
            <label className="block text-sm font-medium">How?</label>
            <Input
              placeholder="e.g. I struggle to decide what's most urgent"
              value={whQuestions.how}
              onChange={(e) =>
                setClarityFlow((prev) => ({
                  ...prev,
                  whQuestions: {
                    ...prev.whQuestions,
                    how: e.target.value,
                  },
                }))
              }
            />
            <p className="text-sm text-muted-foreground">
              How is this challenge impacting your work or progress?
            </p>
          </div>,
        ]}
      />
      <div className="my-12">
        <TypographyMuted text="You may need to adjust your answers slightly to make this sentence meaningful." />
        <TypographyBlockquote text={whQuestionsResult} />
      </div>
    </div>
  );
};

export default WhStep;
