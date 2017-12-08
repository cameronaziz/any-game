import * as actionTypes from '../actions/actionTypes';
//import { nestedObjectAssign } from '../lib/utilities';

export default function ticketListings(state = [], action) {

  let newState = [];
  if(state.length !== 0) {
    state.forEach((item) => {
      let newItem = Object.assign({}, item);
      newState.push(newItem);
    });
  }

  switch(action.type) {
    case actionTypes.LOAD_TICKET_LISTINGS:
      action.ticketListings.forEach((listing) => {
        listing.isHidden = false;
      });
      return action.ticketListings;

    case actionTypes.NEW_FILTER_TICKET_LISTINGS_BY_SECTION:
      newState.forEach((listing) => {
        listing.isHidden = true;
      });
      newState.forEach((listing) => {
        if(listing.sectionKey == action.section) {
          listing.isHidden = false;
        }
      });
      return newState;

    case actionTypes.HIDE_TICKET_LISTINGS_BY_SECTION:
      newState.forEach((listing) => {
        if(listing.sectionKey == action.section) {
          listing.isHidden = true;
        }
      });
      return newState;

    case actionTypes.SHOW_TICKET_LISTINGS_BY_SECTION:
      newState.forEach((listing) => {
        if(listing.sectionKey == action.section) {
          listing.isHidden = false;
        }
      });
      return newState;

    case actionTypes.CLEAR_TICKET_LISTINGS_FILTER:
      newState.forEach((listing) => {
        listing.isHidden = false;
      });
      return newState;



    default:
      return state;
  }
}
