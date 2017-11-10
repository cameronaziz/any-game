import * as actionTypes from '../actions/actionTypes';

export default function tickets(state = {}, action) {
  switch(action.type) {

    case actionTypes.LOAD_TICKETS_SUCCESS:
      return action.tickets;

    default:
      return state;
  }
}
