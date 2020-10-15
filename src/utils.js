export const crushHorizontal = (board) => {

  for (let i = 0; i < board.length; i++) {
    for (let j = 2; j < board[0].length; j++) {
      if (board[i][j - 2].value === board[i][j - 1].value && board[i][j - 1].value === board[i][j].value) {
        setTimeout(() => {
          board[i][j - 2].value = ''
          board[i][j - 1].value = ''
          board[i][j].value = ''
        }
, 1500)
      }
    }
  }
}
export const crushVertical = board => {
  for (let j = 0; j < board[0].length; j++) {
    for (let i = 2; i < board.length; i++) {
      if (board[i - 2][j].value === board[i - 1][j].value && board[i - 1][j].value === board[i][j].value) {
        setTimeout(() => {
        board[i - 2][i].value = ''
        board[i - 1][j].value = ''
          board[i][j].value = ''
                  }, 1500)
      }
    }
  }

}

export const dropFunc = (board) => {
  for (let j = 0; j < board[0].length; j++) {
    let offset = 0
    for (let i = board.length - 1; i >= 0; i--) {
      if (board[i][j].value === '') {
        offset++
      } else {
        board[i + offset][j].value = board[i][j].value
        board[i][j].value = (offset > 0) ? '' : board[i][j].value
      }
    }
  }
}

