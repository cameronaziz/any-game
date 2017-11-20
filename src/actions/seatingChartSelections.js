import * as actionTypes from './actionTypes';
import * as ticketActions from './tickets';

export function clickSection(section){
  return function(dispatch) {
    dispatch(sectionClicked(section));
    dispatch(ticketActions.filterTicketsByArray([section]));
  };
}


export function sectionClicked(section){
  return {
    type: actionTypes.SELECT_SECTION,
    section
  };
}
