import * as actionTypes from '../actions/actionTypes';

export default function venues(state = {}, action) {
  switch(action.type) {

    case actionTypes.REQUEST_SETTINGS:
      return {isFetching: true};

    case actionTypes.SETTINGS:
      return {isFetching: false, settingsArray: action.settings};

    case actionTypes.SET_REDIRECT:
      if(action.location) {
        return Object.assign({}, {redirect: action.location});
      } else {
        return Object.assign({}, {redirect: null});
      }

    default:
      return state;
  }
}
