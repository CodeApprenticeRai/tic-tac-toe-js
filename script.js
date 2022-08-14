const statusDisplay = document.querySelector('.game-status');
let gameActive = true; 

// X goes first for some reason
let currentPlayer = "X";
let gameState = Array(9).fill("");
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

statusDisplay.innerHTML = currentPlayerTurn();

function handleCellPlayed(clickedCell, clickedCellIndex){
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}
function handlePlayerChange(){
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}
function handleResultValidation(){
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        //check if the gameState is in winningConditions
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        // it takes 3 values to win
        // if any of a,b,c is empty, then the game is not won
        if (a === "" || b === "" || c === "") {
            continue;
        }
        if ((a === b) && (b === c)) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    //if there are no empty cells and no winner, it's a draw
    let roundDraw = !gameState.includes("");
    console.log(gameState);
    
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    handlePlayerChange();
}
function handleCellClick(clickedCellEvent){
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    
    //ignore click if cell already contains a value or game is not active
    if( (gameState[clickedCellIndex] !== "") || (!gameActive) ){
        return;
    }
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}
function handleRestartGame(){
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerHTML = "";
    });
}

document.querySelectorAll('.cell').forEach(cell => {
    // cell.innerHTML = cell.getAttribute('data-cell-index');
    cell.addEventListener('click', handleCellClick);
});
document.querySelector('.game-restart').addEventListener('click', handleRestartGame);