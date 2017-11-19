import * as actionTypes from '../actions/actionTypes';

export default function seatingChart(state = {}, action) {
  switch(action.type) {

    case actionTypes.LOAD_SEATING_CHART:
      return action.seatingChart;
      
    case actionTypes.LOAD_SEATING_CHART_CONFIGURATION:
      return action.seatingChartConfiguration;

    default:
      return state;
  }
}
