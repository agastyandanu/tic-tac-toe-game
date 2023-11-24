const board = document.querySelector('.board');
const container = document.querySelector('.container');
const cellCount = 9;

for (let i = 0; i < cellCount; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.addEventListener('click', handleClick, { once: true });
  board.appendChild(cell);
}

function handleClick(e) {
  const cell = e.target;
  const currentPlayer = container.dataset.currentPlayer;
  cell.classList.add(currentPlayer);
  swapPlayers();
  checkWin();
}

function swapPlayers() {
  container.dataset.currentPlayer = container.dataset.currentPlayer === 'player1' ? 'player2' : 'player1';
}

function checkWin() {
  const cells = document.querySelectorAll('.cell');
  const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < wins.length; i++) {
    const [a, b, c] = wins[i];
    if (cells[a].classList.contains('player1') &&
      cells[b].classList.contains('player1') &&
      cells[c].classList.contains('player1')) {
      alert('Player 1 wins!');
      resetGame();
      return;
    } else if (cells[a].classList.contains('player2') &&
      cells[b].classList.contains('player2') &&
      cells[c].classList.contains('player2')) {
      alert('Player 2 wins!');
      resetGame();
      return;
    }
  }

  if (cells.length === 9) {
    alert('It\'s a draw!');
    resetGame();
  }
}

function resetGame() {
  container.dataset.currentPlayer = 'player1';
  document.querySelectorAll('.cell').forEach(cell => {
    cell.classList.remove('player1', 'player2');
  });
}