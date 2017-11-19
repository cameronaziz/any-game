import * as actionTypes from '../actions/actionTypes';

export default function seatingChart(state = {}, action) {
  switch(action.type) {

<<<<<<< Updated upstream
    case actionTypes.LOAD_SEATING_CHART:
      return action.seatingChart;
=======
    case actionTypes.LOAD_SEATING_CHART_CONFIGURATION:
      return action.seatingChartConfiguration;
>>>>>>> Stashed changes

    case actionTypes.LOAD_SEATING_CHART_CONFIGURATION:
      return action.seatingChartConfiguration;

    default:
      return state;
  }
}
