import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AppLayout } from "../../shared/AppLayout";

export const STEPS = {
  CHOOSE_SIDE: "CHOOSE_SIDE",
  INITIALIZATION: "INITIALIZATION",
  CONNECTION_ERROR: "CONNECTION_ERROR",
  VOTED: "VOTED",
  OUTVOTED: "OUTVOTED",
  ALLOWED_TO_VOTE_AGAIN: "ALLOWED_TO_VOTE_AGAIN",
} as const;

export const MOOD = {
  SUN: "SUN",
  MOON: "MOON",
} as const;

const initialData: {
  state: keyof typeof STEPS;
  mood: undefined | keyof typeof MOOD;
  votes: number;
  setState: (s: keyof typeof STEPS) => void;
  setMood: (s: keyof typeof MOOD) => void;
  setVotes: (s: number) => void;
} = {
  state: STEPS.CHOOSE_SIDE,
  mood: undefined,
  votes: 0,
  setState: () => void 0,
  setMood: () => void 0,
  setVotes: () => void 0,
};

const SunVsMoonContext = createContext(initialData);

export function SunVsMoonProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState(initialData.state);
  const [mood, setMood] = useState(initialData.mood);
  const [votes, setVotes] = useState(0);

  useEffect(() => {
    if (mood === "SUN" && votes < 0) {
      setState(STEPS.OUTVOTED);
      setMood("MOON");
    } else if (mood === "MOON" && votes > 0) {
      setState(STEPS.OUTVOTED);
      setMood("SUN");
    } else {
      // vote of support
    }
  }, [votes]);

  const value: typeof initialData = useMemo(
    () => ({
      state,
      mood,
      votes,
      setState,
      setMood,
      setVotes,
    }),
    [mood, state, votes],
  );

  return (
    <SunVsMoonContext.Provider value={value}>
      <AppLayout>{children}</AppLayout>
    </SunVsMoonContext.Provider>
  );
}

export function useSunVsMoonContext() {
  const context = useContext(SunVsMoonContext);

  if (!context) throw new Error("SunVsMoonContext is missing.");

  return context;
}
