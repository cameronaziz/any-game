import * as actionTypes from '../actions/actionTypes';

export default function customerComments(state = '', action) {
  switch (action.type) {

    case actionTypes.FORM_SUBMISSIONS:
      return action.message;

    default:
     return state;
  }
}
