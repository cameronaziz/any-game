import * as actionTypes from '../actions/actionTypes';
import { nestedObjectAssign } from '../lib/utilities';

export default function tickets(state = {}, action) {

  let newState = {};
  if(Object.keys(state).length !== 0) {
    newState = nestedObjectAssign(state);
  }

  switch(action.type) {

    case actionTypes.LOAD_TICKETS_SUCCESS:
      return action.tickets;

    case actionTypes.NEW_FILTER_TICKETS_FROM_SECTION:
      for (let key in newState) {
        let ticket = newState[key];
        ticket.isHidden = true;
      }
      for (let key in newState) {
        let ticket = newState[key];
        if(ticket.sectionKey == action.section) {
          ticket.isHidden = false;
        }
      }
      return newState;

    case actionTypes.HIDE_TICKETS_FROM_SECTION:
      for (let key in newState) {
        let ticket = newState[key];
        if(ticket.sectionKey == action.section) {
          ticket.isHidden = true;
        }
      }
      return newState;

    case actionTypes.SHOW_TICKETS_FROM_SECTION:
      for (let key in newState) {
        let ticket = newState[key];
        if(ticket.sectionKey == action.section) {
          ticket.isHidden = false;
        }
      }
      return newState;

    case actionTypes.CLEAR_FILTER:
      for (let key in newState) {
        let ticket = newState[key];
        ticket.isHidden = false;
      }
      return newState;


    default:
      return state;
  }
}
