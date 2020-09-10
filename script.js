function createPlayer(name) {

    function getName() {
        return name
    }

    return {
        getName
    }
}
const gameBoard = (function () {
    const board = new Array(9).fill('')
    const cells = document.querySelectorAll('.cell')

    const getBoard = () => board

    const enableBoard = () => {
        [...cells].forEach(cell => {
            cell.addEventListener('click', play)
        });
    }

    const play = (e) => {
        let index = e.target.dataset.index
        if (board[index] === '') {
            board[index] = game.getTurn()
            console.log(board)
            render()
            game.toggleTurn()
        }

    }

    const render = () => {
     

        [...cells].forEach((cell,index) => {
            if(board[index] === 'X'){
                cell.classList.add("X")
                cell.innerHTML = "X"
            }
            else if(board[index] === 'O'){
                cell.classList.add("O")
                cell.innerHTML = "O"
            }
        });

    }

    return {
        getBoard,
        enableBoard
    }
})()
const displayControler = (function () {
    const setup_section = document.getElementById('setup-section')
    const game_section = document.getElementById('game-section')
    const p_turn_name = document.getElementById('player-turn')
    const turn_indicator = document.querySelector('.turn-indicator')

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
        turn_indicator.classList.remove(`${game.getTurn() === 'X' ? 'player2' : 'player1' }`)
        turn_indicator.classList.add(`${game.getTurn() === 'X' ? 'player1' : 'player2' }`)
    }



    return {
        showGameSection,
        hideGameSection,
        showSetupSection,
        hideSetupSection,
        displayTurn
    }

})()

const game = (function () {
    let player1 = {}
    let player2 = {}
    let atTurn = 'X'
    const form = document.getElementById('game-start')

    const init = () => {
        form.addEventListener('submit', startGame)
    }

    const getTurn = () => {
        return atTurn
    }
    const toggleTurn = () => {
        atTurn = atTurn == 'X' ? 'O' : 'X'
        displayControler.displayTurn(atTurn == 'X' ? player1 : player2)
    }

    const startGame = function (e) {
        e.preventDefault()
        const name1 = document.getElementById('p1name').value
        const name2 = document.getElementById('p2name').value
        player1 = createPlayer(name1)
        player2 = createPlayer(name2)

        displayControler.hideSetupSection()
        displayControler.showGameSection()

        displayControler.displayTurn(player1)
        gameBoard.enableBoard()

    }


    return {
        init,
        getTurn,
        toggleTurn
    }



})()


game.init()