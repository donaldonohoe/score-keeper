
// Restart game with same players
const restartGame = () => {

  // Update Game JSON
  // Reset game timestamp
  gameJSON.game_created_timestamp = Date(); // e.g. 'Thu Jun 13 2024 23:34:49 GMT+0100 (Irish Standard Time)'
  // Reset game history
  gameJSON.game_session.history = [];
  let historyItem = {
    'timestamp': Date(),
    'action': 'The game was restarted'
  }
  gameJSON.game_session.history.push(historyItem);
  // Reset player objects
  gameJSON.game_session.players.forEach((player) => {
    player.current_score = 0;
    player.current_ranking = player.created_index;
    player.play_count = 0;
    player.play_history = [];
    player.stats = {};
  });
  // Save game
  saveGameJSON();

  // Reset game info (drawer)
  updateGameStats();
  el_gameInfoHistory.innerHTML = '';
  gameHistoryAdd(historyItem); // Append history item to show restart

  // Update Leaderboard
  gameJSON.game_session.players.forEach((player) => updatePlayerBar(player));
  setTimeout(() => {
    updateLeaderboard();
  }, drawerSlideTime);

  // Close drawer
  closeDrawer();
}



// Start new game with no players
const restartGameNew = () => {

  // Reset to intro
  el_leaderboard.classList.remove('active');
  el_gameNav.classList.remove('active');
  el_intro.classList.add('active');

  // Update Game JSON
  // Reset game timestamp
  gameJSON.game_created_timestamp = Date(); // e.g. 'Thu Jun 13 2024 23:34:49 GMT+0100 (Irish Standard Time)'
  // Reset game history
  gameJSON.game_session.history = [];
  // Reset players
  gameJSON.game_session.players = [];
  // Save game
  saveGameJSON();

  // Reset game info (drawer)
  updateGameStats();
  el_gameInfoHistory.innerHTML = '';

  // Reset Leaderboard
  el_leaderboard.querySelectorAll('.player-bar').forEach((playerBar, i) => {
    // Remove player bars with sequential delays
    setTimeout(() => {
      playerBar.classList.add('remove');
      setTimeout(() => {
        playerBar.remove();
      }, playerRemoveTime);  
    }, i*100);  
  });
  el_playerBars.style.height = 'auto';

  // Close drawer
  closeDrawer();
}