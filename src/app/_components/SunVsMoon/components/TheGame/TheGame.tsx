"use client";
import React from "react";
import "./sun.css";
import { useSunVsMoonContext } from "../../store/SunVsMoonProvider";
import { SunButton } from "./SunButton";

export function TheGame() {
  const context = useSunVsMoonContext();

  return (
    <>
      <SunButton />

      <div className={`sunWrapper ${context.mood}`}>
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
