"use client";
import React from "react";
import "./sun.css";
import { useMachine } from "../../store/SunVsMoonProvider";
import { SunButton } from "./components/SunButton";
import { useSunWebSockets } from "./hooks/useSunWebSockets";
import { oneByte } from "../../utils/oneByte";
import { whoIsWinning } from "../../utils/whoIsWinning";

export function TheGameContainer() {
  const machine = useMachine();

  const socket = useSunWebSockets({
    openCb: () => {
      setTimeout(() => {
        machine.send({ type: "RESOLVE" });
      }, 1);
    },
    errorCb: () => {
      machine.send({ type: "REJECT" });
    },
    messageCb: (currentVote) => {
      const whoWins = whoIsWinning(currentVote);

      machine.send({
        type: "UPDATE",
        value: {
          mood: whoWins !== "NONE" ? whoWins : machine.context.mood,
          votes: currentVote,
        },
      });
    },
    closeCb: () => {
      machine.send({
        type: "RESET",
      });
      throw new Error("You where disconnected!");
    },
  });

  function handleSunset() {
    socket?.send(oneByte(machine.context.myMood === "SUN" ? 1 : 0));
    machine.send({
      type: machine.state === "startGame" ? "VOTE_FIRST_TIME" : "VOTE",
    });
  }

  console.log("machine.context.mood", machine.context.mood);
  return (
    <>
      <SunButton onClick={handleSunset} />

      <div className={`sunWrapper ${machine.context.mood}`}>
        <div id="sun">
          <div className="night"></div>
          <div className="zzz1"></div>
          <div className="zzz2"></div>
          <div className="zzz3"></div>

          <div className="planet">
            <div className="face">
              <div className="eye">
                <div className="eye-in"></div>
              </div>
              <div className="mouth"></div>
              <div className="eye">
                <div className="eye-in"></div>
              </div>
            </div>
          </div>
          <div className="star pos-star1"></div>
          <div className="star pos-star2"></div>
          <div className="star pos-star3"></div>
        </div>
      </div>
    </>
  );
}
