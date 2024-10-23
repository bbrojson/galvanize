/* eslint-disable import/no-anonymous-default-export */
export default {
  context: {
    votes: 0,
  },
  id: "SunVsMoon",
  initial: "chooseSite",
  states: {
    chooseSite: {
      on: {
        CONNECT: {
          target: "loading",
        },
        NEO: {
          target: "startGame",
        },
      },
    },
    loading: {
      on: {
        REJECT: {
          target: "connectionError",
        },
        RESOLVE: {
          target: "startGame",
        },
      },
    },
    startGame: {
      on: {
        VOTE_FIRST_TIME: {
          target: "score",
        },
      },
    },
    connectionError: {},
    score: {
      on: {
        UPDATE: {
          target: "score",
        },
      },
    },
  },
} as const;
