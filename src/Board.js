import React, { useState, useEffect } from 'react'
import Cell from './Cell'

const alphabet = 'abcdefgh'
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
          x: i, y: j, value: alphabet[Math.floor(Math.random() * alphabet.length)]
        }
      }
    }
    return data
  }
  
  const newBoard = createNewBoard(height, width)
  const [boardData, setBoardData] = useState(newBoard)
  let clickedCell=[]
  
  const handleCellClick = (x, y, value) => {

    if (clickedCell.length === 1) {
      let prevCell = clickedCell.pop()
      
      const prevX = prevCell[0]
      const prevY = prevCell[1]
      const prevVal = prevCell[2]
      
      boardData[prevX][prevY].value = value
      boardData[x][y].value = prevVal
      
      let newBoardData = boardData.slice()
      crushVertical(newBoardData)
      crushHorizontal(newBoardData)

      drop(newBoardData)
      setBoardData(newBoardData)
    
  
    } else if (clickedCell.length > 1) {
      while (clickedCell.length>1) {
        clickedCell.unshift()
      }
    } else {
      clickedCell.push([x,y,value])
    }
  }
  
  const crushHorizontal = (board) => {
    console.log('CRUSHING')
    for (let i = 0; i < board.length; i++) {
      for (let j = 2; j < board[0].length; j++) {
        console.log(board[i][j - 2].value, board[i][j - 1].value, board[i][j].value)
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
        console.log('OTHER', board[i - 2][j].value, board[i - 1][j].value, board[i][j].value)
        if (board[i - 2][j].value === board[i - 1][j].value && board[i - 1][j].value === board[i][j].value) {
          board[i - 2][i].value = ''
          board[i - 1][j].value = ''
          board[i][j].value = ''
        }
      }
    }
    
    
  }
  
  const drop = (board) => {
    console.log('DROPPING')

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