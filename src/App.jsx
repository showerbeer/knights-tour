import React, { useEffect, useState } from 'react';
import Board from './Board';
import { isLight, getLegalMoves, arrayIncludes } from './utils';
import './App.css';

const App = () => {
  const [state, setState] = useState(initGame());

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp, false);

    return () => {
      document.removeEventListener('keyup', handleKeyUp, false);
    }
  })

  function initBoard() {
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

  function initGame() {
    const startingSquare = Math.floor(Math.random() * 64);
    return {
      board: initBoard(),
      moves: [startingSquare],
      legalMoves: getLegalMoves(startingSquare),
      currentSquare: startingSquare
    };
  }

  function moveKnight(square, isLegalMove) {
    if (isLegalMove === false) {
      return;
    }
    const legalMoves = getLegalMoves(square).filter(s => !state.moves.includes(s));
    setState({
      ...state,
      currentSquare: square,
      legalMoves,
      moves: [...state.moves, square],
    });
  }

  function undo() {
    if (state.moves.length > 1) {
      const prevSquare = state.moves[state.moves.length - 2];
      const moves = state.moves.slice(0, -1);
      const legalMoves = getLegalMoves(prevSquare).filter(s => !moves.includes(s));
      setState({
        ...state,
        currentSquare: prevSquare,
        moves,
        legalMoves,
      })
    }
  }

  function handleKeyUp(e) {
    if (e.key === 'z' && e.ctrlKey) {
      undo();
    } else if (e.key === 'r' && e.ctrlKey && e.altKey) {
      resetGame();
    } else if (e.keyCode >= 49 && e.key <= 56) {
      const square = state.legalMoves[e.key - 1];
      if (arrayIncludes(state.legalMoves, square)) {
        moveKnight(square);
      }
    }
  }

  function moveNumberToText(move) {
    const file = String.fromCharCode((Math.floor(move % 8) + 97))
    const rank = 8 - Math.floor(move / 8);
    return `${file}${rank}`;
  }

  function resetGame() {
    const newGame = initGame();
    setState(newGame);
  }

  return (
    <div className="App">
      <div className="container">
        <div className="gameplay">
          <button className="btn warning" onClick={undo} disabled={state.numMoves < 1}>Undo</button>
          <small>(Ctrl+z)</small>
        </div>
        <div className="gameplay">
          <button className="btn danger" onClick={resetGame}>Reset</button>
          <small>(Ctrl+Alt+R)</small>
        </div>
      </div>
      <Board
        handleSquareClick={moveKnight}
        knightPos={state.currentSquare}
        board={state.board}
        moves={state.moves}
        legalMoves={state.legalMoves}
      />
      <div className="bottom">

      </div>
      <span>Number of moves: {state.moves.length}</span>
      <br />
      <span>Move order: {state.moves.map(m => moveNumberToText(m)).join(', ')}</span>
    </div>
  )
}

export default App;
