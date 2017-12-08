import * as actionTypes from '../actions/actionTypes';

const initialState = {
  refereeConsole: true,
  ticketListings: true
};

export default function loading(state = initialState, action) {
  switch(action.type) {

    case actionTypes.LOADING_STATES: {
      return Object.assign({}, state, action.loadingState);
    }

    default:
      return state;
  }
}
