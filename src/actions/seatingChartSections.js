import * as firebase from '../lib/firebase';
import * as actionTypes from './actionTypes';

const ref = firebase.db.ref('seatingCharts/sections');


export function saveSection(key, sectionData) {
  sectionData['seatingChartKey'] = key;
  let postKey = ref.push().key;
  ref.child(postKey).update(sectionData);
}

export function getSections(key) {
  console.log(key);
  ref.orderBy('seatingChartKey').equalTo(key).once('value', function(snapshot) {
    console.log(snapshot.val());
  });
}
