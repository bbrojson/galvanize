"use client";
import React, { useEffect, useState } from "react";
import {
  useMachine,
  useSunVsMoonContext,
} from "../../../store/SunVsMoonProvider";
import { Score } from "./Score";

export function SunButton({ onClick }: { onClick: () => void }) {
  const context = useSunVsMoonContext();
  const machine = useMachine();
  const [text, setText] = useState("Vote");

  useEffect(() => {
    {
      if (machine.state === "startGame") {
        setText("Vote");
      }
      if (machine.state === "voteWon") {
        setText("Bump!");
      }
      if (machine.state === "outvoted") {
        setText("You were outvoted!");
      }
    }
  }, [machine.state]);

  if (machine.state === "loading") {
    return null;
  }

  return (
    <div className="infoWrapper absolute bottom-9 left-0 right-0 z-10">
      {machine.state !== "startGame" && <Score votes={context.votes} />}
      <button id="button" className="select-none" onClick={onClick}>
        {text}
      </button>
    </div>
  );
}
