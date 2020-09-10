
function createPlayer(name,symbol){
    this.name = name
    this.symbol = symbol

    function getName(){
        return this.name;
    }
    function getSymbol(){
        return this.symbol
    }

    return{
        getName,
        getSymbol
    }
}
const gameBoard = (function(){
    const board = new Array(9).fill('')
    
    const getBoard = () => board




    return{
        getBoard
    }
})()
const displayControler = (function(){
    const setup_section = document.getElementById('setup-section')
    const game_section = document.getElementById('game-section')
    const p_turn_name = document.getElementById('player-turn')

    const showSetupSection = () => {
        setup_section.style.display = "block"
    }
    const hideSetupSection = () => {
        setup_section.style.display = "hidden"
    }

    const showGameSection = () => {
        game_section.style.display = "block"
    }
    const hideGameSection = () => {
        game_section.style.display = "hidden"
    }

    const displayTurn = (name) => {
        p_turn_name.innerHTML = name
        //add player class to indicator based on turn
    }
    


    return{
        showGameSection,
        hideGameSection,
        showSetupSection,
        hideSetupSection,
        displayTurn
    }
    
})()

const game = (function(){
    const form = document.getElementById('game-start')


    const init = function() {
        
    }








})()