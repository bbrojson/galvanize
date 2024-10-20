/* eslint-disable import/no-anonymous-default-export */
export default {
  context: { mood: "SUN" as const, myMood: "SUN" as const, votes: 0 },
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
        WIN: {
          target: "voteWon",
        },
        LOSE: {
          target: "outvoted",
        },
        DRAW: {
          target: "draw",
        },
        UPDATE: {
          target: "score",
        },
      },
    },
    voteWon: {
      on: {
        VOTE: {
          target: "score",
        },
      },
    },
    outvoted: {
      on: {
        VOTE: {
          target: "score",
        },
      },
    },
    draw: {
      on: {
        VOTE: {
          target: "score",
        },
      },
    },
  },
} as const;
