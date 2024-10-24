
const addPlayerToGameJSON = (playerName) => {
  // Add to players array 
  let newPlayer = {
    'name': playerName,
    'created_index': gameJSON.game_session.players.length + 1,
    'current_score': 0,
    'current_ranking': 0,
    'play_count': 0,
    'play_history': [],
    'stats': {}
  }
  gameJSON.game_session.players.push(newPlayer);
  // Update game history
  let historyItem = {
    'timestamp': Date(), // e.g. 'Thu Jun 13 2024 23:34:49 GMT+0100 (Irish Standard Time)'
    'action': `${playerName} was added to the game`
  }
  gameJSON.game_session.history.push(historyItem);
  gameHistoryAdd(historyItem);
  // Update game historical players list
  let historicalPlayers = gameJSON.game_historical_players;
  if(!historicalPlayers.includes(playerName)) {
    historicalPlayers.push(playerName);
  }
  // Save game
  saveGameJSON();
}


const createPlayerBar = (player) => {
  let el_playerBar = document.createElement('div');
  el_playerBar.classList.add('player-bar');
  el_playerBar.setAttribute('data-player-name', player.name);
  el_playerBar.innerHTML = `
    <div class="inner">
      <span class="name">${player.name}</span>
      <span class="play-count">(${player.play_count})</span>
      <div class="score-meter">
        <div class="bar" data-current-score="${player.current_score}">
          <span class="current-score">${player.current_score}</span>
        </div>
      </div>
    </div>
  `;
  el_playerBars.append(el_playerBar);
  // Set initial position at end
  let numberOfPlayerBars = el_playerBars.querySelectorAll('.player-bar').length;
  el_playerBar.style.transform = `translateY(${(numberOfPlayerBars - 1) * playerBarHeight}px)`;
  el_playerBars.style.height = `${numberOfPlayerBars * playerBarHeight}px`;
  // Check leaderboard alignment
  setLeaderboardAlignment();
  // Apply player bar event listener
  el_playerBar.addEventListener('click', openPlayerDrawer, true);
}

/*
const createPlayerChip = (player) => {
  let el_playerChip = document.createElement('div');
  el_playerChip.classList.add('player-chip');
  el_playerChip.innerHTML = `
    <span class="name">${player.name}</span>
    <button class="remove"><button>    
  `;
  el_addPlayerChips.append(el_playerChip);
}
*/


const createPlayer = (playerName) => {
  addPlayerToGameJSON(playerName);
  let player = gameJSON.game_session.players.find(player => player.name == playerName); // Player object
  createPlayerBar(player);
  //createPlayerChip(player);
  closeDrawer();
  el_addPlayerInput.value = ''; // Reset drawer input
}


const addPlayerInputCheck = (value) => {
  value = value.toUpperCase(); // Convert to uppercase at point of entry
  // Check if input is at least 1 character
  if(value.length > 1) {
    // Check if player already exists matching input
    if (gameJSON.game_session.players.some(player => player.name == value)) {
      alert('A player with this name already exists');
    }
    // Disallow backslashes (acts as escape character and breaks functionality)
    else if (value.includes('\\')) {
      alert('Cannot use the "\\" character in a name');
    }
    else {
      // Set display on layers (after first player only)
      if(gameJSON.game_session.players.length == 0) {
        el_intro.classList.remove('active');
        el_leaderboard.classList.add('active');
        el_gameNav.classList.add('active');
      }
      createPlayer(value); 
    }
  }
}