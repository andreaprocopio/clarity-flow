import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface TaskInfoCollapsibleSectionProps {
  title: string;
  content: string;
}

const TaskInfoCollapsibleSection = ({
  title,
  content,
}: TaskInfoCollapsibleSectionProps) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="font-bold">{title}</AccordionTrigger>
        <AccordionContent>{content}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TaskInfoCollapsibleSection;
