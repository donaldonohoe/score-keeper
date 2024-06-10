let gameJSON;

const drawerSlideTime = 200;
const playerMeterSlideTime = 500;



let TEST_GAME_JSON = {
  'game_created_timestamp': 1717452024450,
  'game_created_readable': 'Mon Jun 03 2024 23:00:24 GMT+0100 (Irish Standard Time)',
  'game_session': {
    'players': [
      {
        'name': 'John',
        'created_index': 1, // 1-base
        'current_score': 39,
        'current_ranking': 2,
        'play_count': 2,
        'play_history': [
          {
            'play_index': 1,
            'score': 24,
            'running_total': 24
          },
          {
            'play_index': 2,
            'score': 15,
            'running_total': 39
          }
        ],
        'stats': {
          'highest_score': 24,
          'average_score': 19.5,
          'lowest_score': 15,
          'plays': 2
        }
      },
      {
        'name': 'Barbara',
        'created_index': 2, // 1-base
        'current_score': 42,
        'current_ranking': 1,
        'play_count': 2,
        'play_history': [
          {
            'play_index': 1,
            'score': 30,
            'running_total': 30
          },
          {
            'play_index': 2,
            'score': 12,
            'running_total': 42
          }
        ],
        'stats': {
          'highest_score': 30,
          'average_score': 21,
          'lowest_score': 12,
          'plays': 2
        }
      }
    ],
    'stats': {
      'leader': {
        'player_name': 'Barbara',
        'current_score': 42
      },
      'highest_score': {
        'player_name': 'Barbara',
        'current_score': 30
      },
      'lowest_score': {
        'player_name': 'Barbara',
        'current_score': 12
      },
      'average_score': 20.25
    },
    'history': [      
      {
        'timestamp': 1717452024450,
        'action': 'John was added to the game'
      },
      {
        'timestamp': 1717452024450,
        'action': 'Barbara was added to the game'
      },
      {
        'timestamp': 1717452024450,
        'action': 'Meghan was added to the game'
      },
      {
        'timestamp': 1717452024450,
        'action': 'Meghan was removed from the game'
      },
      {
        'timestamp': 1717452024450,
        'action': 'John scored 24'
      },
      {
        'timestamp': 1717452024450,
        'action': 'Barbara scored 30'
      },
      {
        'timestamp': 1717452024450,
        'action': 'John scored 15'
      },
      {
        'timestamp': 1717452024450,
        'action': 'Barbara scored 12'
      }
    ]
  },
  'game_historical_players': ['John', 'Barbara'],
  'game_settings': {
    'players_listed_by': 'score',
    'player_name_suggestions': true,
    'allow_decimal_scores': false,
    'allow_negative_scores': false
  }
}
