import * as firebase from '../lib/firebase';
import * as actionTypes from './actionTypes';
import * as loadingActions from './loading';

import { nestedObjectsToArray } from '../lib/utilities';

const ref = firebase.db.ref('seatingChartSections');


//Utility
function getSectionsByTeam(key) {
  return function(dispatch) {
    ref.orderByChild('seatingChartKey').equalTo(key).on('value', function(snapshot) {
      dispatch(loadSeatingChartSections(snapshot.val()));
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  };
}


export function saveSection(sectionData) {
  let postKey;
  if(sectionData[0] === ""){
    postKey = ref.push().key;
  } else {
    postKey = sectionData[0];
  }

  return function(dispatch) {
    ref.child(postKey).update(sectionData[1], function(error) {
      if(!error) {
        ref.orderByChild('seatingChartKey').equalTo(sectionData[1].seatingChartKey).on('value', function(snapshot) {
          dispatch(loadSeatingChartSections(snapshot.val()));
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });
      }
    });
  };
}

export function getSections(key) {
  return function(dispatch) {
    dispatch(loadingActions.isLoading('seatingChartSections'));
    firebase.db.ref('seatingChartSections/' + key).on('value', function(snapshot) {
      let sections = nestedObjectsToArray(snapshot.val());
      dispatch(loadSeatingChartSections(sections));
      dispatch(loadingActions.notLoading('seatingChartSections'));
    });
  };
}

export function saveSectionSuccess(section) {
  return {
    type: actionTypes.SEATING_CHART_SECTIONS_ADD,
    section
  };
}

export function loadSeatingChartSections(sections) {
  return {
    type: actionTypes.SEATING_CHART_SECTIONS,
    sections
  };
}
