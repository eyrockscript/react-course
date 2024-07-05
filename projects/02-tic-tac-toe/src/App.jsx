import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square";
import { TURNS } from "./constants";
import { checkWinnerFrom, checkEndGame } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";

function App() {
  const [board, setBoard] = useState(
    () => JSON.parse(localStorage.getItem('board')) ?? Array(9).fill(null)
  );

  const [turn, setTurn] = useState(
    () => localStorage.getItem("turn") ?? TURNS.X
  );

  // null => no winner, false => tie, true => there is a winner
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    localStorage.removeItem("board");
    localStorage.removeItem("turn");
  };

  const updateBoard = (index) => {
    // prevents updating the board if the square is already filled
    if (board[index] || winner) return;

    // updates the board
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    // changes the turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    // checks if there is a winner
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if( checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  useEffect(() => {
    console.log('useEffect ran');
  }, []);

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset Game</button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
}

export default App;
