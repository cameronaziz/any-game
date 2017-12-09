import * as actionTypes from './actionTypes';
import * as firebase from '../lib/firebase';
import * as loadingActions from './loading';
import * as seatingChartActions from './seatingCharts';

import { snapshotToArray } from '../lib/utilities';

let ref = firebase.db.ref('seating');
let storageRef = firebase.storage.ref('seatingCharts');

//Utility Functions
function sortTeamsBySportAndDispatch(snapshot, dispatch){
  let teams = [];
  snapshot.forEach(function(child) {
    let key = child.key;
    let team = child.val();
    team._key = key;
    teams.push(team);
  });
  dispatch(loadTeamsSuccess(teams));
}

//Neighbors
export function returnTeamBySlug(slug) {
  return new Promise(function (resolve, reject) {
    firebase.db.ref('teams').orderByChild('slug').equalTo(slug).on('value', function (snapshot) {
      let snap = snapshot.val();
      let team = Object.values(snap)[0];
      team._key = Object.keys(snap)[0];
      resolve(team);
    });
  });
}

//Actions
export function loadTeams() {
  return function(dispatch) {
    dispatch(loadingActions.isLoading('teams'));
    firebase.db.ref('teams').orderByChild('name').on('value', function (snapshot) {
      dispatch(loadTeamsSuccess(snapshotToArray(snapshot)));
      dispatch(loadingActions.notLoading('teams'));
    });
  };
}

export function getTeamBySlug(slug) {
  return function(dispatch) {
    dispatch(loadingActions.isLoading('teams'));
    firebase.db.ref('teams').orderByChild('slug').equalTo(slug).on('value', function (snapshot) {
      let snap = snapshot.val();
      let team = Object.values(snap)[0];
      team._key = Object.keys(snap)[0];
      dispatch(loadTeamsSuccess(team));
      dispatch(loadingActions.notLoading('teams'));
    });
  };
}

export function loadTeamsBySport(sport) {
  return function(dispatch) {
    firebase.db.ref('teams').orderByChild('sport').equalTo(sport).on('value', function (snapshot) {
      //todo: sort by team name before distpatch
      sortTeamsBySportAndDispatch(snapshot, dispatch);
    });
  };
}

export function saveTeam(team) {
  let postKey = team._key;
  if(!team._key) {
    postKey = firebase.db.ref('teams/').push().key;
  }
  delete team._key;
  if(team.seatingChart.name != undefined) {
    seatingChartActions.saveSeatingChart(team, postKey);
  }
  delete team.seatingChart;
  return function(dispatch) {
    firebase.db.ref('teams/' + postKey).update(team, function(error) {
      if (error)
        dispatch(createTeamSuccess(false));
      else {
        dispatch(createTeamSuccess(true));
      }
    });
  };
}

export function removeTeam(team) {
  let query = ref.orderByChild('name').equalTo(team.name);
  query.on('child_added', function(snapshot) {
    snapshot.ref.remove();
  });
}

//To Reducers
export function createTeamSuccess(status) {
  return {
    type: actionTypes.CREATE_TEAM_SUCCESS,
    status
  };
}

export function loadTeamsSuccess(teams) {
  return {
    type: actionTypes.LOAD_TEAMS_SUCCESS,
    teams
  };
}
