import * as firebase from '../lib/firebase';
import * as actionTypes from './actionTypes';

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
export function getSeatingChartConfiguration(key) {
  return function(dispatch) {
    ref.child(key).on('value', function(snapshot) {
      dispatch(loadSeatingChart(snapshot.val()));
    });
  };
}

export function saveSection(key, sectionData) {
  let postKey;
  ref.child(key + '/sections').orderByChild('name').equalTo(sectionData.name).once('value', function(snapshot) {
    let exists = (snapshot.val() !== null);
    if(exists) {
      postKey = Object.keys(snapshot.val())[0];
    } else {
      postKey = ref.child(key + '/sections').push().key;
    }
  });
  return function(dispatch) {
    ref.child(key + '/sections/' + postKey).update(sectionData, function(error) {
      if(!error) {
        ref.child(key).on('value', function(snapshot) {
          dispatch(loadSeatingChart(snapshot.val()));
        });
      }
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

export function bulkSaveSections(key, sectionData){
  ref.child(key + '/sections').remove();
  loopSections(key, sectionData).then(getSeatingChartConfiguration(key));
}

//To Reducers
export function loadSeatingChart(seatingChart) {
  return {
    type: actionTypes.LOAD_SEATING_CHART,
    seatingChart
  };
}
