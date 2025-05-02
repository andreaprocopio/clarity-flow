"use client";
import { CarouselContent, CarouselItem } from "./ui/carousel";
import React, { useState } from "react";
import InitialStatementStep from "./InitialStatementStep";
import WhStep from "./WhStep";
import GapsStep from "./GapsStep";
import FiveWhys from "./FiveWhys";
import DesiredOutcomeStep from "./DesiredOutcomeStep";
import BrainstormedActionStep from "./BrainstormedActionStep";
import SmartActionStep from "./SmartActionStep";
import type { ClarityFlow } from "@/lib/types";
import { clarityFlowInitialValue } from "@/lib/types";

const ClarityFormContent = () => {
  const [clarityFlow, setClarityFlow] = useState<ClarityFlow>(
    clarityFlowInitialValue
  );

  console.log(clarityFlow);

  return (
    <CarouselContent>
      <CarouselItem>
        <InitialStatementStep
          initialStatement={clarityFlow.initialStatement}
          setClarityFlow={setClarityFlow}
        />
      </CarouselItem>

      <CarouselItem>
        <WhStep
          initialStatement={clarityFlow.initialStatement}
          whQuestions={clarityFlow.whQuestions}
          setClarityFlow={setClarityFlow}
          whQuestionsResult={clarityFlow.whQuestionsResult}
        />
      </CarouselItem>

      <CarouselItem>
        <GapsStep
          idealSituation={clarityFlow.idealSituation}
          whQuestionsResult={clarityFlow.whQuestionsResult}
          setClarityFlow={setClarityFlow}
        />
      </CarouselItem>

      <CarouselItem>
        <FiveWhys gaps={clarityFlow.gaps} setClarityFlow={setClarityFlow} />
      </CarouselItem>

      <CarouselItem>
        <DesiredOutcomeStep
          desiredOutcomes={clarityFlow.desiredOutcomes}
          rootCauses={clarityFlow.rootCauses}
          setClarityFlow={setClarityFlow}
        />
      </CarouselItem>

      <CarouselItem>
        <BrainstormedActionStep
          brainstormedActions={clarityFlow.brainstormedActions}
          desiredOutcomes={clarityFlow.desiredOutcomes}
          setClarityFlow={setClarityFlow}
        />
      </CarouselItem>

      <CarouselItem>
        <SmartActionStep
          brainstormedActions={clarityFlow.brainstormedActions}
          smartActions={clarityFlow.smartActions}
          setClarityFlow={setClarityFlow}
        />
      </CarouselItem>
    </CarouselContent>
  );
};

export default ClarityFormContent;
