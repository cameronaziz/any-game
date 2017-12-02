import * as actionTypes from './actionTypes';

export function addMessage(messageBody, type = 'global'){
  return function(dispatch) {
    let message = {
      type: type,
      messageBody: messageBody
    };
    console.log(message);
    dispatch(sendMessage(message));
  };
}


export function sendMessage(message) {
  return {
    type: actionTypes.ADD_MESSAGE,
    message
  };
}
