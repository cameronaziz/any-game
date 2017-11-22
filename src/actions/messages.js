import * as actionTypes from './actionTypes';

export function addMessage(messageBody, type){
  return function (dispatch) {
    let message = {
      type: type,
      messageBody: messageBody
    };
    console.log("here")
    console.log(message)
    dispatch(sendMessage(message));
  };
}


export function sendMessage(message) {
  console.log(message)
  return {
    type: actionTypes.ADD_MESSAGE,
    message
  };
}
