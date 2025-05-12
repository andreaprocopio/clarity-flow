"use client";

import React from "react";
import { useState } from "react";
import type { BaseBlock } from "@/lib/types";
import StepInitialStatement from "./StepInitialStatement";

const TestPage = () => {
  const [initialStatement, setInitialStatement] = useState<BaseBlock>({
    subject: "",
    verb: "",
    object: "",
    negation: false,
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <StepInitialStatement
        value={initialStatement}
        onChange={setInitialStatement}
      />
    </div>
  );
};

export default TestPage;
