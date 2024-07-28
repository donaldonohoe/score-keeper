
// On-screen keyboard keys strokes
els_onScreenKeyboards.forEach((keyboard) => {
  let prevEl = keyboard.previousElementSibling;
  // Check if keyboard has input-block sibling
  if(prevEl.classList.contains('input-block')) {
    let input = prevEl.querySelector('input');
    let keys = keyboard.querySelectorAll('.key');
    keys.forEach((key) => {
      key.addEventListener('click', (e) => {
        let keyValue = key.getAttribute('data-value');
        // Delete character
        if(keyValue == 'delete') {
          input.value = input.value.slice(0, -1);
        }
        // Append character
        else {
          input.value += keyValue;
        }
      });
    });
  }
});