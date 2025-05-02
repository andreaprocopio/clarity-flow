import React, { useState, useEffect } from "react";
import { TypographyLead } from "./TypographyLead";
import { TypographyMuted } from "./TypographyMuted";
import { Input } from "./ui/input";
import { TypographyH2 } from "./TypographyH2";
import type { ClarityFlow } from "@/lib/types";

interface FiveWhysProps {
  gaps: string[];
  setClarityFlow: React.Dispatch<React.SetStateAction<ClarityFlow>>;
}

const FiveWhys = ({ gaps, setClarityFlow }: FiveWhysProps) => {
  const [whyChains, setWhyChains] = useState<string[][]>([]);

  useEffect(() => {
    if (gaps.length > 0) {
      setWhyChains(gaps.map(() => [""]));
    }
  }, [gaps]);

  // Sync root causes whenever the last answer in each chain changes
  useEffect(() => {
    const updatedRootCauses = whyChains.map((chain) => {
      const nonEmpty = chain.filter((w) => w.trim() !== "");
      return nonEmpty[nonEmpty.length - 1] || "";
    });

    setClarityFlow((prev) => ({
      ...prev,
      rootCauses: updatedRootCauses,
    }));
  }, [whyChains, setClarityFlow]);

  const handleWhyChange = (
    gapIndex: number,
    whyIndex: number,
    value: string
  ) => {
    setWhyChains((prev) => {
      const updated = [...prev];
      const chain = [...updated[gapIndex]];
      chain[whyIndex] = value;

      // Add a new "Why?" field if the current one is the last and not empty
      if (whyIndex === chain.length - 1 && value.trim() !== "") {
        chain.push("");
      }

      updated[gapIndex] = chain;
      return updated;
    });
  };

  return (
    <div className="space-y-12 max-h-[calc(100vh-200px)] overflow-y-auto">
      <div className="space-y-4">
        <TypographyLead text="Let's dive deeper" />
        <TypographyH2 text="His Majesty, the 5 Whys" />
        <TypographyMuted text="Keep asking 'why' until you uncover the root cause." />
      </div>
      {gaps.map((gap, gapIndex) => (
        <div key={gapIndex} className="space-y-4 border p-4 rounded-xl">
          <p className="text-sm text-muted-foreground mb-2">
            Gap #{gapIndex + 1}
          </p>
          <label className="block text-md font-semibold">{gap}</label>

          {whyChains[gapIndex] &&
            whyChains[gapIndex].map((why, whyIndex) => (
              <div key={whyIndex} className="space-y-2">
                <label className="block text-sm font-medium">
                  Why {whyIndex + 1}?
                </label>
                <Input
                  value={why}
                  onChange={(e) =>
                    handleWhyChange(gapIndex, whyIndex, e.target.value)
                  }
                  placeholder={`Answer to Why ${whyIndex + 1}`}
                />
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default FiveWhys;
