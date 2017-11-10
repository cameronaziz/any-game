import * as actionTypes from '../actions/actionTypes';

export default function games(state = {}, action) {
  switch(action.type) {

    case actionTypes.LOAD_GAMES_SUCCESS:
      return action.games;

    case actionTypes.ADD_GAMES_SUCCESS: {
      let games = state.gamesArray.concat(action.games);
      return {gamesArray: games, isFetching: false};
    }

    case actionTypes.REQUEST_GAMES:
      return { gamesArray: state.gamesArray, isFetching: action.status};

    default:
      return state;
  }
}
