
/*
// Fit to window
const fitAppToWindow = () => {
  el_main.style.width = `${window.innerWidth}px`;
  el_main.style.height = `${window.innerHeight}px`;
}
window.addEventListener("resize", fitAppToWindow);
window.addEventListener("load", fitAppToWindow);
*/




// Ref: https://interactjs.io/docs/inertia/

//let allowDragToClose = true; 
//let isScrolling = false;
// let draggableDrawer = document.querySelector('.drawer.draggable');
// let draggableDrawerInner = document.querySelector('.drawer .inner');

/*
const drawer = document.getElementById('game-info-drawer');
const content = drawer.querySelector('.inner');
const heading = drawer.querySelector('.drawer-header');
let isDragging = false;
//let startY = 0;
let currentY = 0;



let posY = 0;
let isSwiping = false;
let touchActionSet = false;

content.addEventListener('touchstart', function(e) {
    // Get the initial touch position
    posY = e.changedTouches[0].screenY;
    //alert(posY + 'start');
    //isSwiping = true;
    touchActionSet = false;
});

//let touchPos = 0;

content.addEventListener('touchmove', function(e) {
    //if (!isSwiping) return;
    //alert(posY + 'move');
    //touchPos = e.changedTouches[0].screenY
    let currentY = e.touches[0].clientY;
    //alert(e.changedTouches[0].screenY);
    // Calculate the difference in Y-coordinates
    let diffY = currentY - posY;
    // If the difference is positive and greater than a threshold, it's a downward swipe
    if (diffY < 10 && !touchActionSet) { // 30px threshold to determine swipe
        //alert(diffY);
        heading.innerHTML = diffY;
        //isSwiping = false; // Stop further checks until a new touchstart
        //onSwipeDown(); // Call your function here
        content.style.touchAction = 'auto';

        touchActionSet = true;
        // Optionally, remove the touchmove listener to prevent further handling
        //content.removeEventListener('touchmove', arguments.callee);

        // Optionally, you can force the container to scroll by a small amount to trigger the scroll action
        content.scrollTop += 1;

        return;
        //alert(posY);
    }
    // Prevent default behavior to avoid unintended interactions
    if (!touchActionSet) {
        e.preventDefault();
    }
});

content.addEventListener('touchend', function(event) {
  // posY = event.changedTouches[0].screenY;
  //   alert(posY + 'end');
    // Reset the swiping status
    // isSwiping = false;
    // content.style.touchAction = 'none';
});

// function onSwipeDown() {
//     //alert("Swiped down!");
//     content.style.touchAction = 'none';
//     // Your custom function logic here
// }

*/



const draggableDrawer = (drawer) => {

  let startY, startTop, isDragging, targetInner = false;
  const drawerInner = drawer.querySelector('.inner');

  setTimeout(() => drawer.classList.add('draggable'), drawerSlideTime);

  const handleTouchStart = (e) => {
    if(e.target.closest('.inner')) {
      targetInner = true;
    }
    startY = e.touches[0].pageY; // Capture the starting Y position of the touch
    startTop = drawer.getBoundingClientRect().top; // Capture the initial drawer's transform translateY value
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
      if (drawer.getBoundingClientRect().top > 100) { // Close drawer if dragged past threshold
        drawer.removeAttribute('style');
        drawer.classList.remove('active', 'draggable');
      } else { // Snap back to the open position
        drawer.classList.remove('draggable');
        drawer.style.webkitTransform = drawer.style.transform = 'translateY(' + 0 + 'px)';
        setTimeout(() => {
          drawer.classList.add('draggable');
        }, drawerSlideTime);
      }
    }
    targetInner = false;
  }

  drawer.addEventListener('touchstart', handleTouchStart);
  drawer.addEventListener('touchmove', handleTouchMove);
  drawer.addEventListener('touchend', handleTouchEnd);

} // draggableDrawer()





