
// Update game history
const gameHistoryAdd = (item) => {

  // Function to create and append date block
  const createDateBlock = (item) => {
    let el_dateBlock = document.createElement('div');
    el_dateBlock.classList.add('date-block');
    el_dateBlock.innerHTML = `
      <span class="date-marker">${formatTimestampDateFull(item.timestamp)}</span>
      <div class="history-items"></div>
    `;
    el_gameInfoHistory.append(el_dateBlock);
  }

  // Add date block if change of date occurs
  let el_historyItems = el_gameInfoHistory.querySelectorAll('.history-item');
  if(el_historyItems.length) {
    let lastItemTimestamp = el_historyItems[el_historyItems.length - 1].getAttribute('data-timestamp');
    let lastItemDate = formatTimestampDate(lastItemTimestamp);
    let currentItemDate = formatTimestampDate(item.timestamp);
    if(currentItemDate !== lastItemDate) {
      createDateBlock(item);
    }
  }
  else {
    createDateBlock(item);
  }

  // Create and add history item
  let el_historyItem = document.createElement('span');
  el_historyItem.classList.add('history-item');
  el_historyItem.setAttribute('data-timestamp', item.timestamp);
  el_historyItem.innerHTML = `
    <span class="time">${formatTimestampHMS(item.timestamp)}</span>
    <span class="action">${item.action}</span>
  `;
  let dateBlocks = el_gameInfoHistory.querySelectorAll('.date-block');
  // Append to last date block
  dateBlocks[dateBlocks.length - 1].querySelector('.history-items').append(el_historyItem);

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
      if(player.stats.highest_score !== undefined && player.stats.highest_score > gameHighestScore) {
        gameHighestScore = player.stats.highest_score;
        gameHighestScorePlayer = player;
      }
      // Check against running lowest score
      if(player.stats.lowest_score !== undefined && player.stats.lowest_score < gameLowestScore) {
        gameLowestScore = player.stats.lowest_score;
        gameLowestScorePlayer = player;
      } 
      // Check against running highest average score
      if(player.stats.average_score !== undefined && player.stats.average_score > gameHighestAverageScore) {
        gameHighestAverageScore = player.stats.average_score;
        gameHighestAverageScorePlayer = player;
      }
      // Check against running lowest average score
      else if (player.stats.average_score !== undefined && player.stats.average_score < gameLowestAverageScore) {
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
        <span class="value">${leadingPlayer.name}</span>
        <span class="value-context">(${leadingPlayer.current_score})</span>
      </span>
      <span class="stats-item">
        <span class="label">Highest Score:</span>
        <span class="value">${gameHighestScore}</span>
        <span class="value-context">(${gameHighestScorePlayer.name})</span>
      </span>
      <span class="stats-item">
        <span class="label">Lowest Score:</span>
        <span class="value">${gameLowestScore}</span>
        <span class="value-context">(${gameLowestScorePlayer.name})</span>
      </span>
      <span class="stats-item">
        <span class="label">Highest Average Score:</span>
        <span class="value">${gameHighestAverageScore}</span>
        <span class="value-context">(${gameHighestAverageScorePlayer.name})</span>
      </span>
      <span class="stats-item">
        <span class="label">Lowest Average Score:</span>
        <span class="value">${gameLowestAverageScore}</span>
        <span class="value-context">(${gameLowestAverageScorePlayer.name})</span>
      </span>
      <span class="stats-item">
        <span class="label">Overall Average Score:</span>
        <span class="value">${parseFloat((allPlayerScores.reduce((a, b) => a + b) / allPlayerScores.length).toFixed(2))}</span>
      </span>
    `;
  }
  else {
    // Reset game stats HTML
    el_gameInfoStats.innerHTML = `<p>Nobody has played yet...</p>`;
  }

}



// Update player stats
const updatePlayerStats = (player) => {

  if(player.play_count > 0) {
    // Update player stats HTML
    el_playerStats.innerHTML = `
      <span class="stats-item">
        <span class="label">Current score:</span>
        <span class="value">${player.current_score}</span>
      </span>
      <span class="stats-item">
        <span class="label">Current position:</span>
        <span class="value">${getOrdinal(player.current_ranking)} (of ${gameJSON.game_session.players.length})</span>
      </span>
      <span class="stats-item">
        <span class="label">Number of plays:</span>
        <span class="value">${player.play_count}</span>
      </span>
      <span class="stats-item">
        <span class="label">Highest Score:</span>
        <span class="value">${player.stats.highest_score}</span>
      </span>
      <span class="stats-item">
        <span class="label">Lowest Score:</span>
        <span class="value">${player.stats.lowest_score}</span>
      </span>
      <span class="stats-item">
        <span class="label">Average Score:</span>
        <span class="value">${player.stats.average_score}</span>
      </span>
    `;
  }
  else {
    // Reset player stats HTML
    el_playerStats.innerHTML = `<p>${player.name} hasn't played yet...</p>`;
  }

}