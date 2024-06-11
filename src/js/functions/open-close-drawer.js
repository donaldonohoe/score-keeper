
// Close drawer function
const closeDrawer = () => {
  // Close active drawer(s)
  document.querySelectorAll('.drawer.active').forEach((drawer) => drawer.classList.remove('active'));
  // Disable event listeners when drawers are closed
  el_gameFrame.removeEventListener('click', closeDrawerClickAway, true);
  document.removeEventListener('keyup', closeDrawerEscKey, true);
}

// Close open drawer on click away
const closeDrawerClickAway = (e) => {
  if(!e.target.closest('.drawer')){
    closeDrawer();
  }
}

// Close open drawer with Esc button
const closeDrawerEscKey = (e) => {
  if(e.key === 'Escape'){
    closeDrawer();
  }
}

// Close drawer on click close button
els_close_drawer_buttons.forEach((closeButton) => {
  closeButton.addEventListener('click', closeDrawer, true);
});

// Open player drawer
const openPlayerDrawer = (e) => {
  let playerName = e.target.closest('.player-bar').getAttribute('data-player-name');
  let player = gameJSON.game_session.players.find(player => player.name == playerName); // Player object
  // Populate drawer with player data
  el_playerDrawer.setAttribute('data-player-name', player.name);
  el_playerDrawer.querySelector('.drawer-header').innerHTML = player.name;
  // Open drawer
  el_playerDrawer.classList.add('active');
  // Enable event listeners when drawer is open
  el_gameFrame.addEventListener('click', closeDrawerClickAway, true);
  document.addEventListener('keyup', closeDrawerEscKey, true);
  // Focus on input on drawer open
  setTimeout(() => el_playerScoreInput.focus(), drawerSlideTime);
}
