import React, { createContext, useContext, useMemo } from "react";
import {
  buildUseStateMachine,
  buildMachineInitState,
} from "~/app/shared/useStateMachine";
import STATE_MACHINE from "./stateMachine";

export const MOOD = {
  SUN: "SUN",
  MOON: "MOON",
} as const;

const useStateMachine = buildUseStateMachine<{
  mood: keyof typeof MOOD;
  myMood: keyof typeof MOOD;
  votes: number;
}>();

const machineInitState = buildMachineInitState<{
  mood: keyof typeof MOOD;
  myMood: keyof typeof MOOD;
  votes: number;
}>()(STATE_MACHINE);

const initialData: {
  machine: typeof machineInitState;
} = {
  machine: machineInitState,
};

const SunVsMoonContext = createContext(initialData);

export function SunVsMoonProvider({ children }: { children: React.ReactNode }) {
  const machine = useStateMachine(STATE_MACHINE);

  const value: typeof initialData = useMemo(
    () => ({
      machine,
    }),
    [machine],
  );

  return (
    <SunVsMoonContext.Provider value={value}>
      {children}
    </SunVsMoonContext.Provider>
  );
}

export function useMachine() {
  const context = useContext(SunVsMoonContext);

  if (context?.machine === undefined)
    throw new Error("SunVsMoonContext is missing.");

  return context.machine;
}
