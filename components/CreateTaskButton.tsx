"use client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { createTask } from "@/lib/actions/createTask";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ClarityFlow } from "@/lib/types";

interface CreateTaskButtonProps {
  clarityFlow: ClarityFlow;
}

const CreateTaskButton = ({ clarityFlow }: CreateTaskButtonProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const result = await createTask(clarityFlow);
    setLoading(false);

    if (result.success) {
      toast.success("Tasks created successfully.");
      router.push("/tasks");
    } else {
      toast.error("Failed to create tasks.");
    }
  };

  return (
    <Button onClick={handleClick} disabled={loading}>
      {loading ? "Creating..." : "Create tasks"}
    </Button>
  );
};

export default CreateTaskButton;
