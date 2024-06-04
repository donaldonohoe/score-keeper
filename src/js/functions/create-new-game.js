const createNewGame = (gameInStorage) => {
  if(!gameInStorage) {
    gameJSON = new Object();
  }
  // Create timestamp
  gameJSON.game_created_timestamp = Date.now();
  // Create readable timestamp
  let date = new Date();
  gameJSON.game_created_readable = date.toUTCString();
  // Create game session
  gameJSON.game_session = {
    'players': [],
    'stats': {},
    'history': []
  };
  if(!gameInStorage) {
    gameJSON.game_settings = {
      'players_listed_by': 'score',
      'player_name_suggestions': true,
      'allow_decimal_scores': false,
      'allow_negative_scores': false
    };
  }
  // Stringify gameJSON and save to local storage
  localStorage.setItem("game", JSON.stringify(gameJSON));
}