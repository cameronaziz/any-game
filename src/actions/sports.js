import config from '../lib/config';
import * as actionTypes from './actionTypes';
import * as firebase from '../lib/firebase';

let ref = firebase.db.ref('sports');

export function loadSports() {
  return function(dispatch) {
    firebase.db.ref('sports').on('value', function (snapshot) {
        dispatch(loadSportsSuccess(Object.values(snapshot.val())));
    });
  };
}

export function saveSport(sport) {
  let postKey;
  firebase.db.ref('sports').orderByChild('name').equalTo(sport.name).once('value', function (snapshot){
    let exists = (snapshot.val() !== null);
    if (exists) {
      postKey = Object.keys(snapshot.val())[0];
    } else {
      postKey = firebase.db.ref('sports/').push().key;
    }
  });
  return function(dispatch) {
        firebase.db.ref('sports/' + postKey).update(sport, function(error) {
        if (error)
            dispatch(createSportSuccess(false));
        else {
            dispatch(createSportSuccess(true));
        }
    });
  };
}

export function removeSport(sport) {
  ref.orderByChild('name').equalTo(sport.name).on('child_added', function(snapshot) {
    snapshot.ref.remove();
  });
}

export function createSportSuccess(status) {
  return {
    type: actionTypes.CREATE_SPORT_SUCCESS,
    status
  };
}

export function loadSportsSuccess(sports) {
  return {
    type: actionTypes.LOAD_SPORTS_SUCCESS,
    sports
  };
}
