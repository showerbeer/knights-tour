import React from 'react';
import PropTypes from 'prop-types';
import { arrayIncludes, getLegalMoves } from './utils';

const Board = (props) => {
  const { board, knightPos, handleSquareClick } = props;
  const legalMoves = getLegalMoves(knightPos);
  return (
    <div className="chessboard">
      {board.map(square => {
        const isLegalMove = !square.visited && arrayIncludes(legalMoves, square.squareNumber);
        const className = `square ${square.visited ? 'visited' : square.colour} ${isLegalMove && 'potential'}`
        return (
          <div
            onClick={handleSquareClick(isLegalMove, square.squareNumber)}
            key={square.squareNumber}
            className={className}
          >
            {square.squareNumber === knightPos && <span>&#9822;</span>}
          </div>
        )
      })}
    </div>
  )
}

Board.propTypes = {
  board: PropTypes.array,
  knightPos: PropTypes.number,
  handleSquareClick: PropTypes.func
}

export default Board;