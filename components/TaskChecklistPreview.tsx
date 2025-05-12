import React from "react";
import { ClarityFlow } from "@/lib/types";
import BaseBlockRawPhrase from "./BaseBlockRawPhrase";
import { TypographyMuted } from "./TypographyMuted";

interface ChecklistPreviewProps {
  clarityFlow: ClarityFlow;
}

const ChecklistPreview = ({ clarityFlow }: ChecklistPreviewProps) => {
  const checklist = [...clarityFlow.solutions].reverse().map((item) => item.if);

  if (checklist.length === 0) return null;

  return (
    <div className="space-y-3 py-6">
      <TypographyMuted text="Checklist preview:" />
      <ul className="space-y-2 pl-2">
        {checklist.map((block, index) => (
          <li key={index} className="flex items-center gap-2">
            <span className="mt-1">⬜</span>
            <BaseBlockRawPhrase baseBlock={block} small />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChecklistPreview;
