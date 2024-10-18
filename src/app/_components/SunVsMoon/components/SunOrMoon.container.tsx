import React from "react";
import { Button } from "../../shared/Button";
import { MOOD, useMachine } from "../store/SunVsMoonProvider";

export function SunOrMoonContainer() {
  const machine = useMachine();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-[#add8e6] from-20% to-[#151843] to-80%">
      <Button
        variant="sun"
        className="absolute top-20"
        onClick={() => {
          machine.send({
            type: "CONNECT",
            value: { myMood: MOOD.SUN, mood: MOOD.SUN },
          });
        }}
      >
        Sun
      </Button>
      <h1 className="mb-20 transform text-center font-sans text-[24px] text-xl font-bold uppercase tracking-[3px] text-white">
        {`What part of the day are you today?`}
      </h1>
      <Button
        onClick={() => {
          machine.send({
            type: "CONNECT",
            value: { myMood: MOOD.MOON, mood: MOOD.MOON },
          });
        }}
        variant="moon"
        className="absolute bottom-20"
      >
        Moon
      </Button>
    </div>
  );
}
