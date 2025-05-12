import { BaseBlock } from "@/lib/types";
import React from "react";
import { TypographyMuted } from "@/components/TypographyMuted";
import { TypographySmall } from "./TypographySmall";
import BaseBlockRawPhrase from "./BaseBlockRawPhrase";
import { motion } from "framer-motion";

interface SolutionStatementProps {
  initialStatement: BaseBlock;
  rootCause: BaseBlock;
}

const invertNegation = (block: BaseBlock): BaseBlock => ({
  ...block,
  negation: !block?.negation,
});

const SolutionStatement = ({
  initialStatement,
  rootCause,
}: SolutionStatementProps) => {
  const invertedIf = invertNegation(rootCause);
  const invertedThen = invertNegation(initialStatement);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-2"
    >
      <TypographySmall
        text="✅ Your possible solution:"
        className="mb-6 block"
      />

      <div className="flex flex-col gap-2 ">
        <div className="flex gap-2 md:gap-4">
          <TypographyMuted text="if:" />
          <BaseBlockRawPhrase baseBlock={invertedIf} small={true} />
        </div>
        <div className="flex gap-2 md:gap-4">
          <TypographyMuted text="then:" />
          <BaseBlockRawPhrase baseBlock={invertedThen} small={true} />
        </div>
      </div>
    </motion.div>
  );
};

export default SolutionStatement;