/*
const drawer = document.getElementById('game-info-drawer');
const innerContent = drawer.querySelector('.inner');

let startY, startTop, isDragging = false;

drawer.addEventListener('touchstart', function(e) {
    // Capture the starting Y position of the touch
    startY = e.touches[0].pageY;
    // Capture the initial drawer's transform translateY value
    startTop = drawer.getBoundingClientRect().top;
    // Reset dragging state
    isDragging = false;
});

drawer.addEventListener('touchmove', function(e) {
    const movingY = e.touches[0].pageY;
    const diffY = movingY - startY;
    const isAtTop = innerContent.scrollTop === 0;

    // If user swipes down and inner content is at the top, pull the drawer down
    if (diffY > 0 && isAtTop) {
        isDragging = true;
        const newTranslateY = Math.min(startTop + diffY, window.innerHeight);
        drawer.style.transform = `translateY(${newTranslateY}px)`;
    } else if (!isDragging) {
        // Allow natural scrolling if not dragging the drawer
        return;
    }

    // Prevent default scrolling behavior if dragging the drawer
    e.preventDefault();
});

drawer.addEventListener('touchend', function(e) {
    if (isDragging) {
        // Determine if the drawer should close based on swipe distance
        const currentTop = drawer.getBoundingClientRect().top;
        const drawerHeight = drawer.offsetHeight;

        if (currentTop > drawerHeight / 4) {
            // Close the drawer if swiped down enough
            //drawer.style.transform = `translateY(100%)`;
            drawer.removeAttribute('style');
            drawer.classList.remove('active', 'draggable');
            //drawer.classList.remove('active');
        } else {
            // Snap back to the open position
            //drawer.style.transform = `translateY(0)`;
            drawer.classList.remove('draggable');
            drawer.style.webkitTransform = drawer.style.transform = 'translateY(' + 0 + 'px)';
            setTimeout(() => {
              drawer.classList.add('draggable');
            }, drawerSlideTime);
        }
    }
});

// Function to open the drawer
// function openDrawer() {
//     drawer.style.transform = `translateY(0)`;
// }

// Function to close the drawer
// function closeDrawer() {
//     drawer.style.transform = `translateY(100%)`;
// }
*/






