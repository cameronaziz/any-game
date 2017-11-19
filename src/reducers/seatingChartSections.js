import * as actionTypes from '../actions/actionTypes';

export default function seatingChartSections(state = {}, action) {
  switch(action.type) {

    case actionTypes.SEATING_CHART_SECTIONS:
      return action.sections;

    default:
      return state;
  }
}
