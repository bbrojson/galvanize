import React, { createContext, useContext, useMemo, useState } from "react";
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
  votes: number;
  setVotes: (s: number) => void;
} = {
  machine: machineInitState,
  votes: 0,
  setVotes: () => void 0,
};

const SunVsMoonContext = createContext(initialData);

export function SunVsMoonProvider({ children }: { children: React.ReactNode }) {
  const [votes, setVotes] = useState(0);

  const machine = useStateMachine(STATE_MACHINE);

  const value: typeof initialData = useMemo(
    () => ({
      machine,

      votes,
      setVotes,
    }),
    [votes, machine],
  );

  return (
    <SunVsMoonContext.Provider value={value}>
      {children}
    </SunVsMoonContext.Provider>
  );
}

export function useSunVsMoonContext() {
  const context = useContext(SunVsMoonContext);

  if (!context) throw new Error("SunVsMoonContext is missing.");

  return context;
}

export function useMachine() {
  const context = useContext(SunVsMoonContext);

  if (context?.machine === undefined)
    throw new Error("SunVsMoonContext is missing.");

  return context.machine;
}
