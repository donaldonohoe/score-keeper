
// Restart game
el_restartGameButton.addEventListener('click', (e) => {
  let text = 'Are you sure you want to restart the game with the same players?';
  if (confirm(text) == true) {
    restartGame();
  }
});