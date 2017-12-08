import * as firebase from '../lib/firebase';
import * as actionTypes from './actionTypes';
import * as loadingActions from './loading';
import { returnTeamBySlug } from './teams';

import { nestedObjectsToArray, sort, findByKey } from '../lib/utilities';

export function getTicketListingsBySlug(slug){
  return function(dispatch) {
    dispatch(loadingActions.isLoading('ticketListings'));
    returnTeamBySlug(slug).then(function(team) {
      let teamKey = Object.keys(team)[0];
      firebase.db.ref('teamTicketListings/' + teamKey).orderByChild('isSold').equalTo(false).on('value', function(snapshot) {
        dispatch(loadTicketListings(sort(nestedObjectsToArray(snapshot.val()))));
        dispatch(loadingActions.notLoading('ticketListings'));
      });
    });
  };
}

export function getTicketListingsByTeamKey(teamKey) {
  return function(dispatch) {
    dispatch(loadingActions.isLoading('ticketListings'));
    firebase.db.ref('teamTicketListings/' + teamKey).orderByChild('isSold').equalTo(false).on('value', function(snapshot) {
      dispatch(loadTicketListings(sort(nestedObjectsToArray(snapshot.val()))));
      dispatch(loadingActions.notLoading('ticketListings'));
    });
  };
}

export function getTicketListingsByTeamKeyAndTicketKey(teamKey, ticketKey) {
  return function(dispatch) {
    dispatch(loadingActions.isLoading('ticketListings'));
    firebase.db.ref('teamTicketListings/' + teamKey).orderByChild('isSold').equalTo(false).on('value', function(snapshot) {
      let tickets = nestedObjectsToArray(snapshot.val());
      let ticket = findByKey(tickets, ticketKey);
      dispatch(loadTicketListing(ticket));
      dispatch(loadingActions.notLoading('ticketListings'));
    });
  };
}

export function newFilterTicketsBySection(sectionClicked) {
  return function(dispatch) {
    dispatch(newFilter(sectionClicked));
  };
}

export function filterTicketsBySections(selectedSections, sectionClicked) {
  if(selectedSections.indexOf(sectionClicked) == -1) {
    return function(dispatch) {
      dispatch(filterAddSection(sectionClicked));
    };
  } else {
    return function(dispatch) {
      dispatch(filterRemoveSection(sectionClicked));
    };
  }
}

export function clearTicketListingsFilter() {
  return function(dispatch) {
    dispatch(clearFilter());
  };
}

export function selectTicketListing(ticketListingKey) {
  return function(dispatch) {
    dispatch(selectSingleTicketListing(ticketListingKey));
  };
}


function loadTicketListings(ticketListings) {
  return {
    type: actionTypes.LOAD_TICKET_LISTINGS,
    ticketListings
  };
}


function loadTicketListing(ticket) {
  return {
    type: actionTypes.ADD_TICKET_LISTING_TO_CART,
    ticket
  };
}

function selectSingleTicketListing(ticketListingKey) {
  return {
    type: actionTypes.SELECT_TICKET_LISTING,
    ticketListingKey
  };
}

function newFilter(section){
  return {
    type: actionTypes.NEW_FILTER_TICKET_LISTINGS_BY_SECTION,
    section
  };
}

function filterRemoveSection(section){
  return {
    type: actionTypes.HIDE_TICKET_LISTINGS_BY_SECTION,
    section
  };
}

function filterAddSection(section){
  return {
    type: actionTypes.SHOW_TICKET_LISTINGS_BY_SECTION,
    section
  };
}

function clearFilter() {
  return {
    type: actionTypes.CLEAR_TICKET_LISTINGS_FILTER
  };
}
