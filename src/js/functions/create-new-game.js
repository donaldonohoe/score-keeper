
// Stringify gameJSON and save to local storage
const saveGameJSON = () => {
  localStorage.setItem("game", JSON.stringify(gameJSON));
}


// Create new game
const createNewGame = (gameInStorage) => {
  if(!gameInStorage) {
    gameJSON = new Object();
  }
  // Create timestamp
  gameJSON.game_created_timestamp = Date.now();
  // Create readable timestamp
  gameJSON.game_created_readable = new Date();
  // Create game session
  gameJSON.game_session = {
    'players': [],
    'stats': {},
    'history': []
  };
  // Create historical players list
  gameJSON.game_historical_players = [];
  // Create game settings
  if(!gameInStorage) {
    gameJSON.game_settings = {
      'players_listed_by': 'score',
      'player_name_suggestions': true,
      'allow_decimal_scores': false,
      'allow_negative_scores': false
    };
  }
  // Save game
  saveGameJSON();
}