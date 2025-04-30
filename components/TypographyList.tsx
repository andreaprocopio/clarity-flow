import { ReactNode } from "react";

interface TypographyListProps {
  listItems: ReactNode[];
}

export function TypographyList({ listItems }: TypographyListProps) {
  return (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
      {listItems.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
