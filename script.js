function createPlayer(name,symbol) {
    const getName = () => name;
    const getSymbol = () => symbol;

    return {
        getName,
        getSymbol
    }
}
const gameBoard = (function () {
    const board = new Array(9).fill('')
    const cells = document.querySelectorAll('.cell')
    const getBoard = () => board

    const enableBoard = () => {
        [...cells].forEach(cell => {
            cell.addEventListener('click', gameController.play)
        });
    }
    const disableBoard = () => {
        [...cells].forEach(cell => {
            cell.removeEventListener('click',gameController.play)
        })
    }
    const restartBoard = () => {
        board.fill('')
    }

    const isTurnLeft = () => {
        return board.some((cell)=>{
            return cell === ''
        })
    }

    return {
        getBoard,
        enableBoard,
        restartBoard,
        isTurnLeft,
        disableBoard
    }
})()
const displayController = (function () {
    const setup_section = document.getElementById('setup-section')
    const game_section = document.getElementById('game-section')
    const p_turn_name = document.getElementById('player-turn')
    const turn_indicator = document.querySelector('.turn-indicator')
    const game_over_section = document.querySelector('.game-over')
    const showSetupSection = () => {
        setup_section.style.display = "block"
    }
    const hideSetupSection = () => {
        setup_section.style.display = "none"
    }

    const showGameSection = () => {
        game_section.style.display = "block"
    }
    const hideGameSection = () => {
        game_section.style.display = "none"
    }

    const displayTurn = (player) => {
        p_turn_name.innerHTML = player.getName()

        if(turn_indicator.classList.contains('X')) turn_indicator.classList.remove('X')
        if(turn_indicator.classList.contains('O')) turn_indicator.classList.remove('O')

        turn_indicator.classList.add(player.getSymbol())
    }

    const showGameOverSection = () => {
        game_over_section.style.display = "block"
    }
    const hideGameOverSection = () => {
        game_over_section.style.display = "none"
    }

    const setWinPlayer = (player) => {
        const message = document.getElementById('winner-name');
        message.innerHTML= player.getName()
        if(message.classList.contains('X')) message.classList.remove('X')
        if(message.classList.contains('O')) message.classList.remove('O')

        message.classList.add(player.getSymbol())
    }
    const setTie = () => {
        document.getElementById('winner-name').innerHTML = ""
        document.querySelector('.win-message').childNodes[1].nodeValue = "Its a tie!"
    }
    return {
        showGameSection,
        hideGameSection,
        showSetupSection,
        hideSetupSection,
        displayTurn,
        showGameOverSection,
        hideGameOverSection,
        setTie,
        setWinPlayer
    }

})()

const gameController = (function () {
    let player1 = {}
    let player2 = {}
    let atTurn = 'X'
    const form = document.getElementById('game-start')
    const cells = document.querySelectorAll('.cell')
    const new_game_button = document.getElementById('new-game')
    const replay_button = document.getElementById('replay')
    const init = () => {
        form.addEventListener('submit', startGame)
        new_game_button.addEventListener('click',newGame)
        replay_button.addEventListener('click',replay)
    }

    const getTurn = () => {
        return atTurn
    }
    const toggleTurn = () => {
        atTurn = atTurn === 'X' ? 'O' : 'X'
        displayController.displayTurn(atTurn === 'X' ? player1 : player2)
    }
    const replay = () => {
        displayController.displayTurn(player1)
        gameBoard.restartBoard()
        gameBoard.enableBoard()
        displayController.hideGameOverSection()
        render()
    }
    const newGame = () => {
        displayController.hideGameOverSection()
        displayController.hideGameSection()
        displayController.showSetupSection()
        gameBoard.restartBoard()
        render()
    }

    const startGame = function (e) {
        e.preventDefault()
        const name1 = document.getElementById('p1name').value
        const name2 = document.getElementById('p2name').value
        player1 = createPlayer(name1,'X')
        player2 = createPlayer(name2,'O')



        displayController.hideSetupSection()
        displayController.showGameSection()

        displayController.displayTurn(player1)
        gameBoard.enableBoard()

        form.reset()

    }

    const play =  (e) => {
        let index = e.target.dataset.index
        const board  =  gameBoard.getBoard();
        if (board[index] === '') {
            board[index] = gameController.getTurn()


            let winner = checkWin(player1) ? player1 : checkWin(player2) ? player2  : null

            if(winner != null){
                displayController.setWinPlayer(winner)
                displayController.showGameOverSection()
                gameBoard.disableBoard()
                window.scrollTo(0,document.body.scrollHeight);
            }
            else if(!gameBoard.isTurnLeft()){
                displayController.setTie()
                displayController.showGameOverSection()
                gameBoard.disableBoard()
                window.scrollTo(0,document.body.scrollHeight);
            }
            else{
                toggleTurn()
            }
            render()
        }
    }


    /*
    *  Works by looping through winConditions then checking if every element inside 
    *  the inner array is equal to the given player symbol.
    *  By using some() if at least one of the return values is true
    *  then we have a winner
    */
    const checkWin = (player) => {
        var winConditions = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [6,4,2]];
        const  board  = gameBoard.getBoard()
        return winConditions.some((threeInRow) => {
            return threeInRow.every((cell)=>{
                return board[cell] === player.getSymbol()
            })
        })



    }
    const render = () => {
        const board = gameBoard.getBoard();
        [...cells].forEach((cell, index) => {
            if (board[index] === 'X') {
                cell.classList.add("X")
                cell.innerHTML = "X"
            } else if (board[index] === 'O') {
                cell.classList.add("O")
                cell.innerHTML = "O"
            } else {
                cell.classList.remove('X')
                cell.classList.remove('O')
                cell.innerHTML = ""
            }
        });

    }
    return {
        init,
        getTurn,
        play
    }
})()


gameController.init()