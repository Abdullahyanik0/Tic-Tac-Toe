import React, { useState } from "react";
import Confetti from "react-confetti";

const TicTacToe = () => {
  const [turn, setTurn] = useState("X");
  const [cells, setCells] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState();
  const [movement, setMovement] = useState(9);
  const [last, setLast] = useState();

  const checkForWinner = (squares) => {
    let combos = {
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

    for (let combo in combos) {
      combos[combo].forEach((pattern) => {
        if (
          squares[pattern[0]] === "" ||
          squares[pattern[1]] === "" ||
          squares[pattern[2]] === ""
        ) {
          // do nothing
        } else if (
          squares[pattern[0]] === squares[pattern[1]] &&
          squares[pattern[1]] === squares[pattern[2]]
        ) {
          setWinner(squares[pattern[0]]);
        } else if (
          squares[pattern[0]] !== squares[pattern[1]] &&
          squares[pattern[1]] !== squares[pattern[2]] &&
          !squares.includes("")
        ) {
          setWinner("Friendship won :)");
        }
      });
    }
    localStorage.setItem("turn", squares);
  };

  const handleClick = (num) => {
    if (cells[num] !== "") {
      alert("Already clicked");
      return;
    }

    let squares = [...cells];

    if (turn === "X") {
      squares[num] = "X";
      setTurn("O");
    } else {
      squares[num] = "O";
      setTurn("X");
    }

    checkForWinner(squares);
    setCells(squares);
    setMovement(movement - 1);
  };

  const handleRestart = () => {
    setWinner(null);
    setCells(Array(9).fill(""));
    setMovement(9);
    localStorage.setItem("winner", winner);
    setLast(winner);
  };

  const Cell = ({ num }) => {
    return (
      <div
        className="border-2 cursor-pointer ease-in duration-100 hover:bg-gray-700 
      border-white text-8xl xs:text-5xl flex justify-center items-center w-40 h-40 xs:w-24 xs:h-24  "
        onClick={() => handleClick(num)}
      >
        {cells[num]}
      </div>
    );
  };

  return (
    <div className="bg-black text-white h-screen flex items-center justify-center">
      {winner ? (
        <>
          <Confetti />
          <div className="flex flex-col justify-center items-center gap-y-6">
            <p className=" text-6xl xs:text-3xl ">Winner {winner}</p>
            <button
              className="text-xl w-40 bg-gray-700 p-1 hover:bg-gray-500 rounded-full"
              onClick={() => handleRestart()}
            >
              Play Again
            </button>
          </div>
        </>
      ) : (
        <div>
          <div className="flex flex-col gap-y-6 items-center text-3xl">
            <h1 className="text-6xl mb-4">Tic Tac Toe</h1>
            Turn: {turn}
            <div className=" flex items-center justify-center">
              <div>
                <Cell num={0} />
                <Cell num={1} />
                <Cell num={2} />
              </div>
              <div>
                <Cell num={3} />
                <Cell num={4} />
                <Cell num={5} />
              </div>
              <div>
                <Cell num={6} />
                <Cell num={7} />
                <Cell num={8} />
              </div>
            </div>
            <div className="text-2xl xs:text-xl ">{movement} movement left</div>
            {last && <div>Last winner : {last}</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
