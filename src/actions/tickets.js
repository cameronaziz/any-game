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

export function getTicketsByArrayOfSections(sections) {

  const sectionPromises = sections.map(section => {
    ref.orderByChild('section').equalTo(section).on('value', s => s);
  });

  Promise.all(sectionPromises)
    .then(tickets => {
      console.log(tickets)
      return function(dispatch) {
        dispatch(loadTicketsSuccess(tickets));
      };
    })
    .catch(err => {
      // handle error
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
