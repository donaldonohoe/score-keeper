
// History order
el_gameInfoHistoryOrderButton.addEventListener('click', (e) => {
  el_gameInfoHistoryOrderButton.classList.toggle('active');
  // Reverse chronological history order is just flex direction CSS, markup remains the same
  el_gameInfoHistory.classList.toggle('reverse-chronological');
});