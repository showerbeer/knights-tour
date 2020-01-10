import React, { Component } from 'react';
import Board from './Board';
import { STARTING_SQUARE } from './constants';
import { isLight, getLegalMoves, arrayIncludes } from './utils';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.initGame();
  }

  componentDidMount(){
    document.addEventListener('keyup', this.handleKeyUp.bind(this), false);
  }
  componentWillUnmount(){
    document.removeEventListener('keyup', this.handleKeyUp.bind(this), false);
  }

  initBoard() {
    const board = [];
    for (let i = 0; i < 64; i++) {
      board.push({
        colour: isLight(i) ? 'white' : 'black',
        squareNumber: i
      });
    }
    return board;
  }

  initGame() {
    return {
      board: this.initBoard(),
      moves: [STARTING_SQUARE],
      legalMoves: getLegalMoves(STARTING_SQUARE),
      currentSquare: STARTING_SQUARE
    };
  }

  handleSquareClick(square){
    if (arrayIncludes(this.state.legalMoves, square)) {
      return this.moveKnight;
    }
  }

  moveKnight(square) {
    const legalMoves = getLegalMoves(square).filter(s => !this.state.moves.includes(s));
    this.setState({
      ...this.state,
      currentSquare: square,
      legalMoves,
      moves: [...this.state.moves, square],
    });
  }
  
  undo() {
    if(this.state.moves.length > 1) {
      const prevSquare = this.state.moves[this.state.moves.length - 2];
      const moves = this.state.moves.slice(0, -1);
      const legalMoves = getLegalMoves(prevSquare).filter(s => !moves.includes(s));
      this.setState({
        ...this.state,
        currentSquare: prevSquare,
        moves,
        legalMoves,
      })
    }
  }

  handleUndoClick() {
    this.undo();
  }

  handleKeyUp = (e) => {
    if(e.key === 'z' && e.ctrlKey) {
      this.undo();
    } else if(e.key === 'r' && e.ctrlKey && e.altKey) {
      this.resetGame();
    } else if(e.keyCode >= 49 && e.key <= 56) {
      const square = this.state.legalMoves[e.key-1];
      if(arrayIncludes(this.state.legalMoves, square)) {
        this.moveKnight(square);
      }
    }
  }

  resetGame() {
    const newGame = this.initGame();
    this.setState(newGame);
  }

  render() {
    return (
      <div className="App">
        <span>Moves: {this.state.moves.length}</span>
        <button onClick={this.handleUndoClick.bind(this)} disabled={this.state.numMoves < 1}>Undo</button>
        <span>(Ctrl+z)</span>
        <button onClick={this.resetGame.bind(this)}>Reset</button>
        <span>(Ctrl+Alt+R)</span>
        <Board
          handleSquareClick={this.handleSquareClick.bind(this)}
          knightPos={this.state.currentSquare}
          board={this.state.board}
          moves={this.state.moves}
          legalMoves={this.state.legalMoves}
        />
      </div>
    )
  }
}

export default App;
