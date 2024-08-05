
const applyScoreToGameJSON = (player, score) => {
  // Update player object
  player.current_score += score;
  player.play_count += 1;
  let history = player.play_history;
  history.push(score);
  player.stats.highest_score = Math.max(...history);
  player.stats.lowest_score = Math.min(...history);
  player.stats.average_score = parseFloat((history.reduce((a, b) => a + b) / history.length).toFixed(2));
  // Update game history
  let historyItem = {
    'timestamp': Date(),
    'action': `${player.name} scored ${score}`
  }
  gameJSON.game_session.history.push(historyItem);
  gameHistoryAdd(historyItem);
  // Save game
  saveGameJSON();
}


const animatePlayerBarScore = (playerBar, newScore) => {
  // Ref: https://stackoverflow.com/questions/16994662/count-animation-from-number-a-to-b  
  let scoreEl = playerBar.querySelector('.score-meter .current-score');
  let oldScore = parseInt(scoreEl.innerHTML);
  let range = newScore - oldScore;
  let duration = playerScoreAnimateTime;
  let minTimer = 50; // no timer shorter than 50ms (not really visible any way)
  let stepTime = Math.abs(Math.floor(duration / range)); // calc step time to show all intermediate values
  stepTime = Math.max(stepTime, minTimer); // never go below minTimer
  let startTime = new Date().getTime(); // get current time and calculate desired end time
  let endTime = startTime + duration;
  let timer;
  // Animate function
  let run = () => {
    let now = new Date().getTime();
    let remaining = Math.max((endTime - now) / duration, 0);
    let value = Math.round(newScore - (remaining * range));
    scoreEl.innerHTML = value;
    if (value == newScore) {
      clearInterval(timer);
      scoreEl.classList.remove('score-animating');
    }
  }
  timer = setInterval(run, stepTime);
  scoreEl.classList.add('score-animating'); 
  run();
}


const updatePlayerBar = (player) => {
  let playerBar = el_leaderboard.querySelector(`.player-bar[data-player-name="${player.name}"]`);
  playerBar.querySelector('.play-count').innerHTML = `(${player.play_count})`;
  playerBar.querySelector('.score-meter .bar').setAttribute('data-current-score', player.current_score);
  // Temporarily change HTML to new score, measure it's width, reset HTML score, and apply padding ahead of animation
  let scoreEl = playerBar.querySelector('.score-meter .current-score');
  let oldScore = scoreEl.innerHTML;
  scoreEl.innerHTML = player.current_score;
  let scoreSpanWidth = scoreEl.offsetWidth;
  playerBar.querySelector('.score-meter').style.paddingRight = `${scoreSpanWidth + 10}px`;
  scoreEl.innerHTML = oldScore;
  // Animate score to new value
  animatePlayerBarScore(playerBar, player.current_score);
}


const applyScore = (score) => {
  // Get player object
  let playerName = el_playerDrawer.getAttribute('data-player-name');
  let player = gameJSON.game_session.players.find(player => player.name == playerName);
  // Update player object
  applyScoreToGameJSON(player, score);
  // Close drawer
  closeDrawer();
  el_playerScoreInput.value = ''; // Reset drawer input
  setTimeout(() => {
    // Update player bar
    updatePlayerBar(player);
    // Update Leaderboard
    updateLeaderboard();
    updateGameStats();
  }, drawerSlideTime);
}