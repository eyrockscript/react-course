import { WINNER_COMBOS } from "../constants";

export const checkWinnerFrom = (boardToCheck) => {
  for (const [a, b, c] of WINNER_COMBOS) {
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      console.log(boardToCheck[a]);
      return boardToCheck[a];
    }
  }
  return null;
};

export const checkEndGame = (board) => {
  return board.every((square) => square !== null);
};