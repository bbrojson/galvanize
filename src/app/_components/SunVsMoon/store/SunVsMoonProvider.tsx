import React, { createContext, useContext, useMemo, useState } from "react";
import { AppLayout } from "../../shared/AppLayout";

export const STEPS = {
  CHOOSE_SIDE: "CHOOSE_SIDE",
  INITIALIZATION: "INITIALIZATION",
  CONECTION_ERROR: "CONECTION_ERROR",
  VOTED: "VOTED_ONCE",
  ALLLOWED_TO_VOTE_AGAIN: "ALLLOWED_TO_VOTE_AGAIN",
} as const;

export const MOOD = {
  SUN: "SUN",
  MOON: "MOON",
} as const;

const initialData: {
  state: keyof typeof STEPS;
  MOOD: undefined | keyof typeof MOOD;
  setState: (s: keyof typeof STEPS, payload: keyof typeof MOOD) => void;
} = {
  state: STEPS.CHOOSE_SIDE,
  MOOD: undefined,
  setState: () => void 0,
};

const SunVsMoonContext = createContext(initialData);

export function SunVsMoonProvider({ children }: { children: React.ReactNode }) {
  const [values, setValues] = useState(initialData);

  const value: typeof initialData = useMemo(
    () => ({
      ...values,
      setState: (state: keyof typeof STEPS, payload: keyof typeof MOOD) => {
        setValues((s) => ({
          ...s,
          MOOD: payload,
          state,
        }));
      },
    }),
    [values],
  );

  return (
    <SunVsMoonContext.Provider value={value}>
      <AppLayout>{children}</AppLayout>
    </SunVsMoonContext.Provider>
  );
}

export function useSunVsMoonState() {
  const context = useContext(SunVsMoonContext);

  if (!context) throw new Error("SunVsMoonContext is missing.");

  return [context.state, context.setState] as const;
}
