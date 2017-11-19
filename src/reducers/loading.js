import * as actionTypes from '../actions/actionTypes';

export default function loading(state = {refereeConsole: true}, action) {
  switch(action.type) {

    case actionTypes.LOADING_STATES: {
      return Object.assign({}, state, action.loadingState);
    }

    default:
      return state;
  }
}
