import * as actionTypes from '../actions/actionTypes';

export default function venues(state = [], action) {
  switch(action.type) {

    case actionTypes.REQUEST_SETTINGS:
      return {isFetching: true};

    case actionTypes.SETTINGS:
      return {isFetching: false, settingsArray: action.settings};

    default:
      return state;
  }
}
