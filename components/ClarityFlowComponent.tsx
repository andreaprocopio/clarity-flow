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
    title: "Task Details",
    icon: <LayoutList />,
  }
);
import React, { useState } from "react";
import StepInitialStatement from "./StepInitialStatement";
import { ClarityFlow } from "@/lib/types";
import { clarityFlowInitialValue } from "@/lib/types";
import { Button } from "./ui/button";
import StepWhys from "./StepWhys";
import StepSolutions from "./StepSolutions";
import StepTask from "./StepTask";
import CreateTaskButton from "./CreateTaskButton";

export const ClarityFlowComponent = () => {
  const [clarityFlow, setClarityFlow] = useState<ClarityFlow>(
    clarityFlowInitialValue
  );

  console.log(clarityFlow);

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
                      {step.id === "step-2" && (
                        <StepWhys
                          clarityFlow={clarityFlow}
                          setClarityFlow={setClarityFlow}
                        />
                      )}

                      {step.id === "step-3" && (
                        <StepSolutions
                          clarityFlow={clarityFlow}
                          setClarityFlow={setClarityFlow}
                        />
                      )}

                      {step.id === "step-4" && (
                        <StepTask
                          clarityFlow={clarityFlow}
                          setClarityFlow={setClarityFlow}
                        />
                      )}
                    </div>
                    <Stepper.Controls>
                      <Button
                        className="cursor-pointer disabled:cursor-not-allowed"
                        variant="secondary"
                        onClick={methods.prev}
                        disabled={methods.isFirst}
                      >
                        Previous
                      </Button>
                      {methods.isLast ? (
                        <CreateTaskButton clarityFlow={clarityFlow} />
                      ) : (
                        <Button
                          className="cursor-pointer disabled:cursor-not-allowed"
                          onClick={methods.next}
                        >
                          Next
                        </Button>
                      )}
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
