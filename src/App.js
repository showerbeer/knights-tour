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
      numMoves: 0,
      moves: [],
      currentKnightPosition: STARTING_SQUARE,
      board: this.initBoard(STARTING_SQUARE)
    };
  }

  handleSquareClick = (isLegalMove, square) => () => {
    if (isLegalMove) {
      const board = JSON.parse(JSON.stringify(this.state.board));
      board[square].visited = true;
      this.setState({
        currentKnightPosition: square,
        board: [...board]
      });
    }
  }

  resetGame() {
    const newGame = this.initGame();
    this.setState(newGame);
  }

  render() {
    return (
      <div className="App">
        <Board
          handleSquareClick={this.handleSquareClick}
          knightPos={this.state.currentKnightPosition}
          board={this.state.board}
        />
        <div>
          <button onClick={this.resetGame.bind(this)}>Reset</button>
        </div>
      </div>
    )
  }
}

export default App;
