import React, { Component } from 'react';
import Board from './Board';
import { isLight, getLegalMoves, arrayIncludes } from './utils';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.initGame();
    this.moveKnight = this.moveKnight.bind(this);
    this.undo = this.undo.bind(this);
    this.handleUndoClick = this.handleUndoClick.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keyup', this.handleKeyUp.bind(this), false);
  }
  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyUp.bind(this), false);
  }

  initBoard() {
    const board = [];
    for (let rank = 0; rank < 8; rank++) {
      board.push([]);
      for (let file = 0; file < 8; file++) {
        const squareNumber = rank * 8 + file;
        board[rank].push({
          tile: `${String.fromCharCode(97 + file)}${8 - rank}`,
          colour: isLight(squareNumber) ? 'white' : 'black',
          squareNumber
        });
      }
    }

    return board;
  }

  initGame() {
    const startingSquare = Math.floor(Math.random() * 64);
    return {
      board: this.initBoard(),
      moves: [startingSquare],
      legalMoves: getLegalMoves(startingSquare),
      currentSquare: startingSquare
    };
  }

  moveKnight(square, isLegalMove) {
    if (isLegalMove === false) {
      return;
    }
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

  moveNumberToText(move) {
    const file = String.fromCharCode((Math.floor((move + 1) % 8) + 97));
    const rank = ((move) % 8) + 1;
    return `${file}${rank}`;
  }

  resetGame() {
    const newGame = this.initGame();
    this.setState(newGame);
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="gameplay">
            <button className="btn warning" onClick={this.handleUndoClick} disabled={this.state.numMoves < 1}>Undo</button>
            <small>(Ctrl+z)</small>
          </div>
          <div className="gameplay">
            <button className="btn danger" onClick={this.resetGame}>Reset</button>
            <small>(Ctrl+Alt+R)</small>
          </div>
        </div>
        <Board
          handleSquareClick={this.moveKnight}
          knightPos={this.state.currentSquare}
          board={this.state.board}
          moves={this.state.moves}
          legalMoves={this.state.legalMoves}
        />
        <div className="bottom">

        </div>
        <span>Number of moves: {this.state.moves.length}</span>
        <br />
        <span>Move order: {this.state.moves.map(m => this.moveNumberToText(m)).join(', ')}</span>
      </div>
    )
  }
}

export default App;
