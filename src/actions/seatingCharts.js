import * as firebase from '../lib/firebase';
import * as actionTypes from './actionTypes';
import * as loadingActions from './loading';

import * as seatingChartSections from './seatingChartSections';
import * as teams from './teams';

const ref = firebase.db.ref('seatingCharts');

//Utility
function writeSection(key, sectionData) {
  return new Promise(function (resolve, reject) {
    let postKey = ref.child(key + '/sections').push().key;
    ref.child(key + '/sections/' + postKey).update(sectionData, function(error) {
      if(!error) {
        resolve(sectionData);
      } else {
        reject(sectionData);
      }
    });
  });
}

function loopSections(key, sectionData) {
  return new Promise(function (resolve, reject) {
    let i = 0;
    sectionData.map(function(section) {
      i++;
      writeSection(key, section);
    });
    if (i >= sectionData.length) {
      resolve();
    } else {
      reject();
    }
  });
}

//Actions
export function getSeatingChart(team){
  return function(dispatch) {
    dispatch(loadingActions.isLoading('seatingChart'));
    firebase.db.ref('seatingCharts/' + team._key + '/' + team.venueKey).on('value', function(snapshot) {
      if(snapshot.val()) {
        snapshot.forEach(function(childSnapshot) {
          if(childSnapshot.val().isCurrent) {
            let seatingChart = childSnapshot.val();
            seatingChart._key = childSnapshot.key;
            dispatch(loadSeatingChart(seatingChart));
            dispatch(seatingChartSections.getSections(childSnapshot.key));
          }
        });
      } else {
        dispatch(loadSeatingChart({}));
      }
      dispatch(loadingActions.notLoading('seatingChart'));
    });
  };
}

function uploadSeatingChart(team, teamPostKey, seatingChartKey){
  let fileLocation = 'seatingCharts/' + seatingChartKey + '/' + team.name + ' - ' + team.venue + '.' + team.seatingChart.type.split('/')[1];
  let storageRef = firebase.storage.ref(fileLocation);
  storageRef.put(team.seatingChart).then(function(snapshot) {
    let storage = firebase.storage;
    let storageRef = storage.ref();
    storageRef.child(fileLocation).getDownloadURL().then(function(url) {
      if ( url  ) {
        firebase.db.ref('seatingCharts/' + teamPostKey + '/' + team.venueKey + '/' + seatingChartKey).update({ seatingChartUrl: url});
      }
    });
  });
}

export function saveSeatingChart(team, teamPostKey){
  let location = 'seatingCharts/' + teamPostKey + '/' + team.venueKey;
  let seatingChartData = {
    team: team.name,
    venue: team.venue,
    isCurrent: true
  };
  let seatingChartKey = firebase.db.ref(location).push().key;
  uploadSeatingChart(team, teamPostKey, seatingChartKey);
  firebase.db.ref(location + '/' + seatingChartKey).update(seatingChartData);
}

export function getSeatingChartConfiguration(key, searchBy) {
  return function(dispatch) {
    dispatch(loadingActions.isLoading('seatingChart'));
    ref.child(key).on('value', function(snapshot) {
      dispatch(loadSeatingChart(snapshot.val()));
      dispatch(loadingActions.notLoading('seatingChart'));
    });
  };
}

export function getSeatingChartConfigurationBySlug(slug) {
  return function(dispatch) {
    dispatch(loadingActions.isLoading('seatingChart'));
    teams.returnTeamBySlug(slug).then((team) => {
      dispatch(seatingChartSections.getSections(Object.keys(team)[0]));
      ref.orderByChild('teamKey').equalTo(Object.keys(team)[0]).on('value', function(snapshot) {
        dispatch(loadSeatingChart(snapshot.val()));
        dispatch(loadingActions.notLoading('seatingChart'));
      });
    });
  };
}

export function saveZone(key, zoneData) {
  let postKey;
  ref.child(key + '/zones').orderByChild('name').equalTo(zoneData.name).once('value', function(snapshot) {
    let exists = (snapshot.val() !== null);
    if(exists) {
      postKey = Object.keys(snapshot.val())[0];
    } else {
      postKey = ref.child(key + '/zones').push().key;
    }
  });
  return function(dispatch) {
    ref.child(key + '/zones/' + postKey).update(zoneData, function(error) {
      if(!error) {
        ref.child(key).on('value', function(snapshot) {
          dispatch(loadSeatingChart(snapshot.val()));
        });
      }
    });
  };
}

export function bulkSaveSections(key, sectionRawData){
  let deleteRef = firebase.db.ref('seatingChartSections/' + key);
  deleteRef.remove();

  let sectionData = eval(sectionRawData);
  for (let i = 0; i < sectionData.length; i++) {
    sectionData[i].name = 'Section ' + sectionData[i].name;
    firebase.db.ref('seatingChartSections/' + key).push(sectionData[i]);
  }
  return function(dispatch) {
    firebase.db.ref('seatingChartSections').child(key).on('value', function(snapshot) {
      dispatch(loadSeatingChart(snapshot.val()));
    });
  };
}

//To Reducers
export function loadSeatingChart(seatingChart) {
  return {
    type: actionTypes.LOAD_SEATING_CHART,
    seatingChart
  };
}
