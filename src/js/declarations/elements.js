
// Components
const els_segmentedButtons = document.querySelectorAll('.segmented-button');
const els_onScreenKeyboards = document.querySelectorAll('.on-screen-keyboard');

// Main
const el_main = document.querySelector('main');
const el_background = document.getElementById('background');
const el_intro = document.getElementById('intro');
const el_introAddPlayerButton = document.getElementById('intro-add-player-button');

// Leaderboard
const el_leaderboard = document.getElementById('leaderboard');
const el_playerBars = el_leaderboard.querySelector('#player-bars');

// Game nav
const el_gameNav = document.getElementById('game-nav');
const els_navButtons = el_gameNav.querySelectorAll('button');
const el_settingsButton = document.getElementById('settings-button');
const el_addPlayerButton = document.getElementById('add-player-button');
const el_gameInfoButton = document.getElementById('game-info-button');

// Drawers
const els_drawers = document.querySelectorAll('.drawer');
const el_drawerScrim = document.getElementById('drawer-scrim');
const els_close_drawer_buttons = document.querySelectorAll('.drawer .close-button');
const els_drawer_nav_buttons = document.querySelectorAll('.drawer .drawer-nav button');

// Add player drawer
const el_addPlayerDrawer = document.getElementById('add-player-drawer');
const el_addPlayerInput = document.getElementById('add-player-input');
const el_addPlayerSubmit = document.getElementById('add-player-submit');
const el_addPlayerChips = document.getElementById('add-player-chips');

// Player drawer
const el_playerDrawer = document.getElementById('player-drawer');
const el_playerScoreInput = document.getElementById('player-score-input');
const el_playerScoreSubmit = document.getElementById('player-score-submit');
const el_playerStats = document.getElementById('player-stats');
const el_removePlayerButton = document.getElementById('player-remove-button');

// Settings drawer
const el_settingsDrawer = document.getElementById('settings-drawer');
const el_restartGameButton = document.getElementById('restart-game-button');
const el_newGameButton = document.getElementById('new-game-button');
const el_playerOrderTypeButton = document.getElementById('player-order-type-button');
const el_keyboardInputTypeButton = document.getElementById('keyboard-input-type-button');

// Game info drawer
const el_gameInfoDrawer = document.getElementById('game-info-drawer');
const el_gameInfoStats = document.getElementById('game-info-stats');
const el_gameInfoHistory = document.getElementById('game-info-history');
const el_gameInfoHistoryOrderButton = document.getElementById('game-history-order-button');