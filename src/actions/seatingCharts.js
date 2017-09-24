import * as firebase from '../lib/firebase';
import * as actionTypes from './actionTypes';

const ref = firebase.db.ref('seatingCharts');

//Actions
export function getSeatingChartConfiguration(team) {
  let teamName = team.name;
  let venueName = team.venue;
  return function(dispatch) {
    ref.child(team.key).once('value').then(function(snapshot) {
      dispatch(loadSeatingChart(snapshot.val()));
    });
  };
}

export function saveSeatingChartConfiguration(){
  
}

//To Reducers
export function loadSeatingChart(seatingChartConfiguration) {
  return {
    type: actionTypes.LOAD_SEATING_CHART_CONFIGURATION,
    seatingChartConfiguration
  };
}
