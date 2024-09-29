
// This function is for ".from-bottom" drawers only that can be pulled down to close
const draggableDrawer = (drawer) => {

  // Make drawer draggable once opened
  setTimeout(() => drawer.classList.add('draggable'), drawerSlideTime);

  let startY, startTop, isDragging, targetInner = false;
  const drawerInner = drawer.querySelector('.inner');

  // Function to get translateY value of element
  const getTranslateY = (element) => {
    const transform = window.getComputedStyle(element).transform;
    if (transform === 'none') return 0;
    const matrix = transform.match(/matrix\((.+)\)/);
    return matrix ? parseFloat(matrix[1].split(', ')[5]) : 0;
  }

  const handleTouchStart = (e) => {
    if(e.target.closest('.inner')) {
      targetInner = true;
    }
    startY = e.touches[0].pageY; // Capture the starting Y position of the touch
    //startTop = drawer.getBoundingClientRect().top; // Capture the initial drawer's transform translateY value
    startTop = getTranslateY(drawer);
    isDragging = false; // Reset dragging state
  }

  const handleTouchMove = (e) => {
    const movingY = e.touches[0].pageY;
    const diffY = movingY - startY;
    const isAtTop = drawerInner.scrollTop === 0;
    const dragDrawer = () => {
      isDragging = true;
      const newTranslateY = Math.min(startTop + diffY, window.innerHeight);
      drawer.style.transform = `translateY(${newTranslateY}px)`;
    }
    // If touch on inner AND inner is scrolled to top AND swipe is downwards
    if(targetInner && isAtTop && diffY > 0) {
      dragDrawer();
    // Else if touch not on inner AND swipe is downwards
    } else if (!targetInner && diffY > 0) {
      dragDrawer();
    } else {
      return; // Allow natural scrolling if not dragging the drawer
    }
    e.preventDefault(); // Prevent default scrolling behavior if dragging the drawer
  }

  const handleTouchEnd = (e) => {
    if (isDragging) {
      //if (drawer.getBoundingClientRect().top > 100) { // Close drawer if dragged past threshold
      if (getTranslateY(drawer) > drawerPullThreshold) { // Close drawer if dragged past threshold
        drawer.removeAttribute('style');
        closeDrawer();
      } else { // Snap back to the open position
        drawer.classList.remove('draggable');
        drawer.style.webkitTransform = drawer.style.transform = 'translateY(' + 0 + 'px)';
        setTimeout(() => {
          drawer.classList.add('draggable');
          drawer.removeAttribute('style');
        }, drawerSlideTime);
      }
    }
    targetInner = false;
  }

  drawer.addEventListener('touchstart', handleTouchStart);
  drawer.addEventListener('touchmove', handleTouchMove);
  drawer.addEventListener('touchend', handleTouchEnd);

} // draggableDrawer()






// Interact.js version (without inner scrollable)

/*
interact('.drawer.draggable')
.draggable({
  listeners: {
    move(event) { 
      //console.log('move');
      var target = event.target;
      activeItemY = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
      if(activeItemY < 0) {
        activeItemY = 0;
      }
      target.style.webkitTransform = target.style.transform = 'translateY(' + activeItemY + 'px)';
      target.setAttribute('data-y', activeItemY);
    },
    end(event) { 
      //console.log('end');
      var target = event.target;
      activeItemY = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

      // Conditionally apply the restrictRect modifier
      if (activeItemY > 200) {
        target.removeAttribute('style');
        target.classList.remove('active', 'draggable');
        target.removeAttribute('data-y');
      } else {
        target.classList.remove('draggable');
        target.style.webkitTransform = target.style.transform = 'translateY(' + 0 + 'px)';
        target.setAttribute('data-y', 0);
        target.removeAttribute('style');
        setTimeout(() => {
          target.classList.add('draggable');
        }, drawerSlideTime);
      }
    }
  },
  // modifiers: [
  //   interact.modifiers.restrictRect({
  //     restriction: 'parent',
  //     endOnly: true,
  //     enabled: true,  // Start with the modifier enabled
  //   })
  // ],
  inertia: false
});
*/