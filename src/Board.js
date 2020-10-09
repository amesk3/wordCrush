import React, { useState, useEffect} from 'react'

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
  
  const [boardData, setBoardData] = useState()
  const [renderTable, setRenderTable] = useState(false)
  const onResetBoard = () => {
    setBoardData(newBoard)
    setRenderTable(true)
  }
 
  
  const renderTableHandle = (data) => {
    return data.map((row, index) => {
      return (
        <tr key={index+Math.floor(Math.random())}>
          {row.map((item) => {
            return <td style={tdStyle} key={item.x*item.y}>{item.value}</td>
          })}
        </tr>
      )
    })
  }
  
  return (
    <div>
      <button style={buttonStyle} onClick={()=>onResetBoard()}>START GAME</button>
      <table style={tableStyle}>
        {renderTable?renderTableHandle(newBoard):'Click to start a game!'} 
           
</table>
    
  
    </div>
  )

}


export default Board