import * as actionTypes from '../actions/actionTypes';

export default function seatingChartSelections(state = [], action) {
  switch(action.type) {

    case actionTypes.SELECT_SECTION:
      let selectedSections = [];
      if(state.indexOf(action.section) == -1) {
        selectedSections = [ ...state, action.section];
      } else {
        selectedSections = state.filter(char => char !== action.section);
      }
      return selectedSections;

    default:
      return state;

  }
}
