
// Restart game
el_restartGameButton.addEventListener('click', (e) => {
  let text = 'Are you sure you want to restart the game with the same players?';
  if (confirm(text) == true) {
    restartGame();
  }
});

// New game
el_newGameButton.addEventListener('click', (e) => {
  let text = 'Are you sure you want to start brand new game?';
  if (confirm(text) == true) {
    restartGameNew();
  }
});

// Player order type
el_playerOrderTypeButton.addEventListener('click', (e) => {
  updatePlayerOrderType();
});

// Keyboard Input type
el_keyboardInputTypeButton.addEventListener('click', (e) => {
  updateKeyboardInputType();
});