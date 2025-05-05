interface TypographyInlineCodeProps {
  text: string;
}

export function TypographyInlineCode({ text }: TypographyInlineCodeProps) {
  return (
    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      {text}
    </code>
  );
}
