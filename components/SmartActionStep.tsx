import React, { useState, useEffect } from "react";
import { TypographyLead } from "./TypographyLead";
import { TypographyH2 } from "./TypographyH2";
import { TypographyH4 } from "./TypographyH4";
import { Input } from "./ui/input";
import { TypographyBlockquote } from "./TypographyBlockquote";

interface SmartActionStepProps {
  brainstormedActions: string[];
  setSmartActions: React.Dispatch<React.SetStateAction<string[]>>;
}

const SmartActionStep = ({
  brainstormedActions,
  setSmartActions,
}: SmartActionStepProps) => {
  const [answers, setAnswers] = useState<
    {
      isTaskSpecific: string;
      isTaskMeasurable: string;
      isTaskAchievable: string;
      isTaskRelevant: string;
      isTaskTimeBound: string;
      combinedSentence: string;
    }[]
  >([]);

  useEffect(() => {
    if (brainstormedActions.length > 0) {
      setAnswers(
        brainstormedActions.map(() => ({
          isTaskSpecific: "",
          isTaskMeasurable: "",
          isTaskAchievable: "",
          isTaskRelevant: "",
          isTaskTimeBound: "",
          combinedSentence: "",
        }))
      );
    }
  }, [brainstormedActions]);

  const handleChange = (
    index: number,
    field:
      | "isTaskSpecific"
      | "isTaskMeasurable"
      | "isTaskAchievable"
      | "isTaskRelevant"
      | "isTaskTimeBound",
    value: string
  ) => {
    const updated = [...answers];
    updated[index][field] = value;

    const {
      isTaskSpecific,
      isTaskMeasurable,
      isTaskAchievable,
      isTaskRelevant,
      isTaskTimeBound,
    } = updated[index];

    const sentence = `This action is SMART: it is specific ("${isTaskSpecific}"), measurable ("${isTaskMeasurable}"), achievable ("${isTaskAchievable}"), relevant ("${isTaskRelevant}"), and time-bound ("${isTaskTimeBound}").`;

    updated[index].combinedSentence = sentence;
    setAnswers(updated);

    setSmartActions((prev) => {
      const newActions = [...prev];
      newActions[index] = sentence;
      return newActions;
    });
  };

  return (
    <div className="space-y-12 max-h-[calc(100vh-200px)] overflow-y-auto">
      <div className="space-y-4">
        <TypographyLead text="Let's get specific" />
        <TypographyH2 text="Smart Actions" />
      </div>
      {brainstormedActions.map((brainstormedAction, index) => (
        <div key={index} className="space-y-4 border p-4 rounded-xl">
          <p className="text-sm text-muted-foreground mb-2">
            Brainstormed Action #{index + 1}
          </p>
          <TypographyH4 text={brainstormedAction} />
          {answers[index]?.isTaskSpecific !== undefined && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                What exactly needs to be done?
              </label>
              <Input
                value={answers[index]?.isTaskSpecific}
                onChange={(e) =>
                  handleChange(index, "isTaskSpecific", e.target.value)
                }
                placeholder="e.g. Write tomorrow’s task list before bed"
              />
              <p className="text-sm text-muted-foreground">
                Is the task Specific? Describe the exact action you’ll take.
              </p>
            </div>
          )}
          {answers[index]?.isTaskMeasurable !== undefined && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                How will you know it’s done?
              </label>
              <Input
                value={answers[index]?.isTaskMeasurable}
                onChange={(e) =>
                  handleChange(index, "isTaskMeasurable", e.target.value)
                }
                placeholder="e.g. Complete 3 top-priority tasks"
              />
              <p className="text-sm text-muted-foreground">
                Is it Measurable? Define a clear result you can check off.
              </p>
            </div>
          )}
          {answers[index]?.isTaskAchievable !== undefined && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Why is this action realistic for you right now?
              </label>
              <Input
                value={answers[index]?.isTaskAchievable}
                onChange={(e) =>
                  handleChange(index, "isTaskAchievable", e.target.value)
                }
                placeholder="e.g. I can do this during my lunch break because it only takes 10 minutes"
              />
              <p className="text-sm text-muted-foreground">
                Reflect on your current situation. Explain how is this action
                realistic and doable in this moment.
              </p>
            </div>
          )}
          {answers[index]?.isTaskRelevant !== undefined && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                How does this task help address the root problem?
              </label>
              <Input
                value={answers[index]?.isTaskRelevant}
                onChange={(e) =>
                  handleChange(index, "isTaskRelevant", e.target.value)
                }
                placeholder="e.g. This helps me stop procrastinating by breaking work into smaller, manageable steps"
              />
              <p className="text-sm text-muted-foreground">
                Think about the core issue you&apos;re trying to solve. How does
                this specific task move you closer to a solution?
              </p>
            </div>
          )}
          {answers[index]?.isTaskTimeBound !== undefined && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                When will this be done?
              </label>
              <Input
                value={answers[index]?.isTaskTimeBound}
                onChange={(e) =>
                  handleChange(index, "isTaskTimeBound", e.target.value)
                }
                placeholder="e.g. Finish by 6 PM today"
              />
              <p className="text-sm text-muted-foreground">
                Is it Time-bound? Set a clear deadline or timeframe.
              </p>
            </div>
          )}
          Riepilogo d
          <div className="my-12">
            <TypographyBlockquote text={answers[index]?.combinedSentence} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SmartActionStep;
