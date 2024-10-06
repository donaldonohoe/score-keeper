
// History order
el_gameInfoHistoryOrderButton.addEventListener('click', (e) => {
  el_gameInfoHistoryOrderButton.classList.toggle('active');
  // Reverse chronological history order is just flex direction CSS, markup remains the same
  el_gameInfoHistory.classList.toggle('reverse-chronological');
  // Update GameJSON settings
  let order = el_gameInfoHistory.classList.contains('reverse-chronological') ? 'reverse-chronological' : 'chronological';
  gameJSON.game_settings.history_order = order;
  // Save game
  saveGameJSON();
});