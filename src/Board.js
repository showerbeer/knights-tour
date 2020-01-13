import React from 'react';
import PropTypes from 'prop-types';
import { arrayIncludes } from './utils';
import './Board.css';

const Board = (props) => {
  const { board, knightPos, handleSquareClick, moves, legalMoves } = props;
  let legalMove = 0;
  return (
    <div className="chessboard">
      {board.map((rank, index) => (
        <div key={index}>
          {rank.map(square => {
            const isVisited = arrayIncludes(moves, square.squareNumber);
            const isLegalMove = !isVisited && arrayIncludes(legalMoves, square.squareNumber);
            const className = `square ${isVisited ? 'visited' : square.colour} ${isLegalMove ? 'potential' : ''}`
            return (
              <div
                onClick={() => handleSquareClick(square.squareNumber, isLegalMove)}
                key={square.squareNumber}
                className={className}
              >
                {square.squareNumber === knightPos && <span className="current noselect">&#9822;</span>}
                {isLegalMove && ++legalMove}
                {/* <div className="tileNumber noselect">{square.tile}</div> */}
              </div>
            )
          })}
        </div>
      ))}

    </div>
  )
}

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.array),
  knightPos: PropTypes.number,
  handleSquareClick: PropTypes.func,
  moves: PropTypes.array,
  legalMoves: PropTypes.array
}

export default Board;