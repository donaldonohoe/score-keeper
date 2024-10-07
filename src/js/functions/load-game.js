
const loadGameFromStorage = (gameJSON) => {
  if(gameJSON.game_session.players.length) {
    // Set display on layers
    el_intro.classList.remove('active');
    el_leaderboard.classList.add('active');
    el_gameNav.classList.add('active');
    // Create player bar for each player
    gameJSON.game_session.players.forEach((player) => {
      createPlayerBar(player);
      updatePlayerBar(player);
    });
    // Set leaderboard from data load
    updateLeaderboard();
    // Create game history
    gameJSON.game_session.history.forEach((item) => gameHistoryAdd(item));
    // Create game stats
    updateGameStats();
    // Apply settings from data load
    setPlayerOrderTypeButton();
    setKeyboardInputTypeButton();
    setHistoryOrder();
  }
  else {
    el_intro.classList.add('active');
  }
}