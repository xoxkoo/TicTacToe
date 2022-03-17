export default class Board {
    constructor() {
        this.board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]
    }

    /**
     * Loops through 2d array and check if someone satisfies victory conditions
     * 
     * @returns {null|string} X, O, tie or null
     */
    checkWin() {

        let winner = null
        let board = this.board
    
        let equals3 = (a, b, c) => {
            return a == b && b == c && a != ''
          }
        
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
      
        if(winner == null && this.emptySpots() == 0)
          winner = 'tie'
      
        return winner

    }

    emptySpots() {
        let empty = 0
        for(let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (this.board[i][j] == '')
              empty++
          }
        }
        return empty
    }

    reset() {
        this.board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]

        console.log(this.board);
    }
}