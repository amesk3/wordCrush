import React, { useState} from 'react';
import Board from './Board'

const body = {
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
  margin: '3rem 0rem 1rem 10rem',
}
const header = {
  fontSize: '70px',
  fontFamily: 'Cutive Mono, monospace',
  padding: '1rem',
  textAlign: 'center'
}


function Game() {
  const [height, setHeight] = useState(10)
  const [width, setWidth] = useState(12)
  return (
    <div style={body}>
      <div>
      <h1 style={header}>Word Crush</h1>
        <h2>Instructions</h2>
        <p>
          1.Click on any cell to start crushing!
        </p>
          <p>        
          2. Find letters that are consecutively the same for three letters.        
        </p>
        <p>        
        3. Or find letters you could swap to make three consecutively same letters.
        </p>
      <footer> Game crafted by Amy Kim (www.github.com/amesk3)</footer>
      </div>
      <Board height={height} width={width} />
    </div>
  );
}

export default Game;
