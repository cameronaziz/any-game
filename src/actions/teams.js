import * as actionTypes from './actionTypes';
import * as firebase from '../lib/firebase';

let ref = firebase.db.ref('teams');
let storageRef = firebase.storage.ref('seatingCharts');

//Utility Functions
function sortTeamsBySportAndDispatch(snapshot, dispatch){
  let teams = [];
  snapshot.forEach(function(child) {
    let key = child.key;
    let team = child.val();
    team.key = key;
    //getSeatingChart(team, child.key).then(function(team) {
      teams.push(team);
    //});
  });
  dispatch(loadTeamsSuccess(teams));
}

function saveSeatingChart(team, postKey){
  let storageRef = firebase.storage.ref('seatingCharts/' + postKey + '/' + team.fileName);
  storageRef.put(team.seatingChart).then(function(snapshot) {
    console.log('Uploaded a blob or file!');
  });
}

export let getSeatingChart = function(fileName, postKey) {
  return new Promise(function(resolve, reject) {
    let storage = firebase.storage;
    let storageRef = storage.ref();
    let pathReference = storage.ref('seatingCharts/' + postKey + '/' + fileName);
    let location = 'seatingCharts/' + postKey + '/' + fileName + '.png';
    storageRef.child(location).getDownloadURL().then(function(url) {
      if ( url  ) {
        resolve("Stuff worked!");
      } else {
        reject(Error("It broke"));
      }
    });
  });
};

//Actions
export function loadTeams() {
  return function(dispatch) {
    firebase.db.ref('teams').orderByChild('name').on('value', function (snapshot) {
      console.log(snapshot)
      sortTeamsBySportAndDispatch(snapshot, dispatch);
    });
  };
}

export function loadTeamImage(){

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
  let postKey;
  ref.orderByChild('name').equalTo(team.name).once('value', function (snapshot){
    let exists = (snapshot.val() !== null);
    if (exists) {
      postKey = Object.keys(snapshot.val())[0];
    } else {
      postKey = firebase.db.ref('teams/').push().key;
    }
  });
  team.fileName = team.venue;
  saveSeatingChart(team, postKey);
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
