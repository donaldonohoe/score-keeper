
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
