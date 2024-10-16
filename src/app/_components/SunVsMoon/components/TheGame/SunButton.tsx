"use client";
import React from "react";
import "./sun.css";
import { useSunWebSockets } from "./hooks/useSunWebSockets";
import { oneByte } from "../../utils/oneByte";
import { STEPS, useSunVsMoonContext } from "../../store/SunVsMoonProvider";

function Button({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      className="absolute bottom-9 left-0 right-0 z-10"
      id="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function SunButton() {
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

  switch (context.state) {
    case STEPS.VOTED: {
      return <Button onClick={handleSunset}>Vote again {context.votes}</Button>;
    }
    case STEPS.ALLOWED_TO_VOTE_AGAIN: {
      return (
        <Button onClick={handleSunset}>Keep the mood {context.votes}</Button>
      );
    }
    default:
      return null;
  }
}
