/* eslint-disable import/no-anonymous-default-export */
export default {
  context: {
    votes: 0,
    myMood: "SUN",
    mood: "SUN",
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
        VOTE: {
          target: "score",
        },
      },
    },
    connectionError: {},
    score: {
      on: {
        VOTE: {
          target: "score",
        },
      },
    },
  },
} as const;
