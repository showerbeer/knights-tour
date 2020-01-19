import React from 'react';
import PropTypes from 'prop-types';
// import Draggable from 'react-draggable';
import { arrayIncludes } from './utils';
import WhiteKnight from './img/wn.webp'
import './Board.css';

const Board = (props) => {
  const { board, knightPos, handleSquareClick, moves, legalMoves } = props;

  return (
    <div className="chessboard">
      {board.map((rank, index) => (
        <div key={index} className="rank">
          {rank.map(square => {
            const isVisited = arrayIncludes(moves, square.squareNumber);
            const isLegalMove = !isVisited && arrayIncludes(legalMoves, square.squareNumber);
            const className = `square ${isVisited ? 'visited' : square.colour} ${isLegalMove ? 'legal-move' : ''}`
            return (
              isLegalMove ? (
                <div onClick={() => handleSquareClick(square.squareNumber)} key={square.squareNumber} className={className}>
                  <div className="legal-move-inner"></div>
                </div>
              ) : (
                  <div key={square.squareNumber} className={className}>
                    {/* {square.squareNumber === knightPos && <Draggable>
                      <div className="grabbable noselect" style={{ backgroundImage: `url(${WhiteKnight})` }}>&nbsp;</div>
                    </Draggable>} */}
                    {square.squareNumber === knightPos &&
                      <div className="square noselect" style={{ backgroundImage: `url(${WhiteKnight})` }}>&nbsp;</div>}
                  </div>
                )
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