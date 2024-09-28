
// Fit on resize
window.addEventListener("resize", () => el_main.style.height = `${window.innerHeight}px`);



// Click nav buttons
els_navButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    // Open button's target drawer
    let drawer = document.getElementById(button.getAttribute('data-target-el'));
    drawer.classList.add('active');
    el_drawerScrim.classList.add('active');
    // Make draggable
    draggableDrawer(drawer);
    // Enable event listeners when drawer is open
    el_main.addEventListener('click', closeDrawerClickAway, true);
    document.addEventListener('keyup', closeDrawerEscKey, true);
  });
});



// Background effects

const fireVolt = () => {
  const volt = el_background.querySelector('.grid .volt');
  // Random direction
  let directions = ['up', 'down', 'left', 'right'];
  let randomDirection = directions[Math.floor(Math.random() * directions.length)];
  volt.classList.add(randomDirection);
  // Random position
  const positionUnitWidth = window.innerWidth / 10;
  const positionUnits = 20; // Grid squares
  let randomPosition = Math.floor(Math.random() * (positionUnits + 1)) * positionUnitWidth; // + 1 (random number between 0 and positionUnits)
  if(randomDirection == 'up' || randomDirection == 'down') {
    volt.style.left = `${randomPosition}px`;
  } else {
    volt.style.top = `${randomPosition}px`;
  }
  // Reset volt after animation complete
  const style = window.getComputedStyle(volt);
  const animationDuration = parseFloat(style.animationDuration) * 1000; // Get time in ms
  setTimeout(() => {
    volt.classList.remove('up', 'down', 'left', 'right');
    volt.style.top = '0px';
    volt.style.left = '0px';
  }, animationDuration);
  // Schedule next volt
  scheduleRandomVolt();
}

const scheduleRandomVolt = () => {
  // Check settings for background effect...
  let randomDelay = Math.floor(Math.random() * backgroundVoltMaxDelay);
  setTimeout(() => {
    fireVolt();
  }, randomDelay);
}
scheduleRandomVolt();