interface TypographyBlockquoteProps {
  text: string;
}

export function TypographyBlockquote({ text }: TypographyBlockquoteProps) {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">
      &quot;{text}&quot;
    </blockquote>
  );
}
