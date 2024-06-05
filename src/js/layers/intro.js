
// Check local storage for Game
if(localStorage.getItem("game")) {
  gameJSON = JSON.parse(localStorage.getItem("game"));
  console.log(gameJSON);
}
// Else set up new game
else {
  console.log('No previous game. Setting up new game...');
  createNewGame(false);
  console.log(gameJSON);
}