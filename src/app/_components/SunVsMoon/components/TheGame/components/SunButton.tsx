"use client";
import React, { useEffect, useState } from "react";
import { useMachine } from "../../../store/SunVsMoonProvider";
import { Score } from "./Score";
import { whoIsWinning } from "../../../utils/whoIsWinning";

export function SunButton({ onClick }: { onClick: () => void }) {
  const machine = useMachine();

  function getButtonText() {
    if (machine.state === "startGame") {
      return "Vote";
    }

    const whoWins = whoIsWinning(machine.context.votes);

    if (whoWins === "NONE") {
      return "Only one more!";
    } else if (whoWins === machine.context.myMood) {
      return "Bump!";
    }
    return "You were outvoted!";
  }

  const [text, setText] = useState(getButtonText());
  console.log("first", text);
  useEffect(() => {
    setText(getButtonText());
  }, [machine.context.myMood, machine.context.votes, machine.state]);

  if (machine.state === "loading") {
    return null;
  }

  return (
    <div className="infoWrapper absolute bottom-9 left-0 right-0 z-10">
      {machine.state !== "startGame" && <Score votes={machine.context.votes} />}
      <button id="button" className="select-none" onClick={onClick}>
        {text}
      </button>
    </div>
  );
}
