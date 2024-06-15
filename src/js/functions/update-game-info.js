
// Update game history
const gameHistoryAdd = (item) => {

  // Function to create and append date marker
  const createDateMarker = (item) => {
    let el_dateMarker = document.createElement('span');
    el_dateMarker.classList.add('date-marker');
    el_dateMarker.innerHTML = formatTimestampDateFull(item.timestamp);
    el_gameInfoHistory.append(el_dateMarker);
  }

  // Add date marker if change of date occurs
  let el_historyItems = el_gameInfoHistory.querySelectorAll('.history-item');
  if(el_historyItems.length) {
    let lastItemTimestamp = el_historyItems[el_historyItems.length - 1].getAttribute('data-timestamp');
    let lastItemDate = formatTimestampDate(lastItemTimestamp);
    let currentItemDate = formatTimestampDate(item.timestamp);
    if(currentItemDate !== lastItemDate) {
      createDateMarker(item);
    }
  }
  else {
    createDateMarker(item);
  }

  // Create and add history item
  let el_historyItem = document.createElement('span');
  el_historyItem.classList.add('history-item');
  el_historyItem.setAttribute('data-timestamp', item.timestamp);
  el_historyItem.innerHTML = `
    <span class="time">${formatTimestampHMS(item.timestamp)}</span>
    <span class="action">${item.action}</span>
  `;
  el_gameInfoHistory.append(el_historyItem);

}



// Update game stats
const updateGameStats = () => {

  // Current leader in game
  let leadingPlayer = gameJSON.game_session.players.find(player => player.current_ranking == 1);

  // Highest, lowest and average scores in game
  let gameHighestScore = gameLowestScore = gameHighestAverageScore = gameLowestAverageScore = 0;
  let gameHighestScorePlayer, gameLowestScorePlayer, gameHighestAverageScorePlayer, gameLowestAverageScorePlayer;
  let allPlayerScores = [];
  gameJSON.game_session.players.forEach((player, i) => {
    // Use first player scores as benchmarks
    if(i == 0) {
      gameHighestScore = player.stats.highest_score || 0;
      gameLowestScore = player.stats.lowest_score || 0;
      gameHighestAverageScore = gameLowestAverageScore = player.stats.average_score || 0; 
      gameHighestScorePlayer = gameLowestScorePlayer = gameHighestAverageScorePlayer = gameLowestAverageScorePlayer = player;
    }
    // For subsequent players 
    else {
      // Check against running highest score
      if(player.stats.highest_score && player.stats.highest_score > gameHighestScore) {
        gameHighestScore = player.stats.highest_score;
        gameHighestScorePlayer = player;
      }
      // Check against running lowest score
      if(player.stats.lowest_score && player.stats.lowest_score < gameLowestScore) {
        gameLowestScore = player.stats.lowest_score;
        gameLowestScorePlayer = player;
      } 
      // Check against running highest average score
      if(player.stats.average_score && player.stats.average_score > gameHighestAverageScore) {
        gameHighestAverageScore = player.stats.average_score;
        gameHighestAverageScorePlayer = player;
      }
      // Check against running lowest average score
      else if (player.stats.average_score && player.stats.average_score < gameLowestAverageScore) {
        gameLowestAverageScore = player.stats.average_score;
        gameLowestAverageScorePlayer = player;
      }
    }
    // Push player scores to all player scores array
    allPlayerScores = allPlayerScores.concat(player.play_history);
  });

  if(allPlayerScores.length) {
    // Update game stats HTML
    el_gameInfoStats.innerHTML = `
      <span class="stats-item">
        <span class="label">Leader:</span>
        <span class="value">${leadingPlayer.name} (${leadingPlayer.current_score})</span>
      </span>
      <span class="stats-item">
        <span class="label">Highest Score:</span>
        <span class="value">${gameHighestScore} (${gameHighestScorePlayer.name})</span>
      </span>
      <span class="stats-item">
        <span class="label">Lowest Score:</span>
        <span class="value">${gameLowestScore} (${gameLowestScorePlayer.name})</span>
      </span>
      <span class="stats-item">
        <span class="label">Highest Average Score:</span>
        <span class="value">${gameHighestAverageScore} (${gameHighestAverageScorePlayer.name})</span>
      </span>
      <span class="stats-item">
        <span class="label">Lowest Average Score:</span>
        <span class="value">${gameLowestAverageScore} (${gameLowestAverageScorePlayer.name})</span>
      </span>
      <span class="stats-item">
        <span class="label">Overall Average Score:</span>
        <span class="value">${(allPlayerScores.reduce((a, b) => a + b) / allPlayerScores.length).toFixed(2)}</span>
      </span>
    `;
  }

}