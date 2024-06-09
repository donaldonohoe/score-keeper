
// Apply score with Enter key
el_playerScoreInput.addEventListener("keyup", ({key}) => {
  if(key === "Enter") {
    applyScore(parseFloat(el_playerScoreInput.value));
  }
});

// Apply score on button click
el_playerScoreSubmit.addEventListener('click', (e) => {
  applyScore(parseFloat(el_playerScoreInput.value));
});