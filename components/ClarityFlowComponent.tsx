"use client";

import { defineStepper } from "@/components/ui/stepper";

import { Flag, CircleHelp, Lightbulb, LayoutList } from "lucide-react";

const { Stepper } = defineStepper(
  {
    id: "step-1",
    title: "Define Problem",
    icon: <Flag />,
  },
  {
    id: "step-2",
    title: "Root Cause",
    icon: <CircleHelp />,
  },
  {
    id: "step-3",
    title: "Solutions",
    icon: <Lightbulb />,
  },
  {
    id: "step-4",
    title: "Task",
    icon: <LayoutList />,
  }
);
import React, { useState } from "react";
import StepInitialStatement from "./StepInitialStatement";
import { ClarityFlow } from "@/lib/types";
import { clarityFlowInitialValue } from "@/lib/types";
import { Button } from "./ui/button";

export const ClarityFlowComponent = () => {
  const [clarityFlow, setClarityFlow] = useState<ClarityFlow>(
    clarityFlowInitialValue
  );

  return (
    <Stepper.Provider className="space-y-4" variant="vertical" tracking={false}>
      {({ methods }) => (
        <React.Fragment>
          <Stepper.Navigation>
            {methods.all.map((step) => (
              <Stepper.Step
                key={step.id}
                of={step.id}
                onClick={() => methods.goTo(step.id)}
                icon={step.icon}
              >
                <Stepper.Title>{step.title}</Stepper.Title>
                {methods.when(step.id, () => (
                  <Stepper.Panel className="space-y-4">
                    <div className="md:p-8">
                      {step.id === "step-1" && (
                        <StepInitialStatement
                          clarityFlow={clarityFlow}
                          setClarityFlow={setClarityFlow}
                        />
                      )}
                      {step.id !== "step-1" && (
                        <p className="text-xl font-normal">
                          Content for {step.id}
                        </p>
                      )}
                    </div>
                    <Stepper.Controls>
                      <Button
                        variant="secondary"
                        onClick={methods.prev}
                        disabled={methods.isFirst}
                      >
                        Previous
                      </Button>
                      <Button
                        onClick={methods.isLast ? methods.reset : methods.next}
                      >
                        {methods.isLast ? "Reset" : "Next"}
                      </Button>
                    </Stepper.Controls>
                  </Stepper.Panel>
                ))}
              </Stepper.Step>
            ))}
          </Stepper.Navigation>
        </React.Fragment>
      )}
    </Stepper.Provider>
  );
};
