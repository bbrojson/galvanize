import React from "react";
import { Button } from "../../shared/Button";
import { MOOD, STEPS, useSunVsMoonState } from "../store/SunVsMoonProvider";

export function SunOrMoon() {
  const [, setState] = useSunVsMoonState();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-[#add8e6] from-20% to-[#151843] to-80%">
      <Button
        variant="sun"
        className="absolute top-20"
        onClick={() => void setState(STEPS.INITIALIZATION, MOOD.SUN)}
      >
        Sun
      </Button>
      <h1 className="mb-20 transform font-sans text-[24px] text-xl font-bold uppercase tracking-[3px] text-white">
        Pick your mood?
      </h1>
      <Button
        onClick={() => void setState(STEPS.INITIALIZATION, MOOD.MOON)}
        variant="moon"
        className="absolute bottom-20"
      >
        Moon
      </Button>
    </div>
  );
}
