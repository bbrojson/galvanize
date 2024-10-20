export function whoIsWinning(votes: number) {
  const whoIsWinning: "SUN" | "MOON" | "NONE" =
    votes < 0 ? "MOON" : votes === 0 ? "NONE" : "SUN";

  return whoIsWinning;
}
