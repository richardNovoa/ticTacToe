import React from "react";
import Board from "./Board";

function threeInRow(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      moveNumber: 0,
      isX: true,
    };
  }
  handleclick(i) {
    const history = this.state.history;
    const current = history[this.state.moveNumber];
    const squares = current.squares.slice();

    const timeMachine =
      this.state.moveNumber !== history.length - 1 ? true : false;

    if (threeInRow(squares) || squares[i] || timeMachine) {
      return;
    } else {
      squares[i] = this.state.isX ? "X" : "O";
      this.setState({
        history: history.concat([{ squares: squares }]),
        isX: !this.state.isX,
        moveNumber: history.length,
      });
    }
  }
  jumpMove(step) {
    this.setState({
      moveNumber: step,
      isX: step % 2 === 0,
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.moveNumber];
    const squares = current.squares.slice();

    const nextPlayer = this.state.isX ? "X" : "O";
    const winner = threeInRow(squares);

    let status;
    if (!winner) {
      status = "Next player is " + nextPlayer;
    } else {
      status = "Winner is " + winner;
    }

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move # " + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpMove(move)}>{desc}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleclick(i)}
          />
        </div>

        <div className="game-info">
          <div className="status">{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
