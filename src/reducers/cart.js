import * as actionTypes from '../actions/actionTypes';

export default function cart(state = {}, action) {
  switch(action.type) {
    case actionTypes.ADD_TICKET_LISTING_TO_CART:
      return Object.assign({}, state, {selectedTicket: action.ticket});

    default:
      return state;
  }

}
