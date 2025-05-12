import React from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { TypographyMuted } from "@/components/TypographyMuted";
import { Badge } from "@/components/ui/badge";
import type { BaseBlock } from "@/lib/types";
import { motion } from "framer-motion";

type BaseBlockProps = {
  value: BaseBlock;
  onChange: (block: BaseBlock) => void;
};

export default function BaseBlockComponent({
  value,
  onChange,
}: BaseBlockProps) {
  const handleChange = (field: keyof BaseBlock, val: string | boolean) => {
    onChange({ ...value, [field]: val });
  };

  const renderRawPhrase = () => {
    const subject = value.subject || "[subject]";
    const verb = value.verb || "[verb]";
    const object = value.object || "[object]";
    return `${subject} ${verb} ${object}`.trim();
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
          className="bg-accent border-none flex-1 min-w-0 h-10 text-sm"
        />
        <Input
          placeholder="Object"
          value={value.object}
          onChange={(e) => handleChange("object", e.target.value)}
          className="bg-accent border-none flex-1 min-w-0 h-10 text-sm"
        />
      </div>

      {/* Checkbox */}
      <div className="flex items-center space-x-2 pt-2">
        <Checkbox
          id="negation"
          checked={value.negation}
          onCheckedChange={(checked) => handleChange("negation", !!checked)}
        />
        <Label htmlFor="negation">Negation</Label>
      </div>

      {/* Output preview with animation */}
      <motion.div
        key={value.negation.toString() + renderRawPhrase()}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="pt-2"
      >
        {value.negation ? (
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="destructive">NOT</Badge>
            <TypographyMuted text={renderRawPhrase()} />
          </div>
        ) : (
          <TypographyMuted text={renderRawPhrase()} />
        )}
      </motion.div>
    </motion.div>
  );
}
