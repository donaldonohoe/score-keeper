
// Segmented buttons
els_segmentedButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    if(button.getAttribute('data-value') == 0) {
      button.setAttribute('data-value', '1');
    } else {
      button.setAttribute('data-value', '0');
    }
  });
});