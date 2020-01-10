import React from 'react';
import PropTypes from 'prop-types';
import { arrayIncludes } from './utils';

const Board = (props) => {
  const { board, knightPos, handleSquareClick, moves, legalMoves } = props;
  let legalMove = 0;
  return (
    <div className="chessboard">
      {board.map(square => {
        const isVisited = arrayIncludes(moves, square.squareNumber);
        const isLegalMove = !isVisited && arrayIncludes(legalMoves, square.squareNumber);
        const className = `square ${isVisited ? 'visited' : square.colour} ${isLegalMove ? 'potential': ''}`
        return (
          <div
            onClick={() => handleSquareClick(square.squareNumber)}
            key={square.squareNumber}
            className={className}
          >
            {square.squareNumber === knightPos && <span>&#9822;</span>}
            {isLegalMove && ++legalMove}
          </div>
        )
      })}
    </div>
  )
}

Board.propTypes = {
  board: PropTypes.array,
  knightPos: PropTypes.number,
  handleSquareClick: PropTypes.func,
  moves: PropTypes.array,
  legalMoves: PropTypes.array
}

export default Board;