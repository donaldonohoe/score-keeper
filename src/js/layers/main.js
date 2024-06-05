
// Close any drawer
const closeDrawer = (e) => {
  if(!e.target.closest('.drawer')){
    // Close active drawer(s)
    document.querySelectorAll('.drawer.active').forEach((drawer) => drawer.classList.remove('active'));
    // Disable event listener when drawers are closed
    el_gameFrame.removeEventListener('click', closeDrawer, true); // Disable event listener after drawer close
  }
}

// Click nav buttons
els_navButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    // Open button's target drawer
    document.getElementById(button.getAttribute('data-target-el')).classList.add('active');
    // Enable event listener when drawer is open
    el_gameFrame.addEventListener('click', closeDrawer, true);
  });
});