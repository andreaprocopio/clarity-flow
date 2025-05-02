import React, { useState, useEffect } from "react";
import { TypographyLead } from "./TypographyLead";
import { TypographyH2 } from "./TypographyH2";
import { TypographyH4 } from "./TypographyH4";
import { Input } from "./ui/input";
import { TypographyBlockquote } from "./TypographyBlockquote";

interface BrainstormedActionStepProps {
  desiredOutcomes: string[];
  setBrainstormedActions: React.Dispatch<React.SetStateAction<string[]>>;
}

const BrainstormedActionStep = ({
  desiredOutcomes,
  setBrainstormedActions,
}: BrainstormedActionStepProps) => {
  const [answers, setAnswers] = useState<
    {
      actions: string;
      whatHasWorked: string;
      whatCouldGoWrong: string;
      externalResources: string;
      simplestStep: string;
      combinedSentence: string;
    }[]
  >([]);

  useEffect(() => {
    if (desiredOutcomes.length > 0) {
      setAnswers(
        desiredOutcomes.map(() => ({
          actions: "",
          whatHasWorked: "",
          whatCouldGoWrong: "",
          externalResources: "",
          simplestStep: "",
          combinedSentence: "",
        }))
      );
    }
  }, [desiredOutcomes]);

  const handleChange = (
    index: number,
    field:
      | "actions"
      | "whatHasWorked"
      | "externalResources"
      | "simplestStep"
      | "whatCouldGoWrong",
    value: string
  ) => {
    const updated = [...answers];
    updated[index][field] = value;

    const {
      actions,
      whatHasWorked,
      externalResources,
      simplestStep,
      whatCouldGoWrong,
    } = updated[index];

    const sentence = `To achieve the outcome, I could ${actions}. Based on what has worked before — "${whatHasWorked}" — and with the support of "${externalResources}", the simplest first step I could take is: "${simplestStep}".`;

    updated[index].combinedSentence = sentence;
    setAnswers(updated);

    setBrainstormedActions((prev) => {
      const newActions = [...prev];
      newActions[index] = sentence;
      return newActions;
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
          <TypographyH4 text={desiredOutcome} />

          {answers[index]?.actions !== undefined && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                What actions could you take?
              </label>
              <Input
                value={answers[index]?.actions}
                onChange={(e) => handleChange(index, "actions", e.target.value)}
                placeholder="e.g. Create a daily task plan"
              />
              <p className="text-sm text-muted-foreground">
                List concrete actions you could try to move toward your goal.
              </p>
            </div>
          )}

          {answers[index]?.whatHasWorked !== undefined && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                What has worked before?
              </label>
              <Input
                value={answers[index]?.whatHasWorked}
                onChange={(e) =>
                  handleChange(index, "whatHasWorked", e.target.value)
                }
                placeholder="e.g. Setting clear priorities each morning"
              />
              <p className="text-sm text-muted-foreground">
                Reflect on what has helped you or others in similar situations.
              </p>
            </div>
          )}

          {answers[index]?.whatCouldGoWrong !== undefined && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                What could go wrong?
              </label>
              <Input
                value={answers[index]?.whatCouldGoWrong}
                onChange={(e) =>
                  handleChange(index, "whatCouldGoWrong", e.target.value)
                }
                placeholder="e.g. Getting distracted by emails or meetings"
              />
              <p className="text-sm text-muted-foreground">
                Consider potential obstacles or risks that might get in the way.
              </p>
            </div>
          )}

          {answers[index]?.externalResources !== undefined && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Helpful resources or people
              </label>
              <Input
                value={answers[index]?.externalResources}
                onChange={(e) =>
                  handleChange(index, "externalResources", e.target.value)
                }
                placeholder="e.g. My mentor, a time management app"
              />
              <p className="text-sm text-muted-foreground">
                Who or what could support you in taking action?
              </p>
            </div>
          )}

          {answers[index]?.simplestStep !== undefined && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Simplest first step
              </label>
              <Input
                value={answers[index]?.simplestStep}
                onChange={(e) =>
                  handleChange(index, "simplestStep", e.target.value)
                }
                placeholder="e.g. Write down tomorrow's top 3 tasks"
              />
              <p className="text-sm text-muted-foreground">
                What&apos;s the smallest, easiest thing you could do to get
                started?
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

export default BrainstormedActionStep;
