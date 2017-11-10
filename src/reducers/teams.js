import * as actionTypes from '../actions/actionTypes';

export default function teams(state = {}, action) {
  switch(action.type) {

    case actionTypes.LOAD_TEAMS_SUCCESS:
      return action.teams;

    case actionTypes.LOAD_SEATING_CHART_SUCCESS:
      return action.teams;

    default:
      return state;
  }
}
