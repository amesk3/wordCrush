import React, { useState} from 'react';
import Board from './Board'

function Game() {
  const [height, setHeight] = useState(4)
  const [width, setWidth] = useState(4)
  return (
    <div>
      <Board height={height} width={width} />
    </div>
  );
}

export default Game;
