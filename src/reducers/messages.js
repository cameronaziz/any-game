import * as actionTypes from '../actions/actionTypes';


export default function seatingChart(state = {}, action) {
  switch(action.type){

    case actionTypes.ADD_MESSAGE:
      let mutatedState = Object.assign({}, state);
      mutatedState[action.message.type] = action.messageBody;
      return mutatedState;

    default:
      return state;
  }
}
