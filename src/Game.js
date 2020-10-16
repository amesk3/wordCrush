import React from 'react';
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
  return (
    <div style={body}>
      <div>
        <h1 style={header}>Word Crush</h1>
        
        <h2>Instructions</h2>
        <p>
          1.Click on any cell to start crushing!
        </p>
          <p>        
          2. Find letters you could swap to make three consecutively same letters. This will initiate crush then drop.    
        </p>
        <p>        
        3. Eliminate as many letters as possible.
        </p>
      <footer> Game crafted by Amy Kim (www.github.com/amesk3)</footer>
      </div>
      <Board/>
    </div>
  );
}

export default Game;
