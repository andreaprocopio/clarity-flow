import { BaseBlock } from "@/lib/types";
import React from "react";
import { TypographyMuted } from "@/components/TypographyMuted";
import { TypographySmall } from "./TypographySmall";
import { Badge } from "@/components/ui/badge";

interface BaseBlockRawPhraseProps {
  baseBlock: BaseBlock;
  small?: boolean;
  showCheckbox?: boolean;
  checked?: boolean;
}

const BaseBlockRawPhrase = ({
  baseBlock,
  small = false,
  showCheckbox = false,
  checked = false,
}: BaseBlockRawPhraseProps) => {
  const renderRawPhrase = () => {
    const subject = baseBlock.subject || "[subject]";
    const verb = baseBlock.verb || "[verb]";
    const object = baseBlock.object || "[object]";
    return `${subject} ${verb} ${object}`.trim();
  };

  const Text = small ? TypographySmall : TypographyMuted;
  const Phrase = baseBlock.negation ? (
    <div className="flex items-center gap-2 flex-wrap">
      <Badge variant="destructive">NOT</Badge>
      <Text text={renderRawPhrase()} />
    </div>
  ) : (
    <Text text={renderRawPhrase()} />
  );

  if (!showCheckbox) return Phrase;

  return (
    <div className="flex items-center gap-2">
      <span>{checked ? "✅" : "⬜"}</span>
      {Phrase}
    </div>
  );
};

export default BaseBlockRawPhrase;
