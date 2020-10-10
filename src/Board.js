import React, { useState, useEffect } from 'react'
import Cell from './Cell'

const alphabet = 'ABCDEFGH'

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
          x: i, y: j, value: alphabet[Math.floor(Math.random() * alphabet.length)]
        }
      }
    }
    return data
  }
  
  const newBoard = createNewBoard(height, width)
  const [boardData, setBoardData] = useState(newBoard)
  const [firstDrop, setFirstDrop] = useState(true)
  let clickedCell=[]
  
  const handleCellClick = (x, y, value) => {
    if (firstDrop) {
      let newData = boardData.slice()
      crushVertical(newData)
      crushHorizontal(newData)
      setBoardData(newData)
      setTimeout(() => drop(newData), 1000)
      setFirstDrop(false)
    }
    if (clickedCell.length === 1) {
      let prevCell = clickedCell.pop()
      
      const prevX = prevCell[0]
      const prevY = prevCell[1]
      const prevVal = prevCell[2]
      
      boardData[prevX][prevY].value = value
      boardData[x][y].value = prevVal
      
      let newData = boardData.slice()
      crushVertical(newData)
      crushHorizontal(newData)
      setBoardData(newData)
      setTimeout(()=>drop(newData), 1000)
     
    
  
      } else {
      clickedCell.push([x,y,value])
    }
  }
  
  const crushHorizontal = (board) => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 2; j < board[0].length; j++) {
        if (board[i][j - 2].value === board[i][j - 1].value && board[i][j - 1].value === board[i][j].value) {
          board[i][j - 2].value = ''
          board[i][j - 1].value = ''
          board[i][j].value = ''
        }
      }
    }
  }
  const crushVertical = board=>{
    for (let j = 0; j < board[0].length; j++) {
      for (let i = 2; i < board.length; i++) {
        if (board[i - 2][j].value === board[i - 1][j].value && board[i - 1][j].value === board[i][j].value) {
          board[i - 2][i].value = ''
          board[i - 1][j].value = ''
          board[i][j].value = ''
        }
      }
    }
    
    
  }
  
  const drop = (board) => {
    for (let j = 0; j < board[0].length; j++) {
      let offset = 0
      for (let i = board.length - 1; i >= 0; i--) {
        if (board[i][j].value === '') {
          offset++
        } else {
          board[i + offset][j].value = board[i][j].value
          board[i][j].value = (offset>0)?'':board[i][j].value
        }
      }
    }
    let newBoard = board.slice()
    setBoardData(newBoard)
  }
  
  
  const renderTableHandle = (data, firstDrop= false) => {
    if (firstDrop) { setFirstDrop(false) }
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
    <div style={body}>
     
      <table style={tableStyle}>
        {renderTableHandle(boardData)}    
      </table>
    
  
    </div>
  )

}


export default Board