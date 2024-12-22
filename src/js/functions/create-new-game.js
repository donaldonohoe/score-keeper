
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
  //gameJSON.game_created_timestamp = Date.now(); // e.g. 1718318089889
  // Create readable timestamp
  gameJSON.game_created_timestamp = Date(); // e.g. 'Thu Jun 13 2024 23:34:49 GMT+0100 (Irish Standard Time)'
  // Create game session
  gameJSON.game_session = {
    'players': [],
    //'stats': {},
    'history': []
  };
  // Create historical players list
  gameJSON.game_historical_players = [];
  // Create game settings
  let keyboardInputType = isTouchDevice == true ? 'on-screen' : 'native';
  if(!gameInStorage) {
    gameJSON.game_settings = {
      'players_listed_by': 'score',
      'player_name_suggestions': true,
      'allow_decimal_scores': false,
      'allow_negative_scores': false,
      'keyboard_input_type': keyboardInputType,
      'history-order': 'chronological'
    };
  }
  // Save game
  saveGameJSON();
}