import Player from "./Player.js";

export default class Ai extends Player{

    constructor(type, board) {
        super(type)

        this.board = board
        
        if(type == 'O') {
          this.scores = {
            X: -10,
            O: 10,
            tie: 0
          }
        }
        else {
          this.scores = {
            X: 10,
            O: -10,
            tie: 0
          }
        }
        
    }

    /**
     * Alghoritm to find best option for current player
     * 
     * Reccursive function
     * 
     * @param {array} board => gaming board
     * @param {boolean} maximizingPlayer check if player on turn is maximizing ir minimazing
     * @returns {int} 10, -10, 0
     */
    minimax(board, maximizingPlayer) {
      
        let win = this.board.checkWin()
      
        if(win != null)
            return this.scores[win]
      
        if (maximizingPlayer) {
      
          let best = -Infinity
      
          for(let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              if (this.board.board[i][j] == '') {
      
                this.board.board[i][j] = 'O'
                let score = this.minimax(board, false)
                this.board.board[i][j] = ''
      
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
              if (this.board.board[i][j] == '') {
                this.board.board[i][j] = 'X'
                let score = this.minimax(board, true)
                this.board.board[i][j] = ''
      
                best = Math.min(score, best)
              }
            }
          }
          return best
        }
    }
}