
// Close open drawer
const closeDrawer = () => {
  // Close active drawer(s)
  document.querySelectorAll('.drawer.active').forEach((drawer) => drawer.classList.remove('active'));
  // Disable event listener when drawers are closed
  el_gameFrame.removeEventListener('click', closeDrawerClickAway, true); // Disable event listener after drawer close
}

// Close open drawer on click away
const closeDrawerClickAway = (e) => {
  if(!e.target.closest('.drawer')){
    closeDrawer();
  }
}
