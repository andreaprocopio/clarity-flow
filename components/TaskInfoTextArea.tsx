import React from "react";
import { Textarea } from "@/components/ui/textarea";

interface TaskInfoTextAreaProps {
  label: string;
  text: string;
}

const TaskInfoTextArea = ({ label, text }: TaskInfoTextAreaProps) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">{label}</label>
      <Textarea value={text} disabled />
    </div>
  );
};

export default TaskInfoTextArea;
