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
  CONNECTION_CLOSED: "CONNECTION_CLOSED",
  VOTED: "VOTED",
  OUTVOTED: "OUTVOTED",
} as const;

export const MOOD = {
  SUN: "SUN",
  MOON: "MOON",
} as const;

const initialData: {
  state: keyof typeof STEPS;
  mood: undefined | keyof typeof MOOD;
  myMood: undefined | keyof typeof MOOD;
  votes: number;
  setState: (s: keyof typeof STEPS) => void;
  setMood: (s: keyof typeof MOOD) => void;
  setMyMood: (s: keyof typeof MOOD) => void;
  setVotes: (s: number) => void;
} = {
  state: STEPS.CHOOSE_SIDE,
  mood: undefined,
  myMood: undefined,
  votes: 0,
  setState: () => void 0,
  setMood: () => void 0,
  setMyMood: () => void 0,
  setVotes: () => void 0,
};

const SunVsMoonContext = createContext(initialData);

export function SunVsMoonProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState(initialData.state);
  const [mood, setMood] = useState(initialData.mood);
  const [myMood, setMyMood] = useState(initialData.mood);
  const [votes, setVotes] = useState(0);

  useEffect(() => {
    // TODO - state machine
    function outvoted() {
      if (mood === myMood) {
        setState(STEPS.OUTVOTED);
      } else {
        setState(STEPS.VOTED);
      }
    }

    if (mood === "SUN" && votes < 0) {
      outvoted();
      setMood("MOON");
    } else if (mood === "MOON" && votes > 0) {
      outvoted();
      setMood("SUN");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [votes]);

  const value: typeof initialData = useMemo(
    () => ({
      state,
      mood,
      votes,
      myMood,
      setState,
      setMood,
      setVotes,
      setMyMood,
    }),
    [mood, state, votes, myMood],
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
