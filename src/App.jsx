import { useState } from "react";
import "./App.css";
import { Square } from "./components/Square";
import { WinnerModal } from "./components/WinnerModal";
import { turns } from "./Constans.js";
import confetti from "canvas-confetti";
import { checkWinnerFrom, checkEndGame, checkTotalWinsX, checkTotalWinsO } from "./logic/board";
import { saveGame, resetGameStorage } from "./storage";

function App() {
  // Realizamos un callback para que la función nos devuelva el valor con el que queremos inicializar el estado
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ?? turns.X;
  });
  const [winner, setWinner] = useState(null); //null es que no hay ganador y false es que hay empate

  const [winsX, setWinsX] = useState(()=>{
    const winsXFromStorage = window.localStorage.getItem("winsX")
    return winsXFromStorage ? JSON.parse(winsXFromStorage) : 0;
  });

  const [winsO, setWinsO] = useState(()=>{
    const winsOFromStorage = window.localStorage.getItem('winsO')
    return winsOFromStorage ? JSON.parse(winsOFromStorage) : 0;
  });

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(turns.X);
    setWinner(null);
    resetGameStorage();
  };

  const updateBoard = (index) => {
    // No se actualiza la posición si ya tiene algo
    if (board[index] || winner) return;
    // Actualizar el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    // Actualizar los turnos
    const newTurn = turn === turns.X ? turns.O : turns.X;
    setTurn(newTurn);
    // Chequear si hay un ganador
    const newWinner = checkWinnerFrom(newBoard);
    // Guardar las victorias de cada jugador
    const newWinX = checkTotalWinsX(winsX, newWinner)
    const newWinO = checkTotalWinsO(winsO, newWinner)
    if (newWinner) {
      setWinner(newWinner);
      confetti();
      // Sumar las partidas ganadas según el ganador
      newWinner === turns.X ? setWinsX(newWinX) : setWinsO(newWinO) 
    } else if (checkEndGame(newBoard)) {
      //Chequear si hay empate
      setWinner(false);
    }
    // guardar aquí partida
    saveGame({
      board: newBoard,
      turn: newTurn,
      winsX: newWinX,
      winsO: newWinO
    });
  };
  return (
    <>
      <main className="board">
        <h1>TRES EN LÍENA</h1>
        <button onClick={resetGame}>Inicar de nuevo</button>
        <section className="game">
          {board.map((_, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {board[index]}
              </Square>
            );
          })}
        </section>
        <section className="turn">
          <Square isSelected={turn === turns.X}>{turns.X}</Square>
          <Square isSelected={turn === turns.O}>{turns.O}</Square>
        </section>
        <WinnerModal resetGame={resetGame} winner={winner} />
        <section className="wins">
          <h2>Partidas ganadas</h2>
          <div className="wins-points">
            <Square>{winsX}</Square>
            <Square>{winsO}</Square>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;

// TODO: Realizar el total de partidas ganadas por cada elemento
