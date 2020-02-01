import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

let firebaseConfig = {
  apiKey: 'AIzaSyCe02uO-EOs9-txsnLQBj6Zn1E0C0-90Lo',
  authDomain: 'react-slack-8dea8.firebaseapp.com',
  databaseURL: 'https://react-slack-8dea8.firebaseio.com',
  projectId: 'react-slack-8dea8',
  storageBucket: 'react-slack-8dea8.appspot.com',
  messagingSenderId: '1072540642012',
  appId: '1:1072540642012:web:5c16e9cf4ff3ffce512219'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
