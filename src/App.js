import React, { Component } from 'react';
import { arrayIncludes, getLegalMoves, isLight } from './utils';
import './App.css';

const STARTING_SQUARE = 2;
const board = [];

for (let i = 0; i < 64; i++) {
  board.push({
    colour: isLight(i) ? 'white' : 'black',
    visited: i === STARTING_SQUARE,
    currentSquare: i === STARTING_SQUARE,
    squareNumber: i,
    highlighted: false
  });
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentKnightPosition: STARTING_SQUARE
    }
  }

  handleSquareClick = (isLegalMove, square) => () => {
    if (isLegalMove) {
      board[square].visited = true;
      this.setState({
        currentKnightPosition: square
      });
    }
  }

  render() {
    let knightPos = this.state.currentKnightPosition;
    const legalMoves = getLegalMoves(knightPos);
    return <div className="App">
      <div className="chessboard">
        {board.map(square => {
          const isLegalMove = !square.visited && arrayIncludes(legalMoves, square.squareNumber);
          const className = `${square.colour} ${isLegalMove ? 'potential' : ''} ${square.visited ? 'visited' : ''}`
          return (
            <div
              onClick={this.handleSquareClick(isLegalMove, square.squareNumber)}
              key={square.squareNumber}
              className={className}
            >
              {square.squareNumber === knightPos && <span>&#9822;</span>}
            </div>
          )
        })}
      </div>
    </div>
  }
}

export default App;
