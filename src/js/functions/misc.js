
// Keyboard key codes
const keyCodes = {
	32: 'space',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
	48: '0',
	49: '1',
	50: '2',
	51: '3',
	52: '4',
	53: '5',
	54: '6',
	55: '7',
	56: '8',
	57: '9',
  65: 'a',
  66: 'b',
	67: 'c',
	68: 'd',
	69: 'e',
	70: 'f',
	71: 'g',
	72: 'h',
	73: 'i',
	74: 'j',
	75: 'k',
	76: 'l',
	77: 'm',
	78: 'n',
	79: 'o',
	80: 'p',
	81: 'q',
	82: 'r',
	83: 's',
	84: 't',
	85: 'u',
	86: 'v',
	87: 'w',
	88: 'x',
	89: 'y',
	90: 'z'
};

// Listen for custom code sequence
const doCustomCode = (customCode, customFunction) => {
	let codePosition = 0;
	document.addEventListener('keydown', function(e) {
	  let key = keyCodes[e.keyCode]; // get the value of the key code from the key map
	  let requiredKey = customCode[codePosition]; // get the value of the required key from the code
	  if (key == requiredKey) { // compare the key with the required key
	    codePosition++; // move to the next key in the code sequence
	    if (codePosition == customCode.length) { // if the last key is reached, call function
	      customFunction();
	      codePosition = 0;
	    }
	  } else {
	    codePosition = 0;
	  }
	});
}

// Load sample game for testing
const loadSampleGame = () => {
  restartGameNew();
  createNewGame(true);
  let samplePlayers = [
    { name: 'Adam', scores: [35, 22, 45] },
    { name: 'Barbara', scores: [24, 25, 18] },
    { name: 'Charlie', scores: [19, 58, 62] },
    { name: 'Debbie', scores: [42, 70, 21] },
    { name: 'Eddie', scores: [5, 27, 44] }
  ];
  setTimeout(() => { // wait for previous game to be fully reset
		// Set display on layers
    el_intro.classList.remove('active');
    el_leaderboard.classList.add('active');
    el_gameNav.classList.add('active');
		// Create sample players
    samplePlayers.forEach((p) => {
			let playerName = p.name.toUpperCase();
      createPlayer(playerName); 
      el_playerDrawer.setAttribute('data-player-name', playerName);
      p.scores.forEach((s) => applyScore(s));
    });
  },1000);
}

// Apply custom code sequence and function to load sample game
doCustomCode(['s','a','m','p','l','e'], loadSampleGame);