import React from "react";
import { WavyBackground } from "@/components/ui/wavy-background";
import HomepageButton from "@/components/HomepageButton";
import { Button } from "@/components/ui/button";
import { CornerRightDown } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="min-h-screen overflow-hidden relative antialiased">
      <WavyBackground
        backgroundFill="#090f1c"
        colors={["#3aaec1", "#2b8391", "#1d5760", "#0e2c30", "#48daf1"]}
        className="max-w-4xl mx-auto"
        containerClassName="absolute top-0 left-0 bottom-0 right-0"
      >
        <div className="space-y-12 px-6 py-24 sm:py-32 lg:px-0">
          <div className="text-center space-y-6">
            <p className="text-3xl md:text-4xl lg:text-6xl text-white font-bold">
              Start with clarity{" "}
              <Image
                src="/clarityflow.png"
                alt="ClarityFlow logo"
                width={60}
                height={60}
                className="inline-block"
              />
              <br className="md:hidden" /> not chaos.
            </p>
            <p className="text-base md:text-lg text-white font-normal inter-var max-w-2xl mx-auto">
              ClarityFlow turns confusion into action{" "}
              <span className="hidden md:inline-block">
                by helping you define the root cause first.
              </span>
              <br />
              Every task you create is driven by real insight.
            </p>
          </div>

          <div className="flex justify-center flex-col gap-2 items-center md:flex-row md:gap-4">
            <HomepageButton
              text="Try ClarityFlow"
              href="/sign-up"
              hasIcon={true}
            />

            <Button
              variant="link"
              className="text-white cursor-pointer"
              asChild
            >
              <a href="#features" className="inline-flex items-center gap-1">
                Learn more
                <CornerRightDown />
              </a>
            </Button>
          </div>
        </div>
      </WavyBackground>
    </div>
  );
};

export default Hero;
