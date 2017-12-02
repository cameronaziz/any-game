import * as actionTypes from '../actions/actionTypes';


export default function seatingChart(state = {}, action) {
  switch(action.type){

    case actionTypes.ADD_MESSAGE:
      let newState = Object.assign({}, state);
      newState[action.message.type] = action.message.messageBody;
      return newState;

    default:
      return state;
  }
}
