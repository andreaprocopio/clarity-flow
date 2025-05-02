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
  // TODO: here we need the general state, let's first create the type
  const [clarityFlow, setClarityFlow] = useState<ClarityFlow>(
    clarityFlowInitialValue
  );

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
          desiredOutcomes={desiredOutcomes}
          setBrainstormedActions={setBrainstormedActions}
        />
      </CarouselItem>

      <CarouselItem>
        <SmartActionStep
          brainstormedActions={brainstormedActions}
          setSmartActions={setSmartActions}
        />
      </CarouselItem>
    </CarouselContent>
  );
};

export default ClarityFormContent;
