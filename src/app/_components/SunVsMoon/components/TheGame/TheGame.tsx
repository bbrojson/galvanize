"use client";
import React from "react";
import "./sun.css";
import { useSunWebSockets } from "./hooks/useSunWebSockets";
import { oneByte } from "../../utils/oneByte";
import { STEPS, useSunVsMoonContext } from "../../store/SunVsMoonProvider";

export function TheGame() {
  const context = useSunVsMoonContext();

  const socket = useSunWebSockets({
    openCb: () => {
      setTimeout(() => context.setState(STEPS.VOTED), 2456);
    },
    errorCb: () => {
      context.setState(STEPS.CONNECTION_ERROR);
    },
    messageCb: (nr) => {
      context.setVotes(nr);
    },
    closeCb: () => {
      context.setState(STEPS.CHOOSE_SIDE);
    },
  });

  function handleSunset() {
    socket?.send(oneByte(context.mood === "SUN" ? 1 : 0));
  }

  function getButtonState() {
    switch (context.state) {
      case STEPS.INITIALIZATION:
        return {
          theme: "hidden",
          text: "Let's wait.",
        };
      case STEPS.VOTED: {
      }
      case STEPS.ALLOWED_TO_VOTE_AGAIN: {
      }
      default:
        return {
          theme: "default",
          text: `Click me ${context.votes}`,
        };
    }
  }
  console.log("getButtonState", getButtonState());

  return (
    <main className={context.mood}>
      {context.state === STEPS.VOTED ? (
        <button
          className="absolute bottom-9 left-0 right-0 z-10"
          id="button"
          onClick={handleSunset}
        >
          Click me {context.votes}
        </button>
      ) : null}

      <div className="sunwrapper">
        <div id="sun">
          <div id="nightbg"></div>
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
    </main>
  );
}
