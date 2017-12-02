import * as actionTypes from './actionTypes';
import * as ticketActions from './tickets';
import * as loadingActions from './loading';

export function clickSection(section) {
  return function(dispatch) {
    dispatch(loadingActions.isLoading('seatingChartSections'));
    dispatch(sectionClicked(section));
    dispatch(loadingActions.notLoading('seatingChartSections'));
  };
}

export function clearSelections() {
  return function(dispatch) {
    dispatch(clearSectionsSelected());
  };
}



export function sectionClicked(section) {
  return {
    type: actionTypes.SELECT_SECTION,
    section
  };
}

export function clearSectionsSelected() {
  return {
    type: actionTypes.CLEAR_SELECTIONS
  };
}
