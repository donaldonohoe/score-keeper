/*
let dragDisplacement = 0;

const draggable = (el, action) => {
  let endMove = () => {
    window.removeEventListener('mousemove', action);
    window.removeEventListener('mouseup', endMove);
  };
  el.addEventListener('mousedown', (event) => {
      event.stopPropagation();
      window.addEventListener('mousemove', action);
      window.addEventListener('mouseup', endMove);   
  });
}

const draggableDrawers = (e) => {
  let openDrawer = document.querySelector('.drawer.active');

  function getTranslateX() {
    var style = window.getComputedStyle(openDrawer);
    var matrix = new WebKitCSSMatrix(style.transform);
    console.log('translateX: ', matrix.m41);
  }

  //getTranslateX();

  let pageY = e.pageY;
  console.log(pageY);

  
  if(dragDisplacement == 0) {
    dragDisplacement = pageY;
    console.log('dragDisplacement: ' + dragDisplacement);
  }
  else {
    dragDisplacement = dragDisplacement - pageY;
    console.log('dragDisplacement: ' + dragDisplacement);
  }

}


els_drawers.forEach((drawer) => {
  draggable(drawer, draggableDrawers);
});
*/




// Global draggable object, containing all necessary variables and functions
const draggable = {
  startX: 0,
  startY: 0,
  totalXPixelsMoved: 0,
  totalYPixelsMoved: 0,
  handleMouseDown: (event) => {
    //event.preventDefault();
    // Get initial mouse position
    if (event.type === 'mousedown') { // For mouse events
      draggable.startX = event.clientX;
      draggable.startY = event.clientY;
    } else if (event.type === 'touchstart') { // For touch events
      draggable.startX = event.touches[0].clientX;
      draggable.startY = event.touches[0].clientY;
    }
    // Add event listeners for mousemove and mouseup
    document.addEventListener('mousemove', draggable.handleMouseMove);
    document.addEventListener('touchmove', draggable.handleMouseMove);
    document.addEventListener('mouseup', draggable.handleMouseUp);
    document.addEventListener('touchend', draggable.handleMouseUp);
  },
  handleMouseMove: (event) => {
    event.preventDefault();
    // Calculate distance moved
    let distanceX, distanceY;
    if (event.type === 'mousemove') { // For mouse move events
      distanceX = Math.abs(event.clientX - draggable.startX);
      distanceY = Math.abs(event.clientY - draggable.startY);
    } else if (event.type === 'touchmove') { // For touch move events
      distanceX = Math.abs(event.touches[0].clientX - draggable.startX);
      distanceY = Math.abs(event.touches[0].clientY - draggable.startY);
    }
    //alert(distanceY);
    // Calculate total pixels moved (you can adjust this based on your needs)
    //totalPixelsMoved += Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    draggable.totalXPixelsMoved += distanceX;
    draggable.totalYPixelsMoved += distanceY;
    // Update startX and startY to current position
    draggable.startX = event.clientX;
    draggable.startY = event.clientY;
    // Example: Log total pixels moved
    //console.log('Total Y pixels moved:', draggable.totalYPixelsMoved);
    //draggableDrawer(draggable.totalYPixelsMoved);

    // Get the bounding rectangle of the element
    const rect = el_gameFrame.getBoundingClientRect();
    // Calculate cursor position relative to the element
    let offsetY;
    if (event.type === 'mousemove') { // For mouse move events
      offsetY = event.clientY - rect.top;
    } else if (event.type === 'touchmove') { // For touch move events
      offsetY = event.touches[0].clientY - rect.top;
    }
    //console.log(offsetY);
    draggable.totalYPixelsMoved = offsetY;
    draggableDrawer(draggable.totalYPixelsMoved);
    
  },
  handleMouseUp: (event) => {
    // Remove event listeners
    document.removeEventListener('mousemove', draggable.handleMouseMove);
    document.removeEventListener('touchmove', draggable.handleMouseMove);
    document.removeEventListener('mouseup', draggable.handleMouseUp);
    document.removeEventListener('touchend', draggable.handleMouseUp);
    // Example: Log final total pixels moved
    console.log('Final Y total pixels moved:', draggable.totalYPixelsMoved);
    draggable.totalYPixelsMoved = 0; // reset
  }
}




/*
// Variables to store starting position and total pixels moved
let startX, startY;
let totalPixelsMoved = 0;
let totalXPixelsMoved = 0;
let totalYPixelsMoved = 0;

// Function to handle mouse down event
function handleMouseDown(event) {
  // Get initial mouse position
  startX = event.clientX;
  startY = event.clientY;
  
  // Add event listeners for mousemove and mouseup
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
}

// Function to handle mouse move event
function handleMouseMove(event) {
  // Calculate distance moved
  const distanceX = Math.abs(event.clientX - startX);
  const distanceY = Math.abs(event.clientY - startY);
  
  // Calculate total pixels moved (you can adjust this based on your needs)
  //totalPixelsMoved += Math.sqrt(distanceX * distanceX + distanceY * distanceY);
  totalXPixelsMoved += distanceX;
  totalYPixelsMoved += distanceY;
  
  // Update startX and startY to current position
  startX = event.clientX;
  startY = event.clientY;
  
  // Example: Log total pixels moved
  console.log('Total Y pixels moved:', totalYPixelsMoved);
}

// Function to handle mouse up event
function handleMouseUp(event) {
  // Remove event listeners
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup', handleMouseUp);
  
  // Example: Log final total pixels moved
  console.log('Final Y total pixels moved:', totalYPixelsMoved);
  totalYPixelsMoved = 0; // reset
}
*/


/*
function getTranslateValues(element) {
  // Get the computed styles for the element
  const styles = window.getComputedStyle(element);
  
  // Extract the transform property value
  const transformString = styles.transform || styles.webkitTransform || styles.mozTransform;
  
  // Initialize variables to store translate values
  let translateX = 0;
  let translateY = 0;
  
  // Regular expression to match translate values
  const translateRegex = /translate\(\s*(-?\d+\.?\d*)px,\s*(-?\d+\.?\d*)px\)/;
  
  // Check if transform contains a translate
  if (transformString && transformString.includes('translate')) {
    const matches = transformString.match(translateRegex);
    if (matches) {
      translateX = parseFloat(matches[1]);
      translateY = parseFloat(matches[2]);
    }
  }
  
  // Return translate values as an object
  return { translateX, translateY };
}

// Example usage:
// const element = document.getElementById('yourElementId'); // Replace with your element ID
// const translateValues = getTranslateValues(element);
// console.log('Translate X:', translateValues.translateX);
// console.log('Translate Y:', translateValues.translateY);
*/



const draggableDrawer = (draggedAmount) => {
  let openDrawer = document.querySelector('.drawer.active');
  function getTranslateY() {
    var style = window.getComputedStyle(openDrawer);
    var matrix = new WebKitCSSMatrix(style.transform);
    return matrix.m42;
  }
  console.log('offset pos from frame: ' + draggedAmount);
  //console.log('Drawer translateY value: ' + getTranslateY());
  //let newYPos = getTranslateY() + draggedAmount;
  // console.log(`draggedAmount: ${draggedAmount}`);
  // console.log(`newYPos: ${newYPos}`);

  openDrawer.style.transform = `translateY(${draggedAmount}px)`;
  console.log('--------------------');
}

// Attach mousedown event listener to document
els_drawers.forEach((drawer) => {
  drawer.addEventListener('mousedown', draggable.handleMouseDown);
  drawer.addEventListener('touchstart', draggable.handleMouseDown);
});



/*
1. When drawer open add event listener (mousedown, draggable)
*/