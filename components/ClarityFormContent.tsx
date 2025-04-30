"use client";
import { CarouselContent, CarouselItem } from "./ui/carousel";
import React, { useState, useEffect } from "react";
import InitialStatementStep from "./InitialStatementStep";
import type { whQuestionsType } from "@/lib/types";
import WhStep from "./WhStep";
import GapsStep from "./GapsStep";
import FiveWhys from "./FiveWhys";

const ClarityFormContent = () => {
  const [initialStatement, setInitialStatement] = useState("");
  const [whQuestions, setWhQuestions] = useState<whQuestionsType>({
    what: "",
    who: "",
    when: "",
    how: "",
  });
  const [whQuestionsResult, setWhQuestionsResult] = useState("");
  const [gaps, setGaps] = useState<string[]>([]);
  const [rootCauses, setRootCauses] = useState<string[]>([]);
  const [gapsInput, setGapsInput] = useState("");

  // Update final result when whQuestions changes
  useEffect(() => {
    const { when, what, who, how } = whQuestions;
    const result = `${when}, ${what}, ${who}, ${how}`;
    setWhQuestionsResult(result);
  }, [whQuestions]);

  return (
    <CarouselContent>
      <CarouselItem>
        <InitialStatementStep
          initialStatement={initialStatement}
          setInitialStatement={setInitialStatement}
        />
      </CarouselItem>

      <CarouselItem>
        <WhStep
          initialStatement={initialStatement}
          whQuestions={whQuestions}
          setWhQuestions={setWhQuestions}
          whQuestionsResult={whQuestionsResult}
        />
      </CarouselItem>

      <CarouselItem>
        <GapsStep
          whQuestionsResult={whQuestionsResult}
          gapsInput={gapsInput}
          setGapsInput={setGapsInput}
          setGaps={setGaps}
        />
      </CarouselItem>

      <CarouselItem>
        <FiveWhys gaps={gaps} setRootCauses={setRootCauses} />
      </CarouselItem>
    </CarouselContent>
  );
};

export default ClarityFormContent;
