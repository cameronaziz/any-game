import * as actionTypes from './actionTypes';

export function addMessage(messageBody, type){
  return function (dispatch) {
    let message = {
      type: type,
      messageBody: messageBody
    };
    dispatch(sendMessage(message));
  };
}


export function sendMessage(message) {
  return {
    type: actionTypes.ADD_MESSAGE,
    message
  };
}
