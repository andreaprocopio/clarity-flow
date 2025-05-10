import { ClarityForm } from "@/components/ClarityForm";
import React from "react";
import { WavyBackground } from "@/components/ui/wavy-background";

const ClarityPage = () => {
  return (
    <div className="max-w-lg lg:max-w-3xl xl:max-w-5xl w-full mx-auto flex flex-col gap-10">
      <ClarityForm />
      <WavyBackground
        containerClassName="absolute top-0 left-0 bottom-0 right-0 -z-10 opacity-50"
        backgroundFill="#090f1c"
        colors={["#3aaec1", "#2b8391", "#1d5760", "#0e2c30", "#48daf1"]}
      />
    </div>
  );
};

export default ClarityPage;
