
// Check local storage for Game
if(localStorage.getItem("game")) {
  gameJSON = JSON.parse(localStorage.getItem("game"));
  loadGameFromStorage(gameJSON);
  console.log(gameJSON);
}
// Else set up new game
else {
  console.log('No previous game. Setting up new game...');
  createNewGame(false);
  console.log(gameJSON);
  el_intro.classList.add('active');
}


el_introAddPlayerButton.addEventListener('click', (e) => {
  el_addPlayerButton.click();
});





// Check if touch device
const isTouchDevice = () => {
  return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
}
document.body.setAttribute('data-touch', isTouchDevice());