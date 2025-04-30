interface TypographyMutedProps {
  text: string;
}

export function TypographyMuted({ text }: TypographyMutedProps) {
  return <p className="text-sm text-muted-foreground">{text}</p>;
}
