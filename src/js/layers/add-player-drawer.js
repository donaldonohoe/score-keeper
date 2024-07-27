
// Focus on input on drawer open
el_addPlayerButton.addEventListener('click', (e) => {
  if(gameJSON.game_settings.keyboard_input_type == 'native') {
    setTimeout(() => el_addPlayerInput.focus(), drawerSlideTime);
  }
});

// Create player with Enter key
el_addPlayerInput.addEventListener("keyup", ({key}) => {
  if(key === "Enter") {
    addPlayerInputCheck(el_addPlayerInput.value);
  }
});

// Create player on button click
el_addPlayerSubmit.addEventListener('click', (e) => {
  addPlayerInputCheck(el_addPlayerInput.value);
});