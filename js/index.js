document.addEventListener('DOMContentLoaded', function () {
  const board = document.getElementById('gameBoard');
  const message = document.getElementById('gameMessage');
  const restartBtn = document.getElementById('restartBtn');
  const boardSelect = document.getElementById('boardSize');

  let currentPlayer = 'X';
  let boardSize = parseInt(boardSelect.value, 10);
  let boardState = Array(boardSize * boardSize).fill('');
  let gameActive = true;

  const winChecking = () => {
    const winPatterns = generateWinner();
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return boardState[a];
        }
    }
    return null;
  };

  const generateWinner = () => {
    const patterns = [];
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j <= boardSize - 3; j++) {
            patterns.push(Array.from({ length: 3 }, (_, index) => i * boardSize + j + index));
        }
    }
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j <= boardSize - 3; j++) {
            patterns.push(Array.from({ length: 3 }, (_, index) => (j + index) * boardSize + i));
        }
    }
    for (let i = 0; i <= boardSize - 3; i++) {
        for (let j = 0; j <= boardSize - 3; j++) {
            patterns.push([
                i * boardSize + j,
                (i + 1) * boardSize + j + 1,
                (i + 2) * boardSize + j + 2
            ]);
            patterns.push([
                (i + 2) * boardSize + j,
                (i + 1) * boardSize + j + 1,
                i * boardSize + j + 2
            ]);
        }
    }
    return patterns;
  };


  const drawChecking = () => {
    return boardState.every(cell => cell !== '');
  };

  const boardCellClicked = (index) => {
      if (!gameActive || boardState[index] !== '') return;

      boardState[index] = currentPlayer;
      generateBoard();

      const winner = winChecking();
      if (winner) {
          message.textContent = `(${winner}) Wins the Game!`;
          gameActive = false;
      } else if (drawChecking()) {
          message.textContent = 'It is a Draw!';
          gameActive = false;
      } else {
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
  };

  const restartGame = () => {
      currentPlayer = 'X';
      boardSize = parseInt(boardSelect.value, 10);
      boardState = Array(boardSize * boardSize).fill('');
      gameActive = true;
      message.textContent = '';
      generateBoard();
  };

  const generateBoard = () => {
      board.innerHTML = '';
      board.style.gridTemplateColumns = `repeat(${boardSize}, 70px)`;
      boardState.forEach((value, index) => {
          const cell = document.createElement('div');
          cell.classList.add('board-cell');
          cell.textContent = value;
          cell.addEventListener('click', () => boardCellClicked(index));
          board.appendChild(cell);
      });
  };

  restartBtn.addEventListener('click', restartGame);
  boardSelect.addEventListener('change', restartGame);
  generateBoard();
});

