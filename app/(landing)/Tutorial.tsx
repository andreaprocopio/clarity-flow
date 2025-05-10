import React from "react";
import { TypographyH2 } from "@/components/TypographyH2";
import { TypographyMuted } from "@/components/TypographyMuted";

const Tutorial = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-6 scroll-mt-24" id="tutorial">
      <div className="space-y-2 mb-12">
        <TypographyH2 text="But how does it *actually* work?" />
        <TypographyMuted
          className="md:text-base"
          text="Here’s a quick walkthrough to get you up and running 🚀"
        />
      </div>

      <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
        <video
          className="w-full h-full object-cover"
          src="/clarity-flow.mp4"
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="none"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Tutorial;
