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

  componentDidMount(){
    document.addEventListener('keyup', this.handleKeyUp(this), false);
  }
  componentWillUnmount(){
    document.removeEventListener('keyup', this.handleKeyUp(this), false);
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
  
  undo() {
    if(this.state.numMoves > 0) {
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
  }

  handleUndoClick() {
    this.undo();
  }

  handleKeyUp = (context) => (e) => {
    if(e.key === 'z' && e.ctrlKey) {
      context.undo();
    } else if(e.key === 'r' && e.ctrlKey && e.altKey) {
      this.resetGame();
    } else if(e.keyCode >= 49 && e.key <= 56) {
      // handle keypress of 1-8 for selecting squares
    }
  }

  resetGame() {
    const newGame = this.initGame();
    this.setState(newGame);
  }

  render() {
    return (
      <div className="App">
        <span>Moves: {this.state.numMoves}</span>
        <button onClick={this.handleUndoClick.bind(this)} disabled={this.state.numMoves < 1}>Undo</button>
        <span>(Ctrl+z)</span>
        <button onClick={this.resetGame.bind(this)}>Reset</button>
        <span>(Ctrl+Alt+R)</span>
        <Board
          handleSquareClick={this.handleSquareClick}
          knightPos={this.state.currentSquare}
          board={this.state.board}
        />
      </div>
    )
  }
}

export default App;
