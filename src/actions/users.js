import * as actionTypes from './actionTypes';
import * as firebase from '../lib/firebase';

export function loadUsers(){
  return function(dispatch) {
    firebase.db.ref('users').on('value', function (snapshot) {
        dispatch(loadUsersSuccess(Object.values(snapshot.val())));
    });
  };
}

export function createUser(user) {
  return function(dispatch) {
    firebase.auth.createUserWithEmailAndPassword(user.email, user.password).catch((error) => {
      dispatch(handleError(error.message));
    });
  };
}

export function loginUser(user) {
  return function(dispatch) {
    firebase.auth.signInWithEmailAndPassword(user.email, user.password).catch(function(error) {
      dispatch(handleError(error.message));
    });

    firebase.auth.onAuthStateChanged(function(user) {
      console.log(user);
    });

  };
}

export function handleError(error){
  return {
    type: actionTypes.USER_ERROR,
    error
  };
}

export function loadUsersSuccess(users){
  return {
    type: actionTypes.ACTIVE_USERS,
    users
  };
}
