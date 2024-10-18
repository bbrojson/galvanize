import React from "react";
import { Button } from "../../shared/Button";
import {
  MOOD,
  useMachine,
  useSunVsMoonContext,
} from "../store/SunVsMoonProvider";

export function SunOrMoonContainer() {
  const context = useSunVsMoonContext();
  const machine = useMachine();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-[#add8e6] from-20% to-[#151843] to-80%">
      <Button
        variant="sun"
        className="absolute top-20"
        onClick={() => {
          void context.setMyMood(MOOD.SUN);
          void context.setMood(MOOD.SUN);
          machine.send({ type: "CONNECT" });
        }}
      >
        Sun
      </Button>
      <h1 className="mb-20 transform text-center font-sans text-[24px] text-xl font-bold uppercase tracking-[3px] text-white">
        {machine.state === "connectionErrorxxxx"
          ? `You where disconnected!`
          : `What part of the day are you today?`}
      </h1>
      <Button
        onClick={() => {
          void context.setMyMood(MOOD.MOON);
          void context.setMood(MOOD.MOON);
          machine.send({ type: "CONNECT" });
        }}
        variant="moon"
        className="absolute bottom-20"
      >
        Moon
      </Button>
    </div>
  );
}
