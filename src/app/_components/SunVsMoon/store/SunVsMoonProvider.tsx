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
  votes: number;
}>();

const machineInitState = buildMachineInitState<{
  mood: keyof typeof MOOD;
  votes: number;
}>()(STATE_MACHINE);

const initialData: {
  machine: typeof machineInitState;
  mood: undefined | keyof typeof MOOD;
  myMood: undefined | keyof typeof MOOD;
  votes: number;
  setMood: (s: keyof typeof MOOD) => void;
  setMyMood: (s: keyof typeof MOOD) => void;
  setVotes: (s: number) => void;
} = {
  machine: machineInitState,
  mood: undefined,
  myMood: undefined,
  votes: 0,
  setMood: () => void 0,
  setMyMood: () => void 0,
  setVotes: () => void 0,
};

const SunVsMoonContext = createContext(initialData);

export function SunVsMoonProvider({ children }: { children: React.ReactNode }) {
  const [mood, setMood] = useState(initialData.mood);
  const [myMood, setMyMood] = useState(initialData.mood);
  const [votes, setVotes] = useState(0);

  const machine = useStateMachine(STATE_MACHINE);

  const value: typeof initialData = useMemo(
    () => ({
      machine,
      mood,
      votes,
      myMood,
      setMood,
      setVotes,
      setMyMood,
    }),
    [mood, votes, myMood, machine],
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
