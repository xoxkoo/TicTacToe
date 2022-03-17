import Board from "./Board.js";
import Player from "./Player.js";
import Ai from "./Ai.js";


export default class Game {
    constructor(player) {
        this.playing = true
        this.cells = document.querySelectorAll('.cell')
        
        this.board = new Board()
        
        this.playerX = (player == 'X') ? new Player('X') : new Ai('X', this.board)
        this.playerO = (player == 'O') ? new Player('O') : new Ai('O', this.board)

        this.currentPlayer = this.playerX
        console.log(this.currentPlayer);

    }

    /**
     * Find best move for Ai
     */
    bestMove() {

        let best = -Infinity, move
        console.log(this.currentPlayer);
      
        for(let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (this.board.board[i][j] == '') {
              
              this.board.board[i][j] = this.currentPlayer.type
              let score = this.currentPlayer.minimax(this.board.board, false)
              this.board.board[i][j] = ''
      
              if(score > best) {
                best = score
                move = {i, j}
              }
      
            }
          }
        }
      
        this.board.board[move.i][move.j] = this.currentPlayer.type
        this.turn()
      
      }


    /**
     * Handles players click
     * 
     * @param {*} e => event
     */
    playerClick(e) {
    
        if (this.playing) {
            let cell = e.target
            const index = cell.dataset.index
            const col = index % 3
            const row = parseInt(index / 3)
        
            if(this.board.board[row][col] === '') {
                this.board.board[row][col] = this.currentPlayer.type
        
                this.turn()
            }
        }
    }

    /**
     * Handle every turn
     */
    turn() {
        this.render()
        
        if(this.board.checkWin() !== null)
            this.gameEnd()
        
        this.changePlayer()
        
        // checks if AI is on turn
        if(this.currentPlayer instanceof Ai )
            this.bestMove()

    }

    /**
     * Method goes through every cell in 2d array and if there is connent add it to html
     */
    render() {
        for(let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.cells[i * 3 + j].innerHTML = this.board.board[i][j]
            }
        }
    }

    /**
     * Handle restarting the game
     */
    restart() {
        this.playing = true
        this.hideStatus()

        this.board.board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]

        this.render()
      
        this.showOptionWindow()

        this.init()
    }

    /**
     * Change players
     */
    changePlayer() {
        (this.currentPlayer === this.playerX) ? this.currentPlayer = this.playerO : this.currentPlayer = this.playerX
    }

    /**
     * Add listeners for button and board
     */
    init() {
        document.querySelector('.game_restart').addEventListener('click', () => { this.restart() })
        const game = this
        this.cells.forEach(cell => { 
            cell.addEventListener('click', (e) => {
                 game.playerClick(e) 
            }) 
        })  
        
    }

    /**
     * Handle finish the game
     * Remove listeners, so player cant click
     * Show victory message
     */
    gameEnd() {
        this.showStatus()
        this.playing = false
    }

    /**
     * Show victory message
     */
    showStatus() {

        const status = document.querySelector('.game_status')
        status.innerHTML = (this.board.checkWin() != 'tie') ? 'Player ' + this.board.checkWin() + ' won' : 'It was a tie!'
        status.style.opacity = 1
        status.style.transform = 'translate(-50%, -50%)'
      
    }
      
    /**
     * Hide victory message
     */
    hideStatus() {

        const status = document.querySelector('.game_status')
        status.style.opacity = 0
        status.style.transform = 'translate(-50%, -300%)'
      
    }

    /**
     * Opens window where player can choose if he wants to play for X or O
     */
    showOptionWindow() {
        document.querySelector('.background').style.display = 'flex'
        // document.getElementById()
    }
}
