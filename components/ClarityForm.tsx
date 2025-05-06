"use client";
import { Carousel, type CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ClarityFormContent from "./ClarityFormContent";
import { clarityFlowInitialValue } from "@/lib/types";
import type { ClarityFlow } from "@/lib/types";
import CreateTaskButton from "./CreateTaskButton";

export function ClarityForm() {
  const [clarityFlow, setClarityFlow] = useState<ClarityFlow>(
    clarityFlowInitialValue
  );

  const [api, setApi] = useState<CarouselApi | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!api) return;

    const updateScrollState = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    updateScrollState();
    api.on("select", updateScrollState);

    // Impedisce lo scorrimento quando si preme tab
    api.slideNodes().forEach((slideNode, slideIndex) => {
      slideNode.addEventListener(
        "focus",
        () => {
          api.rootNode().scrollLeft = 0;
          api.slideNodes()[slideIndex].blur();
        },
        {
          passive: true,
          capture: true,
        }
      );
    });

    return () => {
      api.off("select", updateScrollState);
    };
  }, [api]);

  const scrollPrev = () => {
    if (api) api.scrollPrev();
  };

  const scrollNext = () => {
    if (api) api.scrollNext();
  };

  return (
    <Carousel
      orientation="horizontal"
      setApi={setApi}
      className="flex flex-col grow gap-10"
      opts={{
        watchDrag: false,
        watchFocus: false,
        watchSlides: false,
        loop: false,
      }}
    >
      <ClarityFormContent
        clarityFlow={clarityFlow}
        setClarityFlow={setClarityFlow}
      />
      <div className="flex items-center justify-between mt-auto">
        <Button
          onClick={scrollPrev}
          variant="secondary"
          disabled={!canScrollPrev}
          className={canScrollPrev ? "cursor-pointer" : "cursor-not-allowed"}
        >
          Back
        </Button>

        {canScrollNext ? (
          <Button onClick={scrollNext} className="select-none cursor-pointer">
            Continue
          </Button>
        ) : (
          <CreateTaskButton clarityFlow={clarityFlow} />
        )}
      </div>
    </Carousel>
  );
}
