import * as firebase from 'firebase';
import firebaseConfig from './firebaseConfig';


export function getAppKeys(){
  return db.ref('config/keys').once('value');
}

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.database();
export const auth = firebaseApp.auth();
export const storage = firebaseApp.storage();

export default firebaseApp;
