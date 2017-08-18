import * as firebase from '../lib/firebase';
import * as actionTypes from './actionTypes';

import ticketmaster from 'ticketmaster';

const ref = firebase.db.ref('tickets');

//Actions
export function loadTickets(team){
  return function(dispatch) {
    dispatch(requestTickets);
    ref.orderByChild('home_team').equalTo(team).on('value', function(snapshot) {
      dispatch(loadTicketsSuccess(Object.values(snapshot.val())));
    });
  };
}

export function getTicketmasterTickets(settings){
  ticketmaster(settings.key).discovery.v2.event.all()
.then(function(result) {
  console.log(result);
});
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
