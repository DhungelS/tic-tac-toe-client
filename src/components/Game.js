import React, { useState } from "react";
import "./Game.css";

const Game = () => {
  const [turn, setTurn] = useState("x");
  const [cells, setCells] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(null)

  const Cell = ({ id }) => {
    return <td onClick={() => onCellClick(id)}>{cells[id]}</td>;
  };

  const checkWinner = (squares) => {
    let winningCombos = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagnol: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };

    for (let combo in winningCombos) {
      winningCombos[combo].forEach((pattern) => {
        if(!squares.includes('') && winner === null){
          setIsDraw(true)
        }
        if (
          squares[pattern[0]] === "" ||
          squares[pattern[1]] === "" ||
          squares[pattern[2]] === ""
        ) {
          console.log('HIT', squares)

          // do nothing
        } else if (
          squares[pattern[0]] === squares[pattern[1]] &&
          squares[pattern[1]] === squares[pattern[2]]
        ) {
          setWinner(squares[pattern[0]]);
        }
      });
    }
  };

  const resetGame = () => {
    setWinner(null);
    setIsDraw(null);
    setCells(Array(9).fill(""))
  }


  const onCellClick = (id) => {
    if (cells[id] !== "") {
      return;
    }

    let squares = [...cells];

    //Logic to determine turn
    if (turn === "x") {
      squares[id] = "x";
      setTurn("o");
    } else {
      squares[id] = "o";
      setTurn("x");
    }

    checkWinner(squares);
    setCells(squares);
  };

  return (
    <>
      <div className="container">
        <table>
          Turn: {turn}
          <tbody>
            <tr>
              <Cell id={0} />
              <Cell id={1} />
              <Cell id={2} />
            </tr>
            <tr>
              <Cell id={3} />
              <Cell id={4} />
              <Cell id={5} />
            </tr>
            <tr>
              <Cell id={6} />
              <Cell id={7} />
              <Cell id={8} />
            </tr>
          </tbody>
        </table>
      </div>
      {winner && (
        <>
          <p>{winner} is the winner</p>
          <button onClick={() => resetGame()}>Play again!</button>
        </>
      )}
      {
      isDraw && !winner && (
        <>
        <p>It's a tie!</p>
        <button onClick={() => resetGame()}>Play again!</button>
        </>
      )}
    </>
  );
};

export default Game;
