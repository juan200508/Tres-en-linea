import { turns, winner_combos } from "../Constans";

export const checkWinnerFrom = (boardToCheck) => {
  for (const combo of winner_combos) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }
  return null;
};

export const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square !== null);
};

export const checkTotalWinsX = (wins, winner) => {
  if (winner === turns.X) {
    return (wins += 1);
  }
  return wins;
};

export const checkTotalWinsO = (wins, winner) => {
  if (winner === turns.O) {
    return (wins += 1);
  }
  return wins;
};
