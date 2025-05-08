import { Icon, IconName } from "@/components/ui/icon-picker";
import { Avatar } from "@/components/ui/avatar";
import React from "react";

interface TaskIconProps {
  iconName: IconName;
}

const TaskIcon = ({ iconName }: TaskIconProps) => {
  return (
    <Avatar className="bg-accent flex items-center justify-center">
      <Icon name={iconName as IconName} size="18" />
    </Avatar>
  );
};

export default TaskIcon;
