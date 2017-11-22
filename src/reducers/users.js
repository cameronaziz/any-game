import * as actionTypes from '../actions/actionTypes';

export default function users(state = [], action) {
  switch(action.type) {
    case actionTypes.LOADED_USER:
      return Object.values(action.user)[0];
    default:
      return state;
  }
}
