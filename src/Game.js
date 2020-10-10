import React, { useState} from 'react';
import Board from './Board'

function Game() {
  const [height, setHeight] = useState(12)
  const [width, setWidth] = useState(12)
  return (
    <div>
      <Board height={height} width={width} />
    </div>
  );
}

export default Game;
