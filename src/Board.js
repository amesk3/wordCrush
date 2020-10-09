import React, { useState, useEffect } from 'react'
import Cell from './Cell'

const alphabet = 'abcdefghijklmnopqrstuvwxyz'
const tableStyle = {
  margin: '3rem',
  border: '3rem'
}
const buttonStyle = {
  margin:'3rem',
}

const tdStyle = {
  fontSize: '100px',
  padding: '1rem',
  textAlign:'center'

}

function Board(props) {
  const { height, width } = props

  const createNewBoard = (height, width) => {
    let data = []
    for (let i = 0; i < height; i++) {
      data.push([])
      for (let j = 0; j < width; j++) {
        data[i][j] = {
          x: i, y: j, value: alphabet[Math.floor(Math.random() * 26)]
        }
      }
    }
    return data
  }
  
  const newBoard = createNewBoard(height, width)
  
  const [boardData, setBoardData] = useState(newBoard)
  // const [renderTable, setRenderTable] = useState(false)
 
 
  let clickedCell=[]
  


  
  const handleCellClick = (x, y, value) => {

    if (clickedCell.length === 1) {
      console.log('REAL THING')
      let prevCell = clickedCell.pop()
      
      const prevX = prevCell[0]
      const prevY = prevCell[1]
      const prevVal = prevCell[2]
      
      boardData[prevX][prevY].value = value
      boardData[x][y].value = prevVal
      
      let newBoardData = boardData.slice()
      setBoardData(newBoardData)
    
  
    } else if (clickedCell.length > 1) {
      while (clickedCell.length>1) {
        clickedCell.unshift()
      }
    } else {
      clickedCell.push([x,y,value])
    }
  }
  
  
  const renderTableHandle = (data) => {
    return data.map((row, index) => {
      return (
        <tr key={index+Math.floor(Math.random())}>
          {row.map((item) => {
            return <td onClick={()=>handleCellClick(item.x, item.y, item.value)} style={tdStyle} key={item.x * item.y}><Cell  x={item.x} y={item.y} value={item.value} /></td>
          })}
        </tr>
      )
    })
  }
  
  return (
    <div>
     
      <table style={tableStyle}>
        {renderTableHandle(boardData)} 
           
</table>
    
  
    </div>
  )

}


export default Board