document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    const resetButton = document.getElementById('reset');
    const twoPlayerButton = document.getElementById('two-player');
    const aiPlayerButton = document.getElementById('ai-player');
    let board = Array(9).fill(null);
    let currentPlayer = 'X';
    let gameMode = '';

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    cells.forEach(cell => {
        cell.addEventListener('click', () => handleCellClick(cell));
    });

    resetButton.addEventListener('click', resetGame);
    twoPlayerButton.addEventListener('click', () => setGameMode('two-player'));
    aiPlayerButton.addEventListener('click', () => setGameMode('ai'));

    function setGameMode(mode) {
        gameMode = mode;
        resetGame();
        message.textContent = `Mode: ${mode === 'two-player' ? 'Two Players' : 'Play Against AI'}`;
    }

    function handleCellClick(cell) {
        const index = cell.getAttribute('data-index');
        if (board[index] || checkWinner() || !gameMode) return;
        makeMove(index, currentPlayer);
        if (checkWinner()) {
            message.textContent = `${currentPlayer} wins!`;
            return;
        }
        if (board.every(cell => cell)) {
            message.textContent = 'It\'s a tie!';
            return;
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (gameMode === 'ai' && currentPlayer === 'O') {
            aiMove();
        }
    }

    function makeMove(index, player) {
        board[index] = player;
        cells[index].textContent = player;
    }

    function aiMove() {
        let availableMoves = board.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
        let move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        makeMove(move, 'O');
        if (checkWinner()) {
            message.textContent = 'O wins!';
        } else if (board.every(cell => cell)) {
            message.textContent = 'It\'s a tie!';
        } else {
            currentPlayer = 'X';
        }
    }

    function checkWinner() {
        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return board[a] && board[a] === board[b] && board[a] === board[c];
        });
    }

    function resetGame() {
        board.fill(null);
        cells.forEach(cell => {
            cell.textContent = '';
        });
        message.textContent = '';
        currentPlayer = 'X';
    }
});
