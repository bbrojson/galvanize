"use client";

import React from "react";
import {
  STEPS,
  SunVsMoonProvider,
  useSunVsMoonState,
} from "./store/SunVsMoonProvider";
import { ConnectionFailedErrorMessage } from "./components/ConnectionFailedErrorMessage";
import { SunOrMoon } from "./components/SunOrMoon";
import { TheGame } from "./components/TheGame/TheGame";

function Component() {
  const [state] = useSunVsMoonState();

  if (state === STEPS.CHOOSE_SIDE) {
    return <SunOrMoon />;
  }

  if (state === STEPS.CONECTION_ERROR) {
    return <ConnectionFailedErrorMessage />;
  }

  return <TheGame />;
}

export function SunVsMoonPage() {
  return (
    <SunVsMoonProvider>
      <Component />
    </SunVsMoonProvider>
  );
}
