
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


const createPlayer = (value) => {
  createPlayerBar(value);
  closeDrawer();
  el_addPlayerInput.value = '';
  // Add player to gameJSON
  // Update game history
  // Update game historical players list
}


const addPlayerInputCheck = (value) => {
  if(value.length > 1) {
    createPlayer(value.toUpperCase()); // Convert to uppercase at point of entry
  }
}