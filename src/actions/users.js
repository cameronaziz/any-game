import * as actionTypes from './actionTypes';
import * as firebase from '../lib/firebase';
import * as loading from './loading';
import * as messages from './messages';

export function loadUsers(){
  return function(dispatch) {
    firebase.db.ref('users').on('value', function (snapshot) {
        dispatch(loadUsersSuccess(Object.values(snapshot.val())));
    });
  };
}

export function createUser(user) {
  return function(dispatch) {
    firebase.auth.createUserWithEmailAndPassword(user.email, user.password).then((savedUser) => {
      let storedUser = {
        name: user.name,
        email: user.email,
        id: savedUser.uid
      };
      firebase.db.ref('users').push(storedUser);
      dispatch(loadedUser(storedUser));
    }).catch((error) => {
      dispatch(messages.addMessage(error.message, 'register'));
    });

  };
}

export function loginUser(user) {
  return function(dispatch) {
    loading.isLoading('user');
    firebase.auth.signInWithEmailAndPassword(user.email, user.password).then((userRetrieved) => {
      firebase.db.ref('users').orderByChild('id').equalTo(userRetrieved.uid).on('value', function(snapshot) {
        dispatch(loadedUser(snapshot.val()));
        loading.notLoading('user');
      });
    }).catch(function(error) {
      dispatch(messages.addMessage(error.message, 'login'));
      loading.notLoading('user');
    });
  };
}

export function getLoggedInUser() {
  return function(dispatch) {
    firebase.auth.onAuthStateChanged(function(user) {
      if (user) {
        firebase.db.ref('users').orderByChild('id').equalTo(user.uid).on('value', function(snapshot) {
          dispatch(loadedUser(snapshot.val()));
        });
      } else {
        console.log("not logged in");
      }
    });
  };
}

export function logoutUser() {
  firebase.auth.signOut().then(function() {
    console.log("logged out");
  }).catch(function(error) {
    console.log(error);
});


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

export function loadedUser(user){
  return {
    type: actionTypes.LOADED_USER,
    user
  };
}
