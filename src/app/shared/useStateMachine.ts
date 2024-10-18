import { useReducer, type Dispatch, useRef, useMemo } from "react";

type MachineTransition<State extends string> = {
  target: State;
};

interface MachineState<State extends string, Event extends string> {
  on?: {
    [key in Event]?: MachineTransition<State>;
  };
}

interface MachineConfig<Context, State extends string, Event extends string> {
  initial: State;
  context: Context;
  states: {
    [key in State]: MachineState<State, Event>;
  };
}

interface UseMachineState<Context, State extends string> {
  state: State;
  context: Context;
}

interface EventObject<Context, EventString extends string> {
  type: EventString | "RESET";
  value?: Partial<Context>;
}

function buildReducerInitial<
  Context,
  State extends string,
  Events extends string,
>(config: MachineConfig<Context, State, Events>) {
  return {
    state: config.initial,
    context: config.context,
  };
}

function buildReducer<Context, State extends string, Events extends string>(
  config: MachineConfig<Context, State, Events>,
) {
  return function reducer(
    state: UseMachineState<Context, State>,
    event: EventObject<Context, Events>,
  ): UseMachineState<Context, State> {
    let nextState;
    if (event.type === "RESET") {
      nextState = config.initial;
    } else {
      nextState = config.states[state.state].on?.[event.type]?.target;
    }

    if (nextState === undefined) return state;

    let newContext = state.context;
    if (event.value) {
      newContext = {
        ...state.context,
        ...event.value,
      };
    }

    return {
      context: newContext,
      state: nextState,
    };
  };
}

function tsHack<Context>() {
  return function useStateMachineImpl<
    State extends string,
    Events extends string,
  >(config: MachineConfig<Context, State, Events>) {
    const sendFn = useRef<(event: EventObject<Context, Events>) => void>();

    const [value, dispatch] = useReducer(
      buildReducer(config),
      buildReducerInitial(config),
    );

    if (sendFn.current === undefined) {
      sendFn.current = function send(event: EventObject<Context, Events>) {
        console.debug("sm => send:", event);
        dispatch(event);
      };
    }

    const ret = useMemo(() => {
      console.debug("sm => state:", value.state);
      return {
        context: value.context,
        state: value.state,
        send: sendFn.current!,
      };
    }, [value]);

    return ret;
  };
}

function tsHackType<Context>() {
  return function useStateMachineImpl<
    State extends string,
    Events extends string,
  >(config: MachineConfig<Context, State, Events>) {
    return {
      ...buildReducerInitial(config),
      send: function send(event: EventObject<Context, Events>) {
        void event;
      },
    };
  };
}

type UseStateMachine<Context> = <State extends string, Events extends string>(
  config: MachineConfig<Context, State, Events>,
) => {
  context: Context;
  state: State;
  send: Dispatch<EventObject<Context, Events>>;
};

export function buildUseStateMachine<Context>(): UseStateMachine<Context> {
  return tsHack();
}

export function buildMachineInitState<Context>(): UseStateMachine<Context> {
  return tsHackType();
}
