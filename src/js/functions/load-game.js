
const loadGameFromStorage = (gameJSON) => {
  // Create player bar for each player
  gameJSON.game_session.players.forEach((player) => createPlayerBar(player));
}