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

export function saveSeatingChartSection(key, sectionData){
  return function(dispatch) {
    ref.child(key).once('value').then(function(snapshot) {
      let data = snapshot.val();
      let sections = data.sections;
      let index = snapshot.val().sections.map( (el) => el.name ).indexOf(sectionData.name);
      if(index !== -1) {
        sections[index] = sectionData;
      } else {
        sections.push(sectionData);
      }
      data.sections = sections;
      ref.child(key).update(data, function(error) {
        dispatch(loadSeatingChart(data));
      });
    });
  };
}

//To Reducers
export function loadSeatingChart(seatingChartConfiguration) {
  return {
    type: actionTypes.LOAD_SEATING_CHART_CONFIGURATION,
    seatingChartConfiguration
  };
}
