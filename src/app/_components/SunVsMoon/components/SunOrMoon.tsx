import React from "react";
import { Button } from "../../shared/Button";
import { MOOD, STEPS, useSunVsMoonContext } from "../store/SunVsMoonProvider";

export function SunOrMoon() {
  const context = useSunVsMoonContext();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-[#add8e6] from-20% to-[#151843] to-80%">
      <Button
        variant="sun"
        className="absolute top-20"
        onClick={() => {
          void context.setMyMood(MOOD.SUN);
          void context.setMood(MOOD.SUN);
          void context.setState(STEPS.INITIALIZATION);
        }}
      >
        Sun
      </Button>
      <h1 className="mb-20 transform text-center font-sans text-[24px] text-xl font-bold uppercase tracking-[3px] text-white">
        What part of the day are you today?
      </h1>
      <Button
        onClick={() => {
          void context.setMyMood(MOOD.MOON);
          void context.setMood(MOOD.MOON);
          void context.setState(STEPS.INITIALIZATION); // TODO - payload
        }}
        variant="moon"
        className="absolute bottom-20"
      >
        Moon
      </Button>
    </div>
  );
}
