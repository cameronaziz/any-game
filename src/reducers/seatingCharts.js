import * as actionTypes from '../actions/actionTypes';

export default function seatingChart(state = {}, action) {
  switch(action.type) {

    case actionTypes.LOAD_SEATING_CHART:
      return action.seatingChart;

    default:
      return state;
  }
}
