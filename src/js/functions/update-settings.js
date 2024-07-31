
// Set player order type button
const setPlayerOrderTypeButton = () => {
  let playerOrderType = gameJSON.game_settings.players_listed_by;
  let options = Array.from(el_playerOrderTypeButton.querySelectorAll('span'));
  let selectedIndex = options.findIndex(option => option.getAttribute('data-value') === playerOrderType);
  el_playerOrderTypeButton.setAttribute('data-selected', selectedIndex);
}

// Update player order type
const updatePlayerOrderType = () => {
  let selectedIndex = el_playerOrderTypeButton.getAttribute('data-selected');
  let value = el_playerOrderTypeButton.querySelectorAll('span')[selectedIndex].getAttribute('data-value');
  // Update GameJSON settings
  gameJSON.game_settings.players_listed_by = value;
  // Save game
  saveGameJSON();
  // Update leaderboard
  updateLeaderboard();
}

// Update keyboard input type
const updateKeyboardInputType = () => {
  let selectedIndex = el_keyboardInputTypeButton.getAttribute('data-selected');
  let value = el_keyboardInputTypeButton.querySelectorAll('span')[selectedIndex].getAttribute('data-value');
  // Update GameJSON settings
  gameJSON.game_settings.keyboard_input_type = value;
  // Save game
  saveGameJSON();
  // Update input type
  document.querySelectorAll('.input-block').forEach((inputBlock) => inputBlock.setAttribute('data-input-type', value));
  // Handle number input for decimals
  let playerScoreInputType = value == 'on-screen' ? 'text' : value == 'native' ? 'number' : 'text';
  el_playerScoreInput.setAttribute('type', playerScoreInputType);
}