/*

interact('.drawer.draggable')
  .draggable({
    listeners: {
      start(event) {
        // let drawerInnerScrollPos = event.target.querySelector('.inner').scrollTop;
        // // allowDragToClose = drawerInnerScrollPos == 0 ? true : false;
        // if(drawerInnerScrollPos == 0) {
        //   event.target.querySelector('.inner').style.touchAction = 'none';
        //   allowDragToClose = true;
        // } else {
        //   event.target.querySelector('.inner').style.touchAction = 'auto';
        //   allowDragToClose = true;
        // }
        // if (isScrolling) {
        //   alert('stop');
        //   event.interaction.stop(); // Prevent dragging if scrolling
        // }

        //event.target.querySelector('.inner').style.touchAction = 'auto';

        //startY = parseFloat(drawer.dataset.y) || 0;
        //isDragging = content.scrollTop === 0 && event.dy > 0;

        // activeItemY = (parseFloat(event.target.getAttribute('data-y')) || 0) + event.dy;
        // console.log(activeItemY);
        // if(content.scrollTop === 0) {
        //   isDragging = true;
        // }

        // if (isDragging == true) {
        //   event.preventDefault();
        // }
        

      },
      move(event) { 

        // if (event.interaction.interacting()) {
        //   event.preventDefault();
        // }

        //let drawerInner = event.target.querySelector('.inner');
        //let drawerInnerScrollPos = event.target.querySelector('.inner').scrollTop;
        
        //if(allowDragToClose == true) {
          //event.target.querySelector('.inner').style.touchAction = 'none';
          //console.log('move');
          // var target = event.target;

          // activeItemY = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
          // let drawerHeading = event.target.querySelector('.drawer-header');
          // drawerHeading.innerText = activeItemY;


          // Detect scroll start and stop events
          // draggableDrawerInner.addEventListener('scroll', () => {
          //   isScrolling = true;
          //   //drawerHeading.innerText = 'scrolling inner';
          // });

          // if(target.scrollTop == 0) {
          // //if (isScrolling == false) {
          //     if(activeItemY < 0) { // dragging up
          //       //event.target.querySelector('.inner').style.touchAction = 'none';
          //       activeItemY = 0;
          //     } 
          //     else {
          //       event.target.style.touchAction = 'none';
          //     }
          //     target.style.webkitTransform = target.style.transform = 'translateY(' + activeItemY + 'px)';
          //     target.setAttribute('data-y', activeItemY);
          //   //}
          // }


          // Only allow dragging when content is at the top
          //console.log(isDragging);
          //if (isDragging) {
              // currentY = startY + event.dy;
              // drawer.style.transform = `translateY(${currentY}px)`;
              // drawer.dataset.y = currentY;
          //}

          //if (isDragging) {
            activeItemY = (parseFloat(event.target.getAttribute('data-y')) || 0) + event.dy;
            if(activeItemY < 0) {
              activeItemY = 0;
            }
            event.target.style.webkitTransform = event.target.style.transform = 'translateY(' + activeItemY + 'px)';
            event.target.setAttribute('data-y', activeItemY);
            //event.preventDefault();
          //}

          



          // if(activeItemY < 0) {
          //   event.target.querySelector('.inner').style.touchAction = 'auto';
          //   activeItemY = 0;
          // } else if (activeItemY == 0) {

          // }
          // target.style.webkitTransform = target.style.transform = 'translateY(' + activeItemY + 'px)';
          // target.setAttribute('data-y', activeItemY);
        //}
      },
      end(event) { 
        //console.log('end');
        var target = event.target;
        activeItemY = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        //console.log(allowDragToClose);

        //if(allowDragToClose == true) {
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

          // isScrolling = false;

          //event.target.querySelector('.inner').style.touchAction = 'none';
        //}


        // Snap back to the original position if dragged down too far
        // if (currentY > 100) { // Arbitrary threshold for snapping back
        //     drawer.style.transform = `translateY(${window.innerHeight - 100}px)`;
        //     drawer.dataset.y = window.innerHeight - 100;
        // } else {
        //     drawer.style.transform = `translateY(0)`;
        //     drawer.dataset.y = 0;
        // }
        // isDragging = false;
        
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


  // Prevent dragging upwards if the drawer is at its full height
  // content.addEventListener('scroll', function() {
  //     if (content.scrollTop > 0) {
  //         isDragging = false;
  //     }
  // });



  // // Detect scroll start and stop events
  // draggableDrawerInner.addEventListener('scroll', () => {
  //   console.log('scroll');
  //   console.log(draggableDrawerInner.scrollTop);
  //   // isScrolling = true;
  //   // clearTimeout(draggableDrawerInner.scrollTimeout);
  //   // draggableDrawerInner.scrollTimeout = setTimeout(() => {
  //   //     isScrolling = false;
  //   // }, 100); // Delay after scroll to enable dragging again
  // });



/*
const containerX = document.getElementById('game-info-drawer');
const contentY = containerX.querySelector('.inner');

  let containerXStartY = 0;

  interact(containerX).draggable({
      listeners: {
          start(event) {
              // Record the initial position of the container X
              containerXStartY = parseFloat(containerX.dataset.y) || 0;
          },
          move(event) {
              const scrollTop = contentY.scrollTop;

              // Only drag container X if contentY's scrollTop is 0
              if (scrollTop === 0 && event.delta.y > 0) {
                  let y = containerXStartY + event.delta.y; console.log(y);

                  containerX.style.transform = `translateY(${y}px)`;
                  containerX.dataset.y = y;
              }
          }
      }
  });

  // Optional: Handle touch-action to avoid conflict with touch scrolling
  contentY.style.touchAction = 'pan-y';
  */











  // Working version without inner scrollable

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