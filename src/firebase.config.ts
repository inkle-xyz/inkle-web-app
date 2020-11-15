import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBQunwDb9e01Xd5-mGC2hkeSHtmbwsveWI',
  authDomain: 'inkle-xyz.firebaseapp.com',
  databaseURL: 'https://inkle-xyz.firebaseio.com',
  projectId: 'inkle-xyz',
  storageBucket: 'inkle-xyz.appspot.com',
  messagingSenderId: '446531057115',
  appId: '1:446531057115:web:14d723ad330f92f43fe3fe',
  measurementId: 'G-SLW1M3QVYD',
};

const app = firebase.initializeApp(config);
export const db = firebase.firestore(app);
export const auth = firebase.auth(app);
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
