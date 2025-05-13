import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { CircleHelp } from "lucide-react";

interface FlowPopoverProps {
  popoverText: string;
}

const FlowPopover = ({ popoverText }: FlowPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="h-8 w-8 p-1 cursor-pointer">
          <CircleHelp size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>{popoverText}</PopoverContent>
    </Popover>
  );
};

export default FlowPopover;
