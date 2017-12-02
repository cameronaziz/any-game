import * as firebase from '../lib/firebase';
import * as actionTypes from './actionTypes';

import { convertToArray } from '../lib/utilities';
import * as teams from './teams';

const ref = firebase.db.ref('tickets');

//Actions
export function getTicketsByTeamKey(team){
  return function(dispatch) {
    firebase.db.ref('tickets/' + team).on('value', function(snapshot) {
      let tickets = snapshot.val();
      for (let key in tickets) {
        let ticket = tickets[key];
        ticket.isHidden = false;
      }
      dispatch(loadTicketsSuccess(tickets));
    });
  };
}

export function getTicketsBySlug(slug){
  return function(dispatch) {
    teams.returnTeamBySlug(slug).then((team) => {
      firebase.db.ref('tickets/' + Object.keys(team)[0]).orderByChild('price').limitToFirst(10).on('value', function(snapshot) {
        let tickets = snapshot.val();
        for (let key in tickets) {
          let ticket = tickets[key];
          ticket.isHidden = false;
        }
        homes.sort(function(a, b) {
          return parseFloat(a.price) - parseFloat(b.price);
        });
        dispatch(loadTicketsSuccess(tickets));
      });
    });

  };
}


export function filterTicketsBySections(selectedSections, sectionClicked) {
  if(selectedSections.indexOf(sectionClicked) == -1) {
    return function(dispatch) {
      dispatch(filterAddTickets(sectionClicked));
    };
  } else {
    return function(dispatch) {
      dispatch(filterRemoveTickets(sectionClicked));
    };
  }
}

export function newFilterTicketsBySection(sectionClicked) {
  return function(dispatch) {
    dispatch(newFilter(sectionClicked));
  };
}

export function clearFilterBySection(){
  return function(dispatch) {
    dispatch(clearFilter());
  };
}

//To Reducers
export function loadTicketsSuccess(tickets){
  return {
    type: actionTypes.LOAD_TICKETS_SUCCESS,
    tickets
  };
}

export function newFilter(section){
  return {
    type: actionTypes.NEW_FILTER_TICKETS_FROM_SECTION,
    section
  };
}

export function filterRemoveTickets(section){
  return {
    type: actionTypes.HIDE_TICKETS_FROM_SECTION,
    section
  };
}

export function filterAddTickets(section){
  return {
    type: actionTypes.SHOW_TICKETS_FROM_SECTION,
    section
  };
}

export function clearFilter() {
  return {
    type: actionTypes.CLEAR_FILTER
  };
}
