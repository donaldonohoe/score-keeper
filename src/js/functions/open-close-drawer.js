
// Close drawer function
const closeDrawer = () => {
  // Close and reset active drawer(s)
  document.querySelectorAll('.drawer.active').forEach((drawer) => {
    drawer.classList.remove('active', 'draggable');
    resetDrawerNav(drawer);
  });
  el_drawerScrim.classList.remove('active');
  // Cancel focus on any drawer inputs
  el_playerScoreInput.blur();
  el_addPlayerInput.blur();
  // Disable event listeners when drawers are closed
  el_main.removeEventListener('click', closeDrawerClickAway, true);
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
  updatePlayerStats(player);
  // Open drawer
  el_playerDrawer.classList.add('active');
  el_drawerScrim.classList.add('active');
  // Make draggable
  draggableDrawer(el_playerDrawer);
  // Enable event listeners when drawer is open
  el_main.addEventListener('click', closeDrawerClickAway, true);
  document.addEventListener('keyup', closeDrawerEscKey, true);
  // Focus on input on drawer open
  if(gameJSON.game_settings.keyboard_input_type == 'native') {
    setTimeout(() => el_playerScoreInput.focus(), drawerSlideTime);
  }
}

// Navigate drawer nav
els_drawer_nav_buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const drawer = button.closest('.drawer');
    const drawerNav = drawer.querySelector('.drawer-nav');
    const navButtons = drawerNav.querySelectorAll('button');
    const drawerSections = drawer.querySelectorAll('.drawer-section');
    const buttonIndex = Array.from(navButtons).indexOf(button);
    if(drawerSections[buttonIndex]) {
      // Highlight selected
      navButtons.forEach((b) => b.classList.remove('active'));
      button.classList.add('active');
      // Slide to related drawer section
      drawerSections.forEach((drawerSection) => {
        drawerSection.style.webkitTransform = drawerSection.style.transform = `translateX(-${buttonIndex*100}%)`;
      });
    }
  });
});

// Reset drawer nav
const resetDrawerNav = (drawer) => {
  const drawerNav = drawer.querySelector('.drawer-nav');
  if(drawerNav) {
    setTimeout(() => {
      // Reset nav buttons
      drawerNav.querySelectorAll('button').forEach((button) => button.classList.remove('active'));
      drawerNav.querySelectorAll('button')[0].classList.add('active');
      // Reset nav sections
      drawer.querySelectorAll('.drawer-section').forEach((section) => {
        section.style.webkitTransform = section.style.transform = '';
        section.scrollTop = 0;
      });
    }, drawerSlideTime);
  }
};