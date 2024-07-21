
// Segmented buttons
els_segmentedButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    if(button.getAttribute('data-selected') == 0) {
      button.setAttribute('data-selected', '1');
    } else {
      button.setAttribute('data-selected', '0');
    }
  });
});