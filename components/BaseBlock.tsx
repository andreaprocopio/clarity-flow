import React, { useState, useId } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { BaseBlock } from "@/lib/types";
import { motion } from "framer-motion";
import { baseBlockSchema } from "@/lib/zod/baseBlockSchema";
import { z } from "zod";
import { TypographySmall } from "@/components/TypographySmall";
import BaseBlockRawPhrase from "./BaseBlockRawPhrase";

type BaseBlockProps = {
  value: BaseBlock;
  onChange: (block: BaseBlock) => void;
};

export default function BaseBlockComponent({
  value,
  onChange,
}: BaseBlockProps) {
  const id = useId();
  const [verbError, setVerbError] = useState<string | null>(null);

  const handleChange = (field: keyof BaseBlock, val: string | boolean) => {
    const updated = { ...value, [field]: val };

    if (field === "verb") {
      try {
        baseBlockSchema.pick({ verb: true }).parse({ verb: val });
        setVerbError(null);
      } catch (err) {
        if (err instanceof z.ZodError) {
          setVerbError(err.issues[0]?.message);
        }
      }
    }

    onChange(updated);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full max-w-md p-4 space-y-4 border rounded-xl bg-muted"
    >
      {/* Inputs row */}
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
        <Input
          placeholder="Subject"
          value={value.subject}
          onChange={(e) => handleChange("subject", e.target.value)}
          className="bg-accent border-none flex-1 min-w-0 h-10 text-sm"
        />
        <Input
          placeholder="Verb"
          value={value.verb}
          onChange={(e) => handleChange("verb", e.target.value)}
          className={`bg-accent flex-1 min-w-0 h-10 text-sm ${
            verbError ? "border border-red-500" : "border-none"
          }`}
        />
        <Input
          placeholder="Object"
          value={value.object}
          onChange={(e) => handleChange("object", e.target.value)}
          className="bg-accent border-none flex-1 min-w-0 h-10 text-sm"
        />
      </div>

      {/* Validation error */}
      {verbError && (
        <TypographySmall text={verbError} className="text-red-500 mt-1" />
      )}

      {/* Checkbox */}
      <div className="flex items-center space-x-2 pt-2">
        <Checkbox
          id={id}
          checked={value.negation}
          onCheckedChange={(checked) => handleChange("negation", !!checked)}
        />
        <Label htmlFor={id}>Negation</Label>
      </div>

      {/* Output preview with animation */}
      <motion.div
        key={
          value.negation.toString() + value.subject + value.verb + value.object
        }
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="pt-2"
      >
        <BaseBlockRawPhrase baseBlock={value} />
      </motion.div>
    </motion.div>
  );
}
