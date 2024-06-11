
// Click nav buttons
els_navButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    // Open button's target drawer
    document.getElementById(button.getAttribute('data-target-el')).classList.add('active');
    // Enable event listeners when drawer is open
    el_gameFrame.addEventListener('click', closeDrawerClickAway, true);
    document.addEventListener('keyup', closeDrawerEscKey, true);
  });
});