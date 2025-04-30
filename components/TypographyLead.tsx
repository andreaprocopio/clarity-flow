interface TypographyLeadProps {
  text: string;
}

export function TypographyLead({ text }: TypographyLeadProps) {
  return <p className="text-xl text-muted-foreground">{text}</p>;
}
