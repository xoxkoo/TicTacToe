let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
]

const cells = document.querySelectorAll('.cell')

let player = 'X'

document.querySelector('.game_restart').addEventListener('click', () => { gameRestart() })

cells.forEach(cell => { cell.addEventListener('click', playerClick) })

function turn() {
  render()

  if(checkWin() !== null)
    gameEnd()

  changePlayer()

  if(player == 'O')
    bestMove()
}

function bestMove() {

  let best = -Infinity, move

  for(let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        
        board[i][j] = 'O'
        let score = minimax(board, false)
        board[i][j] = ''

        if(score > best) {
          best = score
          move = {i, j}
        }

      }
    }
  }

  board[move.i][move.j] = player
  turn()

}


function minimax(board, maximizingPlayer) {

  let win = checkWin()

  if (win == 'X')
    return -10
  else if (win == 'O')
    return 10
  else if (win == 'tie')
    return 0

  if (maximizingPlayer) {

    let best = -Infinity

    for(let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == '') {

          board[i][j] = 'O'
          let score = minimax(board, false)
          board[i][j] = ''

          best = Math.max(score, best)
  
        }
      }
    }
    return best
  }
  else {

    let best = Infinity

    for(let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == '') {
          board[i][j] = 'X'
          let score = minimax(board, true)
          board[i][j] = ''

          best = Math.min(score, best)
        }
      }
    }
    return best
  }
}

function checkWin() {

  let winner = null
  
  //vertical
  for(let i = 0; i < 3; i++) {
    if(equals3(board[0][i], board[1][i], board[2][i]))
      winner = board[0][i]
  }

  //horizontal
  for(let i = 0; i < 3; i++) {
    if(equals3(board[i][0], board[i][1], board[i][2]))
      winner = board[i][0]
  }

  //diagonal
  if(equals3(board[0][0], board[1][1], board[2][2]))
    winner = board[1][1]
  
  if(equals3(board[0][2], board[1][1], board[2][0]))
    winner = board[1][1]

  if(winner == null && emptySpots() == 0)
    winner = 'tie'

  return winner
}

function gameEnd() {
  showStatus()
  cells.forEach(cell => { cell.removeEventListener('click', playerClick )})
}

function showStatus() {
  const status = document.querySelector('.game_status')
  status.innerHTML = (checkWin() != 'tie') ? 'Player ' + checkWin() + ' won' : 'It was a tie!'
  status.style.opacity = 1
  status.style.transform = 'translate(-50%, -50%)'

}

function hideStatus() {
  const status = document.querySelector('.game_status')
  status.style.opacity = 0
  status.style.transform = 'translate(-50%, -300%)'

}

function changePlayer() {
  (player === 'X') ? player = 'O' : player = 'X'
}

function render() {
  for(let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        cells[i * 3 + j].innerHTML = board[i][j]
    }
  }
}

function emptySpots() {
  let empty = 0
  for(let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '')
        empty++
    }
  }
  return empty
}

function equals3(a, b, c) {
  return a == b && b == c && a != ''
}

function gameRestart() {
  hideStatus()
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]

  render()

  player = 'X'

  cells.forEach(cell => {
    cell.addEventListener('click', playerClick) 
  })
}

function playerClick(e) {
  let cell = e.target
  const index = cell.dataset.index
  const col = index % 3
  const row = parseInt(index / 3)

  if(board[row][col] === '') {
    board[row][col] = player

    turn()
  }
}