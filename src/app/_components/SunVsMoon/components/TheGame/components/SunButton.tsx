"use client";
import React from "react";
import {
  useMachine,
  useSunVsMoonContext,
} from "../../../store/SunVsMoonProvider";
import { Score } from "./Score";

export function SunButton({ onClick }: { onClick: () => void }) {
  const context = useSunVsMoonContext();
  const machine = useMachine();

  if (machine.state === "loading") {
    return null;
  }

  return (
    <div className="infoWrapper absolute bottom-9 left-0 right-0 z-10">
      {machine.state !== "startGame" && <Score votes={context.votes} />}
      <button id="button" className="select-none" onClick={onClick}>
        {(function buttonText() {
          if (machine.state === "startGame") {
            return "Vote";
          }
          if (machine.state === "score") {
            return "Vote again";
          }
          if (machine.state === "voteWon") {
            return "Bump!";
          }
          if (machine.state === "outvoted") {
            return "You were outvoted!";
          }
          return "Vote :)";
        })()}
      </button>
    </div>
  );
}
