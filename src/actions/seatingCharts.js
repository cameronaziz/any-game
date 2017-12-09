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
export function getSeatingChart(teamKey){
  return function(dispatch) {
    dispatch(loadingActions.isLoading('seatingChart'));
    ref.child(teamKey).on('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        if(childSnapshot.val().isCurrent) {
          dispatch(seatingChartSections.getSections(childSnapshot.key));
          let seatingChart = Object.assign({}, childSnapshot.val());
          seatingChart._key = childSnapshot.key;
          dispatch(loadSeatingChart(seatingChart));
        }
      });
      dispatch(loadingActions.notLoading('seatingChart'));
    });
  };
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
  let deleteRef = firebase.db.ref('seatingCharts/' + key + '/sections');
  deleteRef.remove();

  let sectionData = eval(sectionRawData);
  for (let i = 0; i < sectionData.length; i++) {
    let postKey;
    postKey = ref.child(key + '/sections').push().key;
    sectionData[i].name = 'Section ' + sectionData[i].name;
    ref.child(key + '/sections/' + postKey).update(sectionData[i]);
  }
  return function(dispatch) {
    ref.child(key).on('value', function(snapshot) {
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
