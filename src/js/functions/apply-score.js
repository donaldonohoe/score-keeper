
const applyScoreToGameJSON = (player, score) => {
  // Update player object
  player.current_score += score;
  player.play_count += 1;
  let history = player.play_history;
  history.push(score);
  player.stats.highest_score = Math.max(...history);
  player.stats.lowest_score = Math.min(...history);
  player.stats.average_score = history => history.reduce((a, b) => a + b) / history.length;
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


const updateLeaderboard = () => {

  // Check highest current score
  let allCurrentScores = [];
  gameJSON.game_session.players.forEach((player) => allCurrentScores.push(player.current_score));
  let highestCurrentScore = Math.max(...allCurrentScores);
  // Measure widest score span
  let scoreSpanMaxWidth = 0;
  el_leaderboard.querySelectorAll('.player-bar').forEach((playerBar) => {
    let scoreSpanWidth = playerBar.querySelector('.score-meter .current-score').offsetWidth;
    scoreSpanMaxWidth = scoreSpanWidth > scoreSpanMaxWidth ? scoreSpanWidth : scoreSpanMaxWidth;
  });
  // Update all score bar widths relative to the highest score
  el_leaderboard.querySelectorAll('.player-bar').forEach((playerBar) => {
    let bar = playerBar.querySelector('.score-meter .bar');
    let score = bar.getAttribute('data-current-score');
    playerBar.querySelector('.score-meter').style.paddingRight = `${scoreSpanMaxWidth + 10}px`;
    bar.style.width = `${(score/highestCurrentScore)*100}%`;
  });

  // Apply sorting
  const playerBarToPosition = (player) => {
    let positionsToMove = (player.created_index - player.current_ranking) * -1;
    let playerBar = el_leaderboard.querySelector(`.player-bar[data-player-name='${player.name}']`);
    setTimeout(() => {
      playerBar.style.transform = `translateY(${positionsToMove*100}px)`;
    }, playerMeterSlideTime);
  }
  // Apply player ranking
  let allScoresDescending = allCurrentScores.sort((a, b) => b - a); // Descending array of scores
  for(let i = 0; i < allScoresDescending.length; i++) {
    let score = allScoresDescending[i];
    // Check if more than one player has this score
    let matchingPlayers = gameJSON.game_session.players.filter((player) => player.current_score == score);
    if(matchingPlayers.length > 1) {
      // Sort by player name (alphabetical)
      let matchingPlayerNames = [];
      matchingPlayers.forEach((player) => matchingPlayerNames.push(player.name));
      matchingPlayerNames.sort();
      matchingPlayerNames.forEach((playerName, j) => {
        let player = gameJSON.game_session.players.find((player) => player.name == playerName);
        player.current_ranking = i+j+1; // +1 for 1-based ranking
        playerBarToPosition(player);
      });
      i += matchingPlayers.length - 1; // Skip loop iterations for duplicates of this score
    }
    else {
      let player = gameJSON.game_session.players.find((player) => player.current_score == score);
      player.current_ranking = i+1; // +1 for 1-based ranking
      playerBarToPosition(player);
    }
  }

} // updateLeaderboard()


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