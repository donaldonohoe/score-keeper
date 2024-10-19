
// Set alignment based on available space
const setLeaderboardAlignment = () => {
  let playerBarsHeight = el_playerBars.querySelectorAll('.player-bar').length * playerBarHeight;
  let leaderboardStyle = window.getComputedStyle(el_leaderboard);
  let leaderboardAvailableSpace = el_leaderboard.offsetHeight - parseFloat(leaderboardStyle.paddingTop) - parseFloat(leaderboardStyle.paddingBottom);
  if(playerBarsHeight > leaderboardAvailableSpace) {
    el_leaderboard.classList.add('align-top');
  } else {
    el_leaderboard.classList.remove('align-top');
  }
}


const updateLeaderboard = () => {

  // Sort all current scores and get highest
  let allCurrentScores = [];
  gameJSON.game_session.players.forEach((player) => allCurrentScores.push(player.current_score));
  let allScoresDescending = allCurrentScores.sort((a, b) => b - a); // Descending array of scores
  //let highestCurrentScore = Math.max(...allCurrentScores);
  let highestCurrentScore = allScoresDescending[0];
  
  // Measure widest score span (padding)
  let scoreSpanMaxWidth = 0;
  el_leaderboard.querySelectorAll('.player-bar').forEach((playerBar) => {
    // let scoreMeter = playerBar.querySelector('.score-meter');
    let style = window.getComputedStyle(playerBar.querySelector('.score-meter'));
    let scoreMeterPaddingRight = parseFloat(style.paddingRight);
    scoreSpanMaxWidth = scoreMeterPaddingRight > scoreSpanMaxWidth ? scoreMeterPaddingRight : scoreSpanMaxWidth;
  });

  // Update all score bar meters relative to the highest score
  el_leaderboard.querySelectorAll('.player-bar').forEach((playerBar) => {
    let bar = playerBar.querySelector('.score-meter .bar');
    let score = bar.getAttribute('data-current-score');
    playerBar.querySelector('.score-meter').style.paddingRight = `${scoreSpanMaxWidth}px`;
    bar.style.width = score <= 0 ? 0 : `${(score/highestCurrentScore)*100}%`; // 0 width if minus score, else % of highest score
  });

  // Function to position player bar based on player order type setting
  const playerBarToPosition = (player) => {
    let playerBar = el_leaderboard.querySelector(`.player-bar[data-player-name='${player.name}']`);
    setTimeout(() => {
      let position = player.current_ranking - 1; // Player order type 'score' as default
      if(gameJSON.game_settings.players_listed_by == 'created') { // Check settings if order type is 'created'
        position = player.created_index - 1;
      }
      playerBar.style.transform = `translateY(${position * playerBarHeight}px)`;
    }, playerMeterSlideTime);
  }

  // Apply player ranking
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

  // Set vertical alignment
  setLeaderboardAlignment();
  
} // updateLeaderboard()