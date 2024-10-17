"use client";
import React from "react";
import "./sun.css";
import { useSunWebSockets } from "./hooks/useSunWebSockets";
import { oneByte } from "../../utils/oneByte";
import { STEPS, useSunVsMoonContext } from "../../store/SunVsMoonProvider";

function Button({
  onClick,
  children,
  votes,
}: {
  onClick: () => void;
  children: React.ReactNode;
  votes: number;
}) {
  return (
    <div className="infoWrapper absolute bottom-9 left-0 right-0 z-10">
      <div className="score">
        <div className="SUN">
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
        </div>
        <div className="scoreText">
          <div className="text">{votes > 0 ? votes : 0}</div>
          <div className="text">:</div>
          <div className="text">{votes < 0 ? Math.abs(votes) : 0}</div>
        </div>
        <div className="MOON">
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
        </div>
      </div>

      <button id="button" className="select-none" onClick={onClick}>
        {children}
      </button>
    </div>
  );
}

export function SunButton() {
  const context = useSunVsMoonContext();

  const socket = useSunWebSockets({
    openCb: () => {
      setTimeout(() => context.setState(STEPS.VOTED), 2435);
    },
    errorCb: () => {
      context.setState(STEPS.CONNECTION_ERROR);
    },
    messageCb: (nr) => {
      context.setVotes(nr);
    },
    closeCb: () => {
      context.setState(STEPS.CONNECTION_CLOSED);
    },
  });

  function handleSunset() {
    socket?.send(oneByte(context.myMood === "SUN" ? 1 : 0));
  }

  switch (context.state) {
    case STEPS.INITIALIZATION:
      return null;
    case STEPS.VOTED: {
      return (
        <Button onClick={handleSunset} votes={context.votes}>
          Vote again
        </Button>
      );
    }
    case STEPS.OUTVOTED: {
      return (
        <Button onClick={handleSunset} votes={context.votes}>
          You were outvoted!
        </Button>
      );
    }
    default:
      return (
        <Button onClick={handleSunset} votes={context.votes}>
          Last one
        </Button>
      );
  }
}
