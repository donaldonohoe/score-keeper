
const applyScoreToGameJSON = (player, score) => {
  // Update player object
  player.current_score += score;
  player.play_count += 1;
  let history = player.play_history;
  history.push(score);
  player.stats.highest_score = Math.max(...history);
  player.stats.lowest_score = Math.min(...history);
  player.stats.average_score = (history.reduce((a, b) => a + b) / history.length).toFixed(2);
  // Update game history
  let historyItem = {
    'timestamp': new Date(),
    'action': `${player.name} scored ${score}`
  }
  gameJSON.game_session.history.push(historyItem);
  // Save game
  saveGameJSON();
}


const updatePlayerBar = (player) => {
  let playerBar = el_leaderboard.querySelector(`.player-bar[data-player-name="${player.name}"]`);
  playerBar.querySelector('.play-count').innerHTML = `(${player.play_count})`;
  playerBar.querySelector('.score-meter .bar').setAttribute('data-current-score', player.current_score);
  playerBar.querySelector('.score-meter .current-score').innerHTML = player.current_score;
}


const applyScore = (score) => {
  // Get player object
  let playerName = el_playerDrawer.getAttribute('data-player-name');
  let player = gameJSON.game_session.players.find(player => player.name == playerName);
  // Update player object
  applyScoreToGameJSON(player, score);
  // Update player bar
  updatePlayerBar(player);
  // Close drawer
  closeDrawer();
  el_playerScoreInput.value = ''; // Reset drawer input
  // Update Leaderboard
  setTimeout(() => updateLeaderboard(), drawerSlideTime);
}