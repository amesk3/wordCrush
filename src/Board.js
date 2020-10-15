import React, { useState, useEffect } from 'react'
import Cell from './Cell'
import { crushHorizontal, crushVertical, dropFunc, createNewBoard } from './utils'
import styled from 'styled-components'


const HoverText = styled.p`
	color: 'white';
	:hover {
		color: #ed1212;
		cursor: pointer;
    padding: 0px;
	}
`

const body = {
  display: 'flex',
  justifyContent: 'center',

}
const tableStyle = {
  backgroundColor: 'pink',
  margin: '3rem 10rem 1rem 10rem',
}

const tdStyle = {
  fontSize: '20px',
  fontFamily: 'Cutive Mono, monospace',
  padding: '0 1rem 0 1rem ',
  textAlign:'center'
}

const formStyle = {
  margin: '10rem 0 0 5rem'
}

function Board(props) {
  // const { height, width } = props
  const [height, setHeight] = useState(10)
  const [width, setWidth] = useState(12)  
  let newBoard = createNewBoard(height, width)
  const [boardData, setBoardData] = useState(newBoard)
  
  let clickedCell = []

  useEffect(() => {
    setBoardData(createNewBoard(height, width))
    renderTableHandle(boardData)
  },[height, width]);
  
  const handleSubmit = () => {
    setHeight(height)
    setWidth(width)
    
  }
  
  
  
  const handleCellClick = (x, y, value) => {
    let startData = boardData.slice()
    if (clickedCell.length >= 1 ) {
      let prevCell = clickedCell.pop()
      
      const prevX = prevCell[0]
      const prevY = prevCell[1]
      const prevVal = prevCell[2]
      
      boardData[prevX][prevY].value = value
      boardData[x][y].value = prevVal
      
      let newData = boardData.slice()
      let called = true
      crushAndSet(newData, 1500)    
    } else {
      crushAndSet(boardData, 1500)
      clickedCell.push([x,y,value])
    }
  }
  
  const crushAndSet = (data,  waitTime) => {
    crushVertical(data)
    crushHorizontal(data)
    setBoardData(data)
    setTimeout(() => drop(data), waitTime)
  
  }
  
  const drop = (board) => {
    dropFunc(board)
    let newBoard = board.slice()
    setBoardData(newBoard)
  }
  
  
  
  const renderTableHandle = (data) => {
    return data.map((row, index) => {
      return (
        <tr key={index+Math.floor(Math.random())}>
          {row.map((item) => {
            return <td class="cell" onClick={() => handleCellClick(item.x, item.y, item.value)} style={tdStyle} key={item.x * item.y + Math.floor(Math.random())}>
              <HoverText>
                <Cell x={item.x} y={item.y} value={item.value} />
              </HoverText>

                </td>
    
          })}
        </tr>
      )
    })
  }
  return (
    <div style={body}>
      <form style={formStyle}>
        <h5>Row size
      <input value={height} onChange={e => setHeight(e.target.value)} /></h5>
        <h5>
      Column size
      <input value={width} onChange={e => setWidth(e.target.value)} />
        </h5>
        <button type="submit" value="Submit" onClick={()=>handleSubmit}>Resize board </button>
      </form>
      <table style={tableStyle}>
        {renderTableHandle(boardData)}    
      </table>
    
  
    </div>
  )

}


export default Board