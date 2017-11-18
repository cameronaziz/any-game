import * as actionTypes from '../actions/actionTypes';

export default function seatingChartSections(state = [], action) {
  switch(action.type) {

    case actionTypes.SELECT_SECTION:
      return { ...state, ...action.section }

    default:
      return state;

  }
}
