"use client";

import React from "react";
import { SunVsMoonProvider, useMachine } from "./store/SunVsMoonProvider";
import { ConnectionFailedErrorMessage } from "./components/ConnectionFailedErrorMessage/ConnectionFailedErrorMessage";
import { TheGameContainer } from "./components/TheGame/TheGame.container";
import { AppLayout } from "../shared/AppLayout";
import { SunOrMoonContainer } from "./components/SunOrMoon.container";

function Component() {
  const machine = useMachine();

  if (machine.state === "chooseSite") {
    return <SunOrMoonContainer />;
  }

  if (machine.state === "connectionError") {
    return <ConnectionFailedErrorMessage />;
  }

  return <TheGameContainer />;
}

export function SunVsMoonPage() {
  return (
    <SunVsMoonProvider>
      <AppLayout>
        <Component />
      </AppLayout>
    </SunVsMoonProvider>
  );
}
