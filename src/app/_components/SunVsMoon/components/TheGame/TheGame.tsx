"use client";
import React from "react";
import "./sun.css";
import { useSunWebSockets } from "./hooks/useSunWebSockets";
import { oneByte } from "../../utils/oneByte";
import { SunButton } from "./SunButton";
import { useGetMood } from "../../store/SunVsMoonProvider";

export function TheGame() {
  const socket = useSunWebSockets((nr: number) => {
    console.log("cb", nr);
  });

  const themeClassName = useGetMood();

  function handleSunset() {
    socket?.send(oneByte(1));
  }

  return (
    <main className={themeClassName}>
      <button type="button" onClick={handleSunset}>
        Click me
      </button>
      <SunButton />
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
