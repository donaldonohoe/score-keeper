let gameJSON;

// Measures
let playerBarHeight = window.innerWidth < 768 ? 100 : 130; // px
const drawerPullThreshold = 100; // Amount of px a drawer needs to be pulled to close upon release
const backgroundVoltMaxDelay = 10000; // ms

// Transitions
const drawerSlideTime = 200;
const playerRemoveTime = 500;
const playerMeterSlideTime = 700; // to match CSS transition time
const playerScoreAnimateTime = 700;