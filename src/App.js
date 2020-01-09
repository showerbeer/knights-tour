import React, { Component } from 'react';
import Board from './Board';
import { STARTING_SQUARE } from './constants';
import { isLight } from './utils';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.initGame();
  }

  initBoard(startingSquare) {
    const board = [];
    for (let i = 0; i < 64; i++) {
      board.push({
        colour: isLight(i) ? 'white' : 'black',
        visited: i === startingSquare,
        currentSquare: i === startingSquare,
        squareNumber: i,
        highlighted: false
      });
    }
    return board;
  }

  initGame() {
    return {
      board: this.initBoard(STARTING_SQUARE),
      numMoves: 0,
      moves: [STARTING_SQUARE],
      currentSquare: STARTING_SQUARE
    };
  }

  handleSquareClick = (isLegalMove, square) => () => {
    if (isLegalMove) {
      const board = JSON.parse(JSON.stringify(this.state.board));
      board[square].visited = true;
      this.setState({
        board,
        currentSquare: square,
        moves: [...this.state.moves, square],
        numMoves: this.state.numMoves + 1
      });
    }
  }

  handleUndoClick() {
    const prevSquare = this.state.moves[this.state.moves.length - 2];
    const board = JSON.parse(JSON.stringify(this.state.board));
    const moves = [...this.state.moves];
    moves.pop();
    board[this.state.currentSquare].visited = false;
    this.setState({
      board,
      currentSquare: prevSquare,
      moves,
      numMoves: this.state.numMoves - 1
    })
  }

  resetGame() {
    const newGame = this.initGame();
    this.setState(newGame);
  }

  render() {
    return (
      <div className="App">
        <span>Moves: {this.state.numMoves}</span>
        <Board
          handleSquareClick={this.handleSquareClick}
          knightPos={this.state.currentSquare}
          board={this.state.board}
        />
        <div>
          <button onClick={this.handleUndoClick.bind(this)} disabled={this.state.numMoves < 1}>Undo</button>
          <button onClick={this.resetGame.bind(this)}>Reset</button>
        </div>
      </div>
    )
  }
}

export default App;
