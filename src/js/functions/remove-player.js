
const removePlayerFromGameJSON = (player) => {
  // Remove player
  let removedPlayerCreatedIndex = player.created_index;
  let removedPlayerIndex = gameJSON.game_session.players.indexOf(player);
  gameJSON.game_session.players.splice(removedPlayerIndex, 1);
  // Update created index for remaining players
  gameJSON.game_session.players.forEach((player) => {
    if(player.created_index > removedPlayerCreatedIndex) {
      player.created_index -= 1;
    }
  });
  // Update game history
  let historyItem = {
    'timestamp': Date(), // e.g. 'Thu Jun 13 2024 23:34:49 GMT+0100 (Irish Standard Time)'
    'action': `${player.name} was removed from the game`
  }
  gameJSON.game_session.history.push(historyItem);
  gameHistoryAdd(historyItem);
  // Save game
  saveGameJSON();
}


const removePlayerBar = (player) => {
  let playerBar = el_leaderboard.querySelector(`.player-bar[data-player-name="${player.name}"]`);
  playerBar.classList.add('remove');
  setTimeout(() => {
    playerBar.remove();
    let numberOfPlayerBars = el_playerBars.querySelectorAll('.player-bar').length;
    el_playerBars.style.height = `${numberOfPlayerBars * playerBarHeight}px`;
    setLeaderboardAlignment();
  }, playerRemoveTime);
}


const removePlayer = (player) => {
  // Update Game JSON
  removePlayerFromGameJSON(player);
  // Close drawer
  closeDrawer();
  // Update Leaderboard
  setTimeout(() => {
    removePlayerBar(player);
    //setTimeout(() => {
      updateLeaderboard();
      updateGameStats();
    //}, playerRemoveTime);
  }, drawerSlideTime);
}