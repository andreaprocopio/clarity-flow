"use client";
import { Carousel, type CarouselApi } from "@/components/ui/carousel";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ClarityFormContent from "./ClarityFormContent";

export function ClarityForm() {
  const [api, setApi] = useState<CarouselApi | null>(null);

  const scrollPrev = () => {
    if (api) {
      api.scrollPrev();
    }
  };

  const scrollNext = () => {
    if (api) {
      api.scrollNext();
    }
  };

  return (
    <Carousel
      setApi={setApi}
      className="flex flex-col grow gap-10"
      opts={{
        watchDrag: false,
        watchFocus: false,
        watchSlides: false,
        loop: false,
      }}
    >
      <ClarityFormContent />
      <div className="flex items-center justify-between  mt-auto">
        <Button onClick={scrollPrev} variant="secondary">
          Back
        </Button>
        <Button onClick={scrollNext}>Continue</Button>
      </div>
    </Carousel>
  );
}
