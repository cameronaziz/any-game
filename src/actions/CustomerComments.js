import * as actionTypes from './actionTypes';
import * as firebase from '../lib/firebase';

const ref = firebase.db.ref('customerComments');

export function submitCustomerComments(formData) {
  return function(dispatch){
    ref.push(formData, function(error) {
      if(error) {
        dispatch(formSubmission(error))
      }else{
        dispatch(formSubmission('Success!'))
      }
    })
  }
}

export function formSubmission(message){
  return {
    type: actionTypes.FORM_SUBMISSIONS,
    message
  }
}
