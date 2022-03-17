import Game from "./Game.js";
import Board from "./Board.js";

let TicTac
document.querySelector('.optionWindow').addEventListener('click', (e) => {
    if (e.target.id == 'buttonX') {
        TicTac = new Game('X')
        TicTac.init()
        document.querySelector('.background').style.display = 'none'
    }
    else if (e.target.id == 'buttonO') {
        TicTac = new Game('O')
        TicTac.init()
        TicTac.bestMove()
        document.querySelector('.background').style.display = 'none'
    }

})




