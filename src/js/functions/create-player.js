
const createPlayerBar = (value) => {
  let el_playerBar = document.createElement('div');
  el_playerBar.classList.add('player-bar');
  el_playerBar.innerHTML = `
    <div class="inner">
      <span class="name">${value}</span>
      <span class="play-count">(0)</span>
      <div class="score-meter">
        <div class="bar" data-current-score="0">
          <span class="current-score">0</span>
        </div>
      </div>
    </div>
  `;
  el_leaderboard.append(el_playerBar);
}


const addPlayerToGameJSON = (value) => {
  // Add to players array 
  let numberOfExistingPlayers = gameJSON.game_session.players.length;
  let newPlayer = {
    'name': value,
    'created_index': numberOfExistingPlayers + 1,
    'current_score': 0,
    'current_ranking': 0,
    'play_count': 0,
    'play_history': [],
    'stats': {}
  }
  gameJSON.game_session.players.push(newPlayer);
  // Update game history
  let historyItem = {
    'timestamp': new Date(),
    'action': `${value} was added to the game.`
  }
  gameJSON.game_session.history.push(historyItem);
  // Update game historical players list
  let historicalPlayers = gameJSON.game_historical_players;
  if(!historicalPlayers.includes(value)) {
    historicalPlayers.push(value);
  }
  // Save game
  saveGameJSON();
}


const createPlayer = (value) => {
  createPlayerBar(value);
  closeDrawer();
  el_addPlayerInput.value = ''; // Reset drawer input
  addPlayerToGameJSON(value);
}


const addPlayerInputCheck = (value) => {
  value = value.toUpperCase(); // Convert to uppercase at point of entry
  // Check if input is at least 1 character
  if(value.length > 1) {
    // Check if player already exists matching input
    if (gameJSON.game_session.players.some(player => player.name == value)) {
      alert('A player with this name already exists');
    }
    else {
      createPlayer(value); 
    }
  }
}