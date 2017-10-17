import * as firebase from '../lib/firebase';
import * as actionTypes from './actionTypes';


const ref = firebase.db.ref('tickets');

//Actions
export function loadTickets(team){
  return function(dispatch) {
    //dispatch(requestTickets);
    ref.orderByChild('home_team').equalTo(team).on('value', function(snapshot) {
      dispatch(loadTicketsSuccess(Object.values(snapshot.val())));
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
