
// Apply score with Enter key
el_playerScoreInput.addEventListener("keyup", ({key}) => {
  if(key === "Enter") {
    applyScore(parseFloat(el_playerScoreInput.value));
  }
});

// Apply score on button click
el_playerScoreSubmit.addEventListener('click', (e) => {
  applyScore(parseFloat(el_playerScoreInput.value));
});

// Remove player
el_removePlayerButton.addEventListener('click', (e) => {
  let text = 'Are you sure you want to remove this player?';
  if (confirm(text) == true) {
    let playerName = el_playerDrawer.getAttribute('data-player-name');
    let player = gameJSON.game_session.players.find(player => player.name == playerName);
    removePlayer(player);
  }
});