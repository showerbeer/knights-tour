import React, { Component } from 'react';
import Board from './Board';
import { STARTING_SQUARE } from './constants';
import { isLight, getLegalMoves, arrayIncludes } from './utils';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.initGame();
    this.moveKnight = this.moveKnight.bind(this);
    this.undo = this.undo.bind(this);
    this.handleUndoClick = this.handleUndoClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keyup', this.handleKeyUp.bind(this), false);
  }
  componentWillUnmount() {
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
    if (this.state.moves.length > 1) {
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
    if (e.key === 'z' && e.ctrlKey) {
      this.undo();
    } else if (e.key === 'r' && e.ctrlKey && e.altKey) {
      this.resetGame();
    } else if (e.keyCode >= 49 && e.key <= 56) {
      const square = this.state.legalMoves[e.key - 1];
      if (arrayIncludes(this.state.legalMoves, square)) {
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
        <div class="gameplay">
          <span className="moveCounter">Moves: {this.state.moves.length-1}</span>
          <button className="warning" onClick={this.handleUndoClick.bind(this)} disabled={this.state.numMoves < 1}>Undo</button>
          <button className="danger" onClick={this.resetGame.bind(this)}>Reset</button>
        </div>
        <div className="gameplay">
          <span>(Ctrl+z)</span>
          <span>(Ctrl+Alt+R)</span>
        </div>
        <Board
          handleSquareClick={this.moveKnight}
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
