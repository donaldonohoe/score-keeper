
const loadGameFromStorage = (gameJSON) => {
  // Create player bar for each player
  gameJSON.game_session.players.forEach((player) => createPlayerBar(player));
  // Set leaderboard from data load
  updateLeaderboard();
  // Create game history
  gameJSON.game_session.history.forEach((item) => gameHistoryAdd(item));
}