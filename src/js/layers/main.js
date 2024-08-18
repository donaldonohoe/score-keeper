
// Click nav buttons
els_navButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    // Open button's target drawer
    let drawer = document.getElementById(button.getAttribute('data-target-el'));
    drawer.classList.add('active');
    setTimeout(() => {
      drawer.classList.add('draggable');
    }, drawerSlideTime);
    // Enable event listeners when drawer is open
    el_gameFrame.addEventListener('click', closeDrawerClickAway, true);
    document.addEventListener('keyup', closeDrawerEscKey, true);
  });
});