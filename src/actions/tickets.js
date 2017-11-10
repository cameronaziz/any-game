import * as firebase from '../lib/firebase';
import * as actionTypes from './actionTypes';


const ref = firebase.db.ref('tickets');

//Actions
export function getTicketsByTeamKey(team){
  return function(dispatch) {
    ref.orderByChild('teamKey').equalTo(team).on('value', function(snapshot) {
      dispatch(loadTicketsSuccess(snapshot.val()));
    });
  };
}

export function getTicketsByKey(key, child){
  return function(dispatch) {
    ref.orderByChild(child).equalTo(key).on('value', function(snapshot) {
      dispatch(loadTicketsSuccess(snapshot.val()));
    });
  };
}


//To Reducers
export function loadTicketsSuccess(tickets){
  return {
    type: actionTypes.LOAD_TICKETS_SUCCESS,
    tickets
  };
}

export function requestTickets(){
  return {
    type: actionTypes.REQUEST_GAMES
  };
}
