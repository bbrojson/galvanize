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
      context.setState(STEPS.VOTED);
    },
    errorCb: () => {
      context.setState(STEPS.CONECTION_ERROR);
    },
    messageCb: (nr) => {
      console.log("nr", nr);
    },
    closeCb: () => {
      context.setState(STEPS.CHOOSE_SIDE);
    },
  });

  function handleSunset() {
    socket?.send(oneByte(context.mood === "SUN" ? 1 : 0));
  }

  return (
    <main className={context.mood}>
      <button
        className="absolute bottom-9 left-0 right-0 z-10"
        id="button"
        onClick={handleSunset}
      >
        Click me
      </button>
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
