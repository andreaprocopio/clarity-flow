import React from "react";
import BaseBlockComponent from "./BaseBlock";
import type { BaseBlock } from "@/lib/types";
import { TypographyMuted } from "@/components/TypographyMuted";
import { TypographyH2 } from "@/components/TypographyH2";

type Props = {
  value: BaseBlock;
  onChange: (block: BaseBlock) => void;
};

export default function StepInitialStatement({ value, onChange }: Props) {
  return (
    <div className="space-y-6">
      <TypographyH2 text="1. Define your problem" />
      <TypographyMuted
        text="Write a sentence that clearly describes what you are currently not doing or achieving.
        Keep it specific and action-oriented."
      />
      <BaseBlockComponent value={value} onChange={onChange} />
    </div>
  );
}
