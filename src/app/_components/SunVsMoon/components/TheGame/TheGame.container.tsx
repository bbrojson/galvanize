"use client";
import React from "react";
import "./sun.css";
import { useMachine, useSunVsMoonContext } from "../../store/SunVsMoonProvider";
import { SunButton } from "./components/SunButton";
import { useSunWebSockets } from "./hooks/useSunWebSockets";
import { oneByte } from "../../utils/oneByte";

export function TheGameContainer() {
  const context = useSunVsMoonContext();
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
      context.setVotes(currentVote);

      const whoIsWinning: "SUN" | "MOON" | "NONE" =
        currentVote < 0 ? "MOON" : currentVote === 0 ? "NONE" : "SUN";

      console.log("whoIsWinning", whoIsWinning);

      if (whoIsWinning === "NONE") {
      } else if (whoIsWinning === machine.context.myMood) {
        machine.send({ type: "WIN", value: { mood: whoIsWinning } });
      } else {
        machine.send({ type: "LOSE", value: { mood: whoIsWinning } });
      }
    },
    closeCb: () => {
      // TODO machine.send({ type: "CLOSE_CONNECTION" });
    },
  });

  function handleSunset() {
    socket?.send(oneByte(machine.context.myMood === "SUN" ? 1 : 0));
    machine.send({
      type: machine.state === "startGame" ? "VOTE_FIRST_TIME" : "VOTE",
    });
  }

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
