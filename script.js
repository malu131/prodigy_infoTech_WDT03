const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('statusDisplay');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

// Winning conditions for Tic-Tac-Toe
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

// Event listeners for each cell and the restart button
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});
restartButton.addEventListener('click', resetGame);

function handleCellClick(event) {
    const cellIndex = event.target.getAttribute('data-index');

    if (gameBoard[cellIndex] !== '' || !isGameActive) {
        return;
    }

    updateCell(event.target, cellIndex);
    checkForWinner();

    if (isGameActive && currentPlayer === 'O') {
        setTimeout(aiMove, 500); // AI move after a short delay
    }
}

function updateCell(cell, index) {
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    switchPlayer();
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkForWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameBoard[a] === '' || gameBoard[b] === '' || gameBoard[c] === '') {
            continue;
        }
        if (gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
            roundWon = true;
            highlightWinningCells([a, b, c]);
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer === 'X' ? 'O' : 'X'} wins!`;
        isGameActive = false;
        return;
    }

    if (!gameBoard.includes('')) {
        statusText.textContent = "It's a draw!";
        isGameActive = false;
        return;
    }
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('win'); // Remove win highlight
    });
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function highlightWinningCells(winningCells) {
    winningCells.forEach(index => {
        cells[index].classList.add('win'); // Add a win class to highlight the winning cells
    });
}

// Simple AI to make a random move
function aiMove() {
    let availableCells = gameBoard
        .map((cell, index) => (cell === '' ? index : null))
        .filter(index => index !== null);

    if (availableCells.length > 0) {
        const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        const aiCell = cells[randomIndex];

        updateCell(aiCell, randomIndex);
        checkForWinner();
    }
}